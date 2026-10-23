import React from 'react';
import { Compass, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { INDUSTRIES_DATA } from '../../data/industries';
import { useAppStore } from '../../store/useAppStore';

export const IndustriesView: React.FC = () => {
  const { selectedIndustryId, setSelectedIndustryId, setRoute } = useAppStore();
  const selectedInd = INDUSTRIES_DATA.find(i => i.id === selectedIndustryId) || INDUSTRIES_DATA[0];

  return (
    <div className="py-16 px-6 max-w-7xl mx-auto space-y-16">
      
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-cyan-400">
          <Compass className="w-4 h-4" />
          <span>Industrial Applications & Physics Regimes</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
          Aerodynamic & Thermal Industry Solutions
        </h1>
        <p className="text-base text-slate-300 leading-relaxed">
          From transonic aerospace separation and Formula ground effects to micro-channel server rack cold plates and blood vessel hemodynamics.
        </p>
      </div>

      {/* Selector row */}
      <div className="flex gap-2 overflow-x-auto pb-2 border-b border-white/10">
        {INDUSTRIES_DATA.map((ind) => (
          <button
            key={ind.id}
            onClick={() => setSelectedIndustryId(ind.id)}
            className={`px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
              selectedInd.id === ind.id
                ? 'bg-cyan-500 text-black font-semibold'
                : 'text-slate-400 hover:text-white bg-white/5'
            }`}
          >
            {ind.title}
          </button>
        ))}
      </div>

      {/* Active Industry Deep Dive */}
      <div className="glass-panel rounded-2xl p-8 sm:p-10 border border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        <div className="lg:col-span-7 space-y-6">
          <div>
            <span className="text-xs font-mono uppercase text-cyan-400 block mb-1">
              {selectedInd.category}
            </span>
            <h2 className="text-3xl font-bold text-white mb-2">
              {selectedInd.title}
            </h2>
            <p className="text-base text-cyan-300/90 font-medium">
              {selectedInd.headline}
            </p>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            {selectedInd.description}
          </p>

          {/* Key Physics */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
              Dominant Flow Physics
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {selectedInd.keyPhysics.map((phys, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-white/5 border border-white/5 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="text-slate-200">{phys}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Case Highlight */}
          <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-xs">
            <span className="font-mono text-cyan-400 uppercase block mb-1">Industrial Milestone</span>
            <p className="text-slate-300">{selectedInd.caseHighlight}</p>
          </div>

          <button
            onClick={() => setRoute('simulator')}
            className="px-6 py-3 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-black font-semibold text-xs transition-colors cursor-pointer"
          >
            Test Flow in Interactive Simulator
          </button>
        </div>

        {/* Right column specs */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-xl border border-white/10 bg-slate-950/60 space-y-4">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 pb-2 border-b border-white/10">
              Fluid Mechanics Envelope
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div>
                <span className="text-slate-400 text-[10px] block">REYNOLDS REGIME</span>
                <span className="text-white font-bold text-sm">{selectedInd.reynoldsRange}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">MACH NUMBER REGIME</span>
                <span className="text-white font-bold text-sm">{selectedInd.machRange}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-3">
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Performance Targets</span>
              {selectedInd.metrics.map((m, idx) => (
                <div key={idx} className="flex justify-between text-xs">
                  <span className="text-slate-400">{m.label}</span>
                  <span className="font-mono text-cyan-300 font-bold">{m.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
