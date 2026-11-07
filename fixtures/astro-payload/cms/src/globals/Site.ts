import type { GlobalConfig } from 'payload'
import { isEditor } from '../access'
export const Site: GlobalConfig = {
  slug: 'site', access: { read: () => true, update: isEditor },
  fields: [
    { name: 'siteName', type: 'text', required: true, defaultValue: 'BMSF Reference Works' },
    { name: 'navigation', type: 'array', fields: [{ name: 'label', type: 'text', required: true }, { name: 'href', type: 'text', required: true }] },
  ],
}
