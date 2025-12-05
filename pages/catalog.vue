<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCart } from '~/composables/useCart'
import CatalogFiltersSidebar from '~/components/catalog/CatalogFiltersSidebar.vue'
import CatalogToolbar from '~/components/catalog/CatalogToolbar.vue'
import CatalogGrid from '~/components/catalog/CatalogGrid.vue'
import CatalogPagination from '~/components/catalog/CatalogPagination.vue'
import CatalogQuickView from '~/components/catalog/CatalogQuickView.vue'
import type { CatalogFilters, CatalogWine, WineType, CatalogSortOption } from '~/types/catalog'
import { wineDetails } from '~/data/wines'

const router = useRouter()
const route = useRoute()
const { addWine: addToCart } = useCart()

const allWines = ref<CatalogWine[]>(
  wineDetails.map(
    ({
      description,
      tastingNotes,
      alcoholPercent,
      grapeVariety,
      bottleSize,
      stockStatus,
      deliveryEstimate,
      images,
      foodPairings,
      ...catalogFields
    }) => catalogFields
  )
)

const initialFilters: CatalogFilters = {
  priceMin: null,
  priceMax: null,
  types: [],
  countries: [],
  flavors: [],
  brands: [],
  ratingMin: null,
  yearMin: null,
  yearMax: null
}

const filters = ref<CatalogFilters>({ ...initialFilters })
const sortOption = ref<CatalogSortOption>('newest')
const currentPage = ref(1)
const pageSize = ref(12)
const wishlistIds = ref<Set<number>>(new Set())

const applyRouteFilters = () => {
  const typeParam = route.query.type
  if (typeof typeParam === 'string') {
    filters.value.types = [typeParam as WineType]
    currentPage.value = 1
  }
}

applyRouteFilters()

watch(
  () => route.query.type,
  () => {
    applyRouteFilters()
  }
)

const quickViewOpen = ref(false)
const quickViewWine = ref<CatalogWine | null>(null)
const filtersOpenMobile = ref(false)

const availableTypes = [
  { value: 'red' as WineType, label: 'Red' },
  { value: 'white' as WineType, label: 'White' },
  { value: 'rose' as WineType, label: 'Rosé' },
  { value: 'sparkling' as WineType, label: 'Sparkling' },
  { value: 'dessert' as WineType, label: 'Dessert' },
  { value: 'fortified' as WineType, label: 'Fortified' }
]

const availableCountries = computed(() =>
  Array.from(new Set(allWines.value.map((w) => w.country))).sort()
)

const availableBrands = computed(() =>
  Array.from(new Set(allWines.value.map((w) => w.brand))).sort()
)

const availableFlavors = computed(() =>
  Array.from(new Set(allWines.value.flatMap((w) => w.flavorProfiles))).sort()
)

const filteredWines = computed(() => {
  return allWines.value.filter((wine) => {
    if (filters.value.priceMin !== null && wine.price < filters.value.priceMin) return false
    if (filters.value.priceMax !== null && wine.price > filters.value.priceMax) return false

    if (filters.value.types.length && !filters.value.types.includes(wine.type)) return false
    if (filters.value.countries.length && !filters.value.countries.includes(wine.country)) return false
    if (filters.value.brands.length && !filters.value.brands.includes(wine.brand)) return false

    if (
      filters.value.flavors.length &&
      !filters.value.flavors.every((f) => wine.flavorProfiles.includes(f))
    ) {
      return false
    }

    if (filters.value.ratingMin !== null && wine.rating < filters.value.ratingMin) return false

    if (filters.value.yearMin !== null && wine.year < filters.value.yearMin) return false
    if (filters.value.yearMax !== null && wine.year > filters.value.yearMax) return false

    return true
  })
})

const sortedWines = computed(() => {
  const list = [...filteredWines.value]

  switch (sortOption.value) {
    case 'price_asc':
      return list.sort((a, b) => a.price - b.price)
    case 'price_desc':
      return list.sort((a, b) => b.price - a.price)
    case 'rating':
      return list.sort((a, b) => b.rating - a.rating)
    case 'popularity':
      return list.sort((a, b) => b.reviews - a.reviews)
    case 'newest':
    default:
      return list.sort((a, b) => b.year - a.year)
  }
})

const totalPages = computed(() =>
  Math.max(1, Math.ceil(sortedWines.value.length / pageSize.value))
)

const paginatedWines = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return sortedWines.value.slice(start, start + pageSize.value)
})

