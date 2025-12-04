<script setup lang="ts">
import type { CatalogSortOption } from './CatalogFiltersSidebar.vue'

const props = defineProps<{
  totalItems: number
  sortOption: CatalogSortOption
}>()

const emit = defineEmits<{
  (e: 'update:sortOption', value: CatalogSortOption): void
  (e: 'toggleFilters'): void
}>()

const onSortChange = (value: string) => {
  emit('update:sortOption', value as CatalogSortOption)
}
</script>

<template>
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm text-[#4A4A54]">
    <div class="flex items-center gap-2">
      <p class="font-medium text-[#111118]">
        {{ totalItems }} wines
      </p>
      <p class="hidden sm:inline text-xs text-[#6B1238]">
        Filtered by your preferences
      </p>
    </div>
    <div class="flex items-center gap-2">
      <button
        type="button"
        class="inline-flex items-center rounded-full border border-[#E4E4EC] bg-white px-3 py-1.5 text-xs font-medium text-[#4A4A54] hover:border-[#6B1238] hover:text-[#6B1238] sm:hidden"
        @click="emit('toggleFilters')"
      >
        Filters
      </button>
      <div class="inline-flex items-center gap-2">
        <span class="text-xs text-[#4A4A54]">Sort by</span>
        <select
          :value="sortOption"
          class="rounded-full border border-[#E4E4EC] bg-white px-3 py-1.5 text-xs text-[#111118] focus:outline-none focus:border-[#6B1238] focus:ring-2 focus:ring-[#F3DEC0]"
          @change="onSortChange(($event.target as HTMLSelectElement).value)"
        >
          <option value="newest">Newest</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
          <option value="popularity">Most Popular</option>
        </select>
      </div>
    </div>
  </div>
</template>
