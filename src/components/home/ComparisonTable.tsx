import React from 'react';
import { Scale, Check, X, ShieldAlert, ArrowRight } from 'lucide-react';
import { COMPARISON_DATA } from '../../data/comparison';
import { useAppStore } from '../../store/useAppStore';

export const ComparisonTable: React.FC = () => {
  const { setRoute } = useAppStore();

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-cyan-400 mb-2">
            <Scale className="w-4 h-4" />
            <span>Honest Evaluation Matrix · Transparent Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white dark:text-white light:text-slate-900">
            AetherCFD vs Traditional & Cloud Solvers
          </h2>
          <p className="text-sm text-slate-400 mt-2 max-w-xl">
            We are built specifically for zero-friction aerodynamic screening and transparent validation. We do not claim to replace 3D certified flight test codes.
          </p>
        </div>

        <button
          onClick={() => setRoute('compare')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          <span>View Detailed Capability Matrix</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Comparison Grid */}
      <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-slate-950/80">
                <th className="py-4 px-5 font-mono text-[11px] uppercase tracking-wider text-slate-400 w-1/4">
                  Engineering Criterion
                </th>
                <th className="py-4 px-5 font-bold text-cyan-300 bg-cyan-950/30 border-x border-cyan-500/20 w-1/4">
                  AetherCFD (In-Browser)
                </th>
                <th className="py-4 px-5 font-semibold text-slate-300 w-1/4">
                  Ansys Fluent (Desktop)
                </th>
                <th className="py-4 px-5 font-semibold text-slate-300 w-1/4">
                  SimScale / Luminary (Cloud)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {COMPARISON_DATA.map((row, idx) => (
                <tr 
                  key={idx}
                  className="hover:bg-white/[0.02] transition-colors"
                >
                  <td className="py-3.5 px-5 font-medium text-slate-300">
                    <div className="text-slate-200">{row.feature}</div>
                    <div className="text-[10px] font-mono text-slate-400 mt-0.5">{row.category}</div>
                  </td>

                  {/* AetherCFD Highlighted Column */}
                  <td className="py-3.5 px-5 font-medium text-cyan-200 bg-cyan-950/20 border-x border-cyan-500/20">
                    {row.aetherCfd}
                  </td>

                  {/* Traditional Ansys */}
                  <td className="py-3.5 px-5 text-slate-400">
                    {row.traditionalAnsys}
                  </td>

                  {/* Cloud Solvers */}
                  <td className="py-3.5 px-5 text-slate-400">
                    {row.cloudSimScale}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </section>
  );
};
