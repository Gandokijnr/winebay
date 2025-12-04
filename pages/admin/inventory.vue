<script setup lang="ts">
import { computed, ref } from 'vue'
import type { WineType } from '~/types/catalog'

type InventoryStatus = 'ok' | 'low' | 'out'

interface InventoryItem {
  id: number
  name: string
  brand: string
  country: string
  region: string
  type: WineType
  stock: number
  lowStockThreshold: number
}

const items = ref<InventoryItem[]>([
  {
    id: 1,
    name: 'Barolo Riserva Colline Nebbiole 2016',
    brand: 'Colline Nebbiole',
    country: 'Italy',
    region: 'Piedmont',
    type: 'red',
    stock: 24,
    lowStockThreshold: 6
  },
  {
    id: 2,
    name: 'Champagne Étoile Brut NV',
    brand: 'Maison Étoile',
    country: 'France',
    region: 'Champagne',
    type: 'sparkling',
    stock: 4,
    lowStockThreshold: 8
  },
  {
    id: 3,
    name: 'Marlborough Sauvignon Blanc Misty Vines 2023',
    brand: 'Misty Vines',
    country: 'New Zealand',
    region: 'Marlborough',
    type: 'white',
    stock: 0,
    lowStockThreshold: 5
  },
  {
    id: 4,
    name: 'Côtes du Rhône Rouge Vieilles Vignes 2020',
    brand: 'Domaine des Roches',
    country: 'France',
    region: 'Rhône',
    type: 'red',
    stock: 18,
    lowStockThreshold: 5
  }
])

const filterStatus = ref<'all' | InventoryStatus>('all')
const searchTerm = ref('')

const getStatus = (item: InventoryItem): InventoryStatus => {
  if (item.stock <= 0) return 'out'
  if (item.stock <= item.lowStockThreshold) return 'low'
  return 'ok'
}

const filteredItems = computed(() => {
  const term = searchTerm.value.trim().toLowerCase()

  return items.value.filter((item) => {
    const status = getStatus(item)

    if (filterStatus.value !== 'all' && status !== filterStatus.value) return false

    if (!term) return true

    const haystack = `${item.name} ${item.brand} ${item.country} ${item.region}`.toLowerCase()
    return haystack.includes(term)
  })
})

const totalSkus = computed(() => items.value.length)
const totalUnits = computed(() => items.value.reduce((sum, item) => sum + item.stock, 0))
const totalLow = computed(() => items.value.filter((i) => getStatus(i) === 'low').length)
const totalOut = computed(() => items.value.filter((i) => getStatus(i) === 'out').length)
</script>

