import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-yellow-500/20 animate-border-flow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-white tracking-wider animate-neon-glow">
              YANTRA<span className="text-yellow-500">'26</span>
            </h1>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button
                onClick={() => scrollToSection('hero')}
                className="text-gray-300 hover:text-yellow-500 px-3 py-2 text-sm font-medium uppercase tracking-wider transition-all hover:animate-neon-glow"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('paddock')}
                className="text-gray-300 hover:text-yellow-500 px-3 py-2 text-sm font-medium uppercase tracking-wider transition-all hover:animate-neon-glow"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('circuits')}
                className="text-gray-300 hover:text-yellow-500 px-3 py-2 text-sm font-medium uppercase tracking-wider transition-all hover:animate-neon-glow"
              >
                The Events
              </button>
              <button
                onClick={() => scrollToSection('race-control')}
                className="text-gray-300 hover:text-yellow-500 px-3 py-2 text-sm font-medium uppercase tracking-wider transition-all hover:animate-neon-glow"
              >
                Contact
              </button>
            </div>
          </div>

          <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-300 hover:text-yellow-500"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-lg border-t border-yellow-500/20">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-gray-300 hover:text-yellow-500 block px-3 py-2 text-base font-medium w-full text-left uppercase tracking-wider transition-all hover:animate-neon-glow"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('paddock')}
              className="text-gray-300 hover:text-yellow-500 block px-3 py-2 text-base font-medium w-full text-left uppercase tracking-wider transition-all hover:animate-neon-glow"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('circuits')}
              className="text-gray-300 hover:text-yellow-500 block px-3 py-2 text-base font-medium w-full text-left uppercase tracking-wider transition-all hover:animate-neon-glow"
            >
              The Events
            </button>
            <button
              onClick={() => scrollToSection('race-control')}
              className="text-gray-300 hover:text-yellow-500 block px-3 py-2 text-base font-medium w-full text-left uppercase tracking-wider transition-all hover:animate-neon-glow"
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
