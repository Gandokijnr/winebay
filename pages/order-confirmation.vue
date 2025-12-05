<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useOrder } from '~/composables/useOrder'
import BaseButton from '~/components/ui/BaseButton.vue'

const router = useRouter()
const { lastOrder } = useOrder()

const hasOrder = computed(() => !!lastOrder.value)

const formattedPlacedAt = computed(() => {
  if (!lastOrder.value) return ''
  return new Date(lastOrder.value.placedAt).toLocaleString()
})

const handleTrackOrder = () => {
  // Placeholder: redirect to account/orders area when implemented
  router.push('/account')
}
</script>

<template>
  <div class="min-h-screen bg-[#FAF7F3] text-[#111118]">
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <header class="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 class="text-xl sm:text-2xl font-semibold mb-1">Order confirmation</h1>
          <p class="text-sm text-[#4A4A54]">
            Thank you for shopping with WineHub. Your order details are below.
          </p>
        </div>
        <NuxtLink to="/catalog">
          <BaseButton variant="secondary" size="sm">
            Continue shopping
          </BaseButton>
        </NuxtLink>
      </header>

      <div v-if="!hasOrder" class="py-16 text-center text-sm text-[#4A4A54]">
        <p class="mb-3">We couldn't find a recent order to show here.</p>
        <NuxtLink to="/catalog">
          <BaseButton variant="primary" size="md">
            Browse wines
          </BaseButton>
        </NuxtLink>
      </div>

      <div v-else class="grid lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.9fr)] gap-6 lg:gap-8 items-start">
        <section class="space-y-4">
          <div class="bg-white rounded-2xl border border-[#E4E4EC] p-4 sm:p-5 space-y-3">
            <div class="flex flex-col gap-1">
              <p class="text-sm sm:text-base font-semibold">
                Thank you, {{ lastOrder!.contactName || 'Wine lover' }}!
              </p>
              <p class="text-xs text-[#4A4A54]">
                Your order <span class="font-mono font-semibold">{{ lastOrder!.id }}</span> is confirmed.
              </p>
            </div>

            <div class="grid sm:grid-cols-2 gap-3 text-xs sm:text-sm text-[#4A4A54] mt-2">
              <div class="space-y-0.5">
                <p class="text-[11px] uppercase tracking-[0.16em] text-[#A0A0AA]">Placed</p>
                <p class="font-medium">{{ formattedPlacedAt }}</p>
              </div>
              <div class="space-y-0.5">
                <p class="text-[11px] uppercase tracking-[0.16em] text-[#A0A0AA]">Payment</p>
                <p class="font-medium capitalize">{{ lastOrder!.paymentMethod }}</p>
              </div>
              <div class="space-y-0.5">
                <p class="text-[11px] uppercase tracking-[0.16em] text-[#A0A0AA]">Delivery to</p>
                <p class="font-medium">{{ lastOrder!.address }}</p>
                <p class="text-[11px] text-[#A0A0AA]">
                  Contact: {{ lastOrder!.contactName }} · {{ lastOrder!.contactPhone }}
                </p>
              </div>
              <div class="space-y-0.5">
                <p class="text-[11px] uppercase tracking-[0.16em] text-[#A0A0AA]">Delivery timeline</p>
                <p class="font-medium">{{ lastOrder!.estimatedDeliveryText }}</p>
                <p class="text-[11px] text-[#A0A0AA]">
                  We will update you by SMS or email as soon as your wines are on the way.
                </p>
              </div>
            </div>

            <div class="flex flex-wrap gap-2 mt-2">
              <BaseButton variant="primary" size="sm" @click="handleTrackOrder">
                Track order
              </BaseButton>
              <NuxtLink to="/cart">
                <BaseButton variant="secondary" size="sm">
                  View cart
                </BaseButton>
              </NuxtLink>
            </div>
          </div>

          <section class="bg-white rounded-2xl border border-[#E4E4EC] p-4 sm:p-5 space-y-3 text-sm text-[#111118]">
            <header class="flex items-center justify-between gap-3">
              <h2 class="text-sm sm:text-base font-semibold">Items purchased</h2>
              <p class="text-[11px] text-[#4A4A54]">
                {{ lastOrder!.items.length }} {{ lastOrder!.items.length === 1 ? 'wine' : 'wines' }}
              </p>
            </header>

            <div class="divide-y divide-[#F1F1F5]">
              <article
                v-for="item in lastOrder!.items"
                :key="item.id"
                class="py-3 flex items-center gap-3 sm:gap-4"
              >
                <div class="w-14 h-20 sm:w-16 sm:h-24 rounded-xl overflow-hidden bg-[#FAF7F3] flex-shrink-0 flex items-center justify-center">
                  <img :src="item.image" :alt="item.name" class="h-full w-full object-cover" />
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-xs sm:text-sm font-medium text-[#111118] line-clamp-2">
                    {{ item.name }}
                  </p>
                  <p class="text-[11px] text-[#4A4A54]">
                    {{ item.quantity }} × €{{ item.price.toFixed(2) }}
                  </p>
                </div>
                <div class="text-xs sm:text-sm font-semibold text-[#6B1238]">
                  €{{ (item.price * item.quantity).toFixed(2) }}
                </div>
              </article>
            </div>
          </section>
        </section>

        <aside class="space-y-3">
          <section class="bg-white rounded-2xl border border-[#E4E4EC] p-4 sm:p-5 space-y-3 text-sm text-[#111118]">
            <h2 class="text-sm sm:text-base font-semibold mb-1">Order summary</h2>
            <div class="flex items-center justify-between text-[13px] text-[#4A4A54]">
              <span>Items ({{ lastOrder!.items.length }})</span>
              <span>€{{ lastOrder!.subtotal.toFixed(2) }}</span>
            </div>
            <div class="flex items-center justify-between text-[13px] text-[#4A4A54]">
              <span>Delivery fee</span>
              <span>
                <span v-if="lastOrder!.deliveryFee === 0">Free</span>
                <span v-else>€{{ lastOrder!.deliveryFee.toFixed(2) }}</span>
              </span>
            </div>
            <div class="flex items-center justify-between pt-2 border-t border-[#F1F1F5] text-sm font-semibold">
              <span>Total</span>
              <span>€{{ lastOrder!.total.toFixed(2) }}</span>
            </div>
            <p class="text-[11px] text-[#4A4A54]">
              You will receive an order confirmation and tracking updates via your preferred contact method.
            </p>
          </section>
        </aside>
      </div>
    </main>
  </div>
</template>
