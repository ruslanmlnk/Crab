import config from '@payload-config'
import { getPayload } from 'payload'

type ContactRequestPayload = {
  email?: string
  fullName?: string
  locale?: string
  message?: string
  phoneNumber?: string
  sourcePath?: string
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const toSafeString = (value: unknown): string => {
  return typeof value === 'string' ? value.trim() : ''
}

export const POST = async (request: Request) => {
  let body: ContactRequestPayload

  try {
    body = (await request.json()) as ContactRequestPayload
  } catch {
    return Response.json({ error: 'Invalid JSON payload.' }, { status: 400 })
  }

  const fullName = toSafeString(body.fullName)
  const email = toSafeString(body.email)
  const phoneNumber = toSafeString(body.phoneNumber)
  const message = toSafeString(body.message)
  const sourcePath = toSafeString(body.sourcePath)
  const locale = body.locale === 'en' ? 'en' : 'ru'

  if (!fullName || !email || !message) {
    return Response.json(
      { error: 'Full name, email, and message are required.' },
      { status: 400 },
    )
  }

  if (!EMAIL_PATTERN.test(email)) {
    return Response.json({ error: 'Invalid email address.' }, { status: 400 })
  }

  if (fullName.length > 120 || email.length > 120 || phoneNumber.length > 60 || message.length > 3000) {
    return Response.json({ error: 'Input is too long.' }, { status: 400 })
  }

  try {
    const payload = await getPayload({ config })

    await payload.create({
      collection: 'contact-requests',
      data: {
        email,
        fullName,
        locale,
        message,
        phoneNumber,
        sourcePath: sourcePath || request.headers.get('referer') || '',
        status: 'new',
      },
      depth: 0,
    })

    return Response.json({ success: true }, { status: 201 })
  } catch (error) {
    console.error('Failed to create contact request', error)
    return Response.json(
      { error: 'Failed to save your request. Please try again later.' },
      { status: 500 },
    )
  }
}
