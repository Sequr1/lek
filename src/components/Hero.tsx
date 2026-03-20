import { useEffect, useState } from 'react';

export default function Hero() {
  const [show, setShow] = useState(false);
  const [showPhrase, setShowPhrase] = useState(false);
  const [showDesc, setShowDesc] = useState(false);
  const [showPills, setShowPills] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 300);
    setTimeout(() => setShowPhrase(true), 1200);
    setTimeout(() => setShowDesc(true), 2400);
    setTimeout(() => setShowPills(true), 3200);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center px-6 scanline-overlay"
      style={{ minHeight: '100vh' }}
    >
      {/* Name */}
      <div
        className="glitch-text"
        style={{
          opacity: show ? 1 : 0,
          transform: show ? 'translateY(0)' : 'translateY(10px)',
          transition: 'opacity 2s ease-out, transform 2s ease-out',
          marginBottom: '4rem',
        }}
      >
        <p
          data-beam="start"
          className="text-center uppercase"
          style={{
            color: 'var(--gray-text)',
            letterSpacing: '0.35em',
            fontSize: '12px',
          }}
        >
          Анатолий
        </p>
        <p
          className="text-center uppercase"
          style={{
            color: 'var(--gray-mid)',
            letterSpacing: '0.25em',
            fontSize: '10px',
            marginTop: '4px',
          }}
        >
          проводник
        </p>
      </div>

      {/* Main phrase */}
      <h1
        data-beam="hero-phrase"
        className="text-center italic"
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 300,
          color: 'var(--white-warm)',
          fontSize: 'clamp(1.8rem, 5vw, 3.5rem)',
          lineHeight: 1.3,
          maxWidth: '680px',
          opacity: showPhrase ? 1 : 0,
          transform: showPhrase ? 'translateY(0)' : 'translateY(15px)',
          transition: 'opacity 2s ease-out, transform 2s ease-out',
        }}
      >
        Жизнь меняется в момент ясного выбора
      </h1>

      {/* Description — different style */}
      <p
        className="text-center"
        style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 300,
          color: 'var(--gray-text)',
          fontSize: 'clamp(0.8rem, 1.8vw, 0.95rem)',
          lineHeight: 1.9,
          maxWidth: '520px',
          marginTop: '2.5rem',
          letterSpacing: '0.03em',
          opacity: showDesc ? 1 : 0,
          transform: showDesc ? 'translateY(0)' : 'translateY(10px)',
          transition: 'opacity 2s ease-out, transform 2s ease-out',
        }}
      >
        Я создаю пространство, где человек может остановиться,
        увидеть <span data-beam="hero-fear" style={{ display: 'inline' }}>свой страх</span>, услышать своё желание
        и&nbsp;принять решение.
      </p>

      {/* Pills — понимание · практика · осознанность */}
      <div
        className="flex items-center justify-center"
        style={{
          gap: '2rem',
          marginTop: '5rem',
          opacity: showPills ? 1 : 0,
          transform: showPills ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 1.5s ease-out, transform 1.5s ease-out',
        }}
      >
        {['понимание', 'практика', 'осознанность'].map((word, i) => (
          <span
            key={word}
            data-beam={`hero-${i}`}
            className="uppercase"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 300,
              fontSize: '9px',
              letterSpacing: '0.25em',
              color: 'var(--gray-mid)',
            }}
          >
            {word}
          </span>
        ))}
      </div>

      {/* Scroll hint */}
      <div
        className="absolute flex flex-col items-center dot-breathe"
        style={{
          bottom: '2.5rem',
          opacity: showPills ? 1 : 0,
          transition: 'opacity 2s ease-out 0.5s',
        }}
      >
        <div
          style={{
            width: '1px',
            height: '40px',
            background: 'linear-gradient(to bottom, var(--gray-mid), transparent)',
          }}
        />
      </div>
    </section>
  );
}