<template>
  <div class="min-h-screen bg-[#FAF7F3] text-[#111118]">
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <header class="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div class="space-y-1">
          <p class="text-xs font-semibold tracking-[0.16em] uppercase text-[#A0A0AA]">Admin &middot; Inventory</p>
          <h1 class="text-2xl sm:text-3xl font-semibold">Inventory overview</h1>
          <p class="text-sm sm:text-base text-[#4A4A54] max-w-2xl">
            High-level snapshot of stock levels across your WineHub catalog.
          </p>
        </div>
      </header>

      <section class="grid gap-3 sm:gap-4 md:grid-cols-4 mb-6 sm:mb-8 text-xs sm:text-sm text-[#4A4A54]">
        <div class="rounded-2xl bg-white border border-[#E4E4EC] p-3 sm:p-4">
          <p class="text-[11px] uppercase tracking-[0.16em] text-[#A0A0AA] mb-1">Total SKUs</p>
          <p class="text-xl sm:text-2xl font-semibold text-[#111118]">{{ totalSkus }}</p>
        </div>
        <div class="rounded-2xl bg-white border border-[#E4E4EC] p-3 sm:p-4">
          <p class="text-[11px] uppercase tracking-[0.16em] text-[#A0A0AA] mb-1">Units in stock</p>
          <p class="text-xl sm:text-2xl font-semibold text-[#111118]">{{ totalUnits }}</p>
        </div>
        <div class="rounded-2xl bg-white border border-[#E4E4EC] p-3 sm:p-4">
          <p class="text-[11px] uppercase tracking-[0.16em] text-[#A0A0AA] mb-1">Low stock SKUs</p>
          <p class="text-xl sm:text-2xl font-semibold text-[#111118]">{{ totalLow }}</p>
        </div>
        <div class="rounded-2xl bg-white border border-[#E4E4EC] p-3 sm:p-4">
          <p class="text-[11px] uppercase tracking-[0.16em] text-[#A0A0AA] mb-1">Out of stock SKUs</p>
          <p class="text-xl sm:text-2xl font-semibold text-[#111118]">{{ totalOut }}</p>
        </div>
      </section>

      <section class="space-y-3">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs sm:text-sm">
          <div class="flex items-center gap-2 flex-wrap">
            <select
              v-model="filterStatus"
              class="rounded-full border border-[#E4E4EC] bg-white px-3 py-1.5 text-xs text-[#111118] focus:outline-none focus:border-[#6B1238] focus:ring-2 focus:ring-[#F3DEC0]"
            >
              <option value="all">All statuses</option>
              <option value="ok">Healthy stock</option>
              <option value="low">Low stock</option>
              <option value="out">Out of stock</option>
            </select>
          </div>
          <div class="flex items-center gap-2">
            <input
              v-model="searchTerm"
              type="search"
              placeholder="Search by name, brand, region..."
              class="w-full sm:w-64 rounded-full border border-[#E4E4EC] bg-white px-3 py-1.5 text-xs sm:text-sm text-[#111118] focus:outline-none focus:border-[#6B1238] focus:ring-2 focus:ring-[#F3DEC0]"
            />
          </div>
        </div>

        <div class="bg-white rounded-2xl border border-[#E4E4EC] overflow-hidden">
          <table class="min-w-full text-xs sm:text-sm text-left">
            <thead class="bg-[#FAF7F3] text-[11px] uppercase tracking-[0.16em] text-[#4A4A54]">
              <tr>
                <th class="px-3 sm:px-4 py-2 font-medium">Wine</th>
                <th class="px-3 sm:px-4 py-2 font-medium hidden md:table-cell">Region</th>
                <th class="px-3 sm:px-4 py-2 font-medium">Type</th>
                <th class="px-3 sm:px-4 py-2 font-medium text-right">Stock</th>
                <th class="px-3 sm:px-4 py-2 font-medium text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in filteredItems"
                :key="item.id"
                class="border-t border-[#F1F1F5] hover:bg-[#FAF7F3]"
              >
                <td class="px-3 sm:px-4 py-2 align-top">
                  <p class="font-medium text-[#111118] truncate max-w-[10rem] sm:max-w-[16rem]">
                    {{ item.name }}
                  </p>
                  <p class="text-[11px] text-[#A0A0AA] truncate">
                    {{ item.brand }}
                  </p>
                </td>
                <td class="px-3 sm:px-4 py-2 align-top hidden md:table-cell">
                  <p class="text-xs text-[#4A4A54] truncate">
                    {{ item.region }}, {{ item.country }}
                  </p>
                </td>
                <td class="px-3 sm:px-4 py-2 align-top capitalize text-xs text-[#4A4A54]">
                  {{ item.type }}
                </td>
                <td class="px-3 sm:px-4 py-2 align-top text-right text-xs text-[#111118]">
                  {{ item.stock }}
                </td>
                <td class="px-3 sm:px-4 py-2 align-top text-right">
                  <span
                    class="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium"
                    :class="
                      getStatus(item) === 'out'
                        ? 'bg-rose-50 text-rose-700 border border-rose-100'
                        : getStatus(item) === 'low'
                          ? 'bg-amber-50 text-amber-700 border border-amber-100'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                    "
                  >
                    {{
                      getStatus(item) === 'out'
                        ? 'Out of stock'
                        : getStatus(item) === 'low'
                          ? 'Low stock'
                          : 'Healthy'
                    }}
                  </span>
                </td>
              </tr>
              <tr v-if="!filteredItems.length">
                <td colspan="5" class="px-3 sm:px-4 py-4 text-center text-[11px] sm:text-xs text-[#4A4A54]">
                  No inventory items match your current filters.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  </div>
</template>
