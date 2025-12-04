<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { Trash2 } from 'lucide-vue-next'
import { useCart } from '~/composables/useCart'
import BaseButton from '~/components/ui/BaseButton.vue'

const router = useRouter()
const { items, subtotal, incrementWine: increment, decrementWine: decrement, removeWine: removeItem } = useCart()

const deliveryFee = computed(() => {
  if (!items.value.length) return 0
  return subtotal.value >= 150 ? 0 : 12
})

const total = computed(() => subtotal.value + deliveryFee.value)

const handleProceedToCheckout = () => {
  // Placeholder: navigate to a future checkout page
  router.push('/checkout')
}
</script>

<template>
  <div class="min-h-screen bg-[#FAF7F3] text-[#111118]">
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <header class="mb-6 sm:mb-8">
        <h1 class="text-xl sm:text-2xl font-semibold mb-1">Your cart</h1>
        <p class="text-sm text-[#4A4A54]">
          Review your selected wines, adjust quantities, and proceed to secure checkout.
        </p>
      </header>

      <div v-if="!items.length" class="py-16 text-center text-sm text-[#4A4A54]">
        <p class="mb-3">Your cart is currently empty.</p>
        <NuxtLink to="/catalog">
          <BaseButton variant="primary" size="md">
            Browse wines
          </BaseButton>
        </NuxtLink>
      </div>

      <div v-else class="grid lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.9fr)] gap-6 lg:gap-8 items-start">
        <section class="bg-white rounded-2xl border border-[#E4E4EC] p-4 sm:p-5 space-y-4">
          <header class="flex items-center justify-between gap-3 mb-2">
            <p class="text-sm font-medium">
              {{ items.length }} {{ items.length === 1 ? 'wine' : 'wines' }} in your cart
            </p>
          </header>

          <div class="divide-y divide-[#F1F1F5]">
            <article
              v-for="item in items"
              :key="item.id"
              class="py-4 flex gap-3 sm:gap-4 items-center"
            >
              <NuxtLink
                :to="`/wines/${item.slug}`"
                class="w-16 h-24 sm:w-20 sm:h-28 rounded-xl overflow-hidden bg-[#FAF7F3] flex-shrink-0 flex items-center justify-center"
              >
                <img :src="item.image" :alt="item.name" class="h-full w-full object-cover" />
              </NuxtLink>

              <div class="flex-1 min-w-0 space-y-1">
                <NuxtLink
                  :to="`/wines/${item.slug}`"
                  class="block text-sm sm:text-base font-semibold text-[#111118] hover:text-[#6B1238] line-clamp-2"
                >
                  {{ item.name }}
                </NuxtLink>
                <p class="text-xs text-[#4A4A54]">
                  €{{ item.price.toFixed(2) }} per bottle
                </p>
                <div class="flex items-center gap-3 mt-2">
                  <div class="inline-flex items-center rounded-full border border-[#E4E4EC] bg-white px-2 py-1 text-xs">
                    <button
                      type="button"
                      class="px-2 text-lg leading-none text-[#4A4A54]"
                      @click="decrement(item.id)"
                    >
                      −
                    </button>
                    <span class="w-8 text-center text-sm">{{ item.quantity }}</span>
                    <button
                      type="button"
                      class="px-2 text-lg leading-none text-[#4A4A54]"
                      @click="increment(item.id)"
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    class="inline-flex items-center gap-1 text-[11px] text-[#A0A0AA] hover:text-[#6B1238]"
                    @click="removeItem(item.id)"
                  >
                    <Trash2 class="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>

              <div class="text-right text-sm sm:text-base font-semibold text-[#6B1238] ml-2">
                €{{ (item.price * item.quantity).toFixed(2) }}
              </div>
            </article>
          </div>
        </section>

        <aside class="space-y-3">
          <section class="bg-white rounded-2xl border border-[#E4E4EC] p-4 sm:p-5 space-y-3 text-sm text-[#111118]">
            <h2 class="text-sm sm:text-base font-semibold mb-1">Order summary</h2>
            <div class="flex items-center justify-between text-[13px] text-[#4A4A54]">
              <span>Subtotal</span>
              <span>€{{ subtotal.toFixed(2) }}</span>
            </div>
            <div class="flex items-center justify-between text-[13px] text-[#4A4A54]">
              <span>Delivery fee estimate</span>
              <span>
                <span v-if="deliveryFee === 0">Free</span>
                <span v-else>€{{ deliveryFee.toFixed(2) }}</span>
              </span>
            </div>
            <div class="flex items-center justify-between pt-2 border-t border-[#F1F1F5] text-sm font-semibold">
              <span>Total</span>
              <span>€{{ total.toFixed(2) }}</span>
            </div>

            <p class="text-[11px] text-[#4A4A54]">
              Exact delivery fees and taxes will be calculated at checkout based on your address.
            </p>

            <BaseButton
              variant="primary"
              size="md"
              fullWidth
              @click="handleProceedToCheckout"
            >
              Proceed to checkout
            </BaseButton>
          </section>
        </aside>
      </div>
    </main>
  </div>
</template>
