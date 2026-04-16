export default defineNuxtConfig({
  extends: ['@wlth/design-system'],
  css: ['~/assets/css/global.css'],
  runtimeConfig: {
    public: {
      hubspotPortalId: process.env.NUXT_PUBLIC_HUBSPOT_PORTAL_ID ?? '',
    },
  },
})
