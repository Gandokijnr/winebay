<script setup lang="ts">
import { computed } from 'vue'
import { Check } from 'lucide-vue-next'
import { useOrder } from '~/composables/useOrder'
import BaseButton from '~/components/ui/BaseButton.vue'

const { lastOrder, orders } = useOrder()

const hasOrder = computed(() => !!lastOrder.value)

const otherOrders = computed(() => {
  if (!lastOrder.value) return orders.value
  return orders.value.filter((order) => order.id !== lastOrder.value!.id)
})

const trackingSteps = computed(() => {
  if (!lastOrder.value) return []

  const placedAt = new Date(lastOrder.value.placedAt).toLocaleString()

  return [
    {
      key: 'confirmed',
      title: 'Order confirmed',
      description: `Order ${lastOrder.value.id} was confirmed.`,
      meta: placedAt,
      status: 'complete' as const
    },
    {
      key: 'preparing',
      title: 'Preparing your wines',
      description: 'Our team is picking and packing your bottles with temperature control in mind.',
      meta: 'Next step before dispatch',
      status: 'current' as const
    },
    {
      key: 'delivery',
      title: 'Out for delivery',
      description: 'Your wines will be with our delivery partner on the way to your address.',
      meta: lastOrder.value.estimatedDeliveryText,
      status: 'upcoming' as const
    }
  ]
})
</script>

