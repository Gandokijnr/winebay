<script setup lang="ts">
import { computed, ref } from 'vue'
import { useOrder, type OrderStatus } from '~/composables/useOrder'

const { orders } = useOrder()

const filterStatus = ref<'all' | OrderStatus>('all')
const searchTerm = ref('')

const updateStatus = (id: string, status: OrderStatus) => {
  const target = orders.value.find((o) => o.id === id)
  if (!target) return
  target.status = status
}

const filteredOrders = computed(() => {
  const term = searchTerm.value.trim().toLowerCase()

  return orders.value.filter((order) => {
    if (filterStatus.value !== 'all' && order.status !== filterStatus.value) return false

    if (!term) return true

    const haystack = `${order.id} ${order.contactName} ${order.address}`.toLowerCase()
    return haystack.includes(term)
  })
})

const totalPending = computed(() => orders.value.filter((o) => o.status === 'pending').length)
const totalShipped = computed(() => orders.value.filter((o) => o.status === 'shipped').length)
const totalDelivered = computed(() => orders.value.filter((o) => o.status === 'delivered').length)
</script>

<template>
  <div class="min-h-screen bg-[#FAF7F3] text-[#111118]">
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <header class="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div class="space-y-1">
          <p class="text-xs font-semibold tracking-[0.16em] uppercase text-[#A0A0AA]">Admin &middot; Orders</p>
          <h1 class="text-2xl sm:text-3xl font-semibold">Order management</h1>
          <p class="text-sm sm:text-base text-[#4A4A54] max-w-2xl">
            Review and update customer orders created from the WineHub checkout flow.
          </p>
        </div>
      </header>

      <section class="space-y-3">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs sm:text-sm">
          <div class="flex items-center gap-2 flex-wrap">
            <select
              v-model="filterStatus"
              class="rounded-full border border-[#E4E4EC] bg-white px-3 py-1.5 text-xs text-[#111118] focus:outline-none focus:border-[#6B1238] focus:ring-2 focus:ring-[#F3DEC0]"
            >
              <option value="all">All statuses</option>
              <option value="pending">Pending</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
            </select>
            <p class="text-[11px] text-[#4A4A54]">
              {{ totalPending }} pending &middot; {{ totalShipped }} shipped &middot; {{ totalDelivered }} delivered
            </p>
          </div>
          <div class="flex items-center gap-2">
            <input
              v-model="searchTerm"
              type="search"
              placeholder="Search by order ID, name or address..."
              class="w-full sm:w-64 rounded-full border border-[#E4E4EC] bg-white px-3 py-1.5 text-xs sm:text-sm text-[#111118] focus:outline-none focus:border-[#6B1238] focus:ring-2 focus:ring-[#F3DEC0]"
            />
          </div>
        </div>

        <div class="bg-white rounded-2xl border border-[#E4E4EC] overflow-hidden">
          <table class="min-w-full text-xs sm:text-sm text-left">
            <thead class="bg-[#FAF7F3] text-[11px] uppercase tracking-[0.16em] text-[#4A4A54]">
              <tr>
                <th class="px-3 sm:px-4 py-2 font-medium">Order</th>
                <th class="px-3 sm:px-4 py-2 font-medium hidden sm:table-cell">Customer</th>
                <th class="px-3 sm:px-4 py-2 font-medium hidden md:table-cell">Delivery</th>
                <th class="px-3 sm:px-4 py-2 font-medium text-right">Total</th>
                <th class="px-3 sm:px-4 py-2 font-medium text-right">Status</th>
                <th class="px-3 sm:px-4 py-2 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="order in filteredOrders"
                :key="order.id"
                class="border-t border-[#F1F1F5] hover:bg-[#FAF7F3]"
              >
                <td class="px-3 sm:px-4 py-2 align-top">
                  <p class="font-mono text-[11px] sm:text-xs font-medium text-[#111118]">
                    {{ order.id }}
                  </p>
                  <p class="text-[11px] text-[#A0A0AA]">
                    {{ new Date(order.placedAt).toLocaleString() }}
                  </p>
                </td>
                <td class="px-3 sm:px-4 py-2 align-top hidden sm:table-cell">
                  <p class="text-xs text-[#111118] font-medium">
                    {{ order.contactName }}
                  </p>
                  <p class="text-[11px] text-[#4A4A54] truncate max-w-[10rem]">
                    {{ order.address }}
                  </p>
                </td>
                <td class="px-3 sm:px-4 py-2 align-top hidden md:table-cell">
                  <p class="text-xs text-[#4A4A54] capitalize">
                    {{ order.deliveryOption }}
                  </p>
                  <p class="text-[11px] text-[#A0A0AA] truncate max-w-[10rem]">
                    {{ order.estimatedDeliveryText }}
                  </p>
                </td>
                <td class="px-3 sm:px-4 py-2 align-top text-right text-xs text-[#111118]">
                  €{{ order.total.toFixed(2) }}
                </td>
                <td class="px-3 sm:px-4 py-2 align-top text-right">
                  <span
                    class="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium"
                    :class="
                      order.status === 'delivered'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                        : order.status === 'shipped'
                          ? 'bg-sky-50 text-sky-700 border border-sky-100'
                          : 'bg-amber-50 text-amber-700 border border-amber-100'
                    "
                  >
                    {{ order.status === 'pending' ? 'Pending' : order.status === 'shipped' ? 'Shipped' : 'Delivered' }}
                  </span>
                </td>
                <td class="px-3 sm:px-4 py-2 align-top text-right">
                  <div class="inline-flex flex-col items-end gap-1 text-[11px]">
                    <button
                      v-if="order.status !== 'pending'"
                      type="button"
                      class="inline-flex items-center rounded-full border border-[#E4E4EC] bg-white px-2.5 py-0.5 text-[11px] text-[#4A4A54] hover:border-[#6B1238] hover:text-[#6B1238]"
                      @click="updateStatus(order.id, 'pending')"
                    >
                      Mark pending
                    </button>
                    <button
                      v-if="order.status !== 'shipped'"
                      type="button"
                      class="inline-flex items-center rounded-full border border-[#E4E4EC] bg-white px-2.5 py-0.5 text-[11px] text-[#4A4A54] hover:border-[#6B1238] hover:text-[#6B1238]"
                      @click="updateStatus(order.id, 'shipped')"
                    >
                      Mark shipped
                    </button>
                    <button
                      v-if="order.status !== 'delivered'"
                      type="button"
                      class="inline-flex items-center rounded-full border border-[#E4E4EC] bg-white px-2.5 py-0.5 text-[11px] text-[#4A4A54] hover:border-[#6B1238] hover:text-[#6B1238]"
                      @click="updateStatus(order.id, 'delivered')"
                    >
                      Mark delivered
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="!filteredOrders.length">
                <td colspan="6" class="px-3 sm:px-4 py-4 text-center text-[11px] sm:text-xs text-[#4A4A54]">
                  No orders match your current filters.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  </div>
</template>
