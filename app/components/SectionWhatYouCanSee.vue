<script setup lang="ts">
import { gsap } from 'gsap'

const sectionRef = ref<HTMLElement | null>(null)
const videoRef = ref<HTMLVideoElement | null>(null)
const { open: openModal } = useLoanModal()

useVideoAutoplay(sectionRef, videoRef)

const cards = [
  {
    title: 'Whether your loan is still competitive',
    body: 'See how your current rate and structure sit relative to where the market is today.',
  },
  {
    title: 'If your loan structure may be worth reviewing',
    body: 'Understand whether your loan type and term still suit your SMSF\'s current stage.',
  },
  {
    title: 'Whether lending conditions have changed',
    body: 'Find out if rates, policies or lender options have shifted since your loan was set up.',
  },
  {
    title: 'If speaking with a specialist may help',
    body: 'Get a clear steer on whether a conversation with a WLTH specialist is worth your time.',
  },
]

onMounted(() => {
  if (window.innerWidth < 1024) return
  gsap.from(sectionRef.value!.querySelectorAll('.animate-in'), {
    opacity: 0,
    y: 20,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out',
    scrollTrigger: { trigger: sectionRef.value, start: 'top 80%' },
  })
})
</script>

<template>
  <section ref="sectionRef" style="background: linear-gradient(176deg, #023CB6 6.13%, #0A2364 112.2%);">
    <div class="max-w-5xl mx-auto px-3 pt-6 pb-8 lg:px-6 lg:py-8 lg:grid lg:grid-cols-12 lg:gap-6 lg:min-h-[55vh]">

      <!-- Video — mobile first, desktop left (col 1–7, full height) -->
      <div class="animate-in relative rounded-2xl overflow-hidden shadow-xl h-[260px] lg:h-auto mb-4 lg:mb-0 lg:col-start-1 lg:col-span-7 lg:row-start-1">
        <video ref="videoRef" aria-hidden="true" muted loop playsinline preload="none" poster="/video/section-desk-poster.jpg"
          class="absolute inset-0 w-full h-full object-cover">
          <source src="/video/section-desk.webm" type="video/webm">
          <source src="/video/section-desk.mp4" type="video/mp4">
        </video>
        <div class="absolute inset-0 z-10" style="background: linear-gradient(46deg, var(--color-brand-dblue, #292E3A) 8.32%, rgba(122, 136, 144, 0.00) 63.56%)" />
        <div class="absolute bottom-3 left-3 right-3 z-20 rounded-xl p-5" style="background: rgba(10, 35, 100, 0.22); box-shadow: 4px 4px 18px rgba(0,0,0,0.18); backdrop-filter: blur(2px);">
          <h2 class="text-2xl lg:text-3xl font-extralight text-white leading-tight tracking-[-0.02em]">
            What This Check<br>Can Help You <span class="font-normal" style="color: #05E6DD;">See</span>
          </h2>
        </div>
      </div>

      <!-- Right column: stacked feature cards + CTA button -->
      <div class="animate-in flex flex-col gap-3 lg:col-start-8 lg:col-span-5 lg:row-start-1">
        <div
          v-for="card in cards"
          :key="card.title"
          class="rounded-2xl p-3 lg:p-4 text-white"
          style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.10);"
        >
          <p class="font-medium text-sm mb-1">{{ card.title }}</p>
          <p class="text-sm text-white/70 leading-relaxed">{{ card.body }}</p>
        </div>

        <button
          class="inline-flex w-full justify-center items-center rounded-full px-6 py-3.5 text-sm font-medium transition-all mt-auto cursor-pointer"
          style="background: #05E6DD; color: #292E3A;"
          @click="openModal"
        >
          Start My 60-Second Check →
        </button>
      </div>

    </div>
  </section>
</template>
