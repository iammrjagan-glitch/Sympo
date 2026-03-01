import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });

      setIsOpen(false);
    }
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-yellow-500/30"
      style={{
        boxShadow: `
          0 0 10px rgba(255,215,0,0.4),
          0 0 25px rgba(255,215,0,0.25),
          0 0 50px rgba(255,215,0,0.15),
          inset 0 -1px 0 rgba(255,215,0,0.4)
        `,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <h1
            className="text-2xl font-bold text-white tracking-wider cursor-pointer"
            style={{
              textShadow: `
                0 0 8px rgba(255,215,0,0.8),
                0 0 20px rgba(255,215,0,0.4)
              `,
            }}
            onClick={() => scrollToSection("hero")}
          >
            YANTRA
            <span className="text-yellow-500 ml-1">'26</span>
          </h1>


          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">

            {[
              { name: "Home", id: "hero" },
              { name: "About", id: "paddock" },
              { name: "The Events", id: "circuits" },
              { name: "Contact", id: "race-control" },
            ].map((item, index) => (

              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-gray-300 hover:text-yellow-500 text-sm font-medium uppercase tracking-wider transition-all duration-300 relative"
                style={{
                  textShadow: "0 0 0 rgba(255,215,0,0)",

                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.textShadow = `
                    0 0 8px rgba(255,215,0,0.9),
                    0 0 18px rgba(255,215,0,0.5)
                  `;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.textShadow =
                    "0 0 0 rgba(255,215,0,0)";
                }}
              >
                {item.name}

              </button>

            ))}

          </div>


          {/* Mobile Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-300 hover:text-yellow-500 transition-all"
            style={{
              filter:
                isOpen
                  ? "drop-shadow(0 0 8px rgba(255,215,0,0.8))"
                  : "none",
            }}
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>

        </div>

      </div>


      {/* Mobile Menu */}
      {isOpen && (
        <div
          className="md:hidden bg-black/95 backdrop-blur-xl border-t border-yellow-500/30"
          style={{
            boxShadow: `
              0 0 20px rgba(255,215,0,0.3),
              inset 0 1px 0 rgba(255,215,0,0.4)
            `,
          }}
        >

          <div className="px-4 py-4 space-y-3">

            {[
              { name: "Home", id: "hero" },
              { name: "About", id: "paddock" },
              { name: "The Events", id: "circuits" },
              { name: "Contact", id: "race-control" },
            ].map((item) => (

              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left text-gray-300 hover:text-yellow-500 text-base font-medium uppercase tracking-wider transition-all duration-300"
                onMouseEnter={(e) => {
                  e.currentTarget.style.textShadow = `
                    0 0 10px rgba(255,215,0,0.9),
                    0 0 20px rgba(255,215,0,0.5)
                  `;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.textShadow = "none";
                }}
              >
                {item.name}

              </button>

            ))}

          </div>

        </div>
      )}

    </nav>
  );
}