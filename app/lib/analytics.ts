// lib/analytics.ts
type Props = Record<string, string | number | boolean | null | undefined>

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Props }) => void
  }
}

export function track(event: string, props?: Props) {
  if (typeof window === "undefined") return
  if (!window.plausible) return
  window.plausible(event, props ? { props } : undefined)
}
