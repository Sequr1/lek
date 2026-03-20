import { useInView } from '../hooks/useInView';

export default function Format() {
  const { ref, isVisible } = useInView(0.2);

  return (
    <section id="format" className="py-32 md:py-44 px-6">
      <div ref={ref} className={`max-w-3xl mx-auto text-center fade-in ${isVisible ? 'visible' : ''}`}>
        <p
          className="text-sm tracking-[0.2em] uppercase mb-16 md:mb-20 shimmer-gold"
          style={{ color: 'var(--accent)' }}
        >
          Формат
        </p>

        {/* Single format card */}
        <div
          className="border p-12 md:p-16 mx-auto max-w-lg card-alive"
          style={{
            borderColor: 'var(--gray-dark)',
            borderRadius: '2px',
            background: 'var(--black-card)',
          }}
        >
          <h3
            className="text-2xl md:text-3xl italic mb-8"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              color: 'var(--white-warm)',
            }}
          >
            Лекция-проводничество
          </h3>

          <div
            className="w-8 h-px mx-auto mb-8 line-glitch"
            style={{ background: 'var(--gray-mid)' }}
          />

          <div className="flex justify-center gap-12 mb-10">
            <div>
              <p
                className="text-2xl mb-1 num-glow"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  color: 'var(--white-warm)',
                }}
              >
                5
              </p>
              <p
                className="text-[10px] tracking-[0.2em] uppercase"
                style={{ color: 'var(--gray-text)' }}
              >
                человек
              </p>
            </div>
            <div>
              <p
                className="text-2xl mb-1 num-glow"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  color: 'var(--white-warm)',
                }}
              >
                1
              </p>
              <p
                className="text-[10px] tracking-[0.2em] uppercase"
                style={{ color: 'var(--gray-text)' }}
              >
                тема
              </p>
            </div>
          </div>

          <p
            data-beam="format-choice"
            className="text-lg md:text-xl italic mb-4"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: 'var(--white-warm)',
              fontWeight: 300,
            }}
          >
            Внутренний выбор
          </p>

          <p
            className="text-xs leading-loose max-w-xs mx-auto"
            style={{ color: 'var(--gray-text)' }}
          >
            Осознание своего выбора. Констатация права на&nbsp;выбор. Возвращение к&nbsp;себе через принятие того, что уже&nbsp;выбрано.
          </p>
        </div>
      </div>
    </section>
  );
}
