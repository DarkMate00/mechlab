import type { NavItem } from '../types/navigation'

/**
 * The top-level areas of the site. Each entry becomes a route and a navigation link.
 * Subsections (e.g. "Torque Calculator") are deliberately NOT routes yet;
 * they will be added when their pages exist.
 */
export const SECTIONS = {
  home: {
    label: 'Home',
    path: '/',
    description: 'An interactive Mechanical Engineering lab.',
  },
  fundamentals: {
    label: 'Fundamentals',
    path: '/fundamentals',
    description:
      'Core Mechanical Engineering concepts: mechanics, thermodynamics, fluid mechanics and materials.',
  },
  lab: {
    label: 'Interactive Lab',
    path: '/lab',
    description: 'Engineering calculators that run entirely in your browser.',
  },
  realLife: {
    label: 'Real Life',
    path: '/real-life',
    description: 'How the fundamentals show up in real mechanical systems.',
  },
  projects: {
    label: 'Projects',
    path: '/projects',
    description: 'Design projects.',
  },
  about: {
    label: 'About',
    path: '/about',
    description: 'About the MECHLAB project and why Mechanical Engineering.',
  },
} satisfies Record<string, NavItem>

export const NAV_ITEMS: readonly NavItem[] = Object.values(SECTIONS)
