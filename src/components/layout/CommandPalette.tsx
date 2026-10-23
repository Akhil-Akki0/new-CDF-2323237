import React, { useState, useEffect, useRef } from 'react';
import { Search, Compass, CheckCircle2, Calculator, Play, BookOpen, Layers, X, ArrowRight } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { NavigationRoute } from '../../types';

interface SearchItem {
  id: string;
  title: string;
  category: 'Navigation' | 'Benchmarks' | 'Tools & Calculators' | 'Solver Presets';
  description: string;
  route: NavigationRoute;
  subId?: string;
  isIndustry?: boolean;
}

const SEARCH_ITEMS: SearchItem[] = [
  { id: 'sim', title: 'Launch Interactive CFD Simulator', category: 'Solver Presets', description: 'Run 2D Lattice Boltzmann with real-time probes', route: 'simulator' },
  { id: 'preset-cylinder', title: 'Preset: Flow Around Cylinder (Kármán Vortex)', category: 'Solver Presets', description: 'Periodic alternate vortex shedding at Re=150', route: 'simulator', subId: 'cylinder' },
  { id: 'preset-cavity', title: 'Preset: 2D Lid-Driven Cavity', category: 'Solver Presets', description: 'Ghia et al. canonical benchmark setup at Re=1000', route: 'simulator', subId: 'cavity' },
  { id: 'preset-airfoil', title: 'Preset: NACA 0012 Airfoil Flow', category: 'Solver Presets', description: 'Lift polar and boundary layer circulation', route: 'simulator', subId: 'airfoil' },
  
  { id: 'bench-ghia', title: 'Lid-Driven Cavity vs Ghia et al. 1982', category: 'Benchmarks', description: 'Canonical centerline velocity comparison (0.41% error)', route: 'validation', subId: 'lid-driven-cavity' },
  { id: 'bench-strouhal', title: 'Strouhal Number vs Williamson 1989', category: 'Benchmarks', description: 'Vortex shedding frequency validation curve', route: 'validation', subId: 'cylinder-strouhal' },
  { id: 'bench-poiseuille', title: 'Planar Poiseuille Flow Exact Navier-Stokes', category: 'Benchmarks', description: 'Analytical parabolic profile RMSE 0.04%', route: 'validation', subId: 'poiseuille-channel' },
  { id: 'bench-armaly', title: 'Backward-Facing Step Flow Separation', category: 'Benchmarks', description: 'Reattachment length correlation vs LDV experiments', route: 'validation', subId: 'backward-facing-step' },

  { id: 'calc-re', title: 'Reynolds Number Calculator', category: 'Tools & Calculators', description: 'Calculate Re and determine laminar/turbulent regime', route: 'calculators', subId: 'reynolds' },
  { id: 'calc-yplus', title: 'y+ & First-Cell Height Estimator', category: 'Tools & Calculators', description: 'Wall-normal grid spacing for boundary layer resolution', route: 'calculators', subId: 'yplus' },
  { id: 'calc-mach', title: 'Mach Number & Compressibility Check', category: 'Tools & Calculators', description: 'Evaluate Ma and check incompressible assumptions', route: 'calculators', subId: 'mach' },
  { id: 'calc-drag', title: 'Drag & Lift Coefficient Estimator', category: 'Tools & Calculators', description: 'Calculate Cd and Cl from measured surface forces', route: 'calculators', subId: 'drag' },

  { id: 'nav-industries', title: 'Aerospace & Industrial Sectors', category: 'Navigation', description: '8 engineering applications with flow regimes', route: 'industries' },
  { id: 'nav-learn', title: 'CFD Learning Hub & Glossary', category: 'Navigation', description: 'Fluid mechanics fundamentals, formulas & quizzes', route: 'learn' },
  { id: 'nav-compare', title: 'Platform Comparison Matrix', category: 'Navigation', description: 'AetherCFD vs Ansys, SimScale, Luminary Cloud', route: 'compare' },
  { id: 'nav-docs', title: 'Documentation & API Reference', category: 'Navigation', description: 'Solver formulations, Python & JavaScript exports', route: 'docs' },
  { id: 'nav-about', title: 'About & Scientific Advisory Board', category: 'Navigation', description: 'Mission, ethics and transparency statement', route: 'about' },
];

export const CommandPalette: React.FC = () => {
  const { commandPaletteOpen, setCommandPaletteOpen, setRoute, setSelectedBenchmarkId, setSelectedIndustryId } = useAppStore();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(!commandPaletteOpen);
      } else if (e.key === 'Escape' && commandPaletteOpen) {
        setCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [commandPaletteOpen, setCommandPaletteOpen]);

  // Focus input on open
  useEffect(() => {
    if (commandPaletteOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [commandPaletteOpen]);

  const filteredItems = SEARCH_ITEMS.filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.description.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (item: SearchItem) => {
    if (item.subId && item.category === 'Benchmarks') {
      setSelectedBenchmarkId(item.subId);
    } else if (item.isIndustry && item.subId) {
      setSelectedIndustryId(item.subId);
    }
    setRoute(item.route);
    setCommandPaletteOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
    } else if (e.key === 'Enter' && filteredItems[selectedIndex]) {
      e.preventDefault();
      handleSelect(filteredItems[selectedIndex]);
    }
  };

  if (!commandPaletteOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-start justify-center pt-24 px-4 animate-in fade-in duration-150"
      onClick={() => setCommandPaletteOpen(false)}
    >
      <div 
        className="w-full max-w-2xl bg-[#0c1017] border border-white/10 rounded-xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10">
          <Search className="w-5 h-5 text-cyan-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a benchmark, tool, or equation (e.g. 'Ghia', 'y+', 'Cylinder')..."
            className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
            aria-label="Command search"
          />
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-white/5 border border-white/10 rounded">
            ESC
          </kbd>
          <button 
            onClick={() => setCommandPaletteOpen(false)}
            className="text-slate-400 hover:text-slate-200"
            aria-label="Close command palette"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-white/5">
          {filteredItems.length === 0 ? (
            <div className="py-8 text-center text-sm text-slate-400">
              No results found for "{query}". Try searching "Ghia", "y+", or "Airfoil".
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-lg flex items-center justify-between transition-colors ${
                    isSelected ? 'bg-cyan-500/15 text-white' : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {item.category === 'Benchmarks' && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
                      {item.category === 'Solver Presets' && <Play className="w-4 h-4 text-cyan-400" />}
                      {item.category === 'Tools & Calculators' && <Calculator className="w-4 h-4 text-emerald-400" />}
                      {item.category === 'Navigation' && <Compass className="w-4 h-4 text-slate-400" />}
                    </div>
                    <div>
                      <div className="text-sm font-medium flex items-center gap-2">
                        <span>{item.title}</span>
                        <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-white/5 text-slate-400">
                          {item.category}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        {item.description}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className={`w-4 h-4 text-slate-500 transition-opacity ${isSelected ? 'opacity-100 text-cyan-400' : 'opacity-0'}`} />
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2 border-t border-white/5 bg-black/20 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-3">
            <span>Use <kbd className="font-mono bg-white/5 px-1 py-0.5 rounded text-slate-400">↑</kbd> <kbd className="font-mono bg-white/5 px-1 py-0.5 rounded text-slate-400">↓</kbd> to navigate</span>
            <span><kbd className="font-mono bg-white/5 px-1 py-0.5 rounded text-slate-400">↵</kbd> to select</span>
          </div>
          <span>AetherCFD Command Console</span>
        </div>
      </div>
    </div>
  );
};
