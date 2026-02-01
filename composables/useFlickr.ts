/**
 * Flickr API via JSONP (Flickr doesn't support CORS for direct fetch from browser)
 */
export function useFlickr() {
  const config = useRuntimeConfig().public

  const fetchFlickr = (params: Record<string, string | number>): Promise<any> => {
    return new Promise((resolve, reject) => {
      if (!config.flickrApiKey || !config.flickrUserId) {
        resolve(null)
        return
      }
      const callbackName = `flickr_jsonp_${Date.now()}_${Math.random().toString(36).slice(2)}`
      const urlParams = new URLSearchParams({
        api_key: config.flickrApiKey as string,
        user_id: config.flickrUserId as string,
        format: 'json',
        ...Object.fromEntries(
          Object.entries(params).map(([k, v]) => [k, String(v)])
        ),
      })
      const url = `${config.flickrUrl}?${urlParams}&jsoncallback=${callbackName}`

      ;(window as any)[callbackName] = (data: any) => {
        delete (window as any)[callbackName]
        script?.remove()
        resolve(data)
      }

      const script = document.createElement('script')
      script.src = url
      script.onerror = () => {
        delete (window as any)[callbackName]
        script?.remove()
        reject(new Error('Flickr JSONP failed'))
      }
      document.body.appendChild(script)
    })
  }

  const fetchRecentPhotos = async (perPage = 14) => {
    try {
      let data = await fetchFlickr({
        method: 'flickr.photos.search',
        min_date_upload: Math.floor(Date.now() / 1000) - 86400 * 365,
        per_page: perPage,
        extras: 'url_n,url_o,url_sq,tags',
      })
      let photos = data?.photos?.photo ?? []
      if (photos.length === 0) {
        data = await fetchFlickr({
          method: 'flickr.people.getPublicPhotos',
          per_page: perPage,
          extras: 'url_n,url_o,url_sq,tags',
        })
        photos = data?.photos?.photo ?? []
      }
      return photos
    } catch {
      return []
    }
  }

  const fetchPhotoset = async (photosetId: string) => {
    try {
      const data = await fetchFlickr({
        method: 'flickr.photosets.getPhotos',
        photoset_id: photosetId,
        extras: 'url_n,url_o,url_sq,title',
      })
      return data?.photoset ?? null
    } catch {
      return null
    }
  }

  return { fetchFlickr, fetchRecentPhotos, fetchPhotoset }
}
