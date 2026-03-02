import { ArrowRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";

////////////////////////////////////////////////////////////
// Sparkle particle
////////////////////////////////////////////////////////////

const Sparkle = ({ delay }: { delay: number }) => (
  <div
    className="absolute w-[2px] h-[2px] bg-yellow-400 rounded-full animate-sparkle"
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${delay}s`,
      boxShadow: `
        0 0 6px rgba(255,215,0,0.9),
        0 0 12px rgba(255,215,0,0.6)
      `,
    }}
  />
);

////////////////////////////////////////////////////////////
// Scroll visibility hook (re-triggers every scroll)
////////////////////////////////////////////////////////////

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      {
        threshold: 0.2,
      }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

////////////////////////////////////////////////////////////
// Event Data
////////////////////////////////////////////////////////////

interface Event {
  title: string;
  description: string;
  isPrize?: boolean;
  prizeAmount?: string;
  prizeNote?: string;
}

const events: Event[] = [
  {
    title: "THE GRAND PRIX OF IDEAs",
    description: "The ultimate test of knowledge and research.",
  },
  {
    title: "CHASSIS DESIGN CHALLENGE",
    description: "Design your way to victory with precision and creativity.",
  },
  {
    title: "POLE POSITION QUIZ",
    description: "Challenge your wits in this rapid-fire quiz.",
  },
  {
    title: "ADVERTISEMENT MAKING SHOWCASE",
    description: "Unleash your creativity and sell your ideas.",
  },
  {
    title: "PADDOCK PASS AUCTION",
    description: "Strategize and build your dream team!",
  },
  {
    title: "GRAND PRIZE POOL",
    description: "Compete for your share of prize money!",
    isPrize: true,
    prizeAmount: "₹",
    prizeNote: "More prizes to be announced!",
  },
];

////////////////////////////////////////////////////////////
// Event Card
////////////////////////////////////////////////////////////

function EventCard({
  event,
  index,
  visible,
}: {
  event: Event;
  index: number;
  visible: boolean;
}) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (window.innerWidth < 768) return;

    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    setMousePos({
      x: x * 15,
      y: y * 15,
    });
  };

  const handleLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleLeave}
      className={`ignition-card ${visible ? "ignite" : ""}`}
      style={{
        animationDelay: `${index * 0.2}s`,
        transform: `
          perspective(1000px)
          rotateX(${-mousePos.y * 0.05}deg)
          rotateY(${mousePos.x * 0.05}deg)
        `,
      }}
    >
      <div className="ignition-border"></div>
      <div className="ignition-corner"></div>

      <div className="ignition-content">

        <h3 className="text-yellow-400 font-bold text-base md:text-xl mb-2 uppercase">
          {event.title}
        </h3>

        <p className="text-gray-300 text-sm md:text-base mb-3">
          {event.description}
        </p>

        {event.isPrize ? (
          <>
            <div className="text-yellow-400 text-3xl font-bold">
              {event.prizeAmount}
            </div>
            <p className="text-gray-400 text-sm">
              {event.prizeNote}
            </p>
          </>
        ) : (
          <button className="flex items-center gap-2 text-gray-300 hover:text-yellow-400">
            Learn More
            <ArrowRight size={18} />
          </button>
        )}

      </div>
    </div>
  );
}

////////////////////////////////////////////////////////////
// Main Section
////////////////////////////////////////////////////////////

export default function Circuits() {

  const { ref, visible } = useScrollReveal();

  return (
    <section
      ref={ref}
      className="relative min-h-screen py-16 px-4"
      style={{
        backgroundImage:
          "url(https://res.cloudinary.com/dkyvctkhf/image/upload/v1771483014/wxtoryrid7adydn0vkv8.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >

      <div className="absolute inset-0 bg-black/80"></div>

      {[...Array(12)].map((_, i) => (
        <Sparkle key={i} delay={i * 0.2} />
      ))}

      <div className="relative z-10 max-w-6xl mx-auto">

        <h2 className="text-white text-3xl md:text-5xl font-bold text-center mb-12">
          THE EVENTS
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {events.map((event, index) => (
            <EventCard
              key={index}
              event={event}
              index={index}
              visible={visible}
            />
          ))}

        </div>

      </div>

      <IgnitionCSS />

    </section>
  );
}

////////////////////////////////////////////////////////////
// CSS
////////////////////////////////////////////////////////////

function IgnitionCSS() {
  return (
<style>{`

.ignition-card {

  position: relative;
  padding: 18px;
  border-radius: 14px;
  border: 1px solid rgba(255,215,0,0.3);
  background: rgba(0,0,0,0.5);
  backdrop-filter: blur(8px);
  opacity: 0;
  transform: scale(0.95);
}

.ignition-card.ignite {

  animation:
    igniteCard 0.8s forwards,
    glowLoop 2.5s infinite 0.8s;
}

@keyframes igniteCard {

  to {
    opacity: 1;
    transform: scale(1);
  }

}

@keyframes glowLoop {

  0% {

    box-shadow:
      0 0 10px rgba(255,215,0,0.3);

  }

  50% {

    box-shadow:
      0 0 25px rgba(255,215,0,0.8),
      0 0 50px rgba(255,215,0,0.4);

  }

  100% {

    box-shadow:
      0 0 10px rgba(255,215,0,0.3);

  }

}

.ignition-border {

  position:absolute;
  inset:0;
  border-radius:inherit;
}

.ignite .ignition-border {

  animation:borderRun 1.2s linear forwards;
}

@keyframes borderRun {

  0% { border-top:2px solid gold; }
  25% { border-right:2px solid gold; }
  50% { border-bottom:2px solid gold; }
  75% { border-left:2px solid gold; }

}

.ignition-content {

  opacity:0;
  transform:translateY(10px);

}

.ignite .ignition-content {

  animation:contentFade 0.6s forwards 0.6s;

}

@keyframes contentFade {

  to {

    opacity:1;
    transform:translateY(0);

  }

}

.animate-sparkle {

  animation:sparkle 3s infinite;

}

@keyframes sparkle {

  0% {opacity:0}
  50% {opacity:1}
  100% {
    opacity:0;
    transform:translateY(-20px)
  }

}

`}</style>
  );
}