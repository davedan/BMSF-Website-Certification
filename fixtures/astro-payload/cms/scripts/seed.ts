import { config as loadEnv } from 'dotenv'
import { mkdir, rm } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getPayload } from 'payload'

const dirname = path.dirname(fileURLToPath(import.meta.url))
loadEnv({ path: path.resolve(dirname, '../.env') })
const { default: config } = await import('../payload.config.js')
await rm(path.resolve(dirname, '../data'), { force: true, recursive: true })
await rm(path.resolve(dirname, '../media'), { force: true, recursive: true })
await mkdir(path.resolve(dirname, '../data'), { recursive: true })
await mkdir(path.resolve(dirname, '../media'), { recursive: true })
const payload = await getPayload({ config })
const imageMarkup = '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800"><rect width="1200" height="800" fill="#172554"/><circle cx="600" cy="400" r="220" fill="#38bdf8"/></svg>'
const image = {
  data: Buffer.from(imageMarkup),
  mimetype: 'image/svg+xml',
  name: 'reference-work.svg',
  size: Buffer.byteLength(imageMarkup),
}
const heroImage = await payload.create({ collection: 'media', data: { alt: 'Blue geometric illustration for the reference work' }, file: image, overrideAccess: true })
await payload.create({ collection: 'users', data: { email: 'admin@example.test', password: process.env.TEST_ADMIN_PASSWORD ?? 'change-me', role: 'admin' }, overrideAccess: true })
await payload.updateGlobal({ slug: 'site', data: { siteName: 'BMSF Reference Works', navigation: [{ label: 'Works', href: '/' }] }, overrideAccess: true })
await payload.create({ collection: 'works', data: { title: 'Published reference work', slug: 'published-reference-work', summary: 'This published record proves the Astro to Payload content flow.', heroImage: heroImage.id, _status: 'published' }, overrideAccess: true })
await payload.create({ collection: 'works', data: { title: 'Private draft work', slug: 'private-draft-work', summary: 'This record must never appear to an anonymous visitor.', heroImage: heroImage.id, _status: 'draft' }, draft: true, overrideAccess: true })
await payload.destroy()
