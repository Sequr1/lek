import { useInView } from '../hooks/useInView';

export default function About() {
  const { ref, isVisible } = useInView(0.2);

  return (
    <section id="about" className="py-32 md:py-44 px-6 scanline-overlay">
      <div
        ref={ref}
        className={`max-w-5xl mx-auto grid md:grid-cols-2 gap-16 md:gap-24 items-center fade-in ${isVisible ? 'visible' : ''}`}
      >
        {/* Photo */}
        <div className="flex justify-center md:justify-end">
          <div
            className="relative w-64 h-80 md:w-72 md:h-96 overflow-hidden photo-alive"
            style={{ borderRadius: '2px' }}
          >
            <img
              src="/ava.png"
              alt="Анатолий"
              className="w-full h-full object-cover"
              style={{ filter: 'grayscale(30%) contrast(1.05)' }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.parentElement!.style.background = 'linear-gradient(135deg, var(--black-card), var(--gray-dark))';
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to top, var(--black-deep) 0%, transparent 40%)',
              }}
            />
          </div>
        </div>

        {/* Text */}
        <div className="max-w-sm">
          <p
            className="text-sm tracking-[0.2em] uppercase mb-8 shimmer-gold"
            style={{ color: 'var(--accent)' }}
          >
            Что происходит на встрече
          </p>
          <p
            className="text-lg md:text-xl leading-relaxed mb-6"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: 'var(--white-warm)',
              fontWeight: 300,
            }}
          >
            Я провожу через внутренний диалог —<br />
            туда, где человек начинает ясно видеть свой{' '}
            <span data-beam="about-clarity" style={{ display: 'inline' }}>путь</span>.
          </p>
          <p
            className="text-sm leading-loose mb-4"
            style={{ color: 'var(--gray-text)' }}
          >
            Это не лекция в привычном смысле.
          </p>
          <p
            className="text-sm leading-loose"
            style={{ color: 'var(--gray-text)' }}
          >
            Это совместное движение:<br />
            <span style={{ color: 'var(--gray-light)', letterSpacing: '0.05em' }}>
              от слов → к&nbsp;образам → к&nbsp;переживанию → к&nbsp;пониманию.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
