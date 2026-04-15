export default defineNuxtConfig({
  extends: ['@wlth/design-system'],
  app: {
    baseURL: process.env.NUXT_APP_BASE_URL ?? '/',
  },
  runtimeConfig: {
    public: {
      hubspotPortalId: process.env.NUXT_PUBLIC_HUBSPOT_PORTAL_ID ?? '',
    },
  },
})
