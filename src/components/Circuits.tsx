import { ArrowRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";

////////////////////////////////////////////////////////////
// Sparkle
////////////////////////////////////////////////////////////

const Sparkle = ({ delay }: { delay: number }) => (
  <div
    className="absolute w-[2px] h-[2px] bg-yellow-400 rounded-full animate-sparkle"
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${delay}s`,
    }}
  />
);

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
    description: "Design your way to victory with precision.",
  },
  {
    title: "POLE POSITION QUIZ",
    description: "Rapid-fire technical battle.",
  },
  {
    title: "ADVERTISEMENT MAKING SHOWCASE",
    description: "Sell your engineering vision.",
  },
  {
    title: "PADDOCK PASS AUCTION",
    description: "Build your dream team strategically.",
  },
  {
    title: "GRAND PRIZE POOL",
    description: "Win the ultimate reward.",
    isPrize: true,
    prizeAmount: "₹",
    prizeNote: "More prizes coming soon",
  },
];

////////////////////////////////////////////////////////////
// Card Component with true ignition observer
////////////////////////////////////////////////////////////

function EventCard({ event, index }: { event: Event; index: number }) {

  const ref = useRef<HTMLDivElement>(null);

  const [ignite, setIgnite] = useState(false);

  ////////////////////////////////////////////////////////////
  // Replay ignition on scroll enter EVERY TIME
  ////////////////////////////////////////////////////////////

  useEffect(() => {

    const observer = new IntersectionObserver(

      ([entry]) => {

        if (entry.isIntersecting) {

          setIgnite(false);

          setTimeout(() => {

            setIgnite(true);

          }, 50);

        }

      },

      {
        threshold: 0.6,
      }

    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();

  }, []);

  ////////////////////////////////////////////////////////////
  // Mouse tilt only desktop
  ////////////////////////////////////////////////////////////

  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent) => {

    if (window.innerWidth < 768) return;

    const rect = ref.current?.getBoundingClientRect();

    if (!rect) return;

    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    setTilt({
      x: x * 10,
      y: y * 10,
    });

  };

  const resetTilt = () => setTilt({ x: 0, y: 0 });

  ////////////////////////////////////////////////////////////

  return (

    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={resetTilt}
      className={`
        ignition-card
        ${ignite ? "ignite glow" : ""}
      `}
      style={{
        animationDelay: `${index * 0.15}s`,
        transform: `
          perspective(1000px)
          rotateX(${-tilt.y}deg)
          rotateY(${tilt.x}deg)
        `,
      }}
    >

      {/* ignition line */}
      <div className="ignition-line"></div>

      {/* ignition flash */}
      <div className="ignition-flash"></div>

      {/* content */}
      <div className="ignition-content">

        <h3 className="title">
          {event.title}
        </h3>

        <p className="desc">
          {event.description}
        </p>

        {event.isPrize ? (
          <>
            <div className="prize">
              {event.prizeAmount}
            </div>
            <p className="note">
              {event.prizeNote}
            </p>
          </>
        ) : (
          <button className="learn">
            Learn More
            <ArrowRight size={18}/>
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

  return (

    <section className="section">

      <div className="overlay"></div>

      {[...Array(10)].map((_, i) =>
        <Sparkle key={i} delay={i * 0.2}/>
      )}

      <div className="container">

        <h2 className="heading">
          THE EVENTS
        </h2>

        <div className="grid">

          {events.map((event, index) => (
            <EventCard
              key={index}
              event={event}
              index={index}
            />
          ))}

        </div>

      </div>

      <Styles/>

    </section>

  );

}

////////////////////////////////////////////////////////////
// Styles
////////////////////////////////////////////////////////////

function Styles() {

return (

<style>{`

.section {

  min-height: 100vh;
  padding: 60px 16px;
  position: relative;

  background-image:
  url(https://res.cloudinary.com/dkyvctkhf/image/upload/v1771483014/wxtoryrid7adydn0vkv8.jpg);

  background-size: cover;
}

.overlay {

  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.85);
}

.container {

  position: relative;
  max-width: 1200px;
  margin: auto;
}

.heading {

  text-align: center;
  font-size: 32px;
  color: white;
  margin-bottom: 40px;
}

.grid {

  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

@media(min-width:640px){

  .grid{

    grid-template-columns:1fr 1fr;

  }

}

@media(min-width:1024px){

  .grid{

    grid-template-columns:1fr 1fr 1fr;

  }

}

////////////////////////////////////////////////////////////
// CARD BASE
////////////////////////////////////////////////////////////

.ignition-card {

  background: rgba(0,0,0,0.5);
  border-radius: 12px;
  padding: 18px;
  border: 1px solid rgba(255,215,0,0.2);

  opacity: 0.4;
  transform: scale(0.96);

  position: relative;
  overflow: hidden;

  transition: 0.4s;
}

////////////////////////////////////////////////////////////
// IGNITION ANIMATION
////////////////////////////////////////////////////////////

.ignite {

  animation: ignite 0.7s forwards;
}

@keyframes ignite {

  to{

    opacity:1;
    transform:scale(1);

  }

}

////////////////////////////////////////////////////////////
// GOLD BORDER TRAVEL
////////////////////////////////////////////////////////////

.ignition-line {

  position:absolute;
  inset:0;
  border-radius:12px;
  border:2px solid transparent;
}

.ignite .ignition-line{

  animation:borderRun 1s linear;
}

@keyframes borderRun{

0%{border-top-color:gold;}
25%{border-right-color:gold;}
50%{border-bottom-color:gold;}
75%{border-left-color:gold;}
100%{border-color:rgba(255,215,0,0.3);}

}

////////////////////////////////////////////////////////////
// FLASH
////////////////////////////////////////////////////////////

.ignition-flash{

position:absolute;
top:0;
left:0;
width:8px;
height:8px;
background:gold;
border-radius:50%;
opacity:0;

}

.ignite .ignition-flash{

animation:flash .5s;
}

@keyframes flash{

0%{opacity:0;transform:scale(0);}
50%{opacity:1;transform:scale(2);}
100%{opacity:0;}

}

////////////////////////////////////////////////////////////
// CONTENT
////////////////////////////////////////////////////////////

.ignition-content{

opacity:0;
transform:translateY(10px);

}

.ignite .ignition-content{

animation:content .6s forwards;
animation-delay:.4s;

}

@keyframes content{

to{

opacity:1;
transform:none;

}

}

////////////////////////////////////////////////////////////
// GLOW AFTER IGNITION
////////////////////////////////////////////////////////////

.glow{

box-shadow:

0 0 10px rgba(255,215,0,0.5),
0 0 25px rgba(255,215,0,0.3),
0 0 60px rgba(255,215,0,0.2);

}

////////////////////////////////////////////////////////////
// TEXT
////////////////////////////////////////////////////////////

.title{

color:gold;
font-size:16px;
font-weight:bold;
margin-bottom:6px;

}

.desc{

color:#ccc;
font-size:14px;
margin-bottom:10px;

}

.learn{

color:#aaa;
display:flex;
gap:6px;
align-items:center;

}

.prize{

color:gold;
font-size:28px;
font-weight:bold;

}

.note{

color:#999;
font-size:12px;

}

////////////////////////////////////////////////////////////
// SPARKLE
////////////////////////////////////////////////////////////

@keyframes sparkle{

0%{opacity:0;transform:translateY(0);}
50%{opacity:1;}
100%{opacity:0;transform:translateY(-20px);}

}

.animate-sparkle{

animation:sparkle 3s infinite;

}

`}</style>

);

}