import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight, FileText } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubmitted(true);
    }
  };

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto border-t border-white/5">
      <div className="glass-panel rounded-2xl p-8 sm:p-12 border border-white/10 relative overflow-hidden">
        
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-cyan-400 mb-3">
            <FileText className="w-4 h-4" />
            <span>Quarterly Validation Whitepapers & Solver Release Notes</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
            Stay Calibrated with CFD Verification Research
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
            Receive technical reports on Lattice Boltzmann boundary condition formulations, high-Re turbulence transition studies, and open-source benchmark dataset releases. No marketing spam.
          </p>

          {submitted ? (
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <span className="font-semibold block text-white">Subscription Confirmed</span>
                <span>You will receive the Q4 Verification Whitepaper (ASME V&V 20 Protocol) shortly.</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="engineer@institution.edu or work email"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-black text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer shrink-0"
              >
                <span>Subscribe to Whitepapers</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          <div className="flex items-center gap-4 text-[10px] font-mono text-slate-400 mt-4">
            <span>Quarterly frequency</span>
            <span>·</span>
            <span>Unsubscribe anytime</span>
            <span>·</span>
            <span>Adheres to strict privacy ethics</span>
          </div>
        </div>

      </div>
    </section>
  );
};
