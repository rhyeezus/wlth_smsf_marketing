export default defineNuxtConfig({
  css: ['~/assets/css/global.css'],

  runtimeConfig: {
    public: {
      hubspotPortalId: process.env.NUXT_PUBLIC_HUBSPOT_PORTAL_ID ?? '',
      githubToken: process.env.GITHUB_TOKEN ?? '',
    },
  },

  extends: [
    ['github:rhyeezus/wlth-design-system#v1.0.0', {auth: process.env.GITHUB_TOKEN ?? '', install: true}]
  ],

  modules: ['@nuxt/ui']
})