<script setup lang="ts">
import { computed, ref } from 'vue'

type CustomerStatus = 'active' | 'inactive'

interface AdminCustomer {
  id: number
  name: string
  email: string
  phone: string
  city: string
  country: string
  totalOrders: number
  totalSpent: number
  lastOrderAt: string
  status: CustomerStatus
}

const customers = ref<AdminCustomer[]>([
  {
    id: 1,
    name: 'Ada WineHub',
    email: 'ada@example.com',
    phone: '+234 800 000 0000',
    city: 'Abuja',
    country: 'Nigeria',
    totalOrders: 3,
    totalSpent: 185,
    lastOrderAt: '2025-03-14T15:32:00.000Z',
    status: 'active'
  },
  {
    id: 2,
    name: 'Jean Champagne',
    email: 'jean.champagne@example.com',
    phone: '+33 1 23 45 67 89',
    city: 'Reims',
    country: 'France',
    totalOrders: 5,
    totalSpent: 420,
    lastOrderAt: '2025-03-12T18:05:00.000Z',
    status: 'active'
  },
  {
    id: 3,
    name: 'Luca Barolo',
    email: 'luca.barolo@example.com',
    phone: '+39 011 123 4567',
    city: 'Turin',
    country: 'Italy',
    totalOrders: 1,
    totalSpent: 59,
    lastOrderAt: '2025-02-28T11:10:00.000Z',
    status: 'inactive'
  }
])

const filterStatus = ref<'all' | CustomerStatus>('all')
const searchTerm = ref('')
const selectedId = ref<number | null>(1)

const filteredCustomers = computed(() => {
  const term = searchTerm.value.trim().toLowerCase()
  return customers.value.filter((c) => {
    if (filterStatus.value !== 'all' && c.status !== filterStatus.value) return false

    if (!term) return true

    const haystack = `${c.name} ${c.email} ${c.phone} ${c.city} ${c.country}`.toLowerCase()
    return haystack.includes(term)
  })
})

const selectedCustomer = computed(() => {
  if (!filteredCustomers.value.length) return null
  const match = filteredCustomers.value.find((c) => c.id === selectedId.value)
  return match ?? filteredCustomers.value[0]
})

const totalActive = computed(() => customers.value.filter((c) => c.status === 'active').length)
const totalInactive = computed(() => customers.value.filter((c) => c.status === 'inactive').length)

const selectCustomer = (id: number) => {
  selectedId.value = id
}
</script>

