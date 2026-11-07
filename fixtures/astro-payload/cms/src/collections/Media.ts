import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { CollectionConfig } from 'payload'
import { isEditor } from '../access'
const dirname = path.dirname(fileURLToPath(import.meta.url))
export const Media: CollectionConfig = {
  slug: 'media', access: { create: isEditor, delete: isEditor, read: () => true, update: isEditor },
  fields: [{ name: 'alt', type: 'text', required: true }],
  upload: { mimeTypes: ['image/*'], staticDir: path.resolve(dirname, '../../media') },
}
