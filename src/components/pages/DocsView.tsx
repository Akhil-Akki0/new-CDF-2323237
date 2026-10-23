import React, { useState } from 'react';
import { Code2, Copy, Check, Terminal, FileCode, Layers } from 'lucide-react';

export const DocsView: React.FC = () => {
  const [activeLang, setActiveLang] = useState<'python' | 'javascript' | 'curl'>('python');
  const [copied, setCopied] = useState(false);

  const pythonSnippet = `# AetherCFD Client Solver Python Script
import aether_cfd as acfd
import numpy as np

# 1. Initialize 2D Lattice Boltzmann Grid
grid = acfd.D2Q9Grid(nx=256, ny=128, dx=0.002)

# 2. Add Obstacle Geometry (NACA 0012 Airfoil)
foil = acfd.geometry.NACA0012(chord=0.20, alpha_deg=6.0)
grid.add_obstacle(foil, center=(0.08, 0.128))

# 3. Configure Boundary Conditions
grid.set_inlet_velocity(u_inf=15.0)  # m/s in air
grid.set_reynolds_number(re=100000)

# 4. Run Steady-State Streaming Iterations
result = grid.solve(iterations=4000, tolerance=1e-5)

print(f"Convergence Status: {result.converged}")
print(f"Calculated Lift Coefficient (Cl): {result.cl:.4f}")
print(f"Calculated Drag Coefficient (Cd): {result.cd:.4f}")

# 5. Export Audit-Grade Multi-Sheet Excel
result.export_excel("airfoil_validation_polar.xlsx")
`;

  const jsSnippet = `// AetherCFD Client-Side Web Worker Integration
import { LocalSolverAdapter } from '@aether-cfd/solver-core';

const solver = new LocalSolverAdapter({
  lattice: 'D2Q9',
  dimensions: { nx: 256, ny: 128 },
  fluid: 'air',
  inletVelocity: 15.0,
});

// Register obstacle mask
solver.setObstacleMask(myAirfoilBitmap);

// Stream real-time residuals and probe telemetry
solver.on('iteration', ({ step, residuals, forces }) => {
  console.log(\`Step \${step}: L2 Residual = \${residuals.l2Norm.toExponential(3)}\`);
  console.log(\`Cd = \${forces.cd.toFixed(3)}, Cl = \${forces.cl.toFixed(3)}\`);
});

// Execute in background Web Worker
await solver.run({ maxSteps: 5000, tolerance: 1e-6 });
`;

  const curlSnippet = `# Fetch Canonical Ghia et al. 1982 Benchmark Dataset
curl -X GET "https://api.aethercfd.org/v1/benchmarks/lid-driven-cavity?re=1000" \\
     -H "Accept: application/json"

# Response returns exact reference coordinates, u-velocity, and v-velocity profiles
`;

  const currentCode = activeLang === 'python' ? pythonSnippet : activeLang === 'javascript' ? jsSnippet : curlSnippet;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-16 px-6 max-w-7xl mx-auto space-y-16">
      
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-cyan-400">
          <Code2 className="w-4 h-4" />
          <span>Developer API & Solver Interfaces</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
          Documentation & Programmatic Access
        </h1>
        <p className="text-base text-slate-300 leading-relaxed">
          Script simulations, automate parametric geometric sweeps, export raw force vectors, and fetch canonical verification benchmark datasets directly via Python, TypeScript, or REST.
        </p>
      </div>

      {/* Code Snippet Workbench */}
      <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-white/10 bg-slate-950/80">
          <div className="flex items-center gap-2">
            {[
              { id: 'python' as const, label: 'Python SDK' },
              { id: 'javascript' as const, label: 'TypeScript / Web Worker' },
              { id: 'curl' as const, label: 'REST cURL API' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveLang(tab.id)}
                className={`px-3 py-1.5 rounded-md text-xs font-mono transition-colors cursor-pointer ${
                  activeLang === tab.id
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied' : 'Copy Code'}</span>
          </button>
        </div>

        <div className="p-6 bg-[#06080d] overflow-x-auto">
          <pre className="font-mono text-xs text-slate-200 leading-relaxed">
            <code>{currentCode}</code>
          </pre>
        </div>
      </div>

      {/* Documentation topics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl border border-white/10 bg-slate-950/40 space-y-2">
          <h3 className="font-bold text-white text-sm">D2Q9 Velocity Tensors</h3>
          <p className="text-xs text-slate-300">
            Definition of discrete velocity vectors c_i = [(0,0), (±1,0), (0,±1), (±1,±1)] and lattice speed of sound c_s = 1/√3.
          </p>
        </div>
        <div className="p-6 rounded-xl border border-white/10 bg-slate-950/40 space-y-2">
          <h3 className="font-bold text-white text-sm">Bounce-Back Walls</h3>
          <p className="text-xs text-slate-300">
            Mid-grid bounce-back rule for no-slip solid boundaries with second-order spatial accuracy.
          </p>
        </div>
        <div className="p-6 rounded-xl border border-white/10 bg-slate-950/40 space-y-2">
          <h3 className="font-bold text-white text-sm">ExcelJS Export Schema</h3>
          <p className="text-xs text-slate-300">
            Format specifications for multi-sheet workbooks: Summary, Probes, Forces, and 2D Sampled Grids.
          </p>
        </div>
      </div>

    </div>
  );
};
