<template>
  <section id="hero-section" class="hero-section" style="background: linear-gradient(176deg, #023CB6 6.13%, #0A2364 112.2%)">
  <div class="max-w-5xl mx-auto lg:grid lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:h-[calc(100vh-4rem)]">

    <!-- Row 1: Full-width headline card — desktop only -->
    <div class="hidden lg:flex lg:col-span-12 lg:pt-6 lg:px-6 lg:pb-3">
      <div ref="desktopHeadline" class="copy-card rounded-2xl p-4 lg:p-5 w-full">
        <h1 class="text-3xl xl:text-4xl font-extralight font-sans text-white leading-[1.1] tracking-[-0.02em]">
          Are you <span class="font-normal" style="color: #05E6DD">overpaying</span> on your SMSF property loan?
        </h1>
      </div>
    </div>

    <!-- Row 2 Left: Video — col 1–7 on desktop; full-height panel on mobile -->
    <div class="flex flex-col h-[calc(100vh-4rem)] lg:h-auto lg:col-span-7 lg:row-start-2 lg:pt-0 lg:pb-6 lg:pl-6 lg:pr-3 px-3 pt-6 pb-6">
      <div class="relative rounded-2xl shadow-xl overflow-hidden w-full flex-1">
        <video
          autoplay
          muted
          loop
          playsinline
          poster="/video/hero-poster.jpg"
          class="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/video/hero-desktop.webm" type="video/webm">
          <source src="/video/hero-desktop.mp4" type="video/mp4">
        </video>

        <div class="absolute inset-0 z-10" style="background: linear-gradient(46deg, var(--color-brand-dblue, #292E3A) 8.32%, rgba(122, 136, 144, 0.00) 63.56%)" />

        <!-- Mobile-only headline overlay -->
        <div class="absolute bottom-3 left-3 right-3 z-20 rounded-xl p-6 lg:hidden" style="background: rgba(10, 35, 100, 0.22); box-shadow: 4px 4px 18px rgba(0,0,0,0.18); backdrop-filter: blur(2px);">
          <h1 ref="headline" class="text-4xl font-extralight font-sans text-white leading-[1.1] tracking-[-0.02em]">
            Are you<br><span class="font-normal" style="color: #05E6DD">Overpaying</span><br>your SMSF<br>property loan?
          </h1>
        </div>
      </div>

      <!-- Mobile copy card: "Find out" + chevrons — full card is tappable -->
      <a href="#loan-form" class="copy-card flex items-center justify-between rounded-2xl px-6 py-4 mt-3 lg:hidden">
        <p class="text-xl font-bold text-white leading-tight">
          Find out, with our<br><span style="color: #05E6DD">SMSF health check</span>
        </p>
        <span class="flex flex-col items-center justify-center shrink-0 ml-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="chev chev-1 w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" class="chev chev-2 w-7 h-7 -mt-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" class="chev chev-3 w-7 h-7 -mt-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </a>
    </div>

    <!-- Row 2 Right: Find out + bullets + form — col 8–12 on desktop -->
    <div class="right-col lg:min-h-0 lg:col-span-5 lg:row-start-2 lg:flex lg:flex-col">
      <div class="flex flex-col gap-3 px-3 pt-6 pb-6 lg:pt-0 lg:pb-6 lg:pr-6 lg:pl-3 lg:flex-1 lg:overflow-y-auto">

        <!-- "Find out" card — desktop only -->
        <div class="copy-card hidden lg:block rounded-2xl p-4 shrink-0">
          <p class="text-xl font-bold text-white leading-tight">
            Find out, with our<br><span style="color: #05E6DD">SMSF health check</span>
          </p>
        </div>

        <!-- Reassurance bullets — desktop only -->
        <div class="copy-card hidden lg:flex flex-col gap-1.5 rounded-2xl p-3 shrink-0">
          <p class="flex items-center gap-2 text-xs text-white/80"><span style="color: #05E6DD;">✓</span> Free to check — no documents or paperwork required</p>
          <p class="flex items-center gap-2 text-xs text-white/80"><span style="color: #05E6DD;">✓</span> Instant result — see where your loan stands right now</p>
          <p class="flex items-center gap-2 text-xs text-white/80"><span style="color: #05E6DD;">✓</span> No obligation — just clarity on your current position</p>
        </div>

        <!-- Form panel -->
        <div id="loan-form" class="mobile-snap-target lg:flex-1 lg:flex lg:flex-col">

          <!-- Mobile bullets — hidden on desktop -->
          <div class="lg:hidden mb-3 flex flex-col gap-3 px-3">
            <p class="text-sm font-medium text-white">Why it's worth 60 seconds</p>
            <div class="flex flex-col gap-2">
              <p class="flex items-center gap-2 text-xs text-white/75"><span style="color: #05E6DD;">✓</span> Free to check — no documents or paperwork required</p>
              <p class="flex items-center gap-2 text-xs text-white/75"><span style="color: #05E6DD;">✓</span> Instant result — see where your loan stands right now</p>
              <p class="flex items-center gap-2 text-xs text-white/75"><span style="color: #05E6DD;">✓</span> No obligation — just clarity on your current position</p>
            </div>
          </div>

          <LoanCheck class="border border-white/20 rounded-2xl p-4 lg:p-5 lg:flex-1" />

          <p class="text-xs text-white/40 text-center mt-3">Built for Australian SMSF property investors</p>

        </div><!-- /loan-form -->

        <!-- Learn more CTA -->
        <a href="#learn-more" class="learn-more-cta flex items-center justify-center gap-1.5 w-full text-sm font-medium transition-all rounded-full px-5 py-3 mt-3 lg:mt-auto shrink-0">
          Learn more
          <svg xmlns="http://www.w3.org/2000/svg" class="learn-more-icon w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </a>

      </div>
    </div>

  </div><!-- /max-w-5xl -->
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

const headline = ref<HTMLElement | null>(null)
const desktopHeadline = ref<HTMLElement | null>(null)

onMounted(() => {
  const targets = [
    headline.value,
    desktopHeadline.value,
  ].filter(Boolean)

  gsap.from(targets, {
    opacity: 0,
    y: 20,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out',
  })
})
</script>

<style scoped>
@media (max-width: 1023px) {
  #loan-form {
    scroll-margin-top: 4rem;
    padding-top: 1.5rem;
  }
}

.right-col {
  background: transparent;
}

.copy-card {
  background: rgba(255, 255, 255, 0.05);
}

.learn-more-cta {
  color: #292E3A;
  background: #05E6DD;
}
.learn-more-cta:hover {
  color: #292E3A;
  background: #04cfc7;
}

@keyframes chev-flow {
  0%   { opacity: 0.2;  transform: translateY(-1px); }
  40%  { opacity: 0.8;  transform: translateY(2px);  }
  80%  { opacity: 0.2;  transform: translateY(5px);  }
  100% { opacity: 0.2;  transform: translateY(-1px); }
}

.chev {
  color: rgba(5, 230, 221, 0.85);
  animation: chev-flow 2s ease-in-out infinite;
  will-change: transform;
}
.chev-1 { animation-delay: 0s; }
.chev-2 { animation-delay: 0.28s; }
.chev-3 { animation-delay: 0.56s; }

@keyframes bounce-down {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(3px); }
}
.learn-more-icon {
  animation: bounce-down 1.6s ease-in-out infinite;
}
</style>
