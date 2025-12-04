<script setup lang="ts">
import { computed } from 'vue'
import { useOrder } from '~/composables/useOrder'

const { orders } = useOrder()

const totalRevenue = computed(() => orders.value.reduce((sum, order) => sum + order.total, 0))
const totalOrders = computed(() => orders.value.length)
const averageOrderValue = computed(() =>
  totalOrders.value ? totalRevenue.value / totalOrders.value : 0
)

const ordersByStatus = computed(() => {
  const pending = orders.value.filter((o) => o.status === 'pending').length
  const shipped = orders.value.filter((o) => o.status === 'shipped').length
  const delivered = orders.value.filter((o) => o.status === 'delivered').length

  return { pending, shipped, delivered }
})

const ordersByMonth = computed(() => {
  const map = new Map<string, { key: string; label: string; orders: number; revenue: number }>()

  for (const order of orders.value) {
    const date = new Date(order.placedAt)
    if (Number.isNaN(date.getTime())) continue

    const key = `${date.getFullYear()}-${date.getMonth()}`
    const label = date.toLocaleString(undefined, { month: 'short', year: 'numeric' })

    if (!map.has(key)) {
      map.set(key, { key, label, orders: 0, revenue: 0 })
    }

    const entry = map.get(key)!
    entry.orders += 1
    entry.revenue += order.total
  }

  return Array.from(map.values()).sort((a, b) => a.key.localeCompare(b.key))
})

const maxMonthOrders = computed(() =>
  ordersByMonth.value.reduce((max, m) => (m.orders > max ? m.orders : max), 0)
)

const topWines = computed(() => {
  const map = new Map<string, { name: string; revenue: number; quantity: number }>()

  for (const order of orders.value) {
    for (const item of order.items) {
      const name = item.name
      if (!map.has(name)) {
        map.set(name, { name, revenue: 0, quantity: 0 })
      }
      const entry = map.get(name)!
      entry.revenue += item.price * item.quantity
      entry.quantity += item.quantity
    }
  }

  return Array.from(map.values())
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5)
})
</script>

<template>
  <div class="min-h-screen bg-[#FAF7F3] text-[#111118]">
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <header class="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div class="space-y-1">
          <p class="text-xs font-semibold tracking-[0.16em] uppercase text-[#A0A0AA]">Admin &middot; Analytics</p>
          <h1 class="text-2xl sm:text-3xl font-semibold">Sales analytics</h1>
          <p class="text-sm sm:text-base text-[#4A4A54] max-w-2xl">
            Lightweight overview of WineHub orders and revenue. This view updates as real orders are placed.
          </p>
        </div>
      </header>

      <!-- KPI row -->
      <section class="grid gap-3 sm:gap-4 md:grid-cols-3 mb-6 sm:mb-8 text-xs sm:text-sm text-[#4A4A54]">
        <div class="rounded-2xl bg-white border border-[#E4E4EC] p-3 sm:p-4">
          <p class="text-[11px] uppercase tracking-[0.16em] text-[#A0A0AA] mb-1">Total revenue</p>
          <p class="text-xl sm:text-2xl font-semibold text-[#111118]">
            €{{ totalRevenue.toFixed(2) }}
          </p>
        </div>
        <div class="rounded-2xl bg-white border border-[#E4E4EC] p-3 sm:p-4">
          <p class="text-[11px] uppercase tracking-[0.16em] text-[#A0A0AA] mb-1">Total orders</p>
          <p class="text-xl sm:text-2xl font-semibold text-[#111118]">
            {{ totalOrders }}
          </p>
        </div>
        <div class="rounded-2xl bg-white border border-[#E4E4EC] p-3 sm:p-4">
          <p class="text-[11px] uppercase tracking-[0.16em] text-[#A0A0AA] mb-1">Average order value</p>
          <p class="text-xl sm:text-2xl font-semibold text-[#111118]">
            €{{ averageOrderValue.toFixed(2) }}
          </p>
        </div>
      </section>

      <section class="grid gap-4 sm:gap-5 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1.1fr)] items-start">
        <!-- Orders by month -->
        <div class="bg-white rounded-2xl border border-[#E4E4EC] p-4 sm:p-5 text-xs sm:text-sm text-[#4A4A54]">
          <header class="flex items-center justify-between mb-3">
            <div>
              <h2 class="text-sm sm:text-base font-semibold">Orders over time</h2>
              <p class="text-[11px] sm:text-xs text-[#4A4A54]">
                Grouped by month using order placement date.
              </p>
            </div>
          </header>

          <div v-if="!ordersByMonth.length" class="text-[11px] sm:text-xs text-[#4A4A54]">
            No orders yet. Place a test order to see analytics here.
          </div>

          <div v-else class="space-y-2">
            <div
              v-for="month in ordersByMonth"
              :key="month.key"
              class="flex items-center gap-2"
            >
              <div class="w-20 text-[11px] sm:text-xs text-[#4A4A54]">
                {{ month.label }}
              </div>
              <div class="flex-1 h-2 rounded-full bg-[#F3F0EB] overflow-hidden">
                <div
                  class="h-full bg-[#6B1238] rounded-full"
                  :style="{
                    width: maxMonthOrders
                      ? `${(month.orders / maxMonthOrders) * 100}%`
                      : '0%'
                  }"
                ></div>
              </div>
              <div class="w-10 text-right text-[11px] sm:text-xs text-[#111118]">
                {{ month.orders }}
              </div>
            </div>
          </div>
        </div>

        <!-- Status & top wines -->
        <div class="space-y-3">
          <div class="bg-white rounded-2xl border border-[#E4E4EC] p-4 sm:p-5 text-xs sm:text-sm text-[#4A4A54]">
            <h2 class="text-sm sm:text-base font-semibold mb-2">Orders by status</h2>
            <ul class="space-y-1 text-[11px] sm:text-xs">
              <li class="flex items-center justify-between">
                <span>Pending</span>
                <span class="font-semibold text-[#111118]">{{ ordersByStatus.pending }}</span>
              </li>
              <li class="flex items-center justify-between">
                <span>Shipped</span>
                <span class="font-semibold text-[#111118]">{{ ordersByStatus.shipped }}</span>
              </li>
              <li class="flex items-center justify-between">
                <span>Delivered</span>
                <span class="font-semibold text-[#111118]">{{ ordersByStatus.delivered }}</span>
              </li>
            </ul>
          </div>

          <div class="bg-white rounded-2xl border border-[#E4E4EC] p-4 sm:p-5 text-xs sm:text-sm text-[#4A4A54]">
            <h2 class="text-sm sm:text-base font-semibold mb-2">Top wines by revenue</h2>
            <div v-if="!topWines.length" class="text-[11px] sm:text-xs">
              No wines sold yet.
            </div>
            <ol v-else class="space-y-1 text-[11px] sm:text-xs">
              <li
                v-for="wine in topWines"
                :key="wine.name"
                class="flex items-center justify-between gap-2"
              >
                <div class="min-w-0">
                  <p class="font-medium text-[#111118] truncate max-w-[10rem] sm:max-w-[14rem]">
                    {{ wine.name }}
                  </p>
                  <p class="text-[10px] text-[#A0A0AA]">
                    {{ wine.quantity }} bottle{{ wine.quantity === 1 ? '' : 's' }} sold
                  </p>
                </div>
                <p class="font-semibold text-[#111118]">
                  €{{ wine.revenue.toFixed(2) }}
                </p>
              </li>
            </ol>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
