<script setup lang="ts">
const sectionRef = ref<HTMLElement | null>(null)
const videoRef = ref<HTMLVideoElement | null>(null)

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
    <div class="max-w-5xl mx-auto px-3 pt-6 pb-12 lg:px-6 lg:py-8 lg:grid lg:grid-cols-12 lg:gap-4">

      <!-- Intro card — col-span-7 row 1 on desktop -->
      <div class="fade-up rounded-2xl p-5 mb-3 lg:mb-0 lg:col-start-1 lg:col-span-7 lg:row-start-1" style="background: #ffffff; border: 1px solid #eceff0;">
        <p class="text-base text-lightgrey-900 leading-relaxed">
          What was suitable when your loan was first set up may not necessarily be the case today.
        </p>
      </div>

      <!-- Bullet 1 — col 1–4, row 2 -->
      <div class="fade-up rounded-2xl p-4 mb-3 lg:mb-0 flex items-start gap-3 lg:col-start-1 lg:col-span-4 lg:row-start-2" style="background: #ffffff; border: 1px solid #eceff0;">
        <span class="shrink-0 mt-0.5 font-bold text-lg leading-tight" style="color: #05E6DD;">—</span>
        <span class="text-sm text-lightgrey-900">Many SMSF loans are not reviewed after they are first established</span>
      </div>

      <!-- Bullet 2 — col 5–7, row 2 -->
      <div class="fade-up rounded-2xl p-4 mb-3 lg:mb-0 flex items-start gap-3 lg:col-start-5 lg:col-span-3 lg:row-start-2" style="background: #ffffff; border: 1px solid #eceff0;">
        <span class="shrink-0 mt-0.5 font-bold text-lg leading-tight" style="color: #05E6DD;">—</span>
        <span class="text-sm text-lightgrey-900">Interest rates and lending policies can change over time</span>
      </div>

      <!-- Bullet 3 — col 1–3, row 3 -->
      <div class="fade-up rounded-2xl p-4 mb-3 lg:mb-0 flex items-start gap-3 lg:col-start-1 lg:col-span-3 lg:row-start-3" style="background: #ffffff; border: 1px solid #eceff0;">
        <span class="shrink-0 mt-0.5 font-bold text-lg leading-tight" style="color: #05E6DD;">—</span>
        <span class="text-sm text-lightgrey-900">New lenders and loan structures may become available</span>
      </div>

      <!-- Bullet 4 — col 4–7, row 3 -->
      <div class="fade-up rounded-2xl p-4 mb-4 lg:mb-0 flex items-start gap-3 lg:col-start-4 lg:col-span-4 lg:row-start-3" style="background: #ffffff; border: 1px solid #eceff0;">
        <span class="shrink-0 mt-0.5 font-bold text-lg leading-tight" style="color: #05E6DD;">—</span>
        <span class="text-sm text-lightgrey-900">Your personal or financial situation may have changed</span>
      </div>

      <!-- Closing + CTA card — col-span-7, row 4 -->
      <div class="fade-up rounded-2xl p-5 lg:col-start-1 lg:col-span-7 lg:row-start-4" style="background: #f7f8f8; border: 1px solid #eceff0;">
        <p class="text-sm text-lightgrey-700 leading-relaxed mb-4">
          Reviewing your loan can help you better understand your current position and whether any changes may be worth exploring.
        </p>
        <div class="flex flex-col sm:flex-row sm:items-center gap-3">
          <a
            href="#hero"
            class="inline-flex w-full sm:w-auto justify-center items-center rounded-full px-6 py-3.5 text-sm font-medium transition-all shrink-0"
            style="background: #05E6DD; color: #292E3A;"
          >
            Check My Loan Now →
          </a>
          <p class="text-xs text-lightgrey-500">Free · Instant result · No obligation</p>
        </div>
      </div>

      <!-- Video card — col 8–12, all rows on desktop; last on mobile -->
      <div class="fade-up relative rounded-2xl overflow-hidden shadow-xl h-[260px] lg:h-auto mt-4 lg:mt-0 lg:col-start-8 lg:col-span-5 lg:row-start-1 lg:row-span-4">
        <video ref="videoRef" muted loop playsinline preload="none" poster="/video/section-building-poster.jpg"
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

    </div>
  </section>
</template>

<style scoped>
.fade-up {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.fade-up:nth-child(2) { transition-delay: 0.05s; }
.fade-up:nth-child(3) { transition-delay: 0.10s; }
.fade-up:nth-child(4) { transition-delay: 0.15s; }
.fade-up:nth-child(5) { transition-delay: 0.20s; }
.fade-up:nth-child(6) { transition-delay: 0.25s; }
.fade-up:nth-child(7) { transition-delay: 0.30s; }
.fade-up:nth-child(8) { transition-delay: 0.35s; }
.fade-up.is-visible {
  opacity: 1;
  transform: translateY(0);
}
</style>
