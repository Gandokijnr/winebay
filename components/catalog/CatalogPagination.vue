<script setup lang="ts">
const props = defineProps<{
  currentPage: number
  totalPages: number
}>()

const emit = defineEmits<{
  (e: 'update:currentPage', value: number): void
}>()

const goToPage = (page: number) => {
  if (page < 1 || page > props.totalPages) return
  emit('update:currentPage', page)
}
</script>

<template>
  <nav
    v-if="totalPages > 1"
    class="mt-4 flex items-center justify-between gap-3 text-xs sm:text-sm text-[#4A4A54]"
    aria-label="Pagination"
  >
    <button
      type="button"
      class="inline-flex items-center rounded-full border border-[#E4E4EC] bg-white px-3 py-1.5 text-xs font-medium hover:border-[#6B1238] hover:text-[#6B1238] disabled:opacity-40 disabled:hover:border-[#E4E4EC] disabled:hover:text-[#4A4A54]"
      :disabled="currentPage === 1"
      @click="goToPage(currentPage - 1)"
    >
      Previous
    </button>

    <div class="flex items-center gap-1">
      <button
        v-for="page in totalPages"
        :key="page"
        type="button"
        class="inline-flex items-center justify-center rounded-full px-2.5 py-1 text-xs font-medium"
        :class="
          page === currentPage
            ? 'bg-[#6B1238] text-white'
            : 'bg-white text-[#4A4A54] border border-[#E4E4EC] hover:border-[#6B1238] hover:text-[#6B1238]'
        "
        @click="goToPage(page)"
      >
        {{ page }}
      </button>
    </div>

    <button
      type="button"
      class="inline-flex items-center rounded-full border border-[#E4E4EC] bg-white px-3 py-1.5 text-xs font-medium hover:border-[#6B1238] hover:text-[#6B1238] disabled:opacity-40 disabled:hover:border-[#E4E4EC] disabled:hover:text-[#4A4A54]"
      :disabled="currentPage === totalPages"
      @click="goToPage(currentPage + 1)"
    >
      Next
    </button>
  </nav>
</template>
