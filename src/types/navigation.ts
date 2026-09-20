export interface NavItem {
  /** Short label used in navigation and page titles. */
  label: string
  /** Router path (hash-based routing, so this is the part after `#`). */
  path: string
  /** One-sentence description of the area. */
  description: string
}
