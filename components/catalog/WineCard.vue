<script setup lang="ts">
import { ref } from 'vue'
import { Heart } from 'lucide-vue-next'
import type { CatalogWine } from '~/types/catalog'
import ReviewStars from '~/components/ui/ReviewStars.vue'
import Badge from '~/components/ui/Badge.vue'
import BaseButton from '~/components/ui/BaseButton.vue'
import SuccessModal from '~/components/ui/SuccessModal.vue'

const props = defineProps<{
  wine: CatalogWine
  wishlisted: boolean
}>()

const emit = defineEmits<{
  (e: 'toggle-wishlist'): void
  (e: 'quick-view'): void
  (e: 'add-to-cart'): void
}>()

const showAddedModal = ref(false)

const onAddToCart = () => {
  emit('add-to-cart')
  showAddedModal.value = true
}
</script>

<template>
  <article
    class="group relative rounded-2xl bg-white p-3 sm:p-4 shadow-sm hover:shadow-lg border border-transparent hover:border-[#F3DEC0] transition flex flex-col"
    @click="emit('quick-view')"
  >
    <!-- Wishlist icon -->
    <button
      type="button"
      class="absolute right-2 top-2 z-10 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/90 shadow-sm text-[#A0A0AA] hover:text-[#6B1238]"
      @click.stop="emit('toggle-wishlist')"
    >
      <Heart
        class="w-3.5 h-3.5"
        :class="wishlisted ? 'text-[#6B1238] fill-[#6B1238]' : ''"
      />
    </button>

    <!-- Image -->
    <div class="relative mb-3">
      <div class="aspect-[3/4] w-full overflow-hidden rounded-xl bg-[#FAF7F3] flex items-center justify-center">
        <img
          :src="wine.image"
          :alt="wine.name"
          class="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div v-if="wine.isNew || wine.isLimited" class="absolute left-2 top-2">
        <Badge :variant="wine.isNew ? 'new' : 'sale'">
          {{ wine.isNew ? 'New' : 'Limited' }}
        </Badge>
      </div>
    </div>

    <!-- Info -->
    <div class="flex-1 space-y-1">
      <h3 class="text-xs sm:text-sm font-semibold text-[#111118] line-clamp-2">
        {{ wine.name }}
      </h3>
      <p class="text-[11px] text-[#4A4A54]">
        {{ wine.region }} · {{ wine.country }}
      </p>
      <p class="text-[11px] text-[#4A4A54] line-clamp-2">
        {{ wine.shortDescription }}
      </p>
      <ReviewStars
        class="mt-1"
        :rating="wine.rating"
        :review-count="wine.reviews"
        size="sm"
      />
    </div>

    <!-- Price & CTAs -->
    <div class="mt-2 flex items-center justify-between gap-2">
      <div>
        <p class="text-sm sm:text-base font-semibold text-[#6B1238]">
          €{{ wine.price }}
        </p>
        <p v-if="wine.oldPrice" class="text-[11px] text-[#A0A0AA] line-through">
          €{{ wine.oldPrice }}
        </p>
      </div>
      <BaseButton
        variant="secondary"
        size="sm"
        class="hidden sm:inline-flex"
        @click.stop="emit('quick-view')"
      >
        Quick view
      </BaseButton>
    </div>

    <BaseButton
      variant="primary"
      size="sm"
      class="mt-2"
      @click.stop="onAddToCart"
    >
      Add to cart
    </BaseButton>
  </article>

  <SuccessModal
    :open="showAddedModal"
    title="Added to cart"
    message="This wine has been added to your cart."
    primary-label="Continue shopping"
    @close="showAddedModal = false"
  />
</template>
