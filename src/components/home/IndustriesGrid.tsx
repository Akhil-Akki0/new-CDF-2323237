import React, { useState } from 'react';
import { Compass, ArrowRight, Plane, Car, Wind, Building2, Anchor, Cpu, HeartPulse, Trophy } from 'lucide-react';
import { INDUSTRIES_DATA } from '../../data/industries';
import { useAppStore } from '../../store/useAppStore';

const INDUSTRY_ICONS: Record<string, React.ReactNode> = {
  aerospace: <Plane className="w-5 h-5 text-cyan-400" />,
  automotive: <Car className="w-5 h-5 text-amber-400" />,
  energy: <Wind className="w-5 h-5 text-emerald-400" />,
  hvac: <Building2 className="w-5 h-5 text-blue-400" />,
  marine: <Anchor className="w-5 h-5 text-teal-400" />,
  electronics: <Cpu className="w-5 h-5 text-purple-400" />,
  biomedical: <HeartPulse className="w-5 h-5 text-rose-400" />,
  sports: <Trophy className="w-5 h-5 text-yellow-400" />,
};

export const IndustriesGrid: React.FC = () => {
  const { setRoute, setSelectedIndustryId } = useAppStore();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All 8 Industries' },
    { id: 'transport', label: 'Mobility & Aero' },
    { id: 'energy-built', label: 'Energy & Built' },
    { id: 'thermal-bio', label: 'Thermal & Bio' },
  ];

  const filteredIndustries = INDUSTRIES_DATA.filter((ind) => {
    if (activeCategory === 'transport') return ind.id === 'aerospace' || ind.id === 'automotive' || ind.id === 'marine' || ind.id === 'sports';
    if (activeCategory === 'energy-built') return ind.id === 'energy' || ind.id === 'hvac';
    if (activeCategory === 'thermal-bio') return ind.id === 'electronics' || ind.id === 'biomedical';
    return true;
  });

  const handleSelectIndustry = (id: string) => {
    setSelectedIndustryId(id);
    setRoute('industries');
  };

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-cyan-400 mb-2">
            <Compass className="w-4 h-4" />
            <span>Applied Engineering Domains · Real Flow Regimes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white dark:text-white light:text-slate-900">
            Validated Across 8 Specialized Industries
          </h2>
          <p className="text-sm text-slate-400 mt-2 max-w-xl">
            From transonic shock-induced separation to micro-channel conjugate heat transfer and cardiovascular pulsatile shear stress.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-white/5 border border-white/10 rounded-lg shrink-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-cyan-500 text-black font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of 8 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredIndustries.map((ind) => (
          <div
            key={ind.id}
            onClick={() => handleSelectIndustry(ind.id)}
            className="group glass-panel rounded-xl p-6 border border-white/10 hover:border-cyan-500/40 hover:-translate-y-1 transition-all flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                  {INDUSTRY_ICONS[ind.id] || <Compass className="w-5 h-5 text-cyan-400" />}
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                  {ind.machRange}
                </span>
              </div>

              <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors mb-1">
                {ind.title}
              </h3>
              
              <p className="text-xs text-slate-400 font-medium mb-3">
                {ind.category}
              </p>

              <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 mb-4">
                {ind.headline}
              </p>

              {/* Key Physics tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {ind.keyPhysics.slice(0, 2).map((phys, pIdx) => (
                  <span
                    key={pIdx}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5"
                  >
                    {phys}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom card metrics */}
            <div className="border-t border-white/10 pt-4 flex items-center justify-between text-xs">
              <div>
                <span className="text-[10px] text-slate-500 block">REYNOLDS REGIME</span>
                <span className="font-mono text-xs font-semibold text-cyan-300">{ind.reynoldsRange}</span>
              </div>
              <div className="flex items-center gap-1 text-cyan-400 font-medium group-hover:translate-x-1 transition-transform">
                <span>Explore</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
};
