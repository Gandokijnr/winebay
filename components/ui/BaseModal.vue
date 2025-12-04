<script setup lang="ts">
import { X } from 'lucide-vue-next'

const props = withDefaults(
  defineProps<{
    open: boolean
    title?: string
    description?: string
    size?: 'sm' | 'md' | 'lg'
    closeOnBackdrop?: boolean
  }>(),
  {
    size: 'md',
    closeOnBackdrop: true
  }
)

const emit = defineEmits<{
  (e: 'close'): void
}>()

const onBackdropClick = () => {
  if (props.closeOnBackdrop) emit('close')
}
</script>

<template>
  <teleport to="body">
    <transition name="fade">
      <div
        v-if="open"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-lg px-4"
        @click.self="onBackdropClick"
      >
        <div
          :class="[
            'w-full bg-white rounded-2xl shadow-xl overflow-hidden text-[#111118]',
            size === 'sm'
              ? 'max-w-sm'
              : size === 'lg'
                ? 'max-w-3xl'
                : 'max-w-lg'
          ]"
        >
          <header
            v-if="title || description || $slots.header"
            class="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-[#E4E4EC]"
          >
            <div class="min-w-0">
              <slot name="header">
                <p
                  v-if="description"
                  class="text-[11px] uppercase tracking-[0.15em] text-[#A0A0AA] mb-0.5"
                >
                  {{ description }}
                </p>
                <h2 v-if="title" class="text-sm sm:text-base font-semibold line-clamp-1">
                  {{ title }}
                </h2>
              </slot>
            </div>
            <button
              type="button"
              class="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#FAF7F3] text-[#4A4A54] hover:text-[#111118]"
              @click="emit('close')"
            >
              <X class="w-3.5 h-3.5" />
            </button>
          </header>

          <div class="px-4 sm:px-5 py-4 text-xs sm:text-sm text-[#4A4A54]">
            <slot />
          </div>

          <footer
            v-if="$slots.footer"
            class="px-4 sm:px-5 py-3 border-t border-[#E4E4EC] bg-[#FAF7F3] flex items-center justify-end gap-2"
          >
            <slot name="footer" />
          </footer>
        </div>
      </div>
    </transition>
  </teleport>
</template>
