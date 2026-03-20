import Hero from './components/Hero';
import About from './components/About';
import Journey from './components/Journey';
import Format from './components/Format';
import Contact from './components/Contact';
import Blog from './components/Blog';
import Footer from './components/Footer';
import LightBeam from './components/LightBeam';

function Separator() {
  return (
    <div className="flex justify-center py-4 sep-alive">
      <div
        className="w-px h-16"
        style={{
          background: 'linear-gradient(to bottom, transparent, var(--gray-dark), transparent)',
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <div className="relative" style={{ background: 'var(--black-deep)', minHeight: '100vh' }}>
      <LightBeam />
      <Hero />
      <Separator />
      <About />
      <Separator />
      <Journey />
      <Separator />
      <Format />
      <Separator />
      <Contact />
      <Separator />
      <Blog />
      <Footer />
    </div>
  );
}
