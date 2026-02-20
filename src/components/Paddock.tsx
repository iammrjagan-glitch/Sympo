import { Calendar, MapPin, Users } from 'lucide-react';
import { useState, useRef } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

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

interface StatCard {
  icon: typeof Calendar;
  title: string;
  value: string;
}

const stats: StatCard[] = [
  {
    icon: Calendar,
    title: 'Event Date',
    value: 'March 18, 2026',
  },
  {
    icon: MapPin,
    title: 'Venue',
    value: 'Meenakshi sundararajan enginnering college',
  },
  {
    icon: Users,
    title: 'Participants',
    value: 'Students from across India',
  },
];

function StatBox({ stat, index, isVisible }: { stat: StatCard; index: number; isVisible: boolean }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const boxRef = useRef<HTMLDivElement>(null);
  const Icon = stat.icon;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!boxRef.current) return;
    const rect = boxRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x: x * 30, y: y * 30 });
  };

  return (
    <div
      ref={boxRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={(e) => {
        setMousePos({ x: 0, y: 0 });
          (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212, 175, 55, 0.3)';
        (e.currentTarget as HTMLElement).style.boxShadow = '';
      }}
      className={`bg-black/40 backdrop-blur-md border border-yellow-500/30 rounded-lg p-8 text-center transition-all duration-700 cursor-pointer group perspective ${
        isVisible ? 'animate-fade-in-up' : 'opacity-0'
      }`}
      style={{
        animationDelay: `${index * 0.2}s`,
        transform: `perspective(1000px) rotateX(${-mousePos.y * 0.03}deg) rotateY(${mousePos.x * 0.03}deg)`,
        transition: 'transform 0.2s ease-out, box-shadow 0.3s ease-out',
      }}
      onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = 'rgb(212, 175, 55)';
          (e.currentTarget as HTMLElement).style.boxShadow = '0 25px 50px rgba(212, 175, 55, 0.4), inset 0 0 30px rgba(212, 175, 55, 0.15)';
      }}
    >
      <div className="flex justify-center mb-4 overflow-hidden">
          <Icon size={48} className="text-yellow-500 group-hover:text-yellow-300 transition-all duration-300 group-hover:scale-125 group-hover:-rotate-12 group-hover:animate-sparkle" />
      </div>
      <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-wide group-hover:text-yellow-400 transition-colors group-hover:animate-neon-glow">
        {stat.title}
      </h3>
      <p className="text-gray-300 text-lg group-hover:text-gray-200 transition-colors">
        {stat.value}
      </p>
    </div>
  );
}

export default function Paddock() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section
      ref={ref}
      id="paddock"
      className="py-12 sm:py-16 px-3 sm:px-4 relative"
      style={{
        backgroundImage: 'url(https://res.cloudinary.com/dkyvctkhf/image/upload/v1771483014/wxtoryrid7adydn0vkv8.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

      {/* Sparkles */}
      {[...Array(10)].map((_, i) => (
        <Sparkle key={i} delay={i * 0.15} />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto">
        <h2 className={`text-4xl md:text-6xl font-bold text-white text-center mb-16 tracking-wider transition-all duration-700 animate-neon-glow ${
          isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'
        }`}>
          ABOUT
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <StatBox key={index} stat={stat} index={index} isVisible={isVisible} />
          ))}
        </div>

        <div className={`mt-16 max-w-4xl mx-auto bg-black/40 backdrop-blur-md border border-yellow-500/30 rounded-lg p-8 transition-all duration-700 animate-border-flow ${
          isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'
        }`} style={{ animationDelay: '0.6s' }}>
          <h3 className="text-3xl font-bold text-yellow-500 mb-6 text-center uppercase tracking-wide animate-neon-glow\">
            About the Symposium
          </h3>
          <p className="text-gray-300 leading-relaxed text-lg mb-4 group-hover:text-gray-200 transition-colors">
            YANTRA 26 is a premier national-level technical symposium that brings together the brightest minds in engineering and technology. Inspired by the precision and innovation of Formula 1 racing, our symposium challenges participants to push the boundaries of creativity, technical excellence, and strategic thinking.
          </p>
          <p className="text-gray-300 leading-relaxed text-lg group-hover:text-gray-200 transition-colors">
            Join us for a day of intense competition, knowledge sharing, and networking with fellow engineers and industry professionals. With exciting challenges, substantial prizes, and opportunities to showcase your talents, YANTRA 26 promises to be an unforgettable experience.
          </p>
        </div>
      </div>
    </section>
  );
}
