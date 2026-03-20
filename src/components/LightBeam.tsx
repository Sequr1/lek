import { useEffect, useRef, useCallback } from 'react';

interface Point {
  x: number;
  y: number;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

export default function LightBeam() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pathPointsRef = useRef<Point[]>([]);
  const waypointsRef = useRef<{ id: string; y: number; pathIndex: number }[]>([]);
  const sparksRef = useRef<Spark[]>([]);
  const prevPosRef = useRef<Point | null>(null);
  const animFrameRef = useRef(0);
  const trailRef = useRef<{ x: number; y: number; alpha: number }[]>([]);

  // Smooth position tracking
  const currentIdxRef = useRef(0); // actual rendered index (smooth)
  const targetIdxRef = useRef(0); // where scroll says we should be
  const stickyTimerRef = useRef(0); // how long we've been stuck on a waypoint
  const stuckOnRef = useRef<number | null>(null); // which waypoint pathIndex we're stuck on

  const getCenter = (el: Element): Point => {
    const rect = el.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + scrollTop + rect.height / 2,
    };
  };

  const buildPath = useCallback(() => {
    const beamOrder = [
      'start',
      'hero-phrase',
      'hero-fear',
      'hero-0',
      'hero-1',
      'hero-2',
      'about-clarity',
      'journey-0',
      'journey-1',
      'journey-2',
      'journey-inner',
      'format-choice',
      'end',
    ];

    const waypoints: { id: string; point: Point }[] = [];
    for (const id of beamOrder) {
      const el = document.querySelector(`[data-beam="${id}"]`);
      if (!el) continue;
      waypoints.push({ id, point: getCenter(el) });
    }

    if (waypoints.length < 2) return;

    const allPoints: Point[] = [waypoints[0].point];
    const wpInfo: { id: string; y: number; pathIndex: number }[] = [
      { id: waypoints[0].id, y: waypoints[0].point.y, pathIndex: 0 },
    ];

    for (let i = 1; i < waypoints.length; i++) {
      const from = waypoints[i - 1].point;
      const to = waypoints[i].point;
      const dx = to.x - from.x;
      const dy = to.y - from.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const segments = dist > 400 ? 4 : dist > 200 ? 3 : 2;

      for (let s = 1; s <= segments; s++) {
        const progress = s / (segments + 1);
        const yPos = from.y + dy * progress;
        const zigzagAmplitude = Math.min(60, dist * 0.08);
        const direction = (i + s) % 2 === 0 ? 1 : -1;
        const baseX = from.x + dx * progress;
        const offsetX = direction * zigzagAmplitude;
        allPoints.push({ x: baseX + offsetX, y: yPos });
      }

      allPoints.push(to);
      wpInfo.push({
        id: waypoints[i].id,
        y: waypoints[i].point.y,
        pathIndex: allPoints.length - 1,
      });
    }

    pathPointsRef.current = allPoints;
    waypointsRef.current = wpInfo;
  }, []);

  const getIndexAtY = useCallback((targetY: number): number => {
    const points = pathPointsRef.current;
    if (points.length === 0) return 0;

    let bestIdx = 0;
    for (let i = 0; i < points.length; i++) {
      if (points[i].y <= targetY) {
        bestIdx = i;
      }
    }

    if (bestIdx < points.length - 1) {
      const p1 = points[bestIdx];
      const p2 = points[bestIdx + 1];
      if (p2.y > p1.y) {
        const t = (targetY - p1.y) / (p2.y - p1.y);
        return bestIdx + Math.min(t, 1);
      }
    }

    return bestIdx;
  }, []);

  const getPointAtIndex = useCallback((idx: number): Point => {
    const points = pathPointsRef.current;
    if (points.length === 0) return { x: 0, y: 0 };

    const i = Math.floor(idx);
    const t = idx - i;

    if (i >= points.length - 1) return points[points.length - 1];
    if (i < 0) return points[0];

    return {
      x: points[i].x + (points[i + 1].x - points[i].x) * t,
      y: points[i].y + (points[i + 1].y - points[i].y) * t,
    };
  }, []);

  const spawnSparks = useCallback((x: number, y: number, count: number) => {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.3 + Math.random() * 1.5;
      sparksRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.3,
        life: 1,
        maxLife: 25 + Math.random() * 35,
        size: 0.5 + Math.random() * 1.5,
      });
    }
    if (sparksRef.current.length > 80) {
      sparksRef.current = sparksRef.current.slice(-60);
    }
  }, []);

  // Burst of sparks when hitting a word
  const spawnBurst = useCallback((x: number, y: number) => {
    for (let i = 0; i < 12; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1 + Math.random() * 3;
      sparksRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.5,
        life: 1,
        maxLife: 40 + Math.random() * 40,
        size: 0.8 + Math.random() * 2,
      });
    }
    if (sparksRef.current.length > 120) {
      sparksRef.current = sparksRef.current.slice(-80);
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let lastScroll = -1;

    const render = () => {
      animFrameRef.current = requestAnimationFrame(render);

      const scrollTop = window.scrollY;
      const points = pathPointsRef.current;
      const waypoints = waypointsRef.current;

      const pageH = document.documentElement.scrollHeight;
      const pageW = window.innerWidth;
      if (canvas.width !== pageW || canvas.height !== pageH) {
        canvas.width = pageW;
        canvas.height = pageH;
        canvas.style.width = pageW + 'px';
        canvas.style.height = pageH + 'px';
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (points.length < 2) return;

      // Where scroll says the dot should be
      const viewTargetY = scrollTop + window.innerHeight * 0.45;
      const firstY = points[0].y;
      const lastY = points[points.length - 1].y;

      if (viewTargetY < firstY - 50) return;

      const clampedY = Math.max(firstY, Math.min(viewTargetY, lastY));
      targetIdxRef.current = getIndexAtY(clampedY);

      // --- Sticky waypoint logic ---
      const target = targetIdxRef.current;
      let current = currentIdxRef.current;

      // Find if we're approaching a waypoint
      let nearestWp: { pathIndex: number; dist: number } | null = null;
      for (const wp of waypoints) {
        const dist = wp.pathIndex - current;
        // Only stick to waypoints that are ahead (or just reached)
        if (dist >= -0.5 && dist < 3) {
          if (!nearestWp || dist < nearestWp.dist) {
            nearestWp = { pathIndex: wp.pathIndex, dist };
          }
        }
      }

      // Determine lerp speed
      let lerpSpeed = 0.08; // normal catch-up speed

      if (nearestWp && nearestWp.dist <= 1.5 && nearestWp.dist >= -0.5) {
        // We're close to or at a waypoint
        if (stuckOnRef.current !== nearestWp.pathIndex) {
          // Just arrived at this waypoint
          stuckOnRef.current = nearestWp.pathIndex;
          stickyTimerRef.current = 0;

          // Burst of sparks on arrival
          const wpPoint = getPointAtIndex(nearestWp.pathIndex);
          spawnBurst(wpPoint.x, wpPoint.y);
        }

        stickyTimerRef.current += 1;

        // Hold on the waypoint for ~60 frames (about 1 second), then release
        const holdFrames = 50;
        const releaseFrames = 30;

        if (stickyTimerRef.current < holdFrames) {
          // Snapping to waypoint — very slow movement
          lerpSpeed = 0.01;
          // Pull current toward the waypoint, not toward target
          const wpIdx = nearestWp.pathIndex;
          current = current + (wpIdx - current) * 0.15;
        } else if (stickyTimerRef.current < holdFrames + releaseFrames) {
          // Releasing — accelerate to catch up
          const releaseProgress =
            (stickyTimerRef.current - holdFrames) / releaseFrames;
          lerpSpeed = 0.05 + releaseProgress * 0.2; // ramp up from 0.05 to 0.25
        } else {
          // Fully released
          stuckOnRef.current = null;
          lerpSpeed = 0.12;
        }
      } else {
        // Not near any waypoint — if we were stuck, we're now free
        if (stuckOnRef.current !== null) {
          // Check if target has moved far enough past the stuck point
          const diff = target - stuckOnRef.current;
          if (diff > 3) {
            stuckOnRef.current = null;
            stickyTimerRef.current = 0;
          }
        }
        // If target is far ahead, speed up to catch up
        const gap = target - current;
        if (gap > 5) {
          lerpSpeed = 0.15;
        } else if (gap > 10) {
          lerpSpeed = 0.25;
        }
      }

      // Smooth lerp toward target (or toward sticky waypoint)
      currentIdxRef.current = current + (target - current) * lerpSpeed;

      // Clamp
      if (currentIdxRef.current < 0) currentIdxRef.current = 0;
      if (currentIdxRef.current > points.length - 1)
        currentIdxRef.current = points.length - 1;

      const pos = getPointAtIndex(currentIdxRef.current);

      // Spawn sparks on movement
      if (prevPosRef.current) {
        const dx = pos.x - prevPosRef.current.x;
        const dy = pos.y - prevPosRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 1.5) {
          spawnSparks(pos.x, pos.y, Math.min(Math.floor(dist / 2), 6));
        }
      }
      prevPosRef.current = { ...pos };

      // Trail
      if (currentIdxRef.current > 0) {
        trailRef.current.push({ x: pos.x, y: pos.y, alpha: 0.5 });
        if (trailRef.current.length > 60) trailRef.current.shift();
      }

      // Draw trail
      for (let i = 0; i < trailRef.current.length; i++) {
        const t = trailRef.current[i];
        t.alpha *= 0.95;
        if (t.alpha < 0.01) continue;
        ctx.beginPath();
        ctx.arc(t.x, t.y, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${t.alpha * 0.12})`;
        ctx.fill();
      }
      trailRef.current = trailRef.current.filter((t) => t.alpha > 0.01);

      // Draw & update sparks
      for (let i = sparksRef.current.length - 1; i >= 0; i--) {
        const s = sparksRef.current[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.015;
        s.life++;
        const lifeRatio = 1 - s.life / s.maxLife;

        if (lifeRatio <= 0) {
          sparksRef.current.splice(i, 1);
          continue;
        }

        const alpha = lifeRatio * 0.7;
        const radius = s.size * lifeRatio;

        ctx.beginPath();
        ctx.arc(s.x, s.y, radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.08})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(s.x, s.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();
      }

      // Draw main glowing point
      if (currentIdxRef.current > 0.1) {
        // Check if we're stuck — if so, glow brighter (pulsing)
        const isSticky =
          stuckOnRef.current !== null && stickyTimerRef.current < 50;
        const pulsePhase = isSticky
          ? 0.7 + 0.3 * Math.sin(Date.now() * 0.008)
          : 1;
        const glowMultiplier = isSticky ? 1.5 * pulsePhase : 1;

        // Outer glow
        const outerRadius = 45 * glowMultiplier;
        const g1 = ctx.createRadialGradient(
          pos.x,
          pos.y,
          0,
          pos.x,
          pos.y,
          outerRadius
        );
        g1.addColorStop(0, `rgba(255, 255, 255, ${0.15 * glowMultiplier})`);
        g1.addColorStop(0.3, `rgba(255, 255, 255, ${0.05 * glowMultiplier})`);
        g1.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, outerRadius, 0, Math.PI * 2);
        ctx.fillStyle = g1;
        ctx.fill();

        // Mid glow
        const midRadius = 14 * glowMultiplier;
        const g2 = ctx.createRadialGradient(
          pos.x,
          pos.y,
          0,
          pos.x,
          pos.y,
          midRadius
        );
        g2.addColorStop(0, `rgba(255, 255, 255, ${0.6 * glowMultiplier})`);
        g2.addColorStop(0.5, `rgba(255, 255, 255, ${0.15 * glowMultiplier})`);
        g2.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, midRadius, 0, Math.PI * 2);
        ctx.fillStyle = g2;
        ctx.fill();

        // Core
        const coreRadius = isSticky ? 3.5 : 2.5;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, coreRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${isSticky ? 0.95 : 0.85})`;
        ctx.fill();

        // Ambient sparks while stuck — gentle sparking
        if (isSticky && Math.random() < 0.25) {
          spawnSparks(pos.x, pos.y, 1);
        } else if (Math.random() < 0.1) {
          spawnSparks(pos.x, pos.y, 1);
        }
      }

      // Highlight start and end words
      if (scrollTop !== lastScroll) {
        lastScroll = scrollTop;
        for (const wp of waypointsRef.current) {
          if (wp.id !== 'start' && wp.id !== 'end') continue;
          const el = document.querySelector(
            `[data-beam="${wp.id}"]`
          ) as HTMLElement | null;
          if (!el) continue;
          const reached = currentIdxRef.current >= wp.pathIndex - 0.5;
          if (reached) {
            el.classList.add('beam-lit');
          } else {
            el.classList.remove('beam-lit');
          }
        }
      }
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [getIndexAtY, getPointAtIndex, spawnSparks, spawnBurst]);

  useEffect(() => {
    const t1 = setTimeout(buildPath, 300);
    const t2 = setTimeout(buildPath, 1000);
    const t3 = setTimeout(buildPath, 3000);

    const onResize = () => requestAnimationFrame(buildPath);
    window.addEventListener('resize', onResize);

    const observer = new MutationObserver(() => requestAnimationFrame(buildPath));
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener('resize', onResize);
      observer.disconnect();
    };
  }, [buildPath]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 10,
      }}
    />
  );
}
