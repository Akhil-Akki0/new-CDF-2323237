import React from 'react';
import { Quote, ArrowRight, ShieldCheck } from 'lucide-react';
import { CASE_STUDIES } from '../../data/caseStudies';
import { useAppStore } from '../../store/useAppStore';

export const CaseStudiesView: React.FC = () => {
  const { setRoute } = useAppStore();

  return (
    <div className="py-16 px-6 max-w-7xl mx-auto space-y-16">
      
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-cyan-400">
          <Quote className="w-4 h-4" />
          <span>Industrial Engagements & Peer Review</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
          Aerodynamic Engineering Case Studies
        </h1>
        <p className="text-base text-slate-300 leading-relaxed">
          How engineering teams use AetherCFD to bypass HPC queue bottlenecks during concept development and export verified CFD datasets directly into design review spreadsheets.
        </p>
      </div>

      {/* Case studies list */}
      <div className="space-y-8">
        {CASE_STUDIES.map((study) => (
          <div
            key={study.id}
            className="glass-panel rounded-2xl p-8 sm:p-10 border border-white/10 space-y-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block mb-1">
                  {study.sector}
                </span>
                <h2 className="text-2xl font-bold text-white">
                  {study.title}
                </h2>
              </div>
              <span className="text-xs font-mono text-slate-400 bg-white/5 px-3 py-1 rounded">
                Client: {study.clientAlias}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs sm:text-sm text-slate-300">
              <div>
                <h4 className="font-bold text-white mb-2">The Engineering Challenge</h4>
                <p className="leading-relaxed">{study.problem}</p>
              </div>
              <div>
                <h4 className="font-bold text-white mb-2">The Solution & Workflow</h4>
                <p className="leading-relaxed">{study.solution}</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-cyan-300 font-mono text-xs">
              <strong>Quantified Impact:</strong> {study.quantitativeImpact}
            </div>

            <div className="pl-4 border-l-2 border-cyan-400 italic text-slate-300 text-sm">
              "{study.quote}"
              <span className="block not-italic font-mono text-xs text-slate-400 mt-2">
                — {study.authorTitle}
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
