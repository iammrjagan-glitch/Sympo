import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Paddock from './components/Paddock';
import Circuits from './components/Circuits';
import RaceControl from './components/RaceControl';

function App() {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <Hero />
      <Paddock />
      <Circuits />
      <RaceControl />

      <footer className="bg-black border-t border-yellow-500/20 py-8 px-4 animate-border-flow">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400 mb-2 hover:text-yellow-500 transition-colors">
              &copy; 2026 YANTRA 26 - Meenakshi sundararajan enginnering college
          </p>
          <p className="text-gray-500 text-sm hover:text-yellow-400 transition-colors cursor-default">
            Every Second Counts
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
