<template>
  <section class="hero-section lg:grid lg:grid-cols-12 lg:h-[calc(100vh-4rem)]" style="background: linear-gradient(176deg, #023CB6 6.13%, #0A2364 112.2%)">

    <!-- Left col: video + mobile copy card (snap panel 1) -->
    <div class="flex flex-col h-[calc(100vh-4rem)] lg:h-auto lg:col-span-7 lg:flex lg:items-stretch lg:py-6 lg:pl-6 lg:pr-3 px-3 pt-6 pb-6">
      <div class="relative rounded-2xl shadow-xl overflow-hidden w-full flex-1 lg:flex-none lg:h-full">
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

        <!-- Mobile-only overlay headline — hidden on desktop -->
        <div class="absolute bottom-3 left-3 right-3 z-20 rounded-xl p-6 lg:hidden" style="background: rgba(10, 35, 100, 0.22); box-shadow: 4px 4px 18px rgba(0,0,0,0.18); backdrop-filter: blur(2px);">
          <h1 ref="headline" class="text-4xl font-extralight font-sans text-white leading-[1.1] tracking-[-0.02em]">
            Are you<br><span class="font-normal" style="color: #05E6DD">Overpaying</span><br>your SMSF<br>property loan?
          </h1>
        </div>
      </div>

      <!-- Mobile copy card — lives inside panel 1, hidden on desktop -->
      <div class="copy-card flex flex-col gap-3 rounded-2xl p-6 mt-3 lg:hidden">
        <div class="grid grid-cols-3 items-center gap-3">
          <p class="col-span-2 text-xl font-bold text-white leading-tight">
            Find out, with our<br><span style="color: #05E6DD">SMSF health check</span>
          </p>
          <div class="flex flex-col items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="chev chev-1 w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" class="chev chev-2 w-7 h-7 -mt-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" class="chev chev-3 w-7 h-7 -mt-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Right col: copy + form (5/12 on desktop) -->
    <div class="right-col min-h-[calc(100vh-4rem)] lg:min-h-0 lg:col-span-5 lg:flex lg:flex-col">
      <div class="flex flex-col gap-3 lg:gap-4 px-3 pt-6 pb-6 lg:py-6 lg:pr-6 lg:pl-3 lg:flex-1">

        <!-- Merged copy card: desktop only (mobile version lives inside the video col) -->
        <div ref="desktopHeadline" class="copy-card hidden lg:flex rounded-2xl p-6 lg:p-8 flex-col gap-4">
          <!-- Desktop-only headline -->
          <h1 class="hidden lg:block text-3xl lg:text-4xl xl:text-5xl font-extralight font-sans text-white leading-[1.1] tracking-[-0.02em]">
            Are you <span class="font-normal" style="color: #05E6DD">Overpaying</span> your<br>SMSF property loan?
          </h1>

          <!-- 3-col: headline (2 cols) + chevron (1 col) -->
          <div class="grid grid-cols-3 items-center gap-3">
            <p ref="supportCopy" class="col-span-2 text-xl lg:text-2xl font-bold text-white leading-tight">
              Find out, with our<br><span style="color: #05E6DD">SMSF health check</span>
            </p>
            <div class="flex flex-col items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="chev chev-1 w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" class="chev chev-2 w-7 h-7 -mt-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" class="chev chev-3 w-7 h-7 -mt-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          <!-- Badge spans full card width -->
          <!-- <span class="badge-pill self-start">Takes 60 seconds, Get an instant result</span> -->
        </div>

        <!-- Form snap panel (scroll-snap target on mobile) -->
        <div class="mobile-snap-target">

        <!-- Loan form -->
        <LoanCheck class="border border-white/20 rounded-2xl p-6 lg:p-8" />

        <!-- Trust signal -->
        <p class="text-xs text-white/40 text-center mt-3">Trusted by Australian SMSF Trustees · 4.8★ Google Reviews</p>

        </div><!-- /mobile-snap-target -->

        <!-- Learn more CTA — desktop only (mobile is in snap container) -->
        <a href="#learn-more" class="learn-more-cta hidden lg:flex items-center justify-center gap-1.5 w-full text-sm font-medium transition-all rounded-full px-5 py-2.5 lg:mt-auto">
          Learn more
          <svg xmlns="http://www.w3.org/2000/svg" class="learn-more-icon w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </a>

      </div>
    </div>

  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

const headline = ref<HTMLElement | null>(null)
const desktopHeadline = ref<HTMLElement | null>(null)
const supportCopy = ref<HTMLElement | null>(null)

onMounted(() => {
  const targets = [
    headline.value,
    desktopHeadline.value,
    supportCopy.value,
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
/* Mobile scroll snap — section is the container, form is the target */
@media (max-width: 1023px) {
  .hero-section {
    height: calc(100vh - 4rem);
    overflow-y: scroll;
    scroll-snap-type: y proximity;
    -webkit-overflow-scrolling: touch;
  }
  .mobile-snap-target {
    scroll-snap-align: start;
  }
}

/* Right column — transparent so the hero blue gradient shows through on all sizes */
.right-col {
  background: transparent;
}

/* Merged copy card — teal left-border accent, no shadow */
.copy-card {
  background: rgba(255, 255, 255, 0.05);
}

/* "60 seconds" badge pill */
@keyframes badge-pulse {
  0%, 100% { background: rgba(5, 230, 221, 0.10); }
  50%       { background: rgba(5, 230, 221, 0.22); }
}

.badge-pill {
  display: inline-flex;
  align-items: center;
  align-self: flex-start;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.375rem 0.875rem;
  border-radius: 9999px;
  background: rgba(5, 230, 221, 0.12);
  color: #05E6DD;
  border: 1px solid rgba(5, 230, 221, 0.25);
  animation: badge-pulse 2.8s ease-in-out infinite;
}

/* Teal CTA — same on mobile and desktop */
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
