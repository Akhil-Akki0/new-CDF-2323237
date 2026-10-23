import React from 'react';
import { 
  Cpu, 
  Wind, 
  Layers, 
  Flame, 
  CheckCircle2, 
  Activity, 
  ArrowRight,
  Compass,
  FileSpreadsheet,
  BookOpen
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { NavigationRoute } from '../../types';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen, onClose }) => {
  const { setRoute, setSelectedBenchmarkId, setSelectedIndustryId } = useAppStore();

  if (!isOpen) return null;

  const handleNavigate = (route: NavigationRoute, subId?: string, isIndustry?: boolean) => {
    if (isIndustry && subId) {
      setSelectedIndustryId(subId);
    } else if (subId) {
      setSelectedBenchmarkId(subId);
    }
    setRoute(route);
    onClose();
  };

  return (
    <div 
      className="absolute top-full left-0 w-full glass-panel shadow-2xl border-t border-b border-white/10 dark:border-white/10 light:border-slate-200 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
      onMouseLeave={onClose}
    >
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Column 1: Platform & Solvers */}
          <div>
            <div className="flex items-center gap-2 mb-4 text-xs font-semibold uppercase tracking-wider text-cyan-400">
              <Cpu className="w-4 h-4" />
              <span>Platform & Physics</span>
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => handleNavigate('platform')}
                  className="w-full text-left p-2 rounded hover:bg-white/5 transition-colors group flex items-start justify-between"
                >
                  <div>
                    <div className="font-medium text-slate-200 dark:text-slate-200 light:text-slate-900 group-hover:text-cyan-400 transition-colors">
                      D2Q9 Lattice Boltzmann
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      Client-side Web Worker streaming solver
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigate('platform')}
                  className="w-full text-left p-2 rounded hover:bg-white/5 transition-colors group flex items-start justify-between"
                >
                  <div>
                    <div className="font-medium text-slate-200 dark:text-slate-200 light:text-slate-900 group-hover:text-cyan-400 transition-colors">
                      Incompressible Navier-Stokes
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      Pressure Poisson solver & vorticity formulations
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigate('platform')}
                  className="w-full text-left p-2 rounded hover:bg-white/5 transition-colors group flex items-start justify-between"
                >
                  <div>
                    <div className="font-medium text-slate-200 dark:text-slate-200 light:text-slate-900 group-hover:text-cyan-400 transition-colors">
                      Thermal Boussinesq Convection
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      Coupled energy equation & Rayleigh buoyancy
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigate('simulator')}
                  className="w-full text-left p-2 rounded bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors group flex items-start justify-between"
                >
                  <div>
                    <div className="font-medium text-cyan-300">
                      Launch Full Simulator
                    </div>
                    <div className="text-xs text-slate-300 mt-0.5">
                      Interactive 2D mesh, probes & live charts
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-400 mt-1" />
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Canonical Benchmarks */}
          <div>
            <div className="flex items-center gap-2 mb-4 text-xs font-semibold uppercase tracking-wider text-amber-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Canonical Benchmarks</span>
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => handleNavigate('validation', 'lid-driven-cavity')}
                  className="w-full text-left p-2 rounded hover:bg-white/5 transition-colors group"
                >
                  <div className="font-medium text-slate-200 dark:text-slate-200 light:text-slate-900 group-hover:text-amber-400 transition-colors">
                    Lid-Driven Cavity (Re=1000)
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    Ghia et al. 1982 reference overlay · 0.41% error
                  </div>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigate('validation', 'cylinder-strouhal')}
                  className="w-full text-left p-2 rounded hover:bg-white/5 transition-colors group"
                >
                  <div className="font-medium text-slate-200 dark:text-slate-200 light:text-slate-900 group-hover:text-amber-400 transition-colors">
                    Kármán Vortex Street
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    Williamson 1989 Strouhal number vs Re
                  </div>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigate('validation', 'poiseuille-channel')}
                  className="w-full text-left p-2 rounded hover:bg-white/5 transition-colors group"
                >
                  <div className="font-medium text-slate-200 dark:text-slate-200 light:text-slate-900 group-hover:text-amber-400 transition-colors">
                    Poiseuille Channel Flow
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    Exact analytical parabolic profile · 0.04% RMSE
                  </div>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigate('validation', 'naca-0012')}
                  className="w-full text-left p-2 rounded hover:bg-white/5 transition-colors group"
                >
                  <div className="font-medium text-slate-200 dark:text-slate-200 light:text-slate-900 group-hover:text-amber-400 transition-colors">
                    NACA 0012 Aerodynamic Polar
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    NASA TM 4074 experimental comparison
                  </div>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Industries */}
          <div>
            <div className="flex items-center gap-2 mb-4 text-xs font-semibold uppercase tracking-wider text-slate-300">
              <Compass className="w-4 h-4" />
              <span>Applied Sectors</span>
            </div>
            <ul className="space-y-1.5 text-sm">
              {[
                { id: 'aerospace', name: 'Aerospace & Hypersonics' },
                { id: 'automotive', name: 'Automotive & Motorsport' },
                { id: 'energy', name: 'Wind & Hydro Turbines' },
                { id: 'hvac', name: 'HVAC & Cleanroom Airflow' },
                { id: 'electronics', name: 'Micro-Channel Cooling' },
                { id: 'marine', name: 'Marine & Hydrofoils' },
                { id: 'biomedical', name: 'Biomedical Hemodynamics' },
                { id: 'sports', name: 'Sports Aerodynamics' },
              ].map((ind) => (
                <li key={ind.id}>
                  <button
                    onClick={() => handleNavigate('industries', ind.id, true)}
                    className="w-full text-left px-2 py-1.5 rounded hover:bg-white/5 text-slate-300 hover:text-cyan-400 text-xs transition-colors flex items-center justify-between"
                  >
                    <span>{ind.name}</span>
                    <ArrowRight className="w-3 h-3 text-slate-500" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Engineering Tools & Export */}
          <div>
            <div className="flex items-center gap-2 mb-4 text-xs font-semibold uppercase tracking-wider text-emerald-400">
              <FileSpreadsheet className="w-4 h-4" />
              <span>Tools & Learning</span>
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => handleNavigate('calculators')}
                  className="w-full text-left p-2 rounded hover:bg-white/5 transition-colors group"
                >
                  <div className="font-medium text-slate-200 dark:text-slate-200 light:text-slate-900 group-hover:text-emerald-400 transition-colors">
                    Aerodynamic Calculators
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    Reynolds, Mach, y+ First-Cell, Drag & Lift
                  </div>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigate('learn')}
                  className="w-full text-left p-2 rounded hover:bg-white/5 transition-colors group"
                >
                  <div className="font-medium text-slate-200 dark:text-slate-200 light:text-slate-900 group-hover:text-emerald-400 transition-colors">
                    CFD Fundamentals Course
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    Interactive boundary layer & turbulence guides
                  </div>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigate('compare')}
                  className="w-full text-left p-2 rounded hover:bg-white/5 transition-colors group"
                >
                  <div className="font-medium text-slate-200 dark:text-slate-200 light:text-slate-900 group-hover:text-emerald-400 transition-colors">
                    Platform Comparison Matrix
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    AetherCFD vs Ansys, SimScale, Luminary
                  </div>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigate('docs')}
                  className="w-full text-left p-2 rounded hover:bg-white/5 transition-colors group"
                >
                  <div className="font-medium text-slate-200 dark:text-slate-200 light:text-slate-900 group-hover:text-emerald-400 transition-colors">
                    API & Formula Docs
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    Static reference, Python & JavaScript snippets
                  </div>
                </button>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};
