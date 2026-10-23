import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateReynoldsNumber,
  calculateMachNumber,
  classifyFlowRegime,
  calculateFirstCellHeight,
  estimateCylinderDragCoefficient,
  calculateCFLNumber,
  STANDARD_FLUIDS,
} from './cfdMath';

test('calculateReynoldsNumber correctly calculates laminar flow in air', () => {
  const re = calculateReynoldsNumber(15, 0.1, STANDARD_FLUIDS.air.kinematicViscosity);
  // Re = (15 * 0.1) / 1.48e-5 = 101,351 approx
  assert.ok(re > 100000 && re < 105000);
});

test('calculateReynoldsNumber returns 0 for zero or invalid inputs', () => {
  assert.equal(calculateReynoldsNumber(0, 1.0, 1.48e-5), 0);
  assert.equal(calculateReynoldsNumber(10, -1.0, 1.48e-5), 0);
  assert.equal(calculateReynoldsNumber(10, 1.0, 0), 0);
});

test('calculateMachNumber checks subsonic and supersonic regimes', () => {
  const maSubsonic = calculateMachNumber(68.06, 340.3);
  assert.equal(Math.round(maSubsonic * 10) / 10, 0.2);

  const maSupersonic = calculateMachNumber(680.6, 340.3);
  assert.equal(Math.round(maSupersonic * 10) / 10, 2.0);
});

test('classifyFlowRegime categorizes laminar, transitional, and turbulent regimes correctly', () => {
  assert.equal(classifyFlowRegime(1200), 'Laminar');
  assert.equal(classifyFlowRegime(2300), 'Transitional');
  assert.equal(classifyFlowRegime(5000), 'Transitional');
  assert.equal(classifyFlowRegime(500000), 'Turbulent');
});

test('calculateFirstCellHeight computes positive micron-scale boundary layer mesh height', () => {
  const y = calculateFirstCellHeight(1.0, 20.0, 1.0, 1.225, 1.48e-5);
  assert.ok(y > 0);
  // typical first cell for y+=1 at 20m/s in air is on the order of 1e-5 to 1e-4 meters
  assert.ok(y < 1e-3);
});

test('estimateCylinderDragCoefficient returns realistic values across regimes', () => {
  const cdLaminar = estimateCylinderDragCoefficient(100);
  assert.ok(cdLaminar > 0.9 && cdLaminar < 1.3);

  const cdCritical = estimateCylinderDragCoefficient(5e5);
  assert.equal(cdCritical, 0.35);
});

test('calculateCFLNumber calculates dimensionless timestep Courant condition', () => {
  const cfl = calculateCFLNumber(10, 0.001, 0.05);
  // (10 * 0.001) / 0.05 = 0.2 with floating point precision
  assert.ok(Math.abs(cfl - 0.2) < 1e-6);
});
