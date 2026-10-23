import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Sliders, ArrowUpRight, Gauge, Activity } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { 
  calculateReynoldsNumber, 
  estimateCylinderDragCoefficient,
  STANDARD_FLUIDS 
} from '../../utils/cfdMath';

type GeometryShape = 'cylinder' | 'airfoil' | 'square' | 'wedge';

export const LiveMiniTunnel: React.FC = () => {
  const { setRoute, setActivePreset } = useAppStore();
  
  const [shape, setShape] = useState<GeometryShape>('airfoil');
  const [velocity, setVelocity] = useState(12); // m/s
  const [angleOfAttack, setAngleOfAttack] = useState(6); // degrees
  const [isRunning, setIsRunning] = useState(true);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Derived aerodynamic metrics
  const chordLength = shape === 'airfoil' ? 0.20 : shape === 'cylinder' ? 0.08 : 0.06;
  const reynoldsNumber = Math.round(calculateReynoldsNumber(velocity, chordLength, STANDARD_FLUIDS.air.kinematicViscosity));
  
  // Drag and lift calculations
  let cd = 0;
  let cl = 0;

  if (shape === 'cylinder') {
    cd = Number(estimateCylinderDragCoefficient(reynoldsNumber).toFixed(3));
    cl = Number((0.25 * Math.sin(Date.now() / 400)).toFixed(3)); // alternating lift
  } else if (shape === 'airfoil') {
    // Thin airfoil lift slope: Cl = 2*pi * alpha(rad)
    const alphaRad = (angleOfAttack * Math.PI) / 180;
    cl = Number((2 * Math.PI * alphaRad * 0.92).toFixed(3));
    cd = Number((0.008 + 0.045 * Math.pow(cl, 2)).toFixed(3));
  } else if (shape === 'square') {
    cd = 2.05;
    cl = 0.0;
  } else {
    // Wedge
    cd = 0.65;
    cl = 0.05;
  }

  const stagnationPressure = Math.round(0.5 * STANDARD_FLUIDS.air.density * velocity * velocity);

  // Canvas animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const width = (canvas.width = 720);
    const height = (canvas.height = 360);

    // Particle streamlines
    const streamCount = 120;
    const streams: { x: number; y: number; speed: number; age: number; maxAge: number }[] = [];

    for (let i = 0; i < streamCount; i++) {
      streams.push({
        x: Math.random() * width,
        y: Math.random() * height,
        speed: 1.8 + Math.random() * 1.2,
        age: Math.random() * 100,
        maxAge: 100 + Math.random() * 100,
      });
    }

    const obsX = width * 0.42;
    const obsY = height * 0.50;

    let time = 0;

    const render = () => {
      time += 0.04;

      // Dark flow background
      ctx.fillStyle = '#080c14';
      ctx.fillRect(0, 0, width, height);

      // Subtle grid background in wind tunnel
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw obstacle geometry
      ctx.fillStyle = '#1e293b';
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 2;

      ctx.save();
      ctx.translate(obsX, obsY);

      if (shape === 'cylinder') {
        ctx.beginPath();
        ctx.arc(0, 0, 36, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      } else if (shape === 'airfoil') {
        ctx.rotate((-angleOfAttack * Math.PI) / 180);
        ctx.beginPath();
        // NACA symmetric profile approximation
        ctx.moveTo(-60, 0); // Leading edge
        ctx.bezierCurveTo(-30, -26, 20, -18, 70, 0); // Upper camber
        ctx.bezierCurveTo(20, 18, -30, 26, -60, 0); // Lower camber
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      } else if (shape === 'square') {
        ctx.beginPath();
        ctx.rect(-30, -30, 60, 60);
        ctx.fill();
        ctx.stroke();
      } else {
        // Wedge
        ctx.beginPath();
        ctx.moveTo(-40, 0);
        ctx.lineTo(40, -30);
        ctx.lineTo(40, 30);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }
      ctx.restore();

      // Animate fluid streamlines if running
      if (isRunning) {
        for (let i = 0; i < streams.length; i++) {
          const s = streams[i];
          const dx = s.x - obsX;
          const dy = s.y - obsY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const baseSpeed = (velocity / 12) * s.speed * 2.2;
          let u = baseSpeed;
          let v = 0;

          // Flow deflection around obstacle
          if (shape === 'cylinder') {
            const R = 38;
            if (dist < 180 && dist > R) {
              const theta = Math.atan2(dy, dx);
              const factor = (R * R) / (dist * dist);
              u = baseSpeed * (1 - factor * Math.cos(2 * theta));
              v = -baseSpeed * factor * Math.sin(2 * theta);

              // Karman vortex wake oscillation downstream
              if (dx > R) {
                const wakeRatio = (dx - R) / 50;
                v += Math.sin(wakeRatio * 1.5 - time * 2) * Math.exp(-wakeRatio * 0.12) * 2.2;
              }
            } else if (dist <= R) {
              s.y += (dy >= 0 ? 1 : -1) * 3;
            }
          } else if (shape === 'airfoil') {
            // Airfoil circulation + deflection
            const alphaRad = (angleOfAttack * Math.PI) / 180;
            if (Math.abs(dx) < 120 && Math.abs(dy) < 80) {
              const camberDeflect = Math.sin(alphaRad) * 2.5;
              v += -camberDeflect * (1 - Math.abs(dx) / 120);
              if (dy < 0) {
                u *= 1.35; // Suction side acceleration
              } else {
                u *= 0.85; // Pressure side deceleration
              }
            }
          } else {
            // Bluff body wake separation
            if (dx > 0 && dx < 140 && Math.abs(dy) < 45) {
              v += Math.sin(dx * 0.1 - time * 3) * 3;
              u *= 0.4; // Wake deficit
            }
          }

          const oldX = s.x;
          const oldY = s.y;
          s.x += u;
          s.y += v;
          s.age++;

          // Streamline color map by velocity
          const currentSpeed = Math.sqrt(u * u + v * v);
          const speedNorm = Math.min(1.0, currentSpeed / (baseSpeed * 1.5));

          ctx.beginPath();
          ctx.moveTo(oldX, oldY);
          ctx.lineTo(s.x, s.y);

          // Scientific cyan-yellow-orange colormap
          if (speedNorm > 0.8) {
            ctx.strokeStyle = `rgba(245, 158, 11, ${0.75})`;
          } else if (speedNorm > 0.5) {
            ctx.strokeStyle = `rgba(6, 182, 212, ${0.65})`;
          } else {
            ctx.strokeStyle = `rgba(37, 99, 235, ${0.45})`;
          }

          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Respawn logic
          if (s.x > width + 10 || s.y < 0 || s.y > height || s.age > s.maxAge) {
            streams[i] = {
              x: -10,
              y: Math.random() * height,
              speed: 1.8 + Math.random() * 1.2,
              age: 0,
              maxAge: 100 + Math.random() * 80,
            };
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [shape, velocity, angleOfAttack, isRunning]);

  const handleLaunchFullSim = () => {
    setActivePreset(shape === 'cylinder' ? 'cylinder_karman' : shape === 'airfoil' ? 'airfoil_naca' : 'step_flow');
    setRoute('simulator');
  };

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      
      {/* Section Kicker & Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-cyan-400 mb-2">
            <Activity className="w-4 h-4" />
            <span>Interactive Micro-Tunnel · Live In-Browser Execution</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white dark:text-white light:text-slate-900">
            Real-Time Aerodynamic Field & Force Polar
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-xl">
            Test geometry response, angle of attack deflection, and velocity boundary conditions. See live velocity streamlines, wake detachment, and instantaneous force coefficients.
          </p>
        </div>

        <button
          onClick={handleLaunchFullSim}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-black font-semibold text-xs transition-colors shrink-0 cursor-pointer"
        >
          <span>Open Full Mesh Simulator</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      {/* Main Interactive Stage */}
      <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12">
        
        {/* Left / Center Viewport (8 Cols) */}
        <div className="lg:col-span-8 p-4 relative flex flex-col items-center justify-center bg-[#070b12] border-b lg:border-b-0 lg:border-r border-white/10">
          
          {/* Top Status Overlay */}
          <div className="w-full flex items-center justify-between text-xs font-mono text-slate-400 mb-2 px-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>TEST CHAMBER: 720 × 360 MM</span>
            </div>
            <div>
              <span>MEDIUM: AIR (ρ = 1.225 kg/m³)</span>
            </div>
          </div>

          {/* Canvas */}
          <div className="w-full relative aspect-[2/1] rounded-lg overflow-hidden border border-white/5">
            <canvas
              ref={canvasRef}
              className="w-full h-full block"
            />

            {/* Velocity colormap legend bottom left */}
            <div className="absolute bottom-3 left-3 glass-panel px-3 py-1.5 rounded text-[10px] font-mono border border-white/10">
              <div className="text-slate-400 mb-1">Velocity Magnitude (m/s)</div>
              <div className="flex items-center gap-1.5">
                <span className="text-blue-400">0.0</span>
                <div className="w-24 h-2 rounded bg-gradient-to-r from-blue-600 via-cyan-400 to-amber-500" />
                <span className="text-amber-400">{Math.round(velocity * 1.5)}</span>
              </div>
            </div>
          </div>

          {/* Quick Controls Bar */}
          <div className="w-full flex items-center justify-between mt-3 px-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className="px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-slate-200 flex items-center gap-1.5 transition-colors"
              >
                {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isRunning ? 'Pause Flow' : 'Resume Flow'}</span>
              </button>

              <button
                onClick={() => {
                  setVelocity(12);
                  setAngleOfAttack(6);
                }}
                className="p-1.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-colors"
                title="Reset Parameters"
                aria-label="Reset parameters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="text-xs font-mono text-slate-400">
              Flow Regime: <span className="text-cyan-400 font-semibold">{reynoldsNumber > 10000 ? 'Turbulent Wake' : 'Laminar Boundary'}</span>
            </div>
          </div>

        </div>

        {/* Right Parameter & Telemetry HUD (4 Cols) */}
        <div className="lg:col-span-4 p-6 bg-slate-950/40 flex flex-col justify-between space-y-6">
          
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
              <Sliders className="w-3.5 h-3.5 text-cyan-400" />
              <span>Boundary Parameters</span>
            </h3>

            {/* Geometry Selector */}
            <div className="space-y-3 mb-6">
              <label className="text-xs font-medium text-slate-300">Test Obstacle Geometry</label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { id: 'airfoil' as GeometryShape, label: 'NACA 0012 Foil' },
                  { id: 'cylinder' as GeometryShape, label: 'Circular Cylinder' },
                  { id: 'square' as GeometryShape, label: 'Square Bluff Body' },
                  { id: 'wedge' as GeometryShape, label: 'Supersonic Wedge' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setShape(item.id)}
                    className={`py-2 px-3 rounded-lg border text-left font-medium transition-all ${
                      shape === item.id
                        ? 'bg-cyan-500/20 border-cyan-500 text-white shadow-sm'
                        : 'bg-white/[0.03] border-white/5 text-slate-400 hover:bg-white/[0.08]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Velocity Slider */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Inlet Velocity (U_inf)</span>
                <span className="font-mono text-cyan-400 font-semibold">{velocity} m/s</span>
              </div>
              <input
                type="range"
                min="2"
                max="30"
                step="1"
                value={velocity}
                onChange={(e) => setVelocity(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            {/* Angle of Attack (if airfoil) */}
            {shape === 'airfoil' && (
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Angle of Attack (α)</span>
                  <span className="font-mono text-cyan-400 font-semibold">{angleOfAttack}°</span>
                </div>
                <input
                  type="range"
                  min="-10"
                  max="20"
                  step="1"
                  value={angleOfAttack}
                  onChange={(e) => setAngleOfAttack(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>
            )}
          </div>

          {/* Telemetry Output HUD */}
          <div className="border-t border-white/10 pt-4 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5 text-amber-400" />
              <span>Calibrated Telemetry</span>
            </h4>

            <div className="grid grid-cols-2 gap-3 font-mono">
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                <div className="text-[10px] text-slate-400">REYNOLDS (Re)</div>
                <div className="text-base font-bold text-white tabular-nums">{reynoldsNumber.toLocaleString()}</div>
              </div>
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                <div className="text-[10px] text-slate-400">DYNAMIC PRESS (q)</div>
                <div className="text-base font-bold text-white tabular-nums">{stagnationPressure} Pa</div>
              </div>
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                <div className="text-[10px] text-slate-400">DRAG COEFF (Cd)</div>
                <div className="text-base font-bold text-amber-400 tabular-nums">{cd}</div>
              </div>
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                <div className="text-[10px] text-slate-400">LIFT COEFF (Cl)</div>
                <div className="text-base font-bold text-cyan-400 tabular-nums">{cl}</div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};
