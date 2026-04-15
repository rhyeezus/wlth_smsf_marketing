export default defineNuxtConfig({
  extends: ['@wlth/design-system'],
  runtimeConfig: {
    public: {
      hubspotPortalId: process.env.NUXT_PUBLIC_HUBSPOT_PORTAL_ID ?? '',
    },
  },
})
