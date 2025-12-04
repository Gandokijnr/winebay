<script setup lang="ts">
import WineCard from '~/components/catalog/WineCard.vue'
import type { CatalogWine } from '~/types/catalog'

const props = defineProps<{
  wines: CatalogWine[]
  wishlistIds: number[]
}>()

const emit = defineEmits<{
  (e: 'toggle-wishlist', wineId: number): void
  (e: 'quick-view', wine: CatalogWine): void
  (e: 'add-to-cart', wine: CatalogWine): void
}>()
</script>

<template>
  <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 sm:gap-4">
    <WineCard
      v-for="wine in wines"
      :key="wine.id"
      :wine="wine"
      :wishlisted="wishlistIds.includes(wine.id)"
      @toggle-wishlist="emit('toggle-wishlist', wine.id)"
      @quick-view="emit('quick-view', wine)"
      @add-to-cart="emit('add-to-cart', wine)"
    />
  </div>
</template>
