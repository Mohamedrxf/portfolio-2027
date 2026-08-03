// Class name utility (clsx + tailwind-merge)
// Simple implementation for combining class names
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}
