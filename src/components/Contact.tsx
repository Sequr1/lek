import { useInView } from '../hooks/useInView';
import { useState } from 'react';

export default function Contact() {
  const { ref, isVisible } = useInView(0.2);
  const [sent, setSent] = useState(false);

  const [name, setName] = useState('');
  const [contact, setContact] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const message = `
Новая заявка:
Имя: ${name}
Контакт: ${contact}
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

            {/* ИМЯ */}
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

            {/* КОНТАКТ */}
            <input
              type="text"
              placeholder="Telegram или телефон"
              required
              value={contact}
              onChange={(e) => setContact(e.target.value)}
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

      </div>
    </section>
  );
}
