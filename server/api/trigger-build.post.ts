/**
 * Server-only API to trigger a Netlify deploy.
 * The build hook ID is never exposed to the client.
 * Caller must send a valid Firebase ID token in the Authorization header.
 */
import { getAuth } from 'firebase-admin/auth'

export default defineEventHandler(async (event) => {
  const authHeader = getHeader(event, 'authorization')
  const token = authHeader?.replace(/^Bearer\s+/i, '')

  if (!token) {
    throw createError({ statusCode: 401, statusMessage: 'Missing auth token' })
  }

  const config = useRuntimeConfig()
  const buildHookId = config.netlifyBuildHookId

  if (!buildHookId) {
    console.error('NETLIFY_BUILD_HOOK_ID is not configured')
    throw createError({ statusCode: 500, statusMessage: 'Build trigger not configured' })
  }

  try {
    const auth = getAuth()
    await auth.verifyIdToken(token)
  } catch (err) {
    console.warn('Build trigger auth failed:', err)
    throw createError({ statusCode: 401, statusMessage: 'Invalid or expired token' })
  }

  const url = `https://api.netlify.com/build_hooks/${buildHookId}?trigger_title=Deploy+triggered+by+sksswoolwich+admin`
  const response = await fetch(url, { method: 'POST' })

  if (!response.ok) {
    throw createError({
      statusCode: response.status,
      statusMessage: `Netlify build hook failed: ${response.statusText}`
    })
  }

  return { success: true }
})
