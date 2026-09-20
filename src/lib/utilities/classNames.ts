type ClassValue = string | false | null | undefined

/** Joins class names, skipping falsy values. A tiny stand-in for the `clsx` package. */
export function classNames(...values: ClassValue[]): string {
  return values.filter(Boolean).join(' ')
}
