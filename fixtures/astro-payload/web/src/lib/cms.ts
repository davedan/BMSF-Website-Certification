type Media = { alt: string; url?: string | null }
export type Work = { id: string; title: string; slug: string; summary: string; heroImage: Media | string }
export type Site = { siteName: string; navigation?: { label: string; href: string }[] }
const cmsUrl = (import.meta.env.CMS_URL ?? 'http://127.0.0.1:3001').replace(/\/$/, '')
async function request<T>(path: string): Promise<T> { const response = await fetch(`${cmsUrl}${path}`); if (!response.ok) throw new Error(`CMS request failed: ${response.status}`); return response.json() as Promise<T> }
export async function getWorks(): Promise<Work[]> { return (await request<{ docs: Work[] }>('/api/works?depth=1&sort=title')).docs }
export async function getWork(slug: string): Promise<Work | undefined> { return (await request<{ docs: Work[] }>(`/api/works?depth=1&limit=1&where[slug][equals]=${encodeURIComponent(slug)}`)).docs[0] }
export async function getSite(): Promise<Site> { return request<Site>('/api/globals/site') }
export function imageUrl(media: Work['heroImage']): string | undefined { return typeof media === 'string' || !media.url ? undefined : media.url.startsWith('http') ? media.url : `${cmsUrl}${media.url}` }