<template>
  <div class="min-h-screen bg-[#FAF7F3] text-[#111118]">
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <header class="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div class="space-y-1">
          <p class="text-xs font-semibold tracking-[0.16em] uppercase text-[#A0A0AA]">Admin &middot; Customers</p>
          <h1 class="text-2xl sm:text-3xl font-semibold">Customer list</h1>
          <p class="text-sm sm:text-base text-[#4A4A54] max-w-2xl">
            Simple view of people who shop with WineHub, with basic order metrics.
          </p>
        </div>
      </header>

      <section class="grid gap-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1.1fr)] items-start">
        <div class="space-y-3">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs sm:text-sm">
            <div class="flex items-center gap-2 flex-wrap">
              <select
                v-model="filterStatus"
                class="rounded-full border border-[#E4E4EC] bg-white px-3 py-1.5 text-xs text-[#111118] focus:outline-none focus:border-[#6B1238] focus:ring-2 focus:ring-[#F3DEC0]"
              >
                <option value="all">All customers</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <p class="text-[11px] text-[#4A4A54]">
                {{ totalActive }} active &middot; {{ totalInactive }} inactive
              </p>
            </div>
            <div class="flex items-center gap-2">
              <input
                v-model="searchTerm"
                type="search"
                placeholder="Search by name, email, city..."
                class="w-full sm:w-64 rounded-full border border-[#E4E4EC] bg-white px-3 py-1.5 text-xs sm:text-sm text-[#111118] focus:outline-none focus:border-[#6B1238] focus:ring-2 focus:ring-[#F3DEC0]"
              />
            </div>
          </div>

          <div class="bg-white rounded-2xl border border-[#E4E4EC] overflow-hidden">
            <table class="min-w-full text-xs sm:text-sm text-left">
              <thead class="bg-[#FAF7F3] text-[11px] uppercase tracking-[0.16em] text-[#4A4A54]">
                <tr>
                  <th class="px-3 sm:px-4 py-2 font-medium">Customer</th>
                  <th class="px-3 sm:px-4 py-2 font-medium hidden md:table-cell">Location</th>
                  <th class="px-3 sm:px-4 py-2 font-medium text-right">Orders</th>
                  <th class="px-3 sm:px-4 py-2 font-medium text-right">Total spent</th>
                  <th class="px-3 sm:px-4 py-2 font-medium text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="customer in filteredCustomers"
                  :key="customer.id"
                  class="border-t border-[#F1F1F5] hover:bg-[#FAF7F3] cursor-pointer"
                  :class="selectedCustomer && selectedCustomer.id === customer.id ? 'bg-[#FAF7F3]' : ''"
                  @click="selectCustomer(customer.id)"
                >
                  <td class="px-3 sm:px-4 py-2 align-top">
                    <p class="font-medium text-[#111118] truncate max-w-[10rem] sm:max-w-[14rem]">
                      {{ customer.name }}
                    </p>
                    <p class="text-[11px] text-[#4A4A54] truncate max-w-[12rem]">
                      {{ customer.email }}
                    </p>
                  </td>
                  <td class="px-3 sm:px-4 py-2 align-top hidden md:table-cell">
                    <p class="text-xs text-[#4A4A54]">
                      {{ customer.city }}, {{ customer.country }}
                    </p>
                    <p class="text-[11px] text-[#A0A0AA]">
                      {{ customer.phone }}
                    </p>
                  </td>
                  <td class="px-3 sm:px-4 py-2 align-top text-right text-xs text-[#111118]">
                    {{ customer.totalOrders }}
                  </td>
                  <td class="px-3 sm:px-4 py-2 align-top text-right text-xs text-[#111118]">
                    €{{ customer.totalSpent.toFixed(2) }}
                  </td>
                  <td class="px-3 sm:px-4 py-2 align-top text-right">
                    <span
                      class="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium"
                      :class="
                        customer.status === 'active'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                          : 'bg-[#F3F0EB] text-[#A0A0AA] border border-[#E4E4EC]'
                      "
                    >
                      {{ customer.status === 'active' ? 'Active' : 'Inactive' }}
                    </span>
                  </td>
                </tr>
                <tr v-if="!filteredCustomers.length">
                  <td colspan="5" class="px-3 sm:px-4 py-4 text-center text-[11px] sm:text-xs text-[#4A4A54]">
                    No customers match your current filters.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <aside class="space-y-3">
          <div class="bg-white rounded-2xl border border-[#E4E4EC] p-4 sm:p-5 text-sm" v-if="selectedCustomer">
            <header class="mb-3">
              <p class="text-xs font-semibold text-[#4A4A54] mb-0.5">Customer details</p>
              <h2 class="text-sm sm:text-base font-semibold">
                {{ selectedCustomer.name }}
              </h2>
            </header>

            <dl class="space-y-2 text-xs sm:text-sm text-[#4A4A54] mb-3">
              <div>
                <dt class="text-[11px] uppercase tracking-[0.16em] text-[#A0A0AA]">Email</dt>
                <dd class="font-medium break-all">{{ selectedCustomer.email }}</dd>
              </div>
              <div>
                <dt class="text-[11px] uppercase tracking-[0.16em] text-[#A0A0AA]">Phone</dt>
                <dd class="font-medium">{{ selectedCustomer.phone }}</dd>
              </div>
              <div>
                <dt class="text-[11px] uppercase tracking-[0.16em] text-[#A0A0AA]">Location</dt>
                <dd class="font-medium">
                  {{ selectedCustomer.city }}, {{ selectedCustomer.country }}
                </dd>
              </div>
            </dl>

            <div class="grid grid-cols-2 gap-3 mb-3 text-xs sm:text-sm text-[#4A4A54]">
              <div class="rounded-2xl bg-[#FAF7F3] p-3">
                <p class="text-[11px] uppercase tracking-[0.16em] text-[#A0A0AA] mb-1">Orders</p>
                <p class="text-lg font-semibold text-[#111118]">
                  {{ selectedCustomer.totalOrders }}
                </p>
              </div>
              <div class="rounded-2xl bg-[#FAF7F3] p-3">
                <p class="text-[11px] uppercase tracking-[0.16em] text-[#A0A0AA] mb-1">Total spent</p>
                <p class="text-lg font-semibold text-[#111118]">
                  €{{ selectedCustomer.totalSpent.toFixed(2) }}
                </p>
              </div>
            </div>

            <p class="text-[11px] sm:text-xs text-[#A0A0AA]">
              Last order on
              {{ new Date(selectedCustomer.lastOrderAt).toLocaleDateString() }}.
            </p>
          </div>
        </aside>
      </section>
    </main>
  </div>
</template>
