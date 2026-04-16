<script setup lang="ts">
import { watch } from 'vue'

const { isOpen, close } = useLoanModal()

// Lock body scroll when open
watch(isOpen, (val) => {
  document.body.style.overflow = val ? 'hidden' : ''
})
onUnmounted(() => { document.body.style.overflow = '' })

// Close on Escape key
onMounted(() => {
  const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
  window.addEventListener('keydown', onKey)
  onUnmounted(() => window.removeEventListener('keydown', onKey))
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4"
        role="dialog"
        aria-modal="true"
        aria-label="SMSF Loan Health Check"
      >
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-black/60 backdrop-blur-sm"
          @click="close"
        />

        <!-- Panel: max-height + internal scroll so it never overflows on short phones -->
        <div
          class="relative w-full sm:max-w-sm rounded-t-2xl sm:rounded-2xl flex flex-col"
          style="background: linear-gradient(176deg, #023CB6 6.13%, #0A2364 112.2%); max-height: 92dvh;"
        >
          <!-- Header — always visible, never scrolls -->
          <div class="flex items-center justify-between px-5 pt-5 pb-3 shrink-0">
            <p class="text-sm font-semibold text-white">SMSF Loan Health Check</p>
            <button
              class="text-white/50 hover:text-white transition-colors"
              aria-label="Close"
              @click="close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Scrollable form area -->
          <div class="px-5 pt-1 pb-[max(1.5rem,env(safe-area-inset-bottom))] overflow-y-auto">
            <LoanCheck v-if="isOpen" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.25s ease;
}
.modal-enter-active .relative,
.modal-leave-active .relative {
  transition: transform 0.3s ease, opacity 0.25s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-from .relative,
.modal-leave-to .relative {
  transform: translateY(24px);
  opacity: 0;
}
</style>
