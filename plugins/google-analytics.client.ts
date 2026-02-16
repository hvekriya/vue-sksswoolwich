/**
 * Google Analytics (gtag.js) – loads and configures GA4.
 * Measurement ID from runtimeConfig.public.gaMeasurementId (uses firebase_measurementId env).
 */
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const id = (config.public as { gaMeasurementId?: string }).gaMeasurementId
  if (!id) return

  const w = window as Window & { dataLayer?: unknown[]; gtag?: (...a: unknown[]) => void }
  w.dataLayer = w.dataLayer || []
  function gtag(...args: unknown[]) {
    w.dataLayer!.push(args)
  }
  w.gtag = gtag

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`
  script.onload = () => {
    gtag('js', new Date())
    gtag('config', id)
  }
  document.head.appendChild(script)
})
