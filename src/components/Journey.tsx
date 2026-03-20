import { useInView } from '../hooks/useInView';

const steps = [
  {
    num: '01',
    title: 'Понимание',
    subtitle: 'Активное слушание',
    lines: [
      'Я говорю прямо — без лишнего.',
      'Слушают не только ушами, но вниманием.',
      '',
      'Постепенно начинают появляться образы.',
      'Каждый видит своё.',
    ],
  },
  {
    num: '02',
    title: 'Проводничество',
    subtitle: 'Визуализация образов',
    lines: [
      'Я мягко веду внимание.',
      'Мы входим в пространство образов,',
      'где внутренние ответы становятся видимыми.',
    ],
  },
  {
    num: '03',
    title: 'Практика',
    subtitle: 'Опыт',
    lines: [
      'Полученное становится переживанием.',
      'Не знание о жизни,',
      { text: 'а знание изнутри.', beam: 'journey-inner' },
    ],
  },
];

export default function Journey() {
  const { ref, isVisible } = useInView(0.1);

  return (
    <section id="journey" className="py-32 md:py-44 px-6">
      <div ref={ref} className={`max-w-4xl mx-auto fade-in ${isVisible ? 'visible' : ''}`}>
        <p
          className="text-sm tracking-[0.2em] uppercase text-center mb-20 md:mb-28 shimmer-gold"
          style={{ color: 'var(--accent)' }}
        >
          Через что проходит слушатель
        </p>

        <div className="relative">
          {/* Vertical line connecting steps */}
          <div
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px hidden md:block"
            style={{
              background: 'linear-gradient(to bottom, transparent, var(--gray-mid) 20%, var(--gray-mid) 80%, transparent)',
              transform: 'translateX(-50%)',
            }}
          />

          <div className="flex flex-col gap-24 md:gap-32">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className={`flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-16 ${
                  i % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Number + Title side */}
                <div className={`flex-1 ${i % 2 === 1 ? 'md:text-left' : 'md:text-right'}`}>
                  <span
                    className="text-xs tracking-[0.3em] num-glow"
                    style={{ color: 'var(--gray-mid)' }}
                  >
                    {step.num}
                  </span>
                  <h3
                    data-beam={`journey-${i}`}
                    className="text-3xl md:text-4xl italic mt-2"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 300,
                      color: 'var(--white-warm)',
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-xs tracking-[0.15em] uppercase mt-2 shimmer-gold"
                    style={{ color: 'var(--accent)' }}
                  >
                    {step.subtitle}
                  </p>
                </div>

                {/* Center dot */}
                <div className="hidden md:flex items-center justify-center">
                  <div
                    className="w-2 h-2 rounded-full dot-breathe"
                    style={{ background: 'var(--gray-mid)' }}
                  />
                </div>

                {/* Description side */}
                <div className="flex-1">
                  {step.lines.map((line, li) => {
                    if (line === '') return <div key={li} className="h-4" />;
                    if (typeof line === 'object') {
                      return (
                        <p
                          key={li}
                          className="text-sm leading-loose"
                          style={{ color: 'var(--gray-text)' }}
                        >
                          <span data-beam={line.beam}>{line.text}</span>
                        </p>
                      );
                    }
                    return (
                      <p
                        key={li}
                        className="text-sm leading-loose"
                        style={{ color: 'var(--gray-text)' }}
                      >
                        {line}
                      </p>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
