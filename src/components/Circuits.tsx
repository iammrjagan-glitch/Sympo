import { ArrowRight } from 'lucide-react';
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

interface Event {
  title: string;
  description: string;
  isPrize?: boolean;
  prizeAmount?: string;
  prizeNote?: string;
}

const events: Event[] = [
  {
    title: 'THE GRAND PRIX OF IDEAs',
    description: 'The ultimate test of knowledge and research.',
  },
  {
    title: 'CHASSIS DESIGN CHALLENGE',
    description: 'Design your way to victory with precision and creativity.',
  },
  {
    title: 'POLE POSITION QUIZ',
    description: 'Challenge your wits in this rapid-fire quiz.',
  },
  {
    title: 'ADVERTISEMENT MAKING SHOWCASE',
    description: 'Unleash your creativity and sell your ideas.',
  },
  {
    title: 'PADDOCK PASS AUCTION',
    description: 'Strategize and build your dream team!',
  },
  {
    title: 'GRAND PRIZE POOL',
    description: 'Compete for your share of the total prize money!',
    isPrize: true,
    prizeAmount: '₹',
    prizeNote: 'More exciting prizes to be announced!',
  },
];

function EventCard({ event, index, isVisible }: { event: Event; index: number; isVisible: boolean }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x: x * 25, y: y * 25 });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={(e) => {
        handleMouseLeave();
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212, 175, 55, 0.3)';
        (e.currentTarget as HTMLElement).style.boxShadow = '';
      }}
      className={`bg-black/40 backdrop-blur-md border border-yellow-500/30 rounded-lg p-6 transition-all duration-700 group cursor-pointer perspective ${
        isVisible ? 'animate-fade-in-up' : 'opacity-0'
      }`}
      style={{
        animationDelay: `${index * 0.15}s`,
        transform: `perspective(1000px) rotateX(${-mousePos.y * 0.02}deg) rotateY(${mousePos.x * 0.02}deg) scale(${1 + (Math.sqrt(mousePos.x ** 2 + mousePos.y ** 2) / 500) * 0.05})`,
        transition: 'transform 0.2s ease-out, box-shadow 0.3s ease-out',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'rgb(212, 175, 55)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 25px 50px rgba(212, 175, 55, 0.4), inset 0 0 30px rgba(212, 175, 55, 0.15)';
      }}
    >
      <h3 className="text-xl md:text-2xl font-bold text-yellow-500 mb-4 uppercase tracking-wide group-hover:text-yellow-300 transition-colors group-hover:animate-neon-glow">
        {event.title}
      </h3>
      <p className="text-gray-300 mb-6 leading-relaxed group-hover:text-gray-200 transition-colors">
        {event.description}
      </p>

      {event.isPrize ? (
        <div className="space-y-2">
          <div className="text-3xl md:text-4xl font-bold text-yellow-500 group-hover:text-yellow-300 transition-colors animate-neon-glow">
            {event.prizeAmount}
          </div>
          <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">{event.prizeNote}</p>
        </div>
      ) : (
        <button className="flex items-center gap-2 text-gray-300 hover:text-yellow-500 font-semibold transition-all group-hover:gap-4 duration-300 group-hover:translate-x-1">
          Learn More
          <ArrowRight size={20} className="group-hover:rotate-45 transition-transform duration-300" />
        </button>
      )}
    </div>
  );
}

export default function Circuits() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section
      ref={ref}
      id="circuits"
      className="min-h-screen py-20 px-4 relative"
      style={{
        backgroundImage: 'url(https://res.cloudinary.com/dkyvctkhf/image/upload/v1771483014/wxtoryrid7adydn0vkv8.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

      {/* Sparkles */}
      {[...Array(8)].map((_, i) => (
        <Sparkle key={i} delay={i * 0.2} />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto">
        <h2 className={`text-4xl md:text-6xl font-bold text-white text-center mb-16 tracking-wider transition-all duration-700 animate-neon-glow ${
          isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'
        }`}>
          THE EVENTS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <EventCard key={index} event={event} index={index} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}
