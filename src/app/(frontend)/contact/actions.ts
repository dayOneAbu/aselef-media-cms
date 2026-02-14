'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { contactSchema, ContactFormValues } from './schema'

export async function submitContactForm(data: ContactFormValues) {
  const parsed = contactSchema.safeParse(data)

  if (!parsed.success) {
    return { error: 'Invalid form data' }
  }

  try {
    const payload = await getPayload({ config: configPromise })

    await payload.create({
      collection: 'contact-submissions',
      data: parsed.data,
    })

    return { success: true }
  } catch (error) {
    console.error('Failed to submit contact form:', error)
    return { error: 'Failed to submit form' }
  }
}
