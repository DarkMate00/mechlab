/**
 * Engineering calculations: pure TypeScript, no React, no DOM.
 *
 * Conventions for every calculation added here:
 *  - One topic per file (e.g. `torque.ts`), re-exported from this index.
 *  - Inputs and outputs are SI units (N, m, Pa, K ...). Unit conversion belongs in the UI layer.
 *  - Return a `CalculationResult<T>`; validate inputs (finite, in range) instead of returning NaN.
 *  - Document the formula and the units in a short comment above the function.
 *
 * Planned, not implemented yet: calculateTorque, calculateStress,
 * calculateCarnotEfficiency, calculateGearRatio.
 */
export type { CalculationResult } from './types'
