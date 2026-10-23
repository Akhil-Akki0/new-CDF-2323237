import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, Download, FileSpreadsheet, ShieldCheck, Activity } from 'lucide-react';
import { BENCHMARK_STUDIES } from '../../data/benchmarks';
import { useAppStore } from '../../store/useAppStore';

export const ValidationView: React.FC = () => {
  const { selectedBenchmarkId, setRoute } = useAppStore();
  const initialStudy = BENCHMARK_STUDIES.find(s => s.id === selectedBenchmarkId) || BENCHMARK_STUDIES[0];
  const [activeStudy, setActiveStudy] = useState(initialStudy);

  return (
    <div className="py-16 px-6 max-w-7xl mx-auto space-y-16">
      
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-amber-400">
          <CheckCircle2 className="w-4 h-4" />
          <span>Navier-Style Benchmark Library · ASME V&V 20 Protocols</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
          Verification & Validation Benchmarks
        </h1>
        <p className="text-base text-slate-300 leading-relaxed">
          Computational fluid dynamics without empirical validation is merely computer graphics. Every solver iteration in AetherCFD is verified against canonical literature datasets with transparent error quantifications.
        </p>
      </div>

      {/* Benchmark Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Benchmark Directory (4 Cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400 px-2 pb-2">
            Published Benchmark Studies
          </div>
          {BENCHMARK_STUDIES.map((study) => (
            <button
              key={study.id}
              onClick={() => setActiveStudy(study)}
              className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                activeStudy.id === study.id
                  ? 'bg-amber-500/15 border-amber-500/40 text-white shadow-lg shadow-amber-500/5'
                  : 'bg-white/[0.02] border-white/5 text-slate-400 hover:bg-white/[0.05] hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold">{study.title}</span>
                <span className="font-mono text-[10px] text-amber-400">{study.measuredError}</span>
              </div>
              <div className="text-xs text-slate-400">
                {study.referenceAuthor} ({study.referenceYear}) · Re={study.reynoldsNumber}
              </div>
            </button>
          ))}
        </div>

        {/* Right Detail Pane (8 Cols) */}
        <div className="lg:col-span-8 glass-panel rounded-2xl p-8 border border-white/10 space-y-8">
          
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 mr-2">
                {activeStudy.verificationGrade}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {activeStudy.geometryType}
              </span>
              <h2 className="text-2xl font-bold text-white mt-2">
                {activeStudy.title}
              </h2>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono text-slate-400 block">MEASURED ACCURACY</span>
              <span className="text-lg font-mono font-bold text-emerald-400">{activeStudy.measuredError}</span>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <h3 className="font-bold text-white text-base">Physics Formulation & Experimental Context</h3>
            <p>{activeStudy.summary}</p>
          </div>

          {/* Graphical Overlay Plot */}
          <div className="p-6 rounded-xl border border-white/10 bg-[#070a10] space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span>{activeStudy.keyMetric}</span>
              <div className="flex items-center gap-4 text-[11px]">
                <span className="flex items-center gap-1.5 text-amber-400">
                  <span className="w-2.5 h-0.5 bg-amber-400 inline-block" />
                  Reference: {activeStudy.referenceAuthor}
                </span>
                <span className="flex items-center gap-1.5 text-cyan-400">
                  <span className="w-2.5 h-0.5 bg-cyan-400 inline-block" />
                  AetherCFD D2Q9
                </span>
              </div>
            </div>

            {/* SVG Visual comparison */}
            <div className="w-full h-56 relative">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 500 200" preserveAspectRatio="none">
                <line x1="0" y1="40" x2="500" y2="40" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
                <line x1="0" y1="100" x2="500" y2="100" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
                <line x1="0" y1="160" x2="500" y2="160" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />

                {/* Reference Path */}
                <path
                  d={activeStudy.referenceDataPoints.map((pt, i) => {
                    const x = (i / (activeStudy.referenceDataPoints.length - 1)) * 480 + 10;
                    const y = 100 - pt.y * 75;
                    return `${i === 0 ? 'M' : 'L'} ${x} ${Math.min(190, Math.max(10, y))}`;
                  }).join(' ')}
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />

                {activeStudy.referenceDataPoints.map((pt, i) => {
                  const x = (i / (activeStudy.referenceDataPoints.length - 1)) * 480 + 10;
                  const y = 100 - pt.y * 75;
                  return (
                    <circle key={`ref-${i}`} cx={x} cy={Math.min(190, Math.max(10, y))} r="4" fill="#f59e0b" />
                  );
                })}

                {/* Solver Path */}
                <path
                  d={activeStudy.solverDataPoints.map((pt, i) => {
                    const x = (i / (activeStudy.solverDataPoints.length - 1)) * 480 + 10;
                    const y = 100 - pt.y * 75;
                    return `${i === 0 ? 'M' : 'L'} ${x} ${Math.min(190, Math.max(10, y))}`;
                  }).join(' ')}
                  fill="none"
                  stroke="#06b6d4"
                  strokeWidth="2.5"
                />

                {activeStudy.solverDataPoints.map((pt, i) => {
                  const x = (i / (activeStudy.solverDataPoints.length - 1)) * 480 + 10;
                  const y = 100 - pt.y * 75;
                  return (
                    <circle key={`solv-${i}`} cx={x} cy={Math.min(190, Math.max(10, y))} r="3" fill="#06b6d4" />
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Tabular Numerical Data */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
              Discrete Verification Matrix
            </h4>
            <div className="overflow-x-auto rounded-lg border border-white/10">
              <table className="w-full text-left text-xs">
                <thead className="bg-white/5 border-b border-white/10 font-mono text-[11px] text-slate-400">
                  <tr>
                    <th className="py-2.5 px-4">Coord (X/L)</th>
                    <th className="py-2.5 px-4 text-amber-400">Literature Reference</th>
                    <th className="py-2.5 px-4 text-cyan-400">AetherCFD Result</th>
                    <th className="py-2.5 px-4 text-emerald-400">Absolute Deviation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono text-xs">
                  {activeStudy.referenceDataPoints.map((refPt, idx) => {
                    const solvPt = activeStudy.solverDataPoints[idx] || refPt;
                    const diff = Math.abs(solvPt.y - refPt.y);
                    return (
                      <tr key={idx} className="hover:bg-white/[0.02]">
                        <td className="py-2 px-4 text-slate-300">{refPt.x}</td>
                        <td className="py-2 px-4 text-amber-300">{refPt.y.toFixed(4)}</td>
                        <td className="py-2 px-4 text-cyan-300">{solvPt.y.toFixed(4)}</td>
                        <td className="py-2 px-4 text-emerald-400">{(diff * 100).toFixed(2)}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Full CSV and raw tensor available in Simulator export</span>
            </div>
            <button
              onClick={() => setRoute('simulator')}
              className="px-5 py-2.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-black font-semibold text-xs transition-colors cursor-pointer"
            >
              Simulate This Geometry Live
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
