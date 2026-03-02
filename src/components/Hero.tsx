import { useState, useEffect, useRef } from "react";

// Sparkle particle
const Sparkle = ({ delay }: { delay: number }) => (
  <div
    className="absolute w-1 h-1 bg-yellow-300 rounded-full animate-floating-sparkles"
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${delay}s`,
      boxShadow: `
        0 0 4px rgba(255,215,0,0.9),
        0 0 12px rgba(255,215,0,0.6),
        0 0 18px rgba(255,215,0,0.3)
      `,
    }}
  />
);

export default function Hero() {
  const targetDate = new Date("2026-03-18T00:00:00").getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [parallaxOffset, setParallaxOffset] = useState(0);

  const heroRef = useRef<HTMLDivElement>(null);

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) /
              (1000 * 60 * 60)
          ),
          minutes: Math.floor(
            (difference % (1000 * 60 * 60)) /
              (1000 * 60)
          ),
          seconds: Math.floor(
            (difference % (1000 * 60)) / 1000
          ),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Mouse parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x =
        (e.clientX / window.innerWidth - 0.5) * 20;
      const y =
        (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    const handleScroll = () => {
      if (heroRef.current) {
        setParallaxOffset(window.scrollY * 0.3);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* Golden Outer Box Glow Animation */}
      <style>
        {`
          @keyframes boxGoldenGlow {
            0% {
              box-shadow:
                0 0 8px rgba(255,215,0,0.4),
                0 0 18px rgba(255,215,0,0.3),
                inset 0 0 6px rgba(255,215,0,0.1);
            }
            50% {
              box-shadow:
                0 0 18px rgba(255,215,0,0.8),
                0 0 35px rgba(255,215,0,0.6),
                inset 0 0 12px rgba(255,215,0,0.25);
            }
            100% {
              box-shadow:
                0 0 12px rgba(255,215,0,0.6),
                0 0 25px rgba(255,215,0,0.4),
                inset 0 0 8px rgba(255,215,0,0.15);
            }
          }

          .animate-boxGlow {
            animation: boxGoldenGlow 2.5s ease-in-out infinite alternate;
          }
        `}
      </style>

      <section
        ref={heroRef}
        className="min-h-screen flex items-center justify-center relative pt-16"
        style={{
          backgroundImage:
            "url(https://res.cloudinary.com/dkyvctkhf/image/upload/v1771483014/wxtoryrid7adydn0vkv8.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          transform: `translateY(${parallaxOffset}px)`,
        }}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

        {[...Array(15)].map((_, i) => (
          <Sparkle key={i} delay={i * 0.2} />
        ))}

        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 tracking-wider">
            YANTRA
            <span className="text-yellow-500 ml-2">'26</span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-4 font-semibold">
            EVERY SECOND COUNTS
          </p>

          <p className="text-base sm:text-lg text-gray-300 mb-6">
            A National Level Technical Symposium by{" "}
            <span className="text-yellow-500 font-semibold">
              Meenakshi Sundararajan Engineering College
            </span>
          </p>

          <p className="text-xl sm:text-2xl text-white font-bold mb-6">
            EVENT DATE: 2026
          </p>

          {/* Countdown */}
          <div className="flex justify-center items-center gap-2 sm:gap-4 mt-4">
            {[
              { label: "D", value: timeLeft.days },
              { label: "H", value: timeLeft.hours },
              { label: "M", value: timeLeft.minutes },
              { label: "S", value: timeLeft.seconds },
            ].map((item, index) => (
              <div
                key={item.label}
                className="
                  bg-black/50 backdrop-blur-md
                  border border-yellow-500/60
                  rounded-md
                  px-3 py-3 sm:px-5 sm:py-4
                  w-[70px] sm:w-[100px]
                  text-center
                  transition-all duration-300
                  hover:scale-105
                  animate-fadeUp
                  animate-boxGlow
                "
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <div className="text-lg sm:text-3xl font-bold text-white animate-numberPop">
                  {String(item.value).padStart(2, "0")}
                </div>

                <div className="text-[10px] sm:text-xs text-yellow-500 font-semibold mt-1 tracking-wider">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}