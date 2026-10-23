import React from 'react';
import { Scale, Check, X, ShieldAlert, ArrowRight } from 'lucide-react';
import { COMPARISON_DATA } from '../../data/comparison';
import { useAppStore } from '../../store/useAppStore';

export const CompareView: React.FC = () => {
  const { setRoute } = useAppStore();

  return (
    <div className="py-16 px-6 max-w-7xl mx-auto space-y-16">
      
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-cyan-400">
          <Scale className="w-4 h-4" />
          <span>Vendor & Architecture Evaluation</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
          AetherCFD vs Traditional Solvers
        </h1>
        <p className="text-base text-slate-300 leading-relaxed">
          An honest, side-by-side engineering appraisal comparing browser-native Lattice Boltzmann against enterprise desktop suites (Ansys Fluent) and cloud platforms (SimScale, Luminary Cloud, Navier AI).
        </p>
      </div>

      {/* Comparison table */}
      <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-slate-950/80">
                <th className="py-4 px-6 font-mono text-[11px] uppercase tracking-wider text-slate-400 w-1/4">
                  Feature / Capability
                </th>
                <th className="py-4 px-6 font-bold text-cyan-300 bg-cyan-950/40 border-x border-cyan-500/20 w-1/4">
                  AetherCFD (In-Browser)
                </th>
                <th className="py-4 px-6 font-semibold text-slate-300 w-1/4">
                  Ansys Fluent (Desktop)
                </th>
                <th className="py-4 px-6 font-semibold text-slate-300 w-1/4">
                  SimScale / Luminary (Cloud)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {COMPARISON_DATA.map((row, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-6 font-medium text-slate-200">
                    <div>{row.feature}</div>
                    <div className="text-[10px] font-mono text-slate-400 mt-0.5">{row.category}</div>
                  </td>
                  <td className="py-4 px-6 font-medium text-cyan-200 bg-cyan-950/20 border-x border-cyan-500/20">
                    {row.aetherCfd}
                  </td>
                  <td className="py-4 px-6 text-slate-400">
                    {row.traditionalAnsys}
                  </td>
                  <td className="py-4 px-6 text-slate-400">
                    {row.cloudSimScale}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Box */}
      <div className="p-8 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">Experience the difference firsthand</h3>
          <p className="text-xs text-slate-300">Zero installation. No credit card. Run the solver instantly.</p>
        </div>
        <button
          onClick={() => setRoute('simulator')}
          className="px-6 py-3 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-black font-semibold text-xs transition-colors shrink-0 cursor-pointer"
        >
          Launch Free Simulator
        </button>
      </div>

    </div>
  );
};
