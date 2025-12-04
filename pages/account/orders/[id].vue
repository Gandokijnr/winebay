<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useOrder } from '~/composables/useOrder'
import BaseButton from '~/components/ui/BaseButton.vue'

const route = useRoute()
const router = useRouter()
const { orders } = useOrder()

const order = computed(() => orders.value.find((o) => o.id === route.params.id) ?? null)

const statusLabel = computed(() => {
  if (!order.value) return ''
  if (order.value.status === 'pending') return 'Pending'
  if (order.value.status === 'shipped') return 'Shipped'
  return 'Delivered'
})

const formattedPlacedAt = computed(() => {
  if (!order.value) return ''
  return new Date(order.value.placedAt).toLocaleString()
})

const handleBack = () => {
  router.push('/account')
}
</script>

<template>
  <div class="min-h-screen bg-[#FAF7F3] text-[#111118]">
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <header class="mb-6 sm:mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 class="text-xl sm:text-2xl font-semibold mb-1">Order details</h1>
          <p class="text-sm text-[#4A4A54]">
            Full breakdown of a specific WineHub order.
          </p>
        </div>
        <BaseButton variant="secondary" size="sm" @click="handleBack">
          Back to orders
        </BaseButton>
      </header>

      <AccountSidebar />

      <div v-if="!order" class="py-16 text-center text-sm text-[#4A4A54]">
        <p class="mb-3">We couldn't find this order in your history.</p>
        <NuxtLink to="/account">
          <BaseButton variant="primary" size="md">
            Go to My orders
          </BaseButton>
        </NuxtLink>
      </div>

      <div v-else class="grid lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.9fr)] gap-6 lg:gap-8 items-start">
        <section class="space-y-4">
          <div class="bg-white rounded-2xl border border-[#E4E4EC] p-4 sm:p-5 space-y-3 text-sm text-[#111118]">
            <header class="flex items-center justify-between gap-3">
              <div class="space-y-0.5">
                <p class="text-xs text-[#4A4A54]">Order</p>
                <p class="text-sm sm:text-base font-semibold">
                  <span class="font-mono">{{ order.id }}</span>
                </p>
                <p class="text-[11px] text-[#4A4A54]">Placed {{ formattedPlacedAt }}</p>
              </div>
              <span
                class="inline-flex items-center rounded-full px-2 py-1 text-[10px] font-medium"
                :class="
                  order.status === 'delivered'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                    : order.status === 'shipped'
                      ? 'bg-sky-50 text-sky-700 border border-sky-100'
                      : 'bg-amber-50 text-amber-700 border border-amber-100'
                "
              >
                {{ statusLabel }}
              </span>
            </header>

            <div class="grid sm:grid-cols-2 gap-3 text-xs sm:text-sm text-[#4A4A54] mt-1">
              <div class="space-y-0.5">
                <p class="text-[11px] uppercase tracking-[0.16em] text-[#A0A0AA]">Delivery</p>
                <p class="font-medium capitalize">{{ order.deliveryOption }} · {{ order.estimatedDeliveryText }}</p>
              </div>
              <div class="space-y-0.5">
                <p class="text-[11px] uppercase tracking-[0.16em] text-[#A0A0AA]">Payment</p>
                <p class="font-medium capitalize">{{ order.paymentMethod }}</p>
              </div>
              <div class="space-y-0.5">
                <p class="text-[11px] uppercase tracking-[0.16em] text-[#A0A0AA]">Deliver to</p>
                <p class="font-medium">{{ order.address }}</p>
              </div>
              <div class="space-y-0.5">
                <p class="text-[11px] uppercase tracking-[0.16em] text-[#A0A0AA]">Contact</p>
                <p class="font-medium">{{ order.contactName }} · {{ order.contactPhone }}</p>
              </div>
            </div>
          </div>

          <section class="bg-white rounded-2xl border border-[#E4E4EC] p-4 sm:p-5 space-y-3 text-sm text-[#111118]">
            <header class="flex items-center justify-between gap-3">
              <h2 class="text-sm sm:text-base font-semibold">Items in this order</h2>
            </header>

            <div class="divide-y divide-[#F1F1F5]">
              <article
                v-for="item in order.items"
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
              <span>Items ({{ order.items.length }})</span>
              <span>€{{ order.subtotal.toFixed(2) }}</span>
            </div>
            <div class="flex items-center justify-between text-[13px] text-[#4A4A54]">
              <span>Delivery fee</span>
              <span>
                <span v-if="order.deliveryFee === 0">Free</span>
                <span v-else>€{{ order.deliveryFee.toFixed(2) }}</span>
              </span>
            </div>
            <div class="flex items-center justify-between pt-2 border-t border-[#F1F1F5] text-sm font-semibold">
              <span>Total</span>
              <span>€{{ order.total.toFixed(2) }}</span>
            </div>
          </section>
        </aside>
      </div>
    </main>
  </div>
</template>
