import { useState, useEffect, useRef } from 'react';

// Sparkle particle component
const Sparkle = ({ delay }: { delay: number }) => (
  <div
    className="absolute w-1 h-1 bg-yellow-300 rounded-full animate-floating-sparkles"
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${delay}s`,
      boxShadow: '0 0 10px rgba(212, 175, 55, 0.8)',
    }}
  />
);

export default function Hero() {
  const targetDate = new Date('2026-03-18T00:00:00').getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    const handleScroll = () => {
      if (heroRef.current) {
        const scrolled = window.scrollY;
        setParallaxOffset(scrolled * 0.5);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 perspective"
      style={{
        backgroundImage: 'url(https://images.pexels.com/photos/358278/pexels-photo-358278.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        transform: `translateY(${parallaxOffset}px)`,
      }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      
      {/* Sparkles */}
      {[...Array(12)].map((_, i) => (
        <Sparkle key={i} delay={i * 0.15} />
      ))}

      <div
        className="relative z-10 text-center px-4 preserve-3d"
        style={{
          transform: `rotateX(${mousePosition.y * 0.02}deg) rotateY(${mousePosition.x * 0.02}deg)`,
          transition: 'transform 0.3s ease-out',
        }}
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 tracking-wider animate-fade-in-up">
          YANTRA<span className="text-yellow-500 animate-neon-glow inline-block drop-shadow-lg">'26</span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-200 mb-4 font-semibold tracking-wide animate-fade-in-up animate-neon-glow" style={{ animationDelay: '0.2s' }}>
          EVERY SECOND COUNTS
        </p>

        <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          A National Level Technical Symposium by{' '}
          <span className="text-yellow-500 font-semibold">Meenakshi sundararajan enginnering college</span>
        </p>

        <p className="text-lg sm:text-2xl md:text-3xl text-white font-bold mb-8 tracking-wide animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          EVENT DATE: MARCH 18, 2026
        </p>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 md:gap-6 perspective">
          {[
            { label: 'DAYS', value: timeLeft.days },
            { label: 'HOURS', value: timeLeft.hours },
            { label: 'MINUTES', value: timeLeft.minutes },
            { label: 'SECONDS', value: timeLeft.seconds },
          ].map((item, index) => (
            <div
              key={item.label}
              className="bg-black/40 backdrop-blur-md border-2 border-yellow-500 rounded-lg p-3 sm:p-4 md:p-6 min-w-[70px] sm:min-w-[90px] md:min-w-[120px] transform hover:scale-110 transition-transform animate-border-flow"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 animate-neon-glow">
                {String(item.value).padStart(2, '0')}
              </div>
              <div className="text-xs sm:text-sm md:text-base text-yellow-500 font-semibold tracking-widest">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
