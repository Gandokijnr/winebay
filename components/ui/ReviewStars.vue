<script setup lang="ts">
import { computed } from 'vue'
import { Star } from 'lucide-vue-next'

const props = withDefaults(
  defineProps<{
    rating: number
    max?: number
    size?: 'sm' | 'md'
    showText?: boolean
    reviewCount?: number | null
  }>(),
  {
    max: 5,
    size: 'sm',
    showText: true,
    reviewCount: null
  }
)

const fullStars = computed(() => {
  if (!Number.isFinite(props.rating)) return 0
  return Math.round(Math.min(Math.max(props.rating, 0), props.max))
})

const iconSizeClasses = computed(() => (props.size === 'md' ? 'w-4 h-4' : 'w-3 h-3'))
const textSizeClasses = computed(() => (props.size === 'md' ? 'text-xs' : 'text-[11px]'))
</script>

<template>
  <div class="flex items-center gap-1" :class="textSizeClasses">
    <div class="flex items-center gap-0.5">
      <Star
        v-for="i in max"
        :key="i"
        :class="[
          iconSizeClasses,
          i <= fullStars ? 'text-[#D8B46A]' : 'text-[#E4E4EC]'
        ]"
        :fill="i <= fullStars ? 'currentColor' : 'none'"
      />
    </div>
    <template v-if="showText">
      <span class="text-[#4A4A54]">{{ rating.toFixed(1) }}</span>
      <span v-if="reviewCount !== null" class="text-[#A0A0AA]">({{ reviewCount }})</span>
    </template>
  </div>
</template>