const onResetFilters = () => {
  filters.value = { ...initialFilters }
  currentPage.value = 1
}

const toggleWishlist = (wineId: number) => {
  const set = new Set(wishlistIds.value)
  if (set.has(wineId)) {
    set.delete(wineId)
  } else {
    set.add(wineId)
  }
  wishlistIds.value = set
}

const openQuickView = (wine: CatalogWine) => {
  quickViewWine.value = wine
  quickViewOpen.value = true
}

const closeQuickView = () => {
  quickViewOpen.value = false
}

const handleAddToCart = (wine: CatalogWine) => {
  addToCart(
    {
      id: wine.id,
      name: wine.name,
      slug: wine.slug,
      image: wine.image,
      price: wine.price
    },
    1
  )
}

const handleQuickViewAddToCart = () => {
  if (quickViewWine.value) {
    handleAddToCart(quickViewWine.value)
  }
}

const handleQuickViewDetails = () => {
  if (!quickViewWine.value) return
  // TODO: navigate to product detail route when implemented
  router.push(`/wines/${quickViewWine.value.slug}`)
}

const handleQuickViewCheckout = () => {
  if (!quickViewWine.value) return
  handleAddToCart(quickViewWine.value)
  router.push('/checkout')
}
</script>

<template>
  <div class="min-h-screen bg-[#FAF7F3] text-[#111118]">
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <header class="mb-4">
        <h1 class="text-xl sm:text-2xl font-semibold mb-1">All wines</h1>
        <p class="text-sm text-[#4A4A54]">
          Browse our full WineHub selection and refine by style, region, vintage and more.
        </p>
      </header>

      <div class="grid grid-cols-1 lg:grid-cols-[minmax(0,260px)_minmax(0,1fr)] gap-4 sm:gap-6 items-start">
        <!-- Sidebar (desktop & tablet) -->
        <div class="hidden lg:block sticky top-20 self-start">
          <CatalogFiltersSidebar
            v-model="filters"
            :available-types="availableTypes"
            :available-countries="availableCountries"
            :available-brands="availableBrands"
            :available-flavors="availableFlavors"
            @reset="onResetFilters"
          />
        </div>

        <!-- Main content -->
        <section class="space-y-4">
          <!-- Mobile filters -->
          <div class="lg:hidden">
            <button
              type="button"
              class="mb-3 inline-flex items-center justify-between w-full rounded-xl border border-[#E4E4EC] bg-white px-3 py-2 text-xs text-[#4A4A54]"
              @click="filtersOpenMobile = !filtersOpenMobile"
            >
              <span class="font-medium">Filters</span>
              <span class="text-[11px] text-[#A0A0AA]">Tap to refine results</span>
            </button>
            <transition name="fade">
              <div v-if="filtersOpenMobile" class="mb-3">
                <CatalogFiltersSidebar
                  v-model="filters"
                  :available-types="availableTypes"
                  :available-countries="availableCountries"
                  :available-brands="availableBrands"
                  :available-flavors="availableFlavors"
                  @reset="onResetFilters"
                />
              </div>
            </transition>
          </div>

          <!-- Toolbar -->
          <CatalogToolbar
            :total-items="sortedWines.length"
            :sort-option="sortOption"
            @update:sortOption="(val) => { sortOption = val; currentPage = 1 }"
            @toggle-filters="filtersOpenMobile = !filtersOpenMobile"
          />

          <!-- Grid & pagination -->
          <div class="mt-3 space-y-3">
            <CatalogGrid
              :wines="paginatedWines"
              :wishlist-ids="Array.from(wishlistIds)"
              @toggle-wishlist="toggleWishlist"
              @quick-view="openQuickView"
              @add-to-cart="handleAddToCart"
            />

            <CatalogPagination
              :current-page="currentPage"
              :total-pages="totalPages"
              @update:currentPage="(p) => (currentPage = p)"
            />

            <p v-if="!sortedWines.length" class="text-xs text-[#4A4A54] mt-4">
              No wines match your current filters. Try clearing some filters to see more options.
            </p>
          </div>
        </section>
      </div>
    </main>

    <CatalogQuickView
      :open="quickViewOpen"
      :wine="quickViewWine"
      @close="closeQuickView"
      @add-to-cart="handleQuickViewAddToCart"
      @view-details="handleQuickViewDetails"
      @checkout="handleQuickViewCheckout"
    />
  </div>
</template>
