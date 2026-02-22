const YOUTUBE_HOSTS = new Set([
  'youtube.com',
  'm.youtube.com',
  'music.youtube.com',
  'youtube-nocookie.com',
  'youtu.be',
])

type YouTubeVideoData = {
  startSeconds: null | number
  videoID: string
}

const normalizeHostname = (hostname: string): string =>
  hostname.trim().toLowerCase().replace(/^www\./, '')

const normalizeVideoID = (value: null | string): null | string => {
  if (!value) {
    return null
  }

  const id = value.trim()

  if (!id) {
    return null
  }

  return /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null
}

const parseTimeToSeconds = (value: null | string): null | number => {
  if (!value) {
    return null
  }

  const trimmed = value.trim().toLowerCase()

  if (!trimmed) {
    return null
  }

  if (/^\d+$/.test(trimmed)) {
    return Number.parseInt(trimmed, 10)
  }

  const parts = /^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/.exec(trimmed)

  if (!parts) {
    return null
  }

  const [, hoursValue, minutesValue, secondsValue] = parts

  if (!hoursValue && !minutesValue && !secondsValue) {
    return null
  }

  const hours = Number.parseInt(hoursValue || '0', 10)
  const minutes = Number.parseInt(minutesValue || '0', 10)
  const seconds = Number.parseInt(secondsValue || '0', 10)

  const totalSeconds = hours * 3600 + minutes * 60 + seconds

  return Number.isFinite(totalSeconds) && totalSeconds >= 0 ? totalSeconds : null
}

const getStartSeconds = (url: URL): null | number => {
  const queryCandidates = [url.searchParams.get('start'), url.searchParams.get('t')]

  for (const candidate of queryCandidates) {
    const value = parseTimeToSeconds(candidate)

    if (value !== null) {
      return value
    }
  }

  const hash = url.hash.replace(/^#/, '')

  if (!hash) {
    return null
  }

  const hashParams = new URLSearchParams(hash)
  const hashCandidates = [hashParams.get('start'), hashParams.get('t'), hash]

  for (const candidate of hashCandidates) {
    const value = parseTimeToSeconds(candidate)

    if (value !== null) {
      return value
    }
  }

  return null
}

const getVideoIDFromURL = (url: URL): null | string => {
  const hostname = normalizeHostname(url.hostname)

  if (!YOUTUBE_HOSTS.has(hostname)) {
    return null
  }

  const pathSegments = url.pathname.split('/').filter(Boolean)

  if (hostname === 'youtu.be') {
    return normalizeVideoID(pathSegments[0] || null)
  }

  if (url.pathname === '/watch' || pathSegments[0] === 'watch') {
    return normalizeVideoID(url.searchParams.get('v'))
  }

  if (
    pathSegments[0] === 'embed' ||
    pathSegments[0] === 'shorts' ||
    pathSegments[0] === 'live' ||
    pathSegments[0] === 'v'
  ) {
    return normalizeVideoID(pathSegments[1] || null)
  }

  return null
}

const parseYouTubeVideoData = (value: string): null | YouTubeVideoData => {
  const trimmed = value.trim()

  if (!trimmed) {
    return null
  }

  let parsedURL: URL

  try {
    parsedURL = new URL(trimmed)
  } catch {
    return null
  }

  const videoID = getVideoIDFromURL(parsedURL)

  if (!videoID) {
    return null
  }

  return {
    startSeconds: getStartSeconds(parsedURL),
    videoID,
  }
}

export const isYouTubeURL = (value: string): boolean =>
  Boolean(parseYouTubeVideoData(value))

export const getYouTubeEmbedURL = (value: string): null | string => {
  const parsed = parseYouTubeVideoData(value)

  if (!parsed) {
    return null
  }

  const embedURL = new URL(`https://www.youtube.com/embed/${parsed.videoID}`)

  if (parsed.startSeconds && parsed.startSeconds > 0) {
    embedURL.searchParams.set('start', String(parsed.startSeconds))
  }

  return embedURL.toString()
}
