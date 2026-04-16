<template>
  <div class="flex flex-col min-h-screen">
    <AppPageLoader />
    <AppHeader />
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter />
    <StickyCheckCta />
  </div>
</template>
