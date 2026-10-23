import React from 'react';
import { ShieldCheck, Users, Globe, Award, Sparkles } from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="py-16 px-6 max-w-7xl mx-auto space-y-20">
      
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-cyan-400">
          <ShieldCheck className="w-4 h-4" />
          <span>Scientific Mission & Ethical Transparency</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
          About the AetherCFD Project
        </h1>
        <p className="text-base text-slate-300 leading-relaxed">
          Founded on the principle that fluid dynamics computation should be universally accessible, mathematically open, and verifiable against experimental benchmarks without artificial commercial gatekeeping.
        </p>
      </div>

      {/* Guiding Principles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-xl border border-white/10 space-y-3">
          <div className="w-8 h-8 rounded bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs">
            01
          </div>
          <h3 className="text-base font-bold text-white">Transparent Verification</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            We never market approximate solvers as flight-certified engineering tools. Every benchmark shows real literature reference deviations and grid convergence uncertainty.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-xl border border-white/10 space-y-3">
          <div className="w-8 h-8 rounded bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs">
            02
          </div>
          <h3 className="text-base font-bold text-white">Zero Cloud Lock-in</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Your proprietary CAD profiles and meshes execute locally in your browser memory. We never transmit geometry to external servers or train proprietary models on your intellectual property.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-xl border border-white/10 space-y-3">
          <div className="w-8 h-8 rounded bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs">
            03
          </div>
          <h3 className="text-base font-bold text-white">Universal Excel Export</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Engineers run on spreadsheets. We treat structured .xlsx files as first-class citizens, embedding charts, force vectors, and convergence metrics in one-click downloads.
          </p>
        </div>
      </div>

      {/* Advisory Board */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white">Scientific Advisory Board & Contributors</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: 'Dr. Elena Rostova',
              role: 'Chair of Aerodynamics (Placeholder)',
              institution: 'Formerly Imperial College London CFD Lab',
              bio: 'Specialist in Lattice Boltzmann boundary conditions and high-order spectral methods for turbulent shear flows.',
            },
            {
              name: 'Prof. Marcus Vance',
              role: 'Senior Numerical Analyst (Placeholder)',
              institution: 'Center for Turbulence Research',
              bio: 'Author of canonical papers on incompressible Navier-Stokes discretization and ASME V&V 20 uncertainty estimation.',
            },
            {
              name: 'Dr. Julian Thorne',
              role: 'Lead Thermal Architecture (Placeholder)',
              institution: 'Hyperscale Cooling Consortium',
              bio: 'Pioneer in micro-channel conjugate heat transfer and data center energy minimization models.',
            },
          ].map((advisor, idx) => (
            <div key={idx} className="p-6 rounded-xl border border-white/10 bg-slate-950/40 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center font-bold text-xs text-cyan-300">
                  {advisor.name.split(' ')[1]?.[0] || 'A'}
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">{advisor.name}</h3>
                  <span className="text-[11px] text-cyan-400 block">{advisor.role}</span>
                </div>
              </div>
              <div className="text-[11px] font-mono text-slate-400">{advisor.institution}</div>
              <p className="text-xs text-slate-300 leading-relaxed pt-1">{advisor.bio}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
