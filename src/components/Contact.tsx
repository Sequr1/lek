import { useInView } from '../hooks/useInView';
import { useState } from 'react';

export default function Contact() {
  const { ref, isVisible } = useInView(0.2);
  const [sent, setSent] = useState(false);

  const [name, setName] = useState('');
  const [telegram, setTelegram] = useState('');
  const [phone, setPhone] = useState('');
  const [vk, setVk] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!telegram && !phone && !vk) {
      alert('Укажите хотя бы один способ связи');
      return;
    }

    const message = `
Новая заявка:
Имя: ${name}

Telegram: ${telegram || 'не указано'}
Телефон: ${phone || 'не указано'}
VK: ${vk || 'не указано'}
    `;

    try {
      await fetch(`https://api.telegram.org/bot8222621142:AAHeawZ7exYWE8qD5XYQH2FhRrN6FeHQQzk/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: '8275644668',
          text: message,
        }),
      });

      setSent(true);
    } catch (error) {
      alert('Ошибка отправки 😢');
    }
  };

  return (
    <section id="contact" className="py-32 md:py-44 px-6">
      <div
        ref={ref}
        className={`max-w-md mx-auto text-center fade-in ${isVisible ? 'visible' : ''}`}
      >

        <p className="text-5xl md:text-6xl mb-3 price-glow"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            color: '#C9A96E',
          }}>
          2 000 ₽
        </p>

        <p className="text-xs tracking-[0.15em] mb-2"
          style={{ color: 'var(--gray-text)' }}>
          за участие во встрече
        </p>

        <p className="text-xs tracking-[0.15em] mb-1"
          style={{ color: 'var(--gray-mid)' }}>
          2 часа
        </p>

        <div className="w-8 h-px mx-auto my-10"
          style={{ background: 'var(--gray-dark)' }}
        />

        {sent ? (
          <p
            className="text-lg italic py-8"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: 'var(--white-warm)',
            }}
          >
            Благодарю. Я свяжусь с вами.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 mb-10">

            <input
              type="text"
              placeholder="Имя"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-0 py-3 bg-transparent border-b text-sm tracking-wide outline-none transition-colors duration-500 focus:border-gray-500"
              style={{
                borderColor: 'var(--gray-dark)',
                color: 'var(--white-warm)',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 300,
              }}
            />

            <p
              className="text-[11px] text-left"
              style={{ color: 'var(--gray-mid)' }}
            >
              Оставьте любой удобный способ связи
            </p>

            <input
              type="text"
              placeholder="Telegram (например @username)"
              value={telegram}
              onChange={(e) => setTelegram(e.target.value)}
              className="w-full px-0 py-3 bg-transparent border-b text-sm tracking-wide outline-none transition-colors duration-500 focus:border-gray-500"
              style={{
                borderColor: 'var(--gray-dark)',
                color: 'var(--white-warm)',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 300,
              }}
            />

            <input
              type="text"
              placeholder="Телефон"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-0 py-3 bg-transparent border-b text-sm tracking-wide outline-none transition-colors duration-500 focus:border-gray-500"
              style={{
                borderColor: 'var(--gray-dark)',
                color: 'var(--white-warm)',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 300,
              }}
            />

            <input
              type="text"
              placeholder="ВКонтакте (ссылка или id)"
              value={vk}
              onChange={(e) => setVk(e.target.value)}
              className="w-full px-0 py-3 bg-transparent border-b text-sm tracking-wide outline-none transition-colors duration-500 focus:border-gray-500"
              style={{
                borderColor: 'var(--gray-dark)',
                color: 'var(--white-warm)',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 300,
              }}
            />

            <button
              type="submit"
              data-beam="end"
              className="mt-4 py-3 px-8 text-xs tracking-[0.25em] uppercase btn-gold-glow"
              style={{
                border: '1px solid var(--gray-mid)',
                color: 'var(--gray-light)',
                background: 'transparent',
                borderRadius: '1px',
              }}
            >
              Забронировать место
            </button>

          </form>
        )}

        <p className="text-[11px] tracking-[0.1em] mb-8"
          style={{ color: 'var(--gray-mid)' }}>
          Малые группы — не более 5 человек.
        </p>

        <div
          className="w-8 h-px mx-auto mb-8"
          style={{ background: 'var(--gray-dark)' }}
        />

        <a
          href="https://t.me/searchernov"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 group transition-all duration-500"
          style={{ color: 'var(--gray-text)' }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-colors duration-500 group-hover:stroke-white"
          >
            <path d="M21.198 2.433a2.242 2.242 0 0 0-1.022.215l-16.5 7.5a2.25 2.25 0 0 0 .126 4.303l3.698 1.057 2 5.492a1.5 1.5 0 0 0 2.545.441l2.08-2.428 4.17 3.108a2.25 2.25 0 0 0 3.46-1.201l3.22-15.87a2.25 2.25 0 0 0-3.777-2.617z" />
          </svg>
          <span
            className="text-xs tracking-[0.15em] transition-colors duration-500 group-hover:text-white"
          >
            Написать в Telegram
          </span>
        </a>
      </div>
    </section>
  );
}
