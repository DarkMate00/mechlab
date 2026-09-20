import type { RealLifeSystem } from '../types/content'

export const realLifeSystems: readonly RealLifeSystem[] = [
  {
    slug: 'car-engine',
    title: 'Car Engine',
    status: 'planned',
    modules: ['thermodynamics', 'mechanics'],
  },
  { slug: 'gear-systems', title: 'Gear Systems', status: 'planned', modules: ['mechanics'] },
  {
    slug: 'braking-system',
    title: 'Braking System',
    status: 'planned',
    modules: ['mechanics', 'fluid-mechanics'],
  },
]
