import node from '@astrojs/node'
import { defineConfig } from 'astro/config'
export default defineConfig({ adapter: node({ mode: 'standalone' }), output: 'server', site: process.env.WEB_ORIGIN ?? 'http://127.0.0.1:4321' })
