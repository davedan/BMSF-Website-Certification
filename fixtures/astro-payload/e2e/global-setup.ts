import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
const execute = promisify(execFile)
export default async function globalSetup() {
  await execute('npm', ['run', 'test:prepare'], { shell: process.platform === 'win32' })
  await execute('npm', ['run', 'seed', '--workspace=cms'], { shell: process.platform === 'win32' })
}
