<script setup lang="ts">
import { computed, ref } from 'vue'
import type { WineType } from '~/types/catalog'

interface AdminProduct {
  id: number
  name: string
  brand: string
  country: string
  region: string
  type: WineType
  price: number
  stock: number
  active: boolean
}

const products = ref<AdminProduct[]>([
  {
    id: 1,
    name: 'Barolo Riserva Colline Nebbiole 2016',
    brand: 'Colline Nebbiole',
    country: 'Italy',
    region: 'Piedmont',
    type: 'red',
    price: 59,
    stock: 24,
    active: true
  },
  {
    id: 2,
    name: 'Champagne Étoile Brut NV',
    brand: 'Maison Étoile',
    country: 'France',
    region: 'Champagne',
    type: 'sparkling',
    price: 39,
    stock: 48,
    active: true
  },
  {
    id: 3,
    name: 'Marlborough Sauvignon Blanc Misty Vines 2023',
    brand: 'Misty Vines',
    country: 'New Zealand',
    region: 'Marlborough',
    type: 'white',
    price: 21,
    stock: 12,
    active: false
  }
])

const nextId = ref(4)

const formMode = ref<'create' | 'edit'>('create')
const editingId = ref<number | null>(null)

const filterStatus = ref<'all' | 'active' | 'inactive'>('all')
const searchTerm = ref('')

const formName = ref('')
const formBrand = ref('')
const formCountry = ref('')
const formRegion = ref('')
const formType = ref<WineType>('red')
const formPrice = ref<number | null>(null)
const formStock = ref<number | null>(null)

const resetForm = () => {
  formName.value = ''
  formBrand.value = ''
  formCountry.value = ''
  formRegion.value = ''
  formType.value = 'red'
  formPrice.value = null
  formStock.value = null
  formMode.value = 'create'
  editingId.value = null
}

const startCreate = () => {
  resetForm()
}

const startEdit = (id: number) => {
  const product = products.value.find((p) => p.id === id)
  if (!product) return

  formMode.value = 'edit'
  editingId.value = id

  formName.value = product.name
  formBrand.value = product.brand
  formCountry.value = product.country
  formRegion.value = product.region
  formType.value = product.type
  formPrice.value = product.price
  formStock.value = product.stock
}

const toggleActive = (id: number) => {
  const product = products.value.find((p) => p.id === id)
  if (!product) return
  product.active = !product.active
}

const deleteProduct = (id: number) => {
  products.value = products.value.filter((p) => p.id !== id)

  if (editingId.value === id) {
    resetForm()
  }
}

const handleSave = () => {
  if (!formName.value || !formBrand.value || !formCountry.value || !formRegion.value || formPrice.value == null) {
    return
  }

  const stock = formStock.value ?? 0

  if (formMode.value === 'create') {
    products.value.push({
      id: nextId.value++,
      name: formName.value,
      brand: formBrand.value,
      country: formCountry.value,
      region: formRegion.value,
      type: formType.value,
      price: formPrice.value,
      stock,
      active: true
    })
  } else if (formMode.value === 'edit' && editingId.value != null) {
    const index = products.value.findIndex((p) => p.id === editingId.value)
    if (index !== -1) {
      products.value[index] = {
        ...products.value[index],
        name: formName.value,
        brand: formBrand.value,
        country: formCountry.value,
        region: formRegion.value,
        type: formType.value,
        price: formPrice.value,
        stock
      }
    }
  }

  resetForm()
}

const filteredProducts = computed(() => {
  const term = searchTerm.value.trim().toLowerCase()

  return products.value.filter((p) => {
    if (filterStatus.value === 'active' && !p.active) return false
    if (filterStatus.value === 'inactive' && p.active) return false

    if (!term) return true

    const haystack = `${p.name} ${p.brand} ${p.country} ${p.region}`.toLowerCase()
    return haystack.includes(term)
  })
})

const totalActive = computed(() => products.value.filter((p) => p.active).length)
const totalInactive = computed(() => products.value.filter((p) => !p.active).length)
</script>

