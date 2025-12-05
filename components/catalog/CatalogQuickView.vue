<script setup lang="ts">
import { ref } from 'vue'
import { X } from 'lucide-vue-next'
import type { CatalogWine } from '~/types/catalog'
import ReviewStars from '~/components/ui/ReviewStars.vue'
import BaseButton from '~/components/ui/BaseButton.vue'
import SuccessModal from '~/components/ui/SuccessModal.vue'

const props = defineProps<{
  open: boolean
  wine: CatalogWine | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'add-to-cart'): void
  (e: 'view-details'): void
  (e: 'checkout'): void
}>()

const showAddedModal = ref(false)

const onAddToCart = () => {
  emit('add-to-cart')
  showAddedModal.value = true
}

const onCheckout = () => {
  emit('checkout')
}
</script>

<template>
  <teleport to="body">
    <transition name="fade">
      <div
        v-if="open && wine"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
        @click.self="emit('close')"
      >
        <div class="max-w-lg w-full bg-white rounded-2xl shadow-xl overflow-hidden text-[#111118]">
          <header class="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-[#E4E4EC]">
            <div>
              <p class="text-[11px] uppercase tracking-[0.15em] text-[#A0A0AA]">Quick view</p>
              <h2 class="text-sm sm:text-base font-semibold line-clamp-1">{{ wine.name }}</h2>
            </div>
            <button
              type="button"
              class="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#FAF7F3] text-[#4A4A54] hover:text-[#111118]"
              @click="emit('close')"
            >
              <X class="w-3.5 h-3.5" />
            </button>
          </header>

          <div class="grid sm:grid-cols-[minmax(0,1.1fr)_minmax(0,1.2fr)] gap-4 sm:gap-5 px-4 sm:px-5 py-4">
            <div>
              <div class="aspect-[3/4] w-full overflow-hidden rounded-xl bg-[#FAF7F3] flex items-center justify-center mb-3">
                <img :src="wine.image" :alt="wine.name" class="h-full w-full object-cover" />
              </div>
              <p class="text-[11px] text-[#4A4A54] line-clamp-3">
                {{ wine.shortDescription }}
              </p>
            </div>

            <div class="flex flex-col gap-2 text-xs sm:text-sm">
              <p class="text-[#4A4A54]">
                {{ wine.region }} · {{ wine.country }} · {{ wine.year }}
              </p>
              <ReviewStars
                :rating="wine.rating"
                :review-count="wine.reviews"
                size="md"
              />

              <div class="mt-1">
                <p class="text-base font-semibold text-[#6B1238]">€{{ wine.price }}</p>
                <p v-if="wine.oldPrice" class="text-xs text-[#A0A0AA] line-through">€{{ wine.oldPrice }}</p>
              </div>

              <div class="mt-2 flex flex-col gap-2">
                <div class="flex items-center gap-2 text-[11px] text-[#4A4A54]">
                  <span class="px-2 py-0.5 rounded-full bg-[#FAF7F3]">Dry</span>
                  <span class="px-2 py-0.5 rounded-full bg-[#FAF7F3]">Medium-bodied</span>
                  <span class="px-2 py-0.5 rounded-full bg-[#FAF7F3]">Food-friendly</span>
                </div>
                <div class="flex items-center gap-2">
                  <BaseButton
                    variant="primary"
                    size="md"
                    class="flex-1"
                    @click="onAddToCart"
                  >
                    Add to cart
                  </BaseButton>
                  <BaseButton
                    variant="secondary"
                    size="md"
                    @click="onCheckout"
                  >
                    Checkout
                  </BaseButton>
                </div>
              </div>
            </div>
          </div>
          <SuccessModal
            :open="showAddedModal"
            title="Added to cart"
            message="This wine has been added to your cart."
            primary-label="Continue shopping"
            @close="showAddedModal = false"
          />
        </div>
      </div>
    </transition>
  </teleport>
</template>
