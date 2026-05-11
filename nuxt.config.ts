import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const localDesignSystem = fileURLToPath(new URL('./node_modules/@wlth/design-system', import.meta.url))
const designSystemLayer = existsSync(localDesignSystem)
  ? localDesignSystem
  : process.env.GITHUB_TOKEN
    ? ['github:rhyeezus/wlth-design-system#v1.0.0', { auth: process.env.GITHUB_TOKEN, install: true }]
    : null

export default defineNuxtConfig({
  compatibilityDate: '2026-05-11',

  css: ['~/assets/css/global.css'],

  runtimeConfig: {
    public: {
      hubspotPortalId: process.env.NUXT_PUBLIC_HUBSPOT_PORTAL_ID ?? '4267461',
      githubToken: process.env.GITHUB_TOKEN ?? '',
    },
  },

  extends: designSystemLayer ? [designSystemLayer] : [],

  modules: ['@nuxt/ui']
})
