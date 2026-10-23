/**
 * CFD Mathematical and Dimensionless Utility Library
 * Verified against standard aerodynamics formulations (Anderson, White, Schlichting).
 */

export interface FluidProperties {
  density: number; // kg/m^3
  dynamicViscosity: number; // Pa·s
  kinematicViscosity: number; // m^2/s
  speedOfSound: number; // m/s
}

export const STANDARD_FLUIDS: Record<string, FluidProperties> = {
  air: {
    density: 1.225,
    dynamicViscosity: 1.81e-5,
    kinematicViscosity: 1.48e-5,
    speedOfSound: 340.3,
  },
  water: {
    density: 998.2,
    dynamicViscosity: 1.002e-3,
    kinematicViscosity: 1.004e-6,
    speedOfSound: 1481.0,
  },
  oil: {
    density: 880.0,
    dynamicViscosity: 0.029,
    kinematicViscosity: 3.295e-5,
    speedOfSound: 1380.0,
  },
};

/**
 * Calculates the Reynolds number: Re = (ρ * V * L) / μ = (V * L) / ν
 */
export function calculateReynoldsNumber(velocity: number, characteristicLength: number, kinematicViscosity: number): number {
  if (kinematicViscosity <= 0 || characteristicLength <= 0 || velocity < 0) {
    return 0;
  }
  return (velocity * characteristicLength) / kinematicViscosity;
}

/**
 * Calculates Mach number: Ma = V / a
 */
export function calculateMachNumber(velocity: number, speedOfSound: number): number {
  if (speedOfSound <= 0 || velocity < 0) {
    return 0;
  }
  return velocity / speedOfSound;
}

/**
 * Classifies flow regime based on Reynolds number for flat plate / external flow
 */
export function classifyFlowRegime(re: number): 'Laminar' | 'Transitional' | 'Turbulent' {
  if (re < 2300) return 'Laminar';
  if (re <= 10000) return 'Transitional';
  return 'Turbulent';
}

/**
 * Calculates first cell height (y) for a targeted y+ value:
 * y+ = (y * u_tau) / ν
 * where u_tau = sqrt(τ_w / ρ)
 * and skin friction coefficient for turbulent flat plate: C_f = 0.058 * Re^(-0.2)
 */
export function calculateFirstCellHeight(targetYPlus: number, velocity: number, characteristicLength: number, density: number, kinematicViscosity: number): number {
  if (velocity <= 0 || characteristicLength <= 0 || density <= 0 || kinematicViscosity <= 0 || targetYPlus <= 0) {
    return 0;
  }
  const re = calculateReynoldsNumber(velocity, characteristicLength, kinematicViscosity);
  if (re <= 0) return 0;
  
  // Turbulent skin friction estimation (Schlichting / White)
  const cf = 0.058 * Math.pow(re, -0.2);
  const wallShearStress = 0.5 * cf * density * velocity * velocity;
  const frictionVelocity = Math.sqrt(wallShearStress / density);
  
  if (frictionVelocity <= 0) return 0;
  return (targetYPlus * kinematicViscosity) / frictionVelocity;
}

/**
 * Estimates cylinder drag coefficient based on empirical Re correlations (Wieselsberger, Tritton, Roshko)
 */
export function estimateCylinderDragCoefficient(re: number): number {
  if (re <= 0) return 0;
  if (re < 1) {
    // Stokes flow regime: Oseen approximation
    return (8 * Math.PI) / (re * (0.5 - 0.5772 - Math.log(re / 8)));
  }
  if (re < 40) {
    // Steady twin vortex regime
    return 1 + 10 / Math.pow(re, 0.67);
  }
  if (re < 1000) {
    // Laminar vortex shedding (Karman vortex street)
    return 0.9 + 0.3 * Math.exp(-re / 250);
  }
  if (re < 2e5) {
    // Subcritical plateau
    return 1.15;
  }
  // Critical drag crisis
  return 0.35;
}

/**
 * Calculates Courant-Friedrichs-Lewy (CFL) number for 2D Lattice Boltzmann or Finite Volume:
 * CFL = (u * Δt) / Δx
 */
export function calculateCFLNumber(velocity: number, dt: number, dx: number): number {
  if (dx <= 0 || dt <= 0 || velocity < 0) return 0;
  return (velocity * dt) / dx;
}
