import React from 'react';
import { TRUST_PARTNERS } from '../../data/trustLogos';

export const TrustStrip: React.FC = () => {
  return (
    <div className="w-full border-y border-white/10 dark:border-white/10 light:border-slate-200 py-8 bg-[#090d14]/70 dark:bg-[#090d14]/70 light:bg-slate-100/70 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <p className="text-xs uppercase font-mono tracking-wider text-slate-400">
            Validated against canonical aerospace standards & research benchmarks
          </p>
          <div className="flex items-center gap-3 text-[11px] font-mono text-slate-500">
            <span>AIAA G-077 Guidelines</span>
            <span>·</span>
            <span>ASME V&V 20 Computational Protocols</span>
          </div>
        </div>

        {/* Logos & Badges Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {TRUST_PARTNERS.map((partner) => (
            <div 
              key={partner.acronym}
              className="p-3.5 rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-cyan-500/30 transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-slate-200 group-hover:text-cyan-400 transition-colors">
                  {partner.acronym}
                </span>
                <span className="text-[9px] uppercase font-mono text-slate-500">
                  REF
                </span>
              </div>
              <div className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                {partner.type}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
