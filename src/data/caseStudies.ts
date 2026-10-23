import { CaseStudyItem } from '../types';

export const CASE_STUDIES: CaseStudyItem[] = [
  {
    id: 'case-aero-intake',
    title: 'Mitigating Nacelle Intake Separation in Crosswinds',
    sector: 'Aerospace Engineering',
    clientAlias: 'Aerospace Systems Directorate (Placeholder)',
    problem: 'During high-crosswind low-speed taxiing, adverse pressure gradients inside the engine lip induced boundary layer detachment, risking compressor stall.',
    solution: 'Used AetherCFD in-browser 2D flow solver to evaluate 28 lip curvature radius variations in under 4 hours, without waiting for cloud HPC cluster queues.',
    quantitativeImpact: '4.2x Faster Iteration · 0.8% error vs Mach 0.25 wind tunnel data · 100% Client-side IP confidentiality',
    quote: 'The instant response and immediate Excel export of wall pressure coefficients gave our aerodynamicists the exact validation data needed for the morning design review.',
    authorTitle: 'Chief Aerodynamics Specialist, Propulsion Aerodynamics',
  },
  {
    id: 'case-formula-diffuser',
    title: 'Formula E Diffuser Ground-Proximity Stall Mitigation',
    sector: 'Motorsport Aerodynamics',
    clientAlias: 'Apex Racing Dynamics (Placeholder)',
    problem: 'Ride height fluctuations over kerbs caused abrupt diffuser stall and sudden downforce loss at corner entry.',
    solution: 'Parametric simulation of ground clearance sweeps and vortex generator angle of attack with live Kármán shedding visualizations and lift-to-drag monitors.',
    quantitativeImpact: '+18% Base Pressure Recovery · 2.1 Drag Counts Eliminated · Sub-minute setup',
    quote: 'Instead of submitting a 30-minute cloud job for each slight rake angle change, we adjusted geometry live on the screen and exported the raw force curves straight into our race telemetry workbook.',
    authorTitle: 'Head of Aero & Simulation Systems',
  },
  {
    id: 'case-datacenter-thermal',
    title: 'High-Density AI Rack Hotspot Delta-T Reduction',
    sector: 'Hyperscale Infrastructure',
    clientAlias: 'Nordic Compute Labs (Placeholder)',
    problem: '80kW server racks experienced recirculating thermal air pockets in the top chassis slots, requiring excessive fan power consumption.',
    solution: 'Simulated multi-channel air velocity vectors and thermal dissipation across server baffle plates to re-balance the pressure drop ΔP across the cold aisle.',
    quantitativeImpact: '6.4°C Peak Hotspot Reduction · 14.5% Fan Energy Savings · Validated against ASHRAE TC 9.9',
    quote: 'Being able to share an interactive simulation link and download a structured multi-sheet Excel file containing every node temperature transformed our thermal reviews.',
    authorTitle: 'Lead Thermal Architect',
  },
];
