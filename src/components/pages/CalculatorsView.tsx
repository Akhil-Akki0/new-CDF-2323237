import React, { useState } from 'react';
import { Calculator, CheckCircle2, ArrowRight, FileSpreadsheet, RotateCcw } from 'lucide-react';
import { 
  calculateReynoldsNumber, 
  classifyFlowRegime, 
  calculateMachNumber, 
  calculateFirstCellHeight, 
  STANDARD_FLUIDS 
} from '../../utils/cfdMath';

export const CalculatorsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'reynolds' | 'yplus' | 'mach' | 'drag'>('reynolds');

  // Reynolds Calculator state
  const [reVelocity, setReVelocity] = useState(15.0);
  const [reLength, setReLength] = useState(0.25);
  const [reFluid, setReFluid] = useState('air');

  const selectedFluid = STANDARD_FLUIDS[reFluid] || STANDARD_FLUIDS.air;
  const calculatedRe = Math.round(calculateReynoldsNumber(reVelocity, reLength, selectedFluid.kinematicViscosity));
  const flowRegime = classifyFlowRegime(calculatedRe);

  // y+ Calculator state
  const [targetYPlus, setTargetYPlus] = useState(1.0);
  const [yVelocity, setYVelocity] = useState(25.0);
  const [yLength, setYLength] = useState(1.0);
  const calculatedY = calculateFirstCellHeight(
    targetYPlus, 
    yVelocity, 
    yLength, 
    selectedFluid.density, 
    selectedFluid.kinematicViscosity
  );

  // Mach Calculator state
  const [machVelocity, setMachVelocity] = useState(85.0);
  const [speedOfSound, setSpeedOfSound] = useState(340.3);
  const calculatedMach = Number(calculateMachNumber(machVelocity, speedOfSound).toFixed(3));

  // Drag Calculator state
  const [dragForce, setDragForce] = useState(12.5);
  const [dragArea, setDragArea] = useState(0.05);
  const [dragVelocity, setDragVelocity] = useState(20.0);
  const dynamicPressure = 0.5 * selectedFluid.density * dragVelocity * dragVelocity;
  const calculatedCd = dynamicPressure > 0 && dragArea > 0 ? Number((dragForce / (dynamicPressure * dragArea)).toFixed(3)) : 0;

  return (
    <div className="py-16 px-6 max-w-7xl mx-auto space-y-16">
      
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-emerald-400">
          <Calculator className="w-4 h-4" />
          <span>Aerodynamic & Fluid Mechanics Calculators</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
          Engineering Dimensionless Calculators
        </h1>
        <p className="text-base text-slate-300 leading-relaxed">
          Calibrate boundary conditions, mesh first-cell normal height, compressibility limits, and non-dimensional force coefficients according to standard fluid dynamics formulations.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-white/10 pb-2 overflow-x-auto">
        {[
          { id: 'reynolds' as const, label: 'Reynolds Number (Re)' },
          { id: 'yplus' as const, label: 'y+ & First-Cell Mesh Height' },
          { id: 'mach' as const, label: 'Mach Number (Ma)' },
          { id: 'drag' as const, label: 'Drag & Lift Coefficient (Cd/Cl)' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === tab.id
                ? 'bg-emerald-500 text-black'
                : 'bg-white/5 text-slate-300 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Reynolds Number */}
      {activeTab === 'reynolds' && (
        <div className="glass-panel rounded-2xl p-8 border border-white/10 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-5">
            <h3 className="text-xl font-bold text-white">Reynolds Number Formulation</h3>
            <p className="text-xs text-slate-400">
              Formula: <code className="text-emerald-400 font-mono">Re = (ρ · V · L) / μ = (V · L) / ν</code>
            </p>

            <div className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 block mb-1">Working Fluid</label>
                <select
                  value={reFluid}
                  onChange={(e) => setReFluid(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="air" className="bg-slate-900">Air (Standard Sea Level, 15°C)</option>
                  <option value="water" className="bg-slate-900">Water (Fresh, 20°C)</option>
                  <option value="oil" className="bg-slate-900">Engine Oil (SAE 30)</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-300">Free Stream Velocity (V)</span>
                  <span className="font-mono text-emerald-400">{reVelocity} m/s</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="100"
                  step="0.5"
                  value={reVelocity}
                  onChange={(e) => setReVelocity(Number(e.target.value))}
                  className="w-full accent-emerald-400"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-300">Characteristic Length (L / Chord)</span>
                  <span className="font-mono text-emerald-400">{reLength} m</span>
                </div>
                <input
                  type="range"
                  min="0.01"
                  max="5"
                  step="0.01"
                  value={reLength}
                  onChange={(e) => setReLength(Number(e.target.value))}
                  className="w-full accent-emerald-400"
                />
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-slate-950/60 border border-white/10 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Calculated Reynolds Value</span>
              <div className="text-4xl font-bold font-mono text-white mt-2 tabular-nums">
                {calculatedRe.toLocaleString()}
              </div>
              <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-xs font-mono">
                <span>Regime: {flowRegime}</span>
              </div>
            </div>

            <div className="text-xs text-slate-400 space-y-2 pt-4 border-t border-white/10">
              <div>Kinematic Viscosity (ν): <span className="font-mono text-white">{selectedFluid.kinematicViscosity.toExponential(3)} m²/s</span></div>
              <div>Density (ρ): <span className="font-mono text-white">{selectedFluid.density} kg/m³</span></div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: y+ First Cell Height */}
      {activeTab === 'yplus' && (
        <div className="glass-panel rounded-2xl p-8 border border-white/10 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-5">
            <h3 className="text-xl font-bold text-white">First-Cell Height (y) for Target y+</h3>
            <p className="text-xs text-slate-400">
              Estimates normal wall spacing for boundary layer mesh resolution using Schlichting skin friction.
            </p>

            <div className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-300">Target y+ value</span>
                  <span className="font-mono text-emerald-400">{targetYPlus}</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="100"
                  step="0.5"
                  value={targetYPlus}
                  onChange={(e) => setTargetYPlus(Number(e.target.value))}
                  className="w-full accent-emerald-400"
                />
                <span className="text-[10px] text-slate-500">y+ ≈ 1.0 for viscous sublayer; y+ ≈ 30-300 for wall functions.</span>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-300">Inlet Velocity (V)</span>
                  <span className="font-mono text-emerald-400">{yVelocity} m/s</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="120"
                  step="1"
                  value={yVelocity}
                  onChange={(e) => setYVelocity(Number(e.target.value))}
                  className="w-full accent-emerald-400"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-300">Reference Plate Length (L)</span>
                  <span className="font-mono text-emerald-400">{yLength} m</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="10"
                  step="0.1"
                  value={yLength}
                  onChange={(e) => setYLength(Number(e.target.value))}
                  className="w-full accent-emerald-400"
                />
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-slate-950/60 border border-white/10 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Recommended First-Cell Height (Δy)</span>
              <div className="text-3xl font-bold font-mono text-white mt-2 tabular-nums">
                {(calculatedY * 1e6).toFixed(1)} μm
              </div>
              <div className="text-sm font-mono text-emerald-400 mt-1">
                {(calculatedY * 1e3).toFixed(4)} mm
              </div>
            </div>

            <div className="text-xs text-slate-400 pt-4 border-t border-white/10">
              For low-Reynolds wall-resolved LES or k-ω SST without wall functions, ensure the first prismatic prism layer sits below this threshold.
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Mach Number */}
      {activeTab === 'mach' && (
        <div className="glass-panel rounded-2xl p-8 border border-white/10 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-5">
            <h3 className="text-xl font-bold text-white">Mach Number & Incompressibility</h3>
            <p className="text-xs text-slate-400">
              Checks whether density variations are under 5% (Ma &lt; 0.3 incompressible assumption).
            </p>

            <div className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-300">Flow Velocity (V)</span>
                  <span className="font-mono text-emerald-400">{machVelocity} m/s</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="600"
                  step="5"
                  value={machVelocity}
                  onChange={(e) => setMachVelocity(Number(e.target.value))}
                  className="w-full accent-emerald-400"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-300">Speed of Sound in Medium (a)</span>
                  <span className="font-mono text-emerald-400">{speedOfSound} m/s</span>
                </div>
                <input
                  type="range"
                  min="250"
                  max="1500"
                  step="10"
                  value={speedOfSound}
                  onChange={(e) => setSpeedOfSound(Number(e.target.value))}
                  className="w-full accent-emerald-400"
                />
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-slate-950/60 border border-white/10 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Calculated Mach Number (Ma)</span>
              <div className="text-4xl font-bold font-mono text-white mt-2 tabular-nums">
                Ma {calculatedMach}
              </div>
              <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-xs font-mono">
                {calculatedMach < 0.3 ? 'Incompressible Flow (Valid for Browser LBM)' : calculatedMach < 1.0 ? 'Subsonic Compressible' : 'Supersonic (Shock Regime)'}
              </div>
            </div>

            <div className="text-xs text-slate-400 pt-4 border-t border-white/10">
              Browser-based Lattice Boltzmann (D2Q9) operates accurately for Ma &lt; 0.15 to suppress compressibility error terms.
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Drag & Lift */}
      {activeTab === 'drag' && (
        <div className="glass-panel rounded-2xl p-8 border border-white/10 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-5">
            <h3 className="text-xl font-bold text-white">Drag Coefficient (Cd) Estimator</h3>
            <p className="text-xs text-slate-400">
              Cd = F_d / (0.5 · ρ · V² · A)
            </p>

            <div className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-300">Measured Drag Force (Fd)</span>
                  <span className="font-mono text-emerald-400">{dragForce} N</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="100"
                  step="0.5"
                  value={dragForce}
                  onChange={(e) => setDragForce(Number(e.target.value))}
                  className="w-full accent-emerald-400"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-300">Reference Projected Frontal Area (A)</span>
                  <span className="font-mono text-emerald-400">{dragArea} m²</span>
                </div>
                <input
                  type="range"
                  min="0.005"
                  max="1.0"
                  step="0.005"
                  value={dragArea}
                  onChange={(e) => setDragArea(Number(e.target.value))}
                  className="w-full accent-emerald-400"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-300">Free Stream Velocity (V)</span>
                  <span className="font-mono text-emerald-400">{dragVelocity} m/s</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="60"
                  step="1"
                  value={dragVelocity}
                  onChange={(e) => setDragVelocity(Number(e.target.value))}
                  className="w-full accent-emerald-400"
                />
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-slate-950/60 border border-white/10 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Resulting Drag Coefficient (Cd)</span>
              <div className="text-4xl font-bold font-mono text-white mt-2 tabular-nums">
                {calculatedCd}
              </div>
              <div className="text-xs text-slate-400 mt-2">
                Dynamic Pressure: <span className="font-mono text-white">{Math.round(dynamicPressure)} Pa</span>
              </div>
            </div>

            <div className="text-xs text-slate-400 pt-4 border-t border-white/10">
              Calculations assume standard atmospheric air density (1.225 kg/m³).
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
