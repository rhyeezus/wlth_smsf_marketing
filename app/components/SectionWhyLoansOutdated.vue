<script setup lang="ts">
const sectionRef = ref<HTMLElement | null>(null)
const videoRef = ref<HTMLVideoElement | null>(null)
const { open: openModal } = useLoanModal()

useVideoAutoplay(sectionRef, videoRef)

const bullets = [
  'Many SMSF loans are not reviewed after they are first established',
  'Interest rates and lending policies can change over time',
  'New lenders and loan structures may become available',
  'Your personal or financial situation may have changed',
]

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.15 },
  )
  sectionRef.value?.querySelectorAll('.fade-up').forEach((el) => observer.observe(el))
})
</script>

<template>
  <section ref="sectionRef" class="bg-[#f7f8f8]">
    <div class="max-w-5xl mx-auto px-3 pt-6 pb-8 lg:px-6 lg:py-8 lg:grid lg:grid-cols-12 lg:gap-6 lg:min-h-[55vh]">

      <!-- Video — mobile first, desktop left (col 1–7, full height) -->
      <div class="fade-up relative rounded-2xl overflow-hidden shadow-xl h-[260px] lg:h-auto mb-4 lg:mb-0 lg:col-start-1 lg:col-span-7 lg:row-start-1">
        <video ref="videoRef" aria-hidden="true" muted loop playsinline preload="none" poster="/video/section-building-poster.jpg"
          class="absolute inset-0 w-full h-full object-cover">
          <source src="/video/section-building.webm" type="video/webm">
          <source src="/video/section-building.mp4" type="video/mp4">
        </video>
        <div class="absolute inset-0 z-10" style="background: linear-gradient(46deg, var(--color-brand-dblue, #292E3A) 8.32%, rgba(122, 136, 144, 0.00) 63.56%)" />
        <div class="absolute bottom-3 left-3 right-3 z-20 rounded-xl p-5" style="background: rgba(10, 35, 100, 0.22); box-shadow: 4px 4px 18px rgba(0,0,0,0.18); backdrop-filter: blur(2px);">
          <h2 class="text-2xl lg:text-3xl font-extralight text-white leading-tight tracking-[-0.02em]">
            Why SMSF Loans Can<br>Become <span class="font-normal" style="color: #05E6DD;">Outdated</span>
          </h2>
        </div>
      </div>

      <!-- Right column: intro + bullets + closing text + button -->
      <div class="fade-up flex flex-col gap-3 lg:col-start-8 lg:col-span-5 lg:row-start-1">

        <p class="text-base text-lightgrey-900 leading-relaxed">
          What was suitable when your loan was first set up may not necessarily be the case today.
        </p>

        <div class="flex flex-col gap-3">
          <div
            v-for="bullet in bullets"
            :key="bullet"
            class="rounded-2xl p-4"
            style="background: #ffffff;"
          >
            <span class="text-sm text-lightgrey-900">{{ bullet }}</span>
          </div>
        </div>

        <p class="text-sm text-lightgrey-700 leading-relaxed mt-auto">
          Reviewing your loan can help you better understand your current position and whether any changes may be worth exploring.
        </p>

        <button
          class="inline-flex w-full justify-center items-center rounded-full px-6 py-3.5 text-sm font-medium transition-all cursor-pointer"
          style="background: #05E6DD; color: #292E3A;"
          @click="openModal"
        >
          Check My Loan Now →
        </button>

      </div>

    </div>
  </section>
</template>

<style scoped>
.fade-up {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.fade-up:nth-child(2) { transition-delay: 0.1s; }
.fade-up.is-visible {
  opacity: 1;
  transform: translateY(0);
}
</style>
