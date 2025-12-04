<script setup lang="ts">
import { computed } from 'vue'

type Variant = 'default' | 'sale' | 'new' | 'discount' | 'neutral'

const props = withDefaults(
  defineProps<{
    variant?: Variant
  }>(),
  {
    variant: 'default'
  }
)

const classes = computed(() => {
  switch (props.variant) {
    case 'sale':
    case 'discount':
      return 'bg-[#6B1238] text-white'
    case 'new':
      return 'bg-[#D8B46A] text-[#111118]'
    case 'neutral':
      return 'bg-[#FAF7F3] text-[#4A4A54]'
    default:
      return 'bg-[#FAF7F3] text-[#4A4A54]'
  }
})
</script>

<template>
  <span
    class="inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold"
    :class="classes"
  >
    <slot />
  </span>
</template>
