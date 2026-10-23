import React from 'react';
import { Cpu, Wind, Layers, Flame, CheckCircle2, ShieldCheck, ArrowRight, Activity, Zap } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const PlatformView: React.FC = () => {
  const { setRoute } = useAppStore();

  const physicsCapabilities = [
    {
      title: 'Incompressible Viscous Navier-Stokes',
      status: 'Active (Browser)',
      description: 'Laminar boundary layers, channel flows, shear-driven cavities, and wake detachment up to Re=5,000.',
    },
    {
      title: 'D2Q9 Lattice Boltzmann Method (LBM)',
      status: 'Active (Browser)',
      description: 'Mesoscopic kinetic model with BGK single-relaxation-time collision operator and bounce-back obstacle walls.',
    },
    {
      title: 'Boussinesq Natural Thermal Convection',
      status: 'Active (Browser)',
      description: 'Coupled thermal energy transport with buoyancy-driven Rayleigh-Bénard flows and heated cavity circulation.',
    },
    {
      title: 'Kármán Vortex Shedding & Strouhal Frequency',
      status: 'Active (Browser)',
      description: 'Time-accurate boundary layer detachment with real-time FFT spectrum analysis and dynamic lift tracking.',
    },
    {
      title: 'Compressible Transonic Formulations (RANS k-ω SST)',
      status: 'Cloud Solver (Coming Soon)',
      description: '3D Reynolds-Averaged Navier-Stokes with shock capture and acoustic radiation models.',
    },
    {
      title: 'Multiphase & Free-Surface VOF',
      status: 'Cloud Solver (Coming Soon)',
      description: 'Volume-of-Fluid interface tracking for wave impact, sloshing tanks, and marine hydrodynamic cavitation.',
    },
  ];

  return (
    <div className="py-16 px-6 max-w-7xl mx-auto space-y-20">
      
      {/* Platform Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-cyan-400">
          <Cpu className="w-4 h-4" />
          <span>Solver Architecture & Theoretical Foundations</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
          In-Browser Numerical Fluid Dynamics
        </h1>
        <p className="text-base text-slate-300 leading-relaxed">
          AetherCFD leverages modern WebAssembly and Web Worker pipelines to solve discrete fluid mechanics equations directly within modern browser engines without external cloud compute latency.
        </p>
      </div>

      {/* Solver Pipeline Architecture Diagram */}
      <div className="glass-panel rounded-2xl p-8 border border-white/10 space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            <span>Interactive Solver Execution Pipeline</span>
          </h2>
          <span className="text-xs font-mono text-cyan-400">Zero-Latency Worker Execution</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono">
          <div className="p-4 rounded-xl bg-slate-900 border border-white/10 space-y-2">
            <div className="text-cyan-400 font-bold">01. GEOMETRY & BOUNDARIES</div>
            <p className="text-slate-400 font-sans text-xs">
              Voxelized Cartesian mesh with solid obstacle masking and no-slip bounce-back walls.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-white/10 space-y-2">
            <div className="text-cyan-400 font-bold">02. D2Q9 COLLISION OPERATOR</div>
            <p className="text-slate-400 font-sans text-xs">
              Bhatnagar-Gross-Krook (BGK) relaxation toward Maxwellian equilibrium distribution f_eq.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-white/10 space-y-2">
            <div className="text-cyan-400 font-bold">03. ADVECTION STREAMING</div>
            <p className="text-slate-400 font-sans text-xs">
              Discrete particle distribution propagation along 9 lattice velocity vectors c_i.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-white/10 space-y-2">
            <div className="text-cyan-400 font-bold">04. MACROSCOPIC MOMENTS</div>
            <p className="text-slate-400 font-sans text-xs">
              Recovery of velocity field u, density ρ, pressure p, and surface force tensors.
            </p>
          </div>
        </div>
      </div>

      {/* Supported Physics Grid */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Supported Physics & Solvers</h2>
          <p className="text-xs text-slate-400 mt-1">Honest classification of client-side browser solver vs planned cloud solvers.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {physicsCapabilities.map((item, idx) => (
            <div key={idx} className="glass-panel p-6 rounded-xl border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded ${
                  item.status.includes('Active') 
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-white/5 text-slate-400 border border-white/10'
                }`}>
                  {item.status}
                </span>
                <span className="text-[10px] font-mono text-slate-500">0{idx + 1}</span>
              </div>
              <h3 className="text-base font-bold text-white">{item.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA to Simulator */}
      <div className="p-8 rounded-2xl bg-gradient-to-r from-cyan-950/60 to-slate-900 border border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">Ready to test the solver in real-time?</h3>
          <p className="text-xs text-slate-300">Launch the 2D interactive workspace with full probe sampling and Excel export.</p>
        </div>
        <button
          onClick={() => setRoute('simulator')}
          className="px-6 py-3 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-black font-semibold text-xs transition-colors shrink-0 cursor-pointer"
        >
          Open Simulator Workspace
        </button>
      </div>

    </div>
  );
};
