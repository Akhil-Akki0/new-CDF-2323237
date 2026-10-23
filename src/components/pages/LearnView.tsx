import React, { useState } from 'react';
import { BookOpen, Search, CheckCircle2, ChevronRight, HelpCircle } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

const GLOSSARY_TERMS = [
  { term: 'Reynolds Number (Re)', def: 'Dimensionless ratio of inertial forces to viscous forces in a fluid flow: Re = ρVL/μ. Determines transition between laminar and turbulent flow.' },
  { term: 'Lattice Boltzmann Method (LBM)', def: 'Mesoscopic numerical technique solving the discrete Boltzmann equation over a spatial lattice (such as D2Q9) instead of directly discretizing Navier-Stokes.' },
  { term: 'Courant-Friedrichs-Lewy (CFL)', def: 'Condition for convergence in numerical PDE solving. Requires the physical domain of dependence to lie within the numerical domain of dependence.' },
  { term: 'Kármán Vortex Street', def: 'A repeating pattern of swirling vortices caused by unsteady separation of flow of a fluid around blunt bodies at Re > 47.' },
  { term: 'Boundary Layer', def: 'The thin layer of fluid in the immediate vicinity of a bounding surface where the effects of viscosity are significant (no-slip condition).' },
  { term: 'y+ (y-plus)', def: 'Non-dimensional wall distance for a wall-bounded flow, representing the distance from the solid boundary scaled by friction velocity.' },
  { term: 'Strouhal Number (St)', def: 'Dimensionless parameter describing oscillating flow mechanisms: St = fL/U. Used to measure vortex shedding frequency.' },
  { term: 'Boussinesq Approximation', def: 'Assumption that density variations are neglected everywhere in Navier-Stokes except in the gravity buoyancy force term.' },
];

export const LearnView: React.FC = () => {
  const { setRoute } = useAppStore();
  const [search, setSearch] = useState('');

  const filteredGlossary = GLOSSARY_TERMS.filter(item => 
    item.term.toLowerCase().includes(search.toLowerCase()) || 
    item.def.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="py-16 px-6 max-w-7xl mx-auto space-y-16">
      
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-cyan-400">
          <BookOpen className="w-4 h-4" />
          <span>CFD Learning Hub · Theory & Fundamentals</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
          Computational Fluid Dynamics Fundamentals
        </h1>
        <p className="text-base text-slate-300 leading-relaxed">
          Master the mathematical formulations, boundary condition physics, and numerical discretization schemes that power modern aerodynamics solvers.
        </p>
      </div>

      {/* Curriculum path */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white">Curriculum Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              module: 'Module 01',
              title: 'Governing Equations & Navier-Stokes',
              desc: 'Conservation of mass (continuity), momentum balance, and viscous stress tensor derivations.',
            },
            {
              module: 'Module 02',
              title: 'Lattice Boltzmann Method (D2Q9)',
              desc: 'Particle velocity vectors, Maxwell-Boltzmann equilibrium, BGK collision, and streaming steps.',
            },
            {
              module: 'Module 03',
              title: 'Boundary Conditions & Verification',
              desc: 'Bounce-back no-slip walls, moving lids, inlet velocity profiles, and ASME V&V 20 convergence checks.',
            },
          ].map((item, idx) => (
            <div key={idx} className="glass-panel p-6 rounded-xl border border-white/10 space-y-3">
              <span className="text-xs font-mono text-cyan-400 uppercase font-semibold">{item.module}</span>
              <h3 className="text-base font-bold text-white">{item.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Formulas Cheat-Sheet */}
      <div className="glass-panel p-8 rounded-2xl border border-white/10 space-y-6">
        <h2 className="text-xl font-bold text-white">Aerodynamics & CFD Formulas Cheat-Sheet</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-mono">
          <div className="p-4 rounded-xl bg-slate-900 border border-white/10 space-y-2">
            <span className="text-cyan-400 font-bold block">REYNOLDS NUMBER</span>
            <div className="text-white text-sm">Re = (ρ · V · L) / μ = (V · L) / ν</div>
            <p className="text-slate-400 font-sans text-xs">Laminar if Re &lt; 2300 in internal pipe flow; critical Re ≈ 5×10^5 on flat plate.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-white/10 space-y-2">
            <span className="text-amber-400 font-bold block">STROUHAL VORTEX SHEDDING FREQUENCY</span>
            <div className="text-white text-sm">St = (f · D) / U ≈ 0.198 · (1 - 19.7 / Re)</div>
            <p className="text-slate-400 font-sans text-xs">Predicts vortex shedding oscillation frequency behind circular cylinders for 47 &lt; Re &lt; 2×10^5.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-white/10 space-y-2">
            <span className="text-emerald-400 font-bold block">SKIN FRICTION & FIRST-CELL HEIGHT (y+)</span>
            <div className="text-white text-sm">y+ = (y · u_τ) / ν, where u_τ = √(τ_w / ρ)</div>
            <p className="text-slate-400 font-sans text-xs">Target y+ ≈ 1 for resolved viscous sublayer without semi-empirical wall functions.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-white/10 space-y-2">
            <span className="text-purple-400 font-bold block">COURANT-FRIEDRICHS-LEWY CONDITION</span>
            <div className="text-white text-sm">CFL = (u · Δt) / Δx ≤ CFL_max</div>
            <p className="text-slate-400 font-sans text-xs">In D2Q9 Lattice Boltzmann, maintain lattice velocity u &lt; 0.1 to avoid divergence.</p>
          </div>
        </div>
      </div>

      {/* Searchable Glossary */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-white">CFD & Fluid Mechanics Glossary</h2>
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search terms (e.g. 'y+', 'LBM')..."
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredGlossary.map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-white/5 bg-slate-950/40 space-y-1">
              <span className="font-bold text-xs text-cyan-300 font-mono">{item.term}</span>
              <p className="text-xs text-slate-300 leading-relaxed">{item.def}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
