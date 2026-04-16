import type { Ref } from 'vue'

export function useVideoAutoplay(
  containerRef: Ref<HTMLElement | null>,
  videoRef: Ref<HTMLVideoElement | null>,
) {
  onMounted(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoRef.value?.play()
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 },
    )
    if (containerRef.value) observer.observe(containerRef.value)
  })
}
