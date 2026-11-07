import type { CollectionConfig } from 'payload'
import { isEditor, publishedOrEditor } from '../access'
export const Works: CollectionConfig = {
  slug: 'works', admin: { useAsTitle: 'title' },
  access: { create: isEditor, delete: isEditor, read: publishedOrEditor, update: isEditor, readVersions: isEditor },
  fields: [
    { name: 'title', type: 'text', required: true }, { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'summary', type: 'textarea', required: true }, { name: 'heroImage', type: 'upload', relationTo: 'media', required: true },
  ], versions: { drafts: true },
}
