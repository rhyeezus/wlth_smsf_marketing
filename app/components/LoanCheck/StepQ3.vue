<template>
  <div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <button
        v-for="opt in options"
        :key="opt.value"
        :class="optionClass(modelValue === opt.value)"
        @click="$emit('select', opt.value)"
      >
        {{ opt.label }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string
  optionClass: (selected: boolean) => string
}>()

defineEmits<{
  select: [value: string]
}>()

const options = [
  { label: 'Under 5%', value: 'under-5' },
  { label: '5% to 6%', value: '5-to-6' },
  { label: '6% to 7%', value: '6-to-7' },
  { label: '7% or above', value: '7-plus' },
]
</script>
