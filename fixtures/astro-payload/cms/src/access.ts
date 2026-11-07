import type { Access } from 'payload'
type User = { role?: 'admin' | 'editor' }
export const isEditor: Access = ({ req: { user } }) => Boolean(user && ['admin', 'editor'].includes((user as User).role ?? ''))
export const isAdmin: Access = ({ req: { user } }) => (user as User | undefined)?.role === 'admin'
export const publishedOrEditor: Access = ({ req: { user } }) => user ? true : { _status: { equals: 'published' } }
