import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, MessageSquare, PhoneCall } from 'lucide-react';

export const ContactView: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    institution: '',
    industry: 'aerospace',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
    }
  };

  return (
    <div className="py-16 px-6 max-w-7xl mx-auto space-y-16">
      
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-cyan-400">
          <MessageSquare className="w-4 h-4" />
          <span>Technical Consultation & Academic Engagement</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
          Talk to a CFD Aerodynamicist
        </h1>
        <p className="text-base text-slate-300 leading-relaxed">
          Have questions regarding mesh convergence, boundary layer approximations, custom geometry import, or integrating AetherCFD into university engineering curricula? Reach our technical engineering team.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Form (7 Cols) */}
        <div className="lg:col-span-7 glass-panel rounded-2xl p-8 border border-white/10">
          {submitted ? (
            <div className="p-8 text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="text-xl font-bold text-white">Message Transmitted</h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                Thank you, {formData.name}. A technical aerodynamics specialist will review your request and reply to <span className="text-cyan-400 font-mono">{formData.email}</span> within 24 business hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300 hover:text-white"
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-300 block mb-1.5 font-medium">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Dr. Katherine Johnson"
                    className="w-full p-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1.5 font-medium">Work / Academic Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="k.johnson@nasa.gov"
                    className="w-full p-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-300 block mb-1.5 font-medium">Institution / Company</label>
                  <input
                    type="text"
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    placeholder="Langley Research Center"
                    className="w-full p-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1.5 font-medium">Primary Industry</label>
                  <select
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    className="w-full p-2.5 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="aerospace" className="bg-slate-900">Aerospace & Defense</option>
                    <option value="automotive" className="bg-slate-900">Automotive & Motorsport</option>
                    <option value="energy" className="bg-slate-900">Energy & Turbines</option>
                    <option value="thermal" className="bg-slate-900">Electronics Cooling</option>
                    <option value="academic" className="bg-slate-900">Academic & Teaching</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-300 block mb-1.5 font-medium">Technical Inquiry or Physics Description *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your boundary conditions, Reynolds number range, or geometry questions..."
                  className="w-full p-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-black font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Technical Inquiry</span>
              </button>
            </form>
          )}
        </div>

        {/* Right Info (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-xl border border-white/10 bg-slate-950/60 space-y-4">
            <h3 className="font-bold text-white text-sm">Direct Contact Channels</h3>
            
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-cyan-400 mt-0.5" />
                <div>
                  <span className="font-mono text-white block">aerodynamics@aethercfd.org</span>
                  <span className="text-slate-400 text-[11px]">Primary technical response desk</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5" />
                <div>
                  <span className="font-mono text-white block">AIAA & ASME Working Groups</span>
                  <span className="text-slate-400 text-[11px]">Active committee contributions</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 text-[11px] text-slate-400">
              For academic course licensing and student workshop accounts, educational access is always 100% free with unlimited browser exports.
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
