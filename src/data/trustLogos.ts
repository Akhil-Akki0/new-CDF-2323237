export interface TrustPartner {
  name: string;
  acronym: string;
  type: string;
  description: string;
}

export const TRUST_PARTNERS: TrustPartner[] = [
  {
    name: 'American Institute of Aeronautics and Astronautics',
    acronym: 'AIAA',
    type: 'Standards Benchmark (G-077)',
    description: 'CFD drag prediction workshop guidelines and verification protocols.',
  },
  {
    name: 'American Society of Mechanical Engineers',
    acronym: 'ASME',
    type: 'V&V 20 Standards',
    description: 'Verification and validation in computational fluid dynamics and heat transfer.',
  },
  {
    name: 'European Research Community on Flow, Turbulence & Combustion',
    acronym: 'ERCOFTAC',
    type: 'Turbulence Benchmarks',
    description: 'Classical benchmark database for aerodynamic flow separation.',
  },
  {
    name: 'Stanford Center for Turbulence Research',
    acronym: 'STANFORD CTR',
    type: 'Academic Reference',
    description: 'Direct numerical simulation and large-eddy simulation canonical datasets.',
  },
  {
    name: 'MIT Department of Aeronautics & Astronautics',
    acronym: 'MIT AEROASTRO',
    type: 'Curriculum & Research',
    description: 'Aerodynamic theory and numerical methods for partial differential equations.',
  },
  {
    name: 'Imperial College London CFD Laboratory',
    acronym: 'IMPERIAL CFD',
    type: 'High-Order Research',
    description: 'Spectral element and Lattice Boltzmann flow physics research.',
  },
];
