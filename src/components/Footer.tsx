export default function Footer() {
  return (
    <footer className="py-16 px-6 text-center">
      <div
        className="w-8 h-px mx-auto mb-8"
        style={{ background: 'var(--gray-dark)' }}
      />
      <p
        className="text-[10px] tracking-[0.3em] uppercase"
        style={{ color: 'var(--gray-mid)' }}
      >
        Анатолий · {new Date().getFullYear()}
      </p>
    </footer>
  );
}
