<script setup lang="ts">
useSeoMeta({
  title: 'Ad Concepts | WLTH',
  description: 'WLTH SMSF marketing video concepts.',
})

const concept1 = [
  '/video/ads/Comp 5.mp4',
  '/video/ads/Comp 7.mp4',
  '/video/ads/Comp 8.mp4',
  '/video/ads/Comp 9.mp4',
  '/video/ads/Comp 10.mp4',
]

const concept2 = [
  '/video/ads/Sequence 1.mp4',
  '/video/ads/Sequence 2.mp4',
  '/video/ads/Sequence 3.mp4',
  '/video/ads/Sequence 4.mp4',
  '/video/ads/Sequence 5.mp4',
]
</script>

<template>
  <div class="page-bg min-h-screen py-12 px-4">
    <div class="max-w-5xl mx-auto">

      <!-- Page heading -->
      <div class="mb-12 text-center">
        <h1 class="text-3xl font-extralight text-white tracking-[-0.02em]">
          Ad <span class="font-normal" style="color: #05E6DD">Concepts</span>
        </h1>
      </div>

      <!-- Concept 1 -->
      <section class="mb-16">
        <div class="section-label mb-6">
          <span class="text-sm font-semibold uppercase tracking-widest" style="color: #05E6DD">Concept 1</span>
        </div>
        <div class="video-grid">
          <video
            v-for="src in concept1"
            :key="src"
            autoplay
            controls
            loop
            playsinline
            muted
            preload="auto"
            class="video-item"
          >
            <source :src="src" type="video/mp4">
          </video>
        </div>
      </section>

      <!-- Divider -->
      <div class="divider mb-16" />

      <!-- Concept 2 -->
      <section>
        <div class="section-label mb-6">
          <span class="text-sm font-semibold uppercase tracking-widest" style="color: #05E6DD">Concept 2</span>
        </div>
        <div class="video-grid">
          <video
            v-for="src in concept2"
            :key="src"
            autoplay
            controls
            loop
            playsinline
            muted
            preload="auto"
            class="video-item"
          >
            <source :src="src" type="video/mp4">
          </video>
        </div>
      </section>

    </div>
  </div>
</template>

<style scoped>
.page-bg {
  background: linear-gradient(176deg, #023CB6 6.13%, #0A2364 112.2%);
}

.section-label {
  border-left: 2px solid #05E6DD;
  padding-left: 1rem;
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
}

.video-item {
  width: 100%;
  border-radius: 0.75rem;
  background: #000;
  display: block;
}

.divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
}
</style>
