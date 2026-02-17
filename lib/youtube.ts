function safeUrl(input: string): URL | null {
  const raw = (input || '').trim()
  if (!raw) return null
  try {
    return new URL(raw)
  } catch {
    // allow URLs pasted without protocol (e.g. youtube.com/watch?v=...)
    try {
      return new URL(`https://${raw}`)
    } catch {
      return null
    }
  }
}

export function toYouTubeEmbedUrl(input: string): string | null {
  const u = safeUrl(input)
  if (!u) return null

  const host = u.hostname.replace(/^www\./, '').toLowerCase()
  const path = u.pathname || '/'

  // Already an embed URL
  if (path.startsWith('/embed/')) return `https://www.youtube.com${path}${u.search}`

  // youtu.be/<id>
  if (host === 'youtu.be') {
    const id = path.split('/').filter(Boolean)[0]
    return id ? `https://www.youtube.com/embed/${id}` : null
  }

  // youtube domains
  if (!host.endsWith('youtube.com') && host !== 'youtube-nocookie.com') return null

  // /watch?v=<id>
  if (path === '/watch') {
    const id = u.searchParams.get('v')
    return id ? `https://www.youtube.com/embed/${id}` : null
  }

  // /shorts/<id>, /live/<id>
  const parts = path.split('/').filter(Boolean)
  if (parts[0] === 'shorts' || parts[0] === 'live') {
    const id = parts[1]
    return id ? `https://www.youtube.com/embed/${id}` : null
  }

  // /playlist?list=<id>
  if (path === '/playlist') {
    const list = u.searchParams.get('list')
    return list ? `https://www.youtube.com/embed/videoseries?list=${list}` : null
  }

  // /channel/<id> → live stream for channel
  if (parts[0] === 'channel' && parts[1]) {
    return `https://www.youtube.com/embed/live_stream?channel=${parts[1]}`
  }

  return null
}

export function normalizeEmbeddableVideoUrl(input: string): { url: string; error?: string } {
  const raw = (input || '').trim()
  if (!raw) return { url: '' }

  const u = safeUrl(raw)
  if (!u) return { url: raw }

  const host = u.hostname.replace(/^www\./, '').toLowerCase()
  const isYouTube =
    host === 'youtu.be' ||
    host.endsWith('youtube.com') ||
    host === 'youtube-nocookie.com'

  if (!isYouTube) return { url: raw }

  const embed = toYouTubeEmbedUrl(raw)
  if (!embed) {
    return {
      url: '',
      error:
        'This YouTube URL cannot be embedded. Please use a YouTube video link (watch/shorts), a channel link (/channel/...), or an embed URL.',
    }
  }
  return { url: embed }
}

