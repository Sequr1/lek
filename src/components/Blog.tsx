import { useInView } from '../hooks/useInView';

const posts = [
  {
    slug: 'vnutrennij-vybor',
    title: 'Внутренний выбор: как перестать бояться своих решений',
    excerpt:
      'Каждый день мы делаем сотни выборов. Но настоящий выбор — тот, что меняет траекторию — начинается не в голове. Он рождается глубже.',
    tags: ['духовная лекция Иваново', 'осознанный выбор'],
  },
  {
    slug: 'osoznannost-praktika',
    title: 'Осознанность — это не медитация. Это способ жить',
    excerpt:
      'Практика осознанности не требует тишины или особого места. Она начинается с одного простого действия: заметить, что происходит прямо сейчас.',
    tags: ['центр развития личности', 'практика осознанности'],
  },
  {
    slug: 'strah-i-zhelanie',
    title: 'Между страхом и желанием: где живёт настоящее решение',
    excerpt:
      'Страх говорит: не двигайся. Желание говорит: иди. А решение живёт в точке, где ты перестаёшь слушать оба голоса — и начинаешь слышать себя.',
    tags: ['духовное развитие', 'лекция проводничество'],
  },
];

export default function Blog() {
  const { ref, isVisible } = useInView(0.1);

  return (
    <section id="blog" className="py-32 md:py-44 px-6">
      <div ref={ref} className={`max-w-3xl mx-auto fade-in ${isVisible ? 'visible' : ''}`}>
        <p
          className="text-sm tracking-[0.2em] uppercase text-center mb-16 md:mb-20 shimmer-gold"
          style={{ color: 'var(--accent)' }}
        >
          Записи
        </p>

        <div className="flex flex-col gap-16 md:gap-20">
          {posts.map((post) => (
            <article key={post.slug} className="group cursor-pointer">
              <h3
                className="text-xl md:text-2xl italic mb-4 transition-colors duration-500 group-hover:text-white"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 300,
                  color: 'var(--white-warm)',
                  lineHeight: 1.4,
                }}
              >
                {post.title}
              </h3>
              <p
                className="text-sm leading-loose mb-4"
                style={{ color: 'var(--gray-text)' }}
              >
                {post.excerpt}
              </p>
              <div className="flex flex-wrap gap-3">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] tracking-[0.1em] uppercase px-3 py-1"
                    style={{
                      color: 'var(--gray-mid)',
                      border: '1px solid var(--gray-dark)',
                      borderRadius: '1px',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div
                className="w-full h-px mt-16 md:mt-20"
                style={{
                  background: 'linear-gradient(90deg, transparent, var(--gray-dark) 50%, transparent)',
                }}
              />
            </article>
          ))}
        </div>

        {/* SEO-hidden structured content */}
        <div className="sr-only">
          <h2>Духовные лекции в Иваново</h2>
          <p>
            Анатолий — лектор-проводник, проводящий духовные лекции и практики осознанности
            в Иваново. Центр развития личности. Индивидуальные и групповые встречи.
            Лекции по осознанному выбору, визуализации, работе с образами.
            Духовная лекция Иваново. Практика осознанности. Центр развития личности Иваново.
            Проводничество. Внутренний выбор. Духовное развитие. Лекция проводничество Иваново.
          </p>
        </div>
      </div>
    </section>
  );
}
