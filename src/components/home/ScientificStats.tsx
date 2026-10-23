import React from 'react';
import { Cpu, ShieldCheck, Zap, Activity } from 'lucide-react';

export const ScientificStats: React.FC = () => {
  const stats = [
    {
      value: '2.4M+',
      unit: 'NODES / SEC',
      label: 'D2Q9 Lattice Boltzmann Throughput',
      sublabel: 'Executed in dedicated Web Workers at 60 FPS',
      icon: <Cpu className="w-4 h-4 text-cyan-400" />,
    },
    {
      value: '0.41%',
      unit: 'MAX DEV',
      label: 'Ghia et al. 1982 Benchmark Correlation',
      sublabel: 'Centerline velocity profile at Re=1000',
      icon: <Activity className="w-4 h-4 text-amber-400" />,
    },
    {
      value: '0.0s',
      unit: 'SPIN-UP',
      label: 'Zero Cloud Node Queue Latency',
      sublabel: 'Instant in-browser execution with zero installation',
      icon: <Zap className="w-4 h-4 text-emerald-400" />,
    },
    {
      value: '100%',
      unit: 'CLIENT-SIDE',
      label: 'Air-Gapped Geometry Confidentiality',
      sublabel: 'Proprietary CAD & meshes never leave browser memory',
      icon: <ShieldCheck className="w-4 h-4 text-blue-400" />,
    },
  ];

  return (
    <div className="w-full py-16 px-6 max-w-7xl mx-auto border-t border-white/5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="p-6 rounded-xl border border-white/10 bg-slate-950/40 hover:border-cyan-500/30 transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                {stat.icon}
                <span>{stat.unit}</span>
              </span>
              <span className="text-[10px] font-mono text-slate-500">REF {idx + 1}</span>
            </div>

            <div>
              <div className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-white mb-1.5 tabular-nums">
                {stat.value}
              </div>
              <div className="text-xs font-semibold text-slate-200 mb-1">
                {stat.label}
              </div>
              <div className="text-[11px] text-slate-400 leading-relaxed">
                {stat.sublabel}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
