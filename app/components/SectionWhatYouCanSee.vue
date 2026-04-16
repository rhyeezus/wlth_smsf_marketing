<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sectionRef = ref<HTMLElement | null>(null)
const videoRef = ref<HTMLVideoElement | null>(null)

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
  const videoObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          videoRef.value?.play()
          videoObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1 },
  )
  if (sectionRef.value) videoObserver.observe(sectionRef.value)

  if (window.innerWidth < 1024) return
  gsap.registerPlugin(ScrollTrigger)
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
    <div class="max-w-5xl mx-auto px-3 pt-6 pb-12 lg:px-6 lg:py-8 lg:grid lg:grid-cols-12 lg:grid-rows-[220px_220px_auto] lg:gap-4">

      <!-- Feature cards sub-grid — 2×2 on desktop, stacked on mobile -->
      <div class="flex flex-col gap-3 mb-4 lg:mb-0 lg:col-span-8 lg:row-span-2 lg:grid lg:grid-cols-2 lg:grid-rows-2 lg:gap-4">
        <div
          v-for="card in cards"
          :key="card.title"
          class="animate-in card rounded-2xl p-5 text-white"
          style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.10);"
        >
          <p class="font-medium text-sm mb-1">{{ card.title }}</p>
          <p class="text-sm text-white/70 leading-relaxed">{{ card.body }}</p>
        </div>
      </div>

      <!-- Video card — narrow portrait sidebar on desktop -->
      <div class="animate-in relative rounded-2xl overflow-hidden shadow-xl h-[260px] lg:h-auto mb-4 lg:mb-0 lg:col-span-4 lg:row-span-2">
        <video ref="videoRef" muted loop playsinline preload="none" poster="/video/section-desk-poster.jpg"
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

      <!-- CTA card — full width bottom row -->
      <div class="animate-in rounded-2xl p-5 text-white lg:col-span-12" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.10);">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p class="text-xs text-white/50">Trusted by Australian SMSF Trustees · 4.8★ Google Reviews</p>
          <a
            href="#hero"
            class="inline-flex w-full sm:w-auto justify-center items-center rounded-full px-6 py-3.5 text-sm font-medium transition-all shrink-0"
            style="background: #05E6DD; color: #292E3A;"
          >
            Start My 60-Second Check →
          </a>
        </div>
      </div>

    </div>
  </section>
</template>
