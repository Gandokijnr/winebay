<script setup lang="ts">
import { computed } from 'vue'

type Variant = 'primary' | 'secondary' | 'outline'

type Size = 'sm' | 'md' | 'lg'

const props = withDefaults(
  defineProps<{
    variant?: Variant
    size?: Size
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
    fullWidth?: boolean
  }>(),
  {
    variant: 'primary',
    size: 'md',
    type: 'button',
    disabled: false,
    fullWidth: false
  }
)

const baseClasses =
  'inline-flex items-center justify-center rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#F3DEC0] focus:ring-offset-1 focus:ring-offset-white disabled:opacity-50 disabled:cursor-not-allowed'

const variantClasses = computed(() => {
  if (props.variant === 'secondary') {
    return 'border border-[#E4E4EC] bg-white text-[#4A4A54] hover:border-[#6B1238] hover:text-[#6B1238]'
  }
  if (props.variant === 'outline') {
    return 'border border-[#6B1238] bg-transparent text-[#6B1238] hover:bg-[#F3DEC0]'
  }
  // primary
  return 'bg-[#6B1238] text-white hover:bg-[#8E1E3A]'
})

const sizeClasses = computed(() => {
  if (props.size === 'sm') return 'px-3 py-1 text-xs'
  if (props.size === 'lg') return 'px-5 py-2 text-sm'
  return 'px-4 py-1.5 text-xs'
})
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="[
      baseClasses,
      variantClasses,
      sizeClasses,
      fullWidth ? 'w-full' : ''
    ]"
  >
    <slot />
  </button>
</template>
