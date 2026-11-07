import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { Media } from './src/collections/Media'
import { Users } from './src/collections/Users'
import { Works } from './src/collections/Works'
import { Site } from './src/globals/Site'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const secret = process.env.PAYLOAD_SECRET
if (!secret) throw new Error('PAYLOAD_SECRET must be set. Use the ignored cms/.env file for local development.')

export default buildConfig({
  admin: { user: Users.slug, importMap: { baseDir: path.resolve(dirname) } },
  collections: [Users, Media, Works],
  cors: [process.env.WEB_ORIGIN ?? 'http://127.0.0.1:4321'],
  csrf: [process.env.CMS_ORIGIN ?? 'http://127.0.0.1:3001'],
  db: sqliteAdapter({ client: { url: process.env.DATABASE_URL ?? 'file:./data/payload.db' } }),
  editor: lexicalEditor(), globals: [Site], secret, sharp,
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
})
