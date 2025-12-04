<script setup lang="ts">
import BaseModal from './BaseModal.vue'
import BaseButton from './BaseButton.vue'
import { CheckCircle2 } from 'lucide-vue-next'

const props = withDefaults(
  defineProps<{
    open: boolean
    title?: string
    message?: string
    primaryLabel?: string
  }>(),
  {
    title: 'Success',
    message: 'Your action was completed successfully.',
    primaryLabel: 'Close'
  }
)

const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
  <BaseModal
    :open="open"
    :title="title"
    size="sm"
    description="Notification"
    @close="emit('close')"
  >
    <div class="flex flex-col items-center text-center gap-2">
      <CheckCircle2 class="w-8 h-8 text-[#6B1238]" />
      <p class="text-xs text-[#4A4A54]">
        {{ message }}
      </p>
    </div>

    <template #footer>
      <BaseButton variant="primary" size="md" @click="emit('close')">
        {{ primaryLabel }}
      </BaseButton>
    </template>
  </BaseModal>
</template>
