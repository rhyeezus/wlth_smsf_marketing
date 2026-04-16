<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { onMounted, nextTick } from 'vue'

onMounted(() => {
  // Prevent smooth-scroll from animating to a hash anchor on initial page load
  document.documentElement.style.scrollBehavior = 'auto'
  window.scrollTo(0, 0)
  nextTick(() => {
    document.documentElement.style.scrollBehavior = ''
  })
})
</script>
