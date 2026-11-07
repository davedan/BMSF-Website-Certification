import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { randomBytes } from 'node:crypto'
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const cms = resolve(root, 'cms')
await mkdir(resolve(cms, 'data'), { recursive: true })
await writeFile(resolve(cms, '.env'), [
  `PAYLOAD_SECRET=${randomBytes(32).toString('hex')}`,
  'CMS_ORIGIN=http://127.0.0.1:3001', 'WEB_ORIGIN=http://127.0.0.1:4321', 'TEST_ADMIN_PASSWORD=fixture-admin-password',
].join('\n'))
