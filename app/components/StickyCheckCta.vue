<script setup lang="ts">
const visible = ref(false)
const { open: openModal, isOpen: modalOpen } = useLoanModal()

onMounted(() => {
  const heroObserver = new IntersectionObserver(
    ([entry]) => { visible.value = !entry.isIntersecting },
    { threshold: 0.1 },
  )
  const hero = document.getElementById('hero-section')
  if (hero) heroObserver.observe(hero)
})
</script>

<template>
  <Transition name="sticky-cta">
    <div
      v-if="visible && !modalOpen"
      class="lg:hidden fixed bottom-0 left-0 right-0 z-50 px-4 pb-6 pt-3"
      style="background: linear-gradient(to top, rgba(10,35,100,0.95) 60%, rgba(10,35,100,0));"
    >
      <button
        class="flex items-center justify-center gap-2 w-full rounded-full py-4 text-sm font-medium cursor-pointer"
        style="background: #05E6DD; color: #292E3A;"
        @click="openModal"
      >
        Start My 60-Second Check →
      </button>
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
