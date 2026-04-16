<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { computed } from 'vue'

const sectionRef = ref<HTMLElement | null>(null)
const videoRef = ref<HTMLVideoElement | null>(null)
const counterVal = ref(0)
const counterTriggered = ref(false)
const { open: openModal } = useLoanModal()

useVideoAutoplay(sectionRef, videoRef)

const counterDisplay = computed(() =>
  '$' + counterVal.value.toLocaleString('en-AU')
)

onMounted(() => {
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !counterTriggered.value) {
          counterTriggered.value = true
          const obj = { val: 0 }
          gsap.to(obj, {
            val: 2500,
            duration: 2,
            ease: 'power2.out',
            onUpdate() { counterVal.value = Math.round(obj.val) },
          })
          counterObserver.disconnect()
        }
      })
    },
    { threshold: 0.3 },
  )
  if (sectionRef.value) counterObserver.observe(sectionRef.value)

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
  <section id="learn-more" ref="sectionRef" class="bg-white scroll-mt-16">
    <div class="max-w-5xl mx-auto px-3 pt-6 pb-8 lg:px-6 lg:py-8 lg:grid lg:grid-cols-12 lg:gap-6 lg:min-h-[55vh]">

      <!-- Video — mobile first, desktop left (col 1–7, full height) -->
      <div class="animate-in relative rounded-2xl overflow-hidden shadow-xl h-[260px] lg:h-auto mb-4 lg:mb-0 lg:col-start-1 lg:col-span-7 lg:row-start-1">
        <video ref="videoRef" aria-hidden="true" muted loop playsinline preload="none" poster="/video/section-pool-poster.jpg"
          class="absolute inset-0 w-full h-full object-cover">
          <source src="/video/section-pool.webm" type="video/webm">
          <source src="/video/section-pool.mp4" type="video/mp4">
        </video>
        <div class="absolute inset-0 z-10" style="background: linear-gradient(46deg, var(--color-brand-dblue, #292E3A) 8.32%, rgba(122, 136, 144, 0.00) 63.56%)" />
        <div class="absolute bottom-3 left-3 right-3 z-20 rounded-xl p-5" style="background: rgba(10, 35, 100, 0.22); box-shadow: 4px 4px 18px rgba(0,0,0,0.18); backdrop-filter: blur(2px);">
          <h2 class="text-2xl lg:text-3xl font-extralight text-white leading-tight tracking-[-0.02em]">
            Why It May Be<br><span class="font-normal" style="color: #05E6DD;">Worth Checking</span>
          </h2>
        </div>
      </div>

      <!-- Right content column -->
      <div class="animate-in flex flex-col lg:col-start-8 lg:col-span-5 lg:row-start-1">
        <p class="text-base text-lightgrey-900 leading-relaxed mb-5">
          Most SMSF property investors set up their loan and then move on. Over time, lending conditions, rates and loan structures can change. This can impact whether your current loan is still competitive.
        </p>

        <!-- Savings counter callout -->
        <div class="flex-1 flex flex-col justify-center rounded-xl px-5 py-6 mb-5" style="background: linear-gradient(135deg, #f7f8f8 0%, #eceff0 100%);">
          <p class="text-sm font-medium text-lightgrey-700 mb-1">Potential annual saving</p>
          <p class="text-5xl lg:text-6xl font-bold tracking-tight leading-none mb-2" style="color: #023CB6;">{{ counterDisplay }}</p>
          <p class="text-sm font-medium text-lightgrey-700">Based on a 0.5% rate reduction on a $500k loan</p>
        </div>

        <p class="text-base text-lightgrey-900 leading-relaxed">
          This does not mean there is anything wrong with your loan. It simply means it may be worth checking where things currently stand.
        </p>
        <button
          class="inline-flex w-full justify-center items-center rounded-full px-6 py-3.5 text-sm font-medium transition-all mt-6 cursor-pointer"
          style="background: #05E6DD; color: #292E3A;"
          @click="openModal"
        >
          Check My Loan Now →
        </button>
      </div>

    </div>
  </section>
</template>
