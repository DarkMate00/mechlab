import type { CalculatorMeta } from '../types/content'

export const calculators: readonly CalculatorMeta[] = [
  { slug: 'torque', title: 'Torque Calculator', status: 'planned', module: 'mechanics' },
  { slug: 'stress', title: 'Stress Calculator', status: 'planned', module: 'materials' },
  { slug: 'heat-engine', title: 'Heat Engine', status: 'planned', module: 'thermodynamics' },
  { slug: 'beam', title: 'Beam Calculator', status: 'planned', module: 'mechanics' },
]
