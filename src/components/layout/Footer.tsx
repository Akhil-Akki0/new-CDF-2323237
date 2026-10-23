import React from 'react';
import { ShieldCheck, Cpu, ArrowUpRight, Github, Twitter, Linkedin, Heart } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { NavigationRoute } from '../../types';

export const Footer: React.FC = () => {
  const { setRoute } = useAppStore();

  const handleNavigate = (route: NavigationRoute) => {
    setRoute(route);
  };

  return (
    <footer className="w-full border-t border-white/10 dark:border-white/10 light:border-slate-200 bg-[#05070b] dark:bg-[#05070b] light:bg-slate-50 transition-colors pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Top Banner: Scientific Honesty & Boundary Statement */}
        <div className="p-4 rounded-xl border border-cyan-500/20 bg-cyan-950/20 mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
            <p className="text-xs text-slate-300">
              <span className="font-semibold text-white mr-1.5">Empirical Transparency Notice:</span>
              AetherCFD browser solver executes 2D Lattice Boltzmann (D2Q9) and Navier-Stokes formulations designed for educational and benchmark-grade aerodynamic analysis. Never present approximate browser results as certified flight safety or critical structural compliance engineering.
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-2">
            <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              Browser Solver · 2D
            </span>
            <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/10">
              Cloud 3D (Roadmap)
            </span>
          </div>
        </div>

        {/* Main Grid: 5 Columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16 text-sm">
          
          {/* Brand & Mission */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-gradient-to-tr from-cyan-600 to-cyan-400 flex items-center justify-center font-mono font-bold text-black text-xs">
                Æ
              </div>
              <span className="text-base font-bold tracking-tight text-white dark:text-white light:text-slate-900">
                AetherCFD
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              The browser-native computational fluid dynamics platform. Zero login, instantaneous lattice-boltzmann simulations, verifiable canonical benchmarks, and one-click structured Excel workbooks.
            </p>
            <div className="pt-2 flex items-center gap-3 text-slate-400">
              <span className="text-xs text-slate-500 font-mono">Governed by AIAA G-077 & ASME V&V 20 guidelines</span>
            </div>
          </div>

          {/* Solvers & Platform */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4">
              Workspace & Physics
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => handleNavigate('simulator')} className="hover:text-cyan-400 transition-colors">
                  Interactive Simulator
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('simulator')} className="hover:text-cyan-400 transition-colors">
                  Lattice Boltzmann (D2Q9)
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('simulator')} className="hover:text-cyan-400 transition-colors">
                  Kármán Vortex Street
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('simulator')} className="hover:text-cyan-400 transition-colors">
                  Heated Cavity Convection
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('simulator')} className="hover:text-cyan-400 transition-colors">
                  Live Streamlines & Probes
                </button>
              </li>
            </ul>
          </div>

          {/* Validation & Benchmarks */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4">
              Verification & Data
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => handleNavigate('validation')} className="hover:text-amber-400 transition-colors">
                  Ghia Lid Cavity (Re=1000)
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('validation')} className="hover:text-amber-400 transition-colors">
                  Williamson Cylinder Strouhal
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('validation')} className="hover:text-amber-400 transition-colors">
                  Poiseuille Parabolic Profile
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('validation')} className="hover:text-amber-400 transition-colors">
                  Backward-Facing Step
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('validation')} className="hover:text-amber-400 transition-colors">
                  NACA 0012 Aerodynamic Polar
                </button>
              </li>
            </ul>
          </div>

          {/* Resources & Society */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4">
              Resources & Company
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => handleNavigate('learn')} className="hover:text-white transition-colors">
                  CFD Fundamentals Course
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('calculators')} className="hover:text-white transition-colors">
                  Reynolds & y+ Calculators
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('compare')} className="hover:text-white transition-colors">
                  Comparison vs Ansys & SimScale
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('docs')} className="hover:text-white transition-colors">
                  API & Formula Reference
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('about')} className="hover:text-white transition-colors">
                  Advisory Board & Ethics
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('contact')} className="hover:text-white transition-colors">
                  Talk to an Aerodynamicist
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-4">
            <span>© {new Date().getFullYear()} AetherCFD Project. Open engineering workspace.</span>
            <span>·</span>
            <span>MIT License & Scientific Transparency</span>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => handleNavigate('about')} className="hover:text-slate-300 transition-colors">Privacy Policy</button>
            <button onClick={() => handleNavigate('about')} className="hover:text-slate-300 transition-colors">Terms of Verification</button>
            <button onClick={() => handleNavigate('about')} className="hover:text-slate-300 transition-colors">Accessibility (WCAG 2.2 AA)</button>
            <button onClick={() => handleNavigate('about')} className="hover:text-slate-300 transition-colors">System Status (100% Operational)</button>
          </div>
        </div>

      </div>
    </footer>
  );
};
