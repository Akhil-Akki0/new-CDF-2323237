import React from 'react';
import { Play, CheckCircle2, ArrowRight, ShieldCheck, Cpu, Activity, Compass, FileSpreadsheet } from 'lucide-react';
import { FluidHeroCanvas } from './FluidHeroCanvas';
import { TrustStrip } from './TrustStrip';
import { PlatformLayers } from './PlatformLayers';
import { LiveMiniTunnel } from './LiveMiniTunnel';
import { ScientificStats } from './ScientificStats';
import { IndustriesGrid } from './IndustriesGrid';
import { BenchmarkPreview } from './BenchmarkPreview';
import { CaseStudiesSection } from './CaseStudiesSection';
import { ComparisonTable } from './ComparisonTable';
import { NewsletterSection } from './NewsletterSection';
import { useAppStore } from '../../store/useAppStore';

export const HomeView: React.FC = () => {
  const { setRoute } = useAppStore();

  return (
    <div className="relative w-full overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative min-h-[92vh] flex items-center justify-center px-6 pt-16 pb-24 overflow-hidden">
        {/* Animated Fluid Canvas Backdrop */}
        <FluidHeroCanvas />

        {/* Blueprint background grid lines */}
        <div className="absolute inset-0 bg-grid-pattern pointer-events-none opacity-40" />

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          
          {/* Scientific Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 text-[11px] sm:text-xs font-mono shadow-sm">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shrink-0" />
            <span className="truncate">AETHERCFD ENGINE v2.4 · 2D LBM (D2Q9)</span>
          </div>

          {/* Main Editorial Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white dark:text-white light:text-slate-900 leading-[1.08] max-w-4xl mx-auto">
            The Most Transparent & Validated CFD Workspace in Your Browser.
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-slate-300 dark:text-slate-300 light:text-slate-600 max-w-3xl mx-auto leading-relaxed font-normal">
            Instant, zero-install, zero-login fluid dynamics. Run D2Q9 Lattice Boltzmann solvers at 60 FPS, validate against canonical wind-tunnel benchmarks, and export audit-ready Excel workbooks with embedded charts in one click.
          </p>

          {/* Dual CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setRoute('simulator')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-sm transition-all shadow-lg shadow-cyan-500/20 hover:scale-[1.02] flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-black" />
              <span>Launch Simulator</span>
            </button>

            <button
              onClick={() => setRoute('validation')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl glass-panel hover:bg-white/10 text-white font-semibold text-sm transition-all border border-white/10 flex items-center justify-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>Explore Validation</span>
            </button>
          </div>

          {/* Key Attributes Strip */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>Web Worker Multithreaded</span>
            </div>
            <span>·</span>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% Client-Side Privacy</span>
            </div>
            <span>·</span>
            <div className="flex items-center gap-1.5">
              <FileSpreadsheet className="w-3.5 h-3.5 text-amber-400" />
              <span>Multi-Sheet ExcelJS Export</span>
            </div>
          </div>

        </div>

      </section>

      {/* Trust Strip */}
      <TrustStrip />

      {/* Mission & Transparency Statement */}
      <section className="py-20 px-6 max-w-4xl mx-auto text-center space-y-4">
        <div className="text-xs font-mono uppercase text-cyan-400 tracking-wider">
          Our Guiding Philosophy
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          "Engineering rigor demands reproducible mathematics, not opaque marketing claims."
        </h2>
        <p className="text-sm text-slate-400 leading-relaxed">
          Traditional CFD vendors gate aerodynamic simulation behind multi-thousand-dollar licenses, proprietary data silos, and cumbersome cloud queues. We believe foundational fluid mechanics should be instantaneously accessible, completely verifiable against classical literature benchmarks, and exportable directly into the tools engineers trust most: Excel and open spreadsheets.
        </p>
      </section>

      {/* Platform Architecture in 3 Layers (Neural Concept Style) */}
      <PlatformLayers />

      {/* Embedded Live Mini-Simulation Wind Tunnel */}
      <LiveMiniTunnel />

      {/* Scientific Empirical Stats */}
      <ScientificStats />

      {/* 8 Industries Grid */}
      <IndustriesGrid />

      {/* Canonical Benchmarks Preview */}
      <BenchmarkPreview />

      {/* Real-World Case Studies */}
      <CaseStudiesSection />

      {/* "Why Us vs Others" Comparison Table */}
      <ComparisonTable />

      {/* Newsletter Section */}
      <NewsletterSection />

    </div>
  );
};
