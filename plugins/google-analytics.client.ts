/**
 * Google Analytics (gtag.js).
 * Measurement ID from runtimeConfig.public.gaMeasurementId (firebase_measurementId).
 *
 * gtag.js only processes an Arguments object on the data layer. Pushing a
 * normal array, which a rest-parameter helper does, is ignored, so the tag
 * loads and never records a page view.
 */
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const id = (config.public as { gaMeasurementId?: string }).gaMeasurementId
  if (!id) return

  const w = window as Window & { dataLayer?: IArguments[]; gtag?: Gtag }
  w.dataLayer = w.dataLayer || []

  const gtag: Gtag = function () {
    w.dataLayer!.push(arguments)
  }
  w.gtag = gtag

  gtag("js", new Date())
  gtag("config", id, { send_page_view: false })

  const script = document.createElement("script")
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`
  document.head.appendChild(script)

  const router = useRouter()
  let trackedInitialView = false

  function sendPageView() {
    const route = router.currentRoute.value
    gtag("event", "page_view", {
      page_path: route.fullPath,
      page_location: window.location.href,
      page_title: document.title,
    })
  }

  router.afterEach(() => {
    if (!trackedInitialView) return
    nextTick(sendPageView)
  })

  router.isReady().then(() => {
    nextTick(() => {
      sendPageView()
      trackedInitialView = true
    })
  })
})

type Gtag = (...args: unknown[]) => void
