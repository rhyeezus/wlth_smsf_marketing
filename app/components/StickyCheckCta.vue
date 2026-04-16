<script setup lang="ts">
const visible = ref(false)

onMounted(() => {
  // Show when hero scrolls out of view
  const heroObserver = new IntersectionObserver(
    ([entry]) => { visible.value = !entry.isIntersecting },
    { threshold: 0.1 },
  )

  // Hide once user reaches the loan form
  const formObserver = new IntersectionObserver(
    ([entry]) => { if (entry.isIntersecting) visible.value = false },
    { threshold: 0.2 },
  )

  const hero = document.getElementById('hero-section')
  const form = document.getElementById('loan-form')
  if (hero) heroObserver.observe(hero)
  if (form) formObserver.observe(form)
})
</script>

<template>
  <Transition name="sticky-cta">
    <div
      v-if="visible"
      class="lg:hidden fixed bottom-0 left-0 right-0 z-50 px-4 pb-6 pt-3"
      style="background: linear-gradient(to top, rgba(10,35,100,0.95) 60%, rgba(10,35,100,0));"
    >
      <a
        href="#loan-form"
        class="flex items-center justify-center gap-2 w-full rounded-full py-4 text-sm font-medium"
        style="background: #05E6DD; color: #292E3A;"
      >
        Start My 60-Second Check →
      </a>
    </div>
  </Transition>
</template>

<style scoped>
.sticky-cta-enter-active,
.sticky-cta-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.sticky-cta-enter-from,
.sticky-cta-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
