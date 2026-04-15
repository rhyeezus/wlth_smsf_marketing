<template>
  <section class="hero-section lg:grid lg:grid-cols-12 lg:h-[calc(100vh-4rem)]" style="background: linear-gradient(176deg, #023CB6 6.13%, #0A2364 112.2%)">

    <!-- Left col: video (7/12 on desktop) -->
    <div class="lg:col-span-7 lg:flex lg:items-stretch lg:py-6 lg:pl-6 lg:pr-3 px-3 py-6">
      <div class="relative rounded-2xl shadow-xl overflow-hidden w-full h-[45vh] lg:h-full">
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
    </div>

    <!-- Right col: SMSF copy + badges + form (5/12 on desktop) -->
    <div class="right-col lg:col-span-5 lg:flex lg:flex-col">
      <div class="flex flex-col gap-3 lg:gap-4 px-3 pt-6 pb-3 lg:py-6 lg:pr-6 lg:pl-3 lg:flex-1">

        <!-- Unified glass card (desktop) wrapping all right-col content -->
        <div class="right-card lg:flex lg:flex-col lg:gap-4 lg:rounded-2xl lg:p-10 flex flex-col gap-3">

          <!-- Desktop-only main headline — hidden on mobile -->
          <div ref="desktopHeadline" class="hidden lg:block">
            <h1 class="text-4xl xl:text-5xl font-extralight font-sans text-white leading-[1.1] tracking-[-0.02em]">
              Are you <span class="font-normal" style="color: #05E6DD">Overpaying</span> your<br>SMSF property loan?
            </h1>
          </div>

          <!-- SMSF copy -->
          <div ref="supportCopy">
            <!-- Mobile only: big heading + subtext -->
            <p class="smsf-heading lg:hidden text-3xl font-extralight font-sans leading-[1.1] tracking-[-0.02em]">Take our <span style="color: #05E6DD" class="font-normal">SMSF Loan<br>Health Check</span></p>
            <p class="smsf-sub lg:hidden text-base font-light leading-[1.4] mt-1">5 quick questions to see if your loan is still competitive.</p>
            <!-- Desktop only: just the label line -->
            <p class="smsf-sub hidden lg:block text-lg font-light leading-[1.5]">Take our <span style="color: #05E6DD">SMSF Loan Health Check</span>.</p>
          </div>

        </div>

        <!-- Subheading + badge copy — styled container at half opacity -->
        <div ref="badges" class="hidden lg:block sub-card lg:rounded-2xl lg:p-10">
          <p class="smsf-sub text-xl font-light leading-[1.5]">5 quick questions to see if your loan is still competitive. Take 60 seconds to get instant results — no documents required.</p>
        </div>

        <!-- Quiz prompt -->
        <p class="quiz-prompt hidden lg:flex items-center gap-2 text-sm font-medium">
          Take the quiz now
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </p>

        <!-- Loan form — flat on blue with hairline separator -->
        <LoanCheck class="lg:border lg:border-white/20 lg:rounded-2xl lg:p-8" />

        <!-- Trust signal -->
        <p class="hidden lg:block text-xs text-white/40 text-center">Trusted by Australian SMSF Trustees · 4.8★ Google Reviews</p>

        <!-- Learn more CTA — sits outside card, against blue background -->
        <a href="#learn-more" class="learn-more-cta flex items-center justify-center gap-1.5 w-full text-sm font-medium transition-all rounded-full px-5 py-2.5 mt-3 lg:mt-auto">
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
const badges = ref<HTMLElement | null>(null)

const trustBadges = [
  '60 seconds',
  'Instant result',
  'No documents required',
]

onMounted(() => {
  const targets = [
    headline.value,
    desktopHeadline.value,
    supportCopy.value,
    badges.value,
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
/* Mobile: light grey panel */
.right-col {
  background: linear-gradient(198deg, #FFF 28.98%, #D1D1D1 126.65%);
}
.smsf-heading {
  color: var(--color-royalblue-500);
}
.smsf-sub {
  color: var(--ui-text-toned);
}
.badge {
  background:
    linear-gradient(198deg, #FFF 28.98%, #D1D1D1 126.65%) padding-box,
    linear-gradient(46deg, #0A2364, #023CB6) border-box;
  border: 1px solid transparent;
  color: var(--color-royalblue-500);
}
.learn-more-cta {
  color: var(--color-royalblue-500);
}
.learn-more-cta:hover {
  color: var(--color-royalblue-700, #0a2364);
}

@keyframes nudge-right {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(4px); }
}
.quiz-prompt {
  color: #05E6DD;
}
.quiz-prompt svg {
  animation: nudge-right 1.8s ease-in-out infinite;
}

@keyframes bounce-down {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(3px); }
}
.learn-more-icon {
  animation: bounce-down 1.6s ease-in-out infinite;
}

/* Desktop: blue gradient throughout, invert text to white */
@media (min-width: 1024px) {
  .right-col {
    background: transparent;
  }
  .right-card {
    background: linear-gradient(198deg, rgba(61, 67, 82, 0.52) 0%, rgba(41, 46, 58, 0.52) 100%);
    box-shadow: 4px 4px 24px rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(6px);
  }
  .sub-card {
    background: linear-gradient(198deg, rgba(61, 67, 82, 0.26) 0%, rgba(41, 46, 58, 0.26) 100%);
    box-shadow: 4px 4px 24px rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(6px);
  }
  .smsf-heading {
    color: white;
  }
  .smsf-sub {
    color: rgba(255, 255, 255, 0.7);
  }
  .badge {
    background:
      linear-gradient(198deg, #FFF 28.98%, #D1D1D1 126.65%) padding-box,
      linear-gradient(46deg, #0A2364, #023CB6) border-box;
    border: 1px solid transparent;
    color: var(--color-royalblue-500);
  }
  .learn-more-cta {
    color: #292E3A;
    background: #05E6DD;
  }
  .learn-more-cta:hover {
    color: #292E3A;
    background: #04cfc7;
  }
}
</style>
