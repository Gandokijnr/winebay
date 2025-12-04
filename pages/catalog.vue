<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCart } from '~/composables/useCart'
import CatalogFiltersSidebar from '~/components/catalog/CatalogFiltersSidebar.vue'
import CatalogToolbar from '~/components/catalog/CatalogToolbar.vue'
import CatalogGrid from '~/components/catalog/CatalogGrid.vue'
import CatalogPagination from '~/components/catalog/CatalogPagination.vue'
import CatalogQuickView from '~/components/catalog/CatalogQuickView.vue'
import type { CatalogFilters, CatalogWine, WineType, CatalogSortOption } from '~/types/catalog'

const router = useRouter()
const { addWine: addToCart } = useCart()

const allWines = ref<CatalogWine[]>([
  {
    id: 1,
    name: 'Barolo Riserva Colline Nebbiole 2016',
    slug: 'barolo-riserva-colline-nebbiole-2016',
    image:
      'https://images.pexels.com/photos/2148408/pexels-photo-2148408.jpeg?auto=compress&cs=tinysrgb&w=600',
    shortDescription: 'Piedmont · Italy · Nebbiolo with dark cherry, tar and rose petal.',
    country: 'Italy',
    region: 'Piedmont',
    type: 'red',
    year: 2016,
    brand: 'Colline Nebbiole',
    flavorProfiles: ['Fruity', 'Earthy', 'Spicy'],
    price: 59,
    oldPrice: 78,
    rating: 4.9,
    reviews: 87,
    isLimited: true
  },
  {
    id: 2,
    name: 'Chablis Premier Cru Côte d’Or 2021',
    slug: 'chablis-premier-cru-cote-dor-2021',
    image:
      'https://images.pexels.com/photos/2903164/pexels-photo-2903164.jpeg?auto=compress&cs=tinysrgb&w=600',
    shortDescription: 'Burgundy · France · Chardonnay with saline, citrus and chalky minerality.',
    country: 'France',
    region: 'Burgundy',
    type: 'white',
    year: 2021,
    brand: 'Domaine Côte d’Or',
    flavorProfiles: ['Mineral', 'Citrus', 'Fresh'],
    price: 32,
    oldPrice: 40,
    rating: 4.6,
    reviews: 54,
    isNew: true
  },
  {
    id: 3,
    name: 'Ribera del Duero Reserva Sol y Piedra 2018',
    slug: 'ribera-del-duero-reserva-sol-y-piedra-2018',
    image:
      'https://images.pexels.com/photos/6947226/pexels-photo-6947226.jpeg?auto=compress&cs=tinysrgb&w=600',
    shortDescription: 'Castilla y León · Spain · Tempranillo with dark fruit and spice.',
    country: 'Spain',
    region: 'Ribera del Duero',
    type: 'red',
    year: 2018,
    brand: 'Sol y Piedra',
    flavorProfiles: ['Spicy', 'Fruity', 'Oak'],
    price: 42,
    oldPrice: 55,
    rating: 4.8,
    reviews: 63
  },
  {
    id: 4,
    name: 'Marlborough Sauvignon Blanc Misty Vines 2023',
    slug: 'marlborough-sauvignon-blanc-misty-vines-2023',
    image:
      'https://images.pexels.com/photos/1407851/pexels-photo-1407851.jpeg?auto=compress&cs=tinysrgb&w=600',
    shortDescription: 'Marlborough · New Zealand · Sauvignon Blanc, zesty and aromatic.',
    country: 'New Zealand',
    region: 'Marlborough',
    type: 'white',
    year: 2023,
    brand: 'Misty Vines',
    flavorProfiles: ['Fruity', 'Herbal', 'Fresh'],
    price: 21,
    oldPrice: 27,
    rating: 4.4,
    reviews: 41,
    isNew: true
  },
  {
    id: 5,
    name: 'Champagne Étoile Brut NV',
    slug: 'champagne-etoile-brut-nv',
    image:
      'https://images.pexels.com/photos/2903166/pexels-photo-2903166.jpeg?auto=compress&cs=tinysrgb&w=600',
    shortDescription: 'Champagne · France · Classic blend with fine mousse and brioche.',
    country: 'France',
    region: 'Champagne',
    type: 'sparkling',
    year: 2020,
    brand: 'Maison Étoile',
    flavorProfiles: ['Yeasty', 'Citrus', 'Elegant'],
    price: 39,
    oldPrice: 52,
    rating: 4.7,
    reviews: 112
  },
  {
    id: 6,
    name: 'Côtes du Rhône Rouge Vieilles Vignes 2020',
    slug: 'cotes-du-rhone-rouge-vieilles-vignes-2020',
    image:
      'https://images.pexels.com/photos/4664337/pexels-photo-4664337.jpeg?auto=compress&cs=tinysrgb&w=600',
    shortDescription: 'Rhône · France · Old-vine Grenache blend with black fruit and spice.',
    country: 'France',
    region: 'Rhône',
    type: 'red',
    year: 2020,
    brand: 'Domaine des Roches',
    flavorProfiles: ['Spicy', 'Fruity'],
    price: 24,
    oldPrice: 30,
    rating: 4.5,
    reviews: 52
  }
])

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
    />
  </div>
</template>
