import React from 'react';
import { Quote, ArrowRight, CheckCircle2 } from 'lucide-react';
import { CASE_STUDIES } from '../../data/caseStudies';
import { useAppStore } from '../../store/useAppStore';

export const CaseStudiesSection: React.FC = () => {
  const { setRoute } = useAppStore();

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-cyan-400 mb-2">
            <Quote className="w-4 h-4" />
            <span>Industrial Engagements & Verified Outcomes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white dark:text-white light:text-slate-900">
            Rapid Engineering Impact in Practice
          </h2>
          <p className="text-sm text-slate-400 mt-2 max-w-xl">
            How leading aerodynamic, motorsport, and thermal design teams accelerate concept cycles with zero queue friction.
          </p>
        </div>

        <button
          onClick={() => setRoute('case-studies')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          <span>View All Engagement Case Studies</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Grid of Case Study Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CASE_STUDIES.map((study) => (
          <div
            key={study.id}
            className="glass-panel rounded-2xl p-6 sm:p-7 border border-white/10 flex flex-col justify-between hover:border-cyan-500/30 transition-all group"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-4 pb-3 border-b border-white/5">
                <span>{study.sector}</span>
                <span className="text-[10px] text-slate-500 uppercase">{study.clientAlias}</span>
              </div>

              <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors mb-3">
                {study.title}
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {study.problem}
              </p>

              {/* Quantified impact banner */}
              <div className="p-3 rounded-lg bg-cyan-950/30 border border-cyan-500/20 text-cyan-300 text-xs font-mono mb-6">
                {study.quantitativeImpact}
              </div>

              {/* Attributable Quote */}
              <div className="relative pl-3 border-l-2 border-cyan-500/40 text-xs italic text-slate-400 mb-4">
                "{study.quote}"
              </div>
            </div>

            <div className="text-[11px] text-slate-400 font-medium pt-3 border-t border-white/5">
              {study.authorTitle}
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
