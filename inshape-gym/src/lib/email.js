import emailjs from '@emailjs/browser'

export async function sendLead(fields) {
  const service = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const template = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const key = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

  if (!service || !template || !key) {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return { ok: true, delivered: false }
  }

  await emailjs.send(service, template, fields, { publicKey: key })
  return { ok: true, delivered: true }
}
