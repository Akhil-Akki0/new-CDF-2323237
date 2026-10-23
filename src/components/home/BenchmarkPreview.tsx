import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, BarChart2, ShieldCheck, Download } from 'lucide-react';
import { BENCHMARK_STUDIES } from '../../data/benchmarks';
import { useAppStore } from '../../store/useAppStore';

export const BenchmarkPreview: React.FC = () => {
  const { setRoute, setSelectedBenchmarkId } = useAppStore();
  const [selectedBenchmark, setSelectedBenchmark] = useState(BENCHMARK_STUDIES[0]);

  const handleSelectStudy = (study: typeof BENCHMARK_STUDIES[0]) => {
    setSelectedBenchmark(study);
  };

  const handleOpenBenchmarkPage = () => {
    setSelectedBenchmarkId(selectedBenchmark.id);
    setRoute('validation');
  };

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-amber-400 mb-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Navier-Style Validation · Empirical Proof</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white dark:text-white light:text-slate-900">
            Literature Benchmarks & Convergence Rigor
          </h2>
          <p className="text-sm text-slate-400 mt-2 max-w-xl">
            We display our solver outputs directly overlaid on peer-reviewed experimental and analytical literature datasets. Zero hidden error margins.
          </p>
        </div>

        <button
          onClick={handleOpenBenchmarkPage}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 font-semibold text-xs transition-colors shrink-0 cursor-pointer"
        >
          <span>Explore All 5 Benchmarks</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Main Validation Workspace Display */}
      <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12">
        
        {/* Left selector menu (4 Cols) */}
        <div className="lg:col-span-4 p-5 bg-slate-950/60 border-b lg:border-b-0 lg:border-r border-white/10 space-y-2">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400 px-2 py-1">
            Canonical Test Matrix
          </div>
          {BENCHMARK_STUDIES.map((study) => {
            const isSelected = study.id === selectedBenchmark.id;
            return (
              <button
                key={study.id}
                onClick={() => handleSelectStudy(study)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500/15 border-amber-500/40 text-white'
                    : 'bg-white/[0.02] border-white/5 text-slate-400 hover:bg-white/[0.06] hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold">{study.title}</span>
                  <span className="font-mono text-[10px] text-amber-400">{study.measuredError}</span>
                </div>
                <div className="text-[11px] text-slate-400 flex items-center gap-2">
                  <span>{study.referenceAuthor} ({study.referenceYear})</span>
                  <span>·</span>
                  <span className="font-mono">Re={study.reynoldsNumber}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right validation data & chart view (8 Cols) */}
        <div className="lg:col-span-8 p-6 lg:p-8 flex flex-col justify-between space-y-6">
          
          <div>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 mr-2">
                  {selectedBenchmark.verificationGrade}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {selectedBenchmark.geometryType}
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  {selectedBenchmark.title}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono text-slate-400 block">MEASURED ACCURACY</span>
                <span className="text-sm font-mono font-bold text-emerald-400">{selectedBenchmark.measuredError}</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              {selectedBenchmark.summary}
            </p>

            {/* SVG Visual Comparison Chart */}
            <div className="p-4 rounded-xl border border-white/10 bg-[#070a10]">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-3">
                <span>{selectedBenchmark.keyMetric}</span>
                <div className="flex items-center gap-4 text-[11px]">
                  <span className="flex items-center gap-1.5 text-amber-400">
                    <span className="w-2.5 h-0.5 bg-amber-400 inline-block" />
                    Reference: {selectedBenchmark.referenceAuthor}
                  </span>
                  <span className="flex items-center gap-1.5 text-cyan-400">
                    <span className="w-2.5 h-0.5 bg-cyan-400 inline-block" />
                    AetherCFD D2Q9
                  </span>
                </div>
              </div>

              {/* Responsive SVG Chart */}
              <div className="w-full h-48 relative">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 500 180" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  <line x1="0" y1="30" x2="500" y2="30" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
                  <line x1="0" y1="90" x2="500" y2="90" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
                  <line x1="0" y1="150" x2="500" y2="150" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />

                  {/* Reference Curve (Amber dashed with circular nodes) */}
                  <path
                    d={selectedBenchmark.referenceDataPoints.map((pt, i) => {
                      const x = (i / (selectedBenchmark.referenceDataPoints.length - 1)) * 480 + 10;
                      const y = 90 - pt.y * 70;
                      return `${i === 0 ? 'M' : 'L'} ${x} ${Math.min(170, Math.max(10, y))}`;
                    }).join(' ')}
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  />

                  {/* Reference data points */}
                  {selectedBenchmark.referenceDataPoints.map((pt, i) => {
                    const x = (i / (selectedBenchmark.referenceDataPoints.length - 1)) * 480 + 10;
                    const y = 90 - pt.y * 70;
                    return (
                      <circle
                        key={`ref-${i}`}
                        cx={x}
                        cy={Math.min(170, Math.max(10, y))}
                        r="3.5"
                        fill="#f59e0b"
                      />
                    );
                  })}

                  {/* Solver Curve (Cyan solid) */}
                  <path
                    d={selectedBenchmark.solverDataPoints.map((pt, i) => {
                      const x = (i / (selectedBenchmark.solverDataPoints.length - 1)) * 480 + 10;
                      const y = 90 - pt.y * 70;
                      return `${i === 0 ? 'M' : 'L'} ${x} ${Math.min(170, Math.max(10, y))}`;
                    }).join(' ')}
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="2.5"
                  />

                  {/* Solver nodes */}
                  {selectedBenchmark.solverDataPoints.map((pt, i) => {
                    const x = (i / (selectedBenchmark.solverDataPoints.length - 1)) * 480 + 10;
                    const y = 90 - pt.y * 70;
                    return (
                      <circle
                        key={`solv-${i}`}
                        cx={x}
                        cy={Math.min(170, Math.max(10, y))}
                        r="2.5"
                        fill="#06b6d4"
                      />
                    );
                  })}
                </svg>
              </div>

              <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-2 px-1">
                <span>Normalized Position (X/L = 0.0)</span>
                <span>Centerline (0.5)</span>
                <span>Opposing Wall (X/L = 1.0)</span>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-white/10">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Full raw dataset included in the Excel verification export</span>
            </div>

            <button
              onClick={handleOpenBenchmarkPage}
              className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Inspect Grid Convergence Plot</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

    </section>
  );
};
