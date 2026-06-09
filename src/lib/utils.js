// Minimal `cn` — the className joiner shadcn components expect. The full shadcn
// version wraps clsx + tailwind-merge; here we just filter falsy values and join,
// which is all the ported components need (no conflicting Tailwind classes to dedupe).
export function cn(...inputs) {
  return inputs.flat().filter(Boolean).join(' ')
}
