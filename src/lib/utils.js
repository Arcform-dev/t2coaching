import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// shadcn's `cn` — merges class names and dedupes conflicting Tailwind utilities.
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