<template>
  <div class="min-h-screen bg-[#FAF7F3] text-[#111118]">
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <header class="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div class="space-y-1">
          <p class="text-xs font-semibold tracking-[0.16em] uppercase text-[#A0A0AA]">Admin &middot; Products</p>
          <h1 class="text-2xl sm:text-3xl font-semibold">Product management</h1>
          <p class="text-sm sm:text-base text-[#4A4A54] max-w-2xl">
            Manage the wines available in your WineHub catalog. This view uses local mock data only.
          </p>
        </div>
      </header>

      <section class="grid gap-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1.1fr)] items-start">
        <!-- Products table -->
        <div class="space-y-3">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs sm:text-sm">
            <div class="flex items-center gap-2">
              <select
                v-model="filterStatus"
                class="rounded-full border border-[#E4E4EC] bg-white px-3 py-1.5 text-xs text-[#111118] focus:outline-none focus:border-[#6B1238] focus:ring-2 focus:ring-[#F3DEC0]"
              >
                <option value="all">All products</option>
                <option value="active">Active only</option>
                <option value="inactive">Inactive only</option>
              </select>
              <p class="text-[11px] text-[#4A4A54]">
                {{ totalActive }} active &middot; {{ totalInactive }} inactive
              </p>
            </div>
            <div class="flex items-center gap-2">
              <input
                v-model="searchTerm"
                type="search"
                placeholder="Search by name, brand, region..."
                class="w-full sm:w-56 rounded-full border border-[#E4E4EC] bg-white px-3 py-1.5 text-xs sm:text-sm text-[#111118] focus:outline-none focus:border-[#6B1238] focus:ring-2 focus:ring-[#F3DEC0]"
              />
              <button
                type="button"
                class="hidden sm:inline-flex items-center rounded-full border border-[#E4E4EC] bg-white px-3 py-1.5 text-[11px] font-medium text-[#4A4A54] hover:border-[#6B1238] hover:text-[#6B1238]"
                @click="startCreate"
              >
                New product
              </button>
            </div>
          </div>

          <div class="bg-white rounded-2xl border border-[#E4E4EC] overflow-hidden">
            <table class="min-w-full text-xs sm:text-sm text-left">
              <thead class="bg-[#FAF7F3] text-[11px] uppercase tracking-[0.16em] text-[#4A4A54]">
                <tr>
                  <th class="px-3 sm:px-4 py-2 font-medium">Name</th>
                  <th class="px-3 sm:px-4 py-2 font-medium hidden sm:table-cell">Region</th>
                  <th class="px-3 sm:px-4 py-2 font-medium">Type</th>
                  <th class="px-3 sm:px-4 py-2 font-medium text-right">Price</th>
                  <th class="px-3 sm:px-4 py-2 font-medium text-right">Stock</th>
                  <th class="px-3 sm:px-4 py-2 font-medium text-right">Status</th>
                  <th class="px-3 sm:px-4 py-2 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="product in filteredProducts"
                  :key="product.id"
                  class="border-t border-[#F1F1F5] hover:bg-[#FAF7F3]"
                >
                  <td class="px-3 sm:px-4 py-2 align-top">
                    <p class="font-medium text-[#111118] truncate max-w-[10rem] sm:max-w-[16rem]">
                      {{ product.name }}
                    </p>
                    <p class="text-[11px] text-[#A0A0AA] truncate">
                      {{ product.brand }}
                    </p>
                  </td>
                  <td class="px-3 sm:px-4 py-2 align-top hidden sm:table-cell">
                    <p class="text-xs text-[#4A4A54] truncate">
                      {{ product.region }}, {{ product.country }}
                    </p>
                  </td>
                  <td class="px-3 sm:px-4 py-2 align-top capitalize text-xs text-[#4A4A54]">
                    {{ product.type }}
                  </td>
                  <td class="px-3 sm:px-4 py-2 align-top text-right text-xs text-[#111118]">
                    €{{ product.price.toFixed(2) }}
                  </td>
                  <td class="px-3 sm:px-4 py-2 align-top text-right text-xs text-[#111118]">
                    {{ product.stock }}
                  </td>
                  <td class="px-3 sm:px-4 py-2 align-top text-right">
                    <span
                      class="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium"
                      :class="product.active ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-[#F3F0EB] text-[#A0A0AA] border border-[#E4E4EC]'"
                    >
                      {{ product.active ? 'Active' : 'Hidden' }}
                    </span>
                  </td>
                  <td class="px-3 sm:px-4 py-2 align-top text-right">
                    <div class="flex flex-col items-end gap-1 text-[11px]">
                      <button
                        type="button"
                        class="inline-flex items-center rounded-full border border-[#E4E4EC] bg-white px-2.5 py-0.5 text-[11px] text-[#4A4A54] hover:border-[#6B1238] hover:text-[#6B1238]"
                        @click="startEdit(product.id)"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        class="inline-flex items-center rounded-full border border-[#E4E4EC] bg-white px-2.5 py-0.5 text-[11px] text-[#A0A0AA] hover:border-[#6B1238] hover:text-[#6B1238]"
                        @click="toggleActive(product.id)"
                      >
                        {{ product.active ? 'Hide' : 'Activate' }}
                      </button>
                      <button
                        type="button"
                        class="inline-flex items-center rounded-full border border-[#F1C2C2] bg-white px-2.5 py-0.5 text-[11px] text-[#B42318] hover:border-[#B42318]"
                        @click="deleteProduct(product.id)"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
                <tr v-if="!filteredProducts.length">
                  <td colspan="7" class="px-3 sm:px-4 py-4 text-center text-[11px] sm:text-xs text-[#4A4A54]">
                    No products match your current filters.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Form -->
        <aside class="space-y-3">
          <div class="bg-white rounded-2xl border border-[#E4E4EC] p-4 sm:p-5 text-sm">
            <header class="flex items-center justify-between mb-3">
              <div>
                <h2 class="text-sm sm:text-base font-semibold">
                  {{ formMode === 'create' ? 'Add new product' : 'Edit product' }}
                </h2>
                <p class="text-[11px] sm:text-xs text-[#4A4A54]">
                  Basic details only &mdash; extend this with images and full descriptions later.
                </p>
              </div>
              <button
                v-if="formMode === 'edit'"
                type="button"
                class="hidden sm:inline-flex items-center rounded-full border border-[#E4E4EC] bg-white px-3 py-1.5 text-[11px] text-[#4A4A54] hover:border-[#6B1238] hover:text-[#6B1238]"
                @click="startCreate"
              >
                New product
              </button>
            </header>

            <form class="space-y-3" @submit.prevent="handleSave">
              <div class="space-y-1">
                <label class="block text-[11px] font-medium text-[#4A4A54]">Name</label>
                <input
                  v-model="formName"
                  type="text"
                  class="w-full rounded-xl border border-[#E4E4EC] bg-[#FAF7F3] px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#6B1238] focus:ring-2 focus:ring-[#F3DEC0]"
                />
              </div>

              <div class="grid sm:grid-cols-2 gap-3">
                <div class="space-y-1">
                  <label class="block text-[11px] font-medium text-[#4A4A54]">Brand</label>
                  <input
                    v-model="formBrand"
                    type="text"
                    class="w-full rounded-xl border border-[#E4E4EC] bg-[#FAF7F3] px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#6B1238] focus:ring-2 focus:ring-[#F3DEC0]"
                  />
                </div>
                <div class="space-y-1">
                  <label class="block text-[11px] font-medium text-[#4A4A54]">Type</label>
                  <select
                    v-model="formType"
                    class="w-full rounded-xl border border-[#E4E4EC] bg-[#FAF7F3] px-3 py-2 text-xs sm:text-sm text-[#111118] focus:outline-none focus:border-[#6B1238] focus:ring-2 focus:ring-[#F3DEC0]"
                  >
                    <option value="red">Red</option>
                    <option value="white">White</option>
                    <option value="rose">Rosé</option>
                    <option value="sparkling">Sparkling</option>
                    <option value="dessert">Dessert</option>
                    <option value="fortified">Fortified</option>
                  </select>
                </div>
              </div>

              <div class="grid sm:grid-cols-2 gap-3">
                <div class="space-y-1">
                  <label class="block text-[11px] font-medium text-[#4A4A54]">Country</label>
                  <input
                    v-model="formCountry"
                    type="text"
                    class="w-full rounded-xl border border-[#E4E4EC] bg-[#FAF7F3] px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#6B1238] focus:ring-2 focus:ring-[#F3DEC0]"
                  />
                </div>
                <div class="space-y-1">
                  <label class="block text-[11px] font-medium text-[#4A4A54]">Region</label>
                  <input
                    v-model="formRegion"
                    type="text"
                    class="w-full rounded-xl border border-[#E4E4EC] bg-[#FAF7F3] px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#6B1238] focus:ring-2 focus:ring-[#F3DEC0]"
                  />
                </div>
              </div>

              <div class="grid sm:grid-cols-2 gap-3">
                <div class="space-y-1">
                  <label class="block text-[11px] font-medium text-[#4A4A54]">Price (€)</label>
                  <input
                    v-model.number="formPrice"
                    type="number"
                    min="0"
                    step="0.01"
                    class="w-full rounded-xl border border-[#E4E4EC] bg-[#FAF7F3] px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#6B1238] focus:ring-2 focus:ring-[#F3DEC0]"
                  />
                </div>
                <div class="space-y-1">
                  <label class="block text-[11px] font-medium text-[#4A4A54]">Stock</label>
                  <input
                    v-model.number="formStock"
                    type="number"
                    min="0"
                    step="1"
                    class="w-full rounded-xl border border-[#E4E4EC] bg-[#FAF7F3] px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#6B1238] focus:ring-2 focus:ring-[#F3DEC0]"
                  />
                </div>
              </div>

              <button
                type="submit"
                class="inline-flex items-center justify-center rounded-full bg-[#6B1238] text-white px-5 py-2.5 text-xs sm:text-sm font-semibold hover:bg-[#8E1E3A]"
              >
                {{ formMode === 'create' ? 'Add product' : 'Save changes' }}
              </button>
            </form>
          </div>
        </aside>
      </section>
    </main>
  </div>
</template>
