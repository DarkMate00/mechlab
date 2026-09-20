/**
 * Every calculation returns a CalculationResult instead of throwing, so UI code can
 * render an error message without try/catch and calculations stay trivially testable.
 */
export type CalculationResult<T> = { ok: true; value: T } | { ok: false; error: string }