<template>
  <div class="min-h-screen bg-[#FAF7F3] text-[#111118]">
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <header class="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 class="text-xl sm:text-2xl font-semibold mb-1">My orders</h1>
          <p class="text-sm text-[#4A4A54]">
            Track your recent WineHub orders and see their delivery status.
          </p>
        </div>
        <NuxtLink to="/catalog">
          <BaseButton variant="secondary" size="sm">
            Continue shopping
          </BaseButton>
        </NuxtLink>
      </header>

      <AccountSidebar />

      <div v-if="!hasOrder" class="py-16 text-center text-sm text-[#4A4A54]">
        <p class="mb-3">You don't have any orders yet.</p>
        <p class="mb-4 text-[13px] text-[#A0A0AA]">Once you place an order, you’ll see its status and timeline here.</p>
        <NuxtLink to="/catalog">
          <BaseButton variant="primary" size="md">
            Browse wines
          </BaseButton>
        </NuxtLink>
      </div>

      <div v-else class="grid lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.9fr)] gap-6 lg:gap-8 items-start">
        <!-- Last order summary -->
        <section class="space-y-4">
          <div class="bg-white rounded-2xl border border-[#E4E4EC] p-4 sm:p-5 space-y-3 text-sm text-[#111118]">
            <header class="flex items-center justify-between gap-3">
              <div>
                <p class="text-xs text-[#4A4A54]">Most recent order</p>
                <p class="text-sm sm:text-base font-semibold">
                  Order <span class="font-mono">{{ lastOrder!.id }}</span>
                </p>
              </div>
              <div class="flex items-center gap-2">
                <span
                  class="inline-flex items-center rounded-full px-2 py-1 text-[10px] font-medium"
                  :class="
                    lastOrder!.status === 'delivered'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                      : lastOrder!.status === 'shipped'
                        ? 'bg-sky-50 text-sky-700 border border-sky-100'
                        : 'bg-amber-50 text-amber-700 border border-amber-100'
                  "
                >
                  {{ lastOrder!.status === 'pending' ? 'Pending' : lastOrder!.status === 'shipped' ? 'Shipped' : 'Delivered' }}
                </span>
                <NuxtLink :to="`/account/orders/${lastOrder!.id}`">
                  <BaseButton variant="secondary" size="sm">
                    View details
                  </BaseButton>
                </NuxtLink>
              </div>
            </header>

            <div class="grid sm:grid-cols-2 gap-3 text-xs sm:text-sm text-[#4A4A54] mt-1">
              <div class="space-y-0.5">
                <p class="text-[11px] uppercase tracking-[0.16em] text-[#A0A0AA]">Items</p>
                <p class="font-medium">
                  {{ lastOrder!.items.length }} {{ lastOrder!.items.length === 1 ? 'wine' : 'wines' }}
                </p>
              </div>
              <div class="space-y-0.5">
                <p class="text-[11px] uppercase tracking-[0.16em] text-[#A0A0AA]">Total</p>
                <p class="font-medium">€{{ lastOrder!.total.toFixed(2) }}</p>
              </div>
              <div class="space-y-0.5">
                <p class="text-[11px] uppercase tracking-[0.16em] text-[#A0A0AA]">Delivery option</p>
                <p class="font-medium capitalize">{{ lastOrder!.deliveryOption }}</p>
              </div>
              <div class="space-y-0.5">
                <p class="text-[11px] uppercase tracking-[0.16em] text-[#A0A0AA]">To</p>
                <p class="font-medium truncate">{{ lastOrder!.address }}</p>
              </div>
            </div>
          </div>

          <!-- Orders history -->
          <section class="bg-white rounded-2xl border border-[#E4E4EC] p-4 sm:p-5 space-y-3 text-sm text-[#111118]">
            <header class="flex items-center justify-between gap-3">
              <h2 class="text-sm sm:text-base font-semibold">Orders history</h2>
              <p class="text-[11px] text-[#4A4A54]">
                Overview of your recent WineHub orders.
              </p>
            </header>

            <div v-if="!otherOrders.length" class="text-[11px] sm:text-xs text-[#4A4A54]">
              You have {{ orders.length }} order{{ orders.length === 1 ? '' : 's' }} so far. New orders will appear here as
              you continue shopping.
            </div>

            <div v-else class="divide-y divide-[#F1F1F5]">
              <NuxtLink
                v-for="order in otherOrders"
                :key="order.id"
                :to="`/account/orders/${order.id}`"
                class="block py-3 text-xs sm:text-sm text-[#4A4A54] hover:bg-[#FAF7F3]"
              >
                <div class="flex items-center justify-between gap-3">
                  <div class="space-y-0.5 min-w-0">
                    <p class="font-medium text-[#111118] truncate">
                      Order <span class="font-mono">{{ order.id }}</span>
                    </p>
                    <p class="text-[11px] sm:text-xs">
                      {{ order.items.length }} {{ order.items.length === 1 ? 'wine' : 'wines' }} ·
                      €{{ order.total.toFixed(2) }} · {{ new Date(order.placedAt).toLocaleDateString() }}
                    </p>
                  </div>
                  <div class="text-[11px] sm:text-xs text-[#A0A0AA] text-right">
                    <p class="capitalize">
                      {{ order.deliveryOption }} ·
                      {{ order.status === 'pending' ? 'Pending' : order.status === 'shipped' ? 'Shipped' : 'Delivered' }}
                    </p>
                    <p class="truncate max-w-[9rem]">{{ order.address }}</p>
                  </div>
                </div>
              </NuxtLink>
            </div>
          </section>

          <!-- Tracking timeline -->
          <section class="bg-white rounded-2xl border border-[#E4E4EC] p-4 sm:p-5 space-y-4 text-sm text-[#111118]">
            <header class="flex items-center justify-between gap-3">
              <h2 class="text-sm sm:text-base font-semibold">Order tracking</h2>
              <p class="text-[11px] text-[#4A4A54]">
                A simple view of where your order is in the journey.
              </p>
            </header>

            <ol class="space-y-3">
              <li
                v-for="(step, index) in trackingSteps"
                :key="step.key"
                class="flex gap-3 sm:gap-4"
              >
                <div class="flex flex-col items-center">
                  <div
                    class="flex items-center justify-center rounded-full border w-6 h-6 text-[11px]"
                    :class="
                      step.status === 'complete'
                        ? 'bg-[#6B1238] border-[#6B1238] text-white'
                        : step.status === 'current'
                          ? 'bg-[#F3DEC0] border-[#6B1238] text-[#6B1238]'
                          : 'bg-white border-[#E4E4EC] text-[#A0A0AA]'
                    "
                  >
                    <Check
                      v-if="step.status === 'complete'"
                      class="w-3 h-3"
                    />
                    <span v-else>{{ index + 1 }}</span>
                  </div>
                  <div
                    v-if="index < trackingSteps.length - 1"
                    class="w-px flex-1 bg-[#E4E4EC] mt-1"
                  ></div>
                </div>
                <div class="flex-1 min-w-0 space-y-0.5">
                  <p class="text-xs sm:text-sm font-semibold">{{ step.title }}</p>
                  <p class="text-[11px] sm:text-xs text-[#4A4A54]">
                    {{ step.description }}
                  </p>
                  <p class="text-[11px] text-[#A0A0AA]">
                    {{ step.meta }}
                  </p>
                </div>
              </li>
            </ol>
          </section>
        </section>

        <!-- Right side: small info card -->
        <aside class="space-y-3">
          <section class="bg-white rounded-2xl border border-[#E4E4EC] p-4 sm:p-5 space-y-3 text-sm text-[#111118]">
            <h2 class="text-sm sm:text-base font-semibold mb-1">Need help with this order?</h2>
            <p class="text-[11px] sm:text-xs text-[#4A4A54]">
              If anything looks incorrect or your order is delayed, you can reach out to support with your
              reference <span class="font-mono font-semibold">{{ lastOrder!.id }}</span>.
            </p>
            <BaseButton variant="secondary" size="sm">
              Contact support
            </BaseButton>
          </section>
        </aside>
      </div>
    </main>
  </div>
</template>
