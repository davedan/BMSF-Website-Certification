import type { CollectionConfig } from 'payload'
import { isAdmin } from '../access'
export const Users: CollectionConfig = {
  slug: 'users', auth: true, admin: { useAsTitle: 'email' },
  access: { admin: isAdmin, create: isAdmin, delete: isAdmin, read: isAdmin, update: isAdmin },
  fields: [{ name: 'role', type: 'select', defaultValue: 'editor', options: ['admin', 'editor'], required: true }],
}
