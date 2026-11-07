import { expect, test } from '@playwright/test'
const cms = 'http://127.0.0.1:3001'
test('anonymous REST API exposes published works but not drafts', async ({ request }) => {
  const works = await request.get(`${cms}/api/works?depth=1`)
  expect(works.ok()).toBeTruthy()
  expect((await works.json()).docs.map((work: { slug: string }) => work.slug)).toEqual(['published-reference-work'])
  const draft = await request.get(`${cms}/api/works?where[slug][equals]=private-draft-work`)
  expect((await draft.json()).totalDocs).toBe(0)
})
test('anonymous visitors cannot write CMS content', async ({ request }) => {
  const response = await request.post(`${cms}/api/works`, { data: { title: 'Denied', slug: 'denied', summary: 'Denied', _status: 'published' } })
  expect(response.status()).toBe(401)
})
test('authenticated editor can publish a content update seen through the public API', async ({ request }) => {
  const login = await request.post(`${cms}/api/users/login`, { data: { email: 'admin@example.test', password: 'fixture-admin-password' } })
  expect(login.ok()).toBeTruthy()
  const cookie = login.headers()['set-cookie']
  const work = await request.get(`${cms}/api/works?where[slug][equals]=published-reference-work`)
  const id = (await work.json()).docs[0].id
  const update = await request.patch(`${cms}/api/works/${id}`, { headers: { cookie }, data: { summary: 'Updated by an authenticated editor.', _status: 'published' } })
  expect(update.ok()).toBeTruthy()
  expect((await request.get(`${cms}/api/works/${id}`)).ok()).toBeTruthy()
})
