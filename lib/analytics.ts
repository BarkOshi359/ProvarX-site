/**
 * Analytics stub — wire to Posthog / Mixpanel / Vercel Analytics as needed.
 * In development, events are logged to the console.
 */
export function trackEvent(name: string, properties: Record<string, unknown> = {}): void {
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics]', name, properties)
  }
  // TODO: replace with real analytics provider
  // Example (Posthog): posthog.capture(name, properties)
  // Example (Vercel Analytics): track(name, properties)
}
