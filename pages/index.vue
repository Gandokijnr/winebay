<template>
  <div class="min-h-screen bg-[#FAF7F3] text-[#111118] flex flex-col">
    <main class="flex-1 bg-[#FAF7F3]">
      <section class="bg-gradient-to-br from-[#190910] via-[#2A101B] to-[#6B1238] text-white">
        <div
          class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-10 items-center"
        >
          <div>
            <p class="uppercase tracking-[0.2em] text-xs text-[#F3DEC0] mb-4">Premium wine marketplace</p>
            <h1 class="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight">
              Discover wines curated
              <span class="block text-[#D8B46A]">for your taste</span>
            </h1>
            <p class="mt-4 text-sm sm:text-base text-[#F3DEC0] max-w-xl">
              Shop fine reds, whites, and sparkling wines from top wineries worldwide, delivered temperature-controlled to your
              door.
            </p>
            <div class="mt-6 flex flex-wrap gap-3">
              <NuxtLink
                to="/catalog"
                class="inline-flex items-center justify-center rounded-full bg-[#D8B46A] text-[#111118] px-6 py-2.5 text-sm font-semibold hover:bg-[#F3DEC0] transition-colors"
              >
                Shop all wines
              </NuxtLink>
              <button
                class="inline-flex items-center justify-center rounded-full border border-[#F3DEC0] text-[#F3DEC0] px-6 py-2.5 text-sm font-medium hover:bg-[#F3DEC0] hover:text-[#111118] transition-colors"
              >
                Explore sommelier picks
              </button>
            </div>
            <div class="mt-6 flex flex-wrap items-center gap-5 text-xs sm:text-sm text-[#F3DEC0]">
              <div class="flex items-center gap-2">
                <span
                  class="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#D8B46A] text-[11px] text-[#111118] font-semibold"
                >
                  ✓
                </span>
                <span>Certified sellers</span>
              </div>
              <div class="flex items-center gap-2">
                <span
                  class="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#D8B46A] text-[11px] text-[#111118] font-semibold"
                >
                  ✓
                </span>
                <span>Temperature-controlled delivery</span>
              </div>
              <div class="flex items-center gap-2">
                <span
                  class="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#D8B46A] text-[11px] text-[#111118] font-semibold"
                >
                  ✓
                </span>
                <span>Secure checkout</span>
              </div>
            </div>
          </div>
          <div class="relative">
            <div
              class="relative h-64 sm:h-72 lg:h-80 rounded-3xl overflow-hidden shadow-2xl bg-black"
            >
              <div class="absolute inset-0">
                <img
                  :src="featuredWines[2].image"
                  alt="Featured Bordeaux wine background"
                  class="h-full w-full object-cover"
                />
                <div class="absolute inset-0 bg-black/55"></div>
                <div class="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,_#ffffff_0,_transparent_60%)]"></div>
              </div>
              <div class="relative h-full flex flex-col justify-between p-5">
                <div class="flex justify-between items-start text-xs text-[#F3DEC0]">
                  <div>
                    <p class="uppercase tracking-[0.25em] text-[10px]">Featured collection</p>
                    <p class="mt-1 text-sm font-semibold">Bordeaux Evenings</p>
                  </div>
                  <div class="rounded-full bg-black/30 px-3 py-1 border border-white/10">
                    From <span class="font-semibold text-white">$39</span>
                  </div>
                </div>
                <div class="flex justify-between items-end gap-4">
                  <div class="space-y-3">
                    <p class="text-xs text-[#F3DEC0] uppercase tracking-[0.25em]">Tasting notes</p>
                    <p class="text-sm text-[#FFF7E6] max-w-[14rem]">
                      Dark cherry, cassis, and subtle vanilla with a long, silky finish.
                    </p>
                    <button
                      class="inline-flex items-center justify-center rounded-full bg-white/95 text-[#6B1238] px-4 py-1.5 text-xs font-semibold hover:bg-white transition-colors"
                    >
                      View collection
                    </button>
                  </div>
                  <div
                    class="relative w-24 sm:w-28 lg:w-32 h-40 sm:h-48 rounded-3xl overflow-hidden bg-black/20 shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
                  >
                    <img
                      :src="featuredWines[0].image"
                      alt="Selection of red wines on a table"
                      class="h-full w-full object-cover"
                    />
                    <div class="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-10 bg-black/40 blur-2xl rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="absolute -bottom-6 -left-2 bg-white/80 backdrop-blur rounded-2xl shadow-lg px-4 py-3 text-xs text-[#4A4A54] max-w-[13rem] hidden sm:flex items-center gap-3"
            >
              <div class="h-8 w-8 rounded-full bg-[#F3DEC0] flex items-center justify-center text-[11px] font-semibold text-[#6B1238]">
                4.9★
              </div>
              <div>
                <p class="font-semibold text-[#111118]">Loved by sommeliers</p>
                <p class="text-[11px]">Over 2,000 5-star reviews on curated picks.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="py-12 sm:py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-baseline justify-between gap-4 mb-8">
            <div>
              <h2 class="text-xl sm:text-2xl font-semibold text-[#111118]">Shop by category</h2>
              <p class="mt-1 text-sm text-[#4A4A54]">Find the perfect bottle by style, region, or occasion.</p>
            </div>
            <button class="hidden sm:inline-flex text-sm font-medium text-[#6B1238] hover:text-[#8E1E3A]">View all wines</button>
          </div>
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            <button
              v-for="category in categories"
              :key="category.name"
              class="group relative overflow-hidden rounded-2xl border border-transparent hover:border-[#F3DEC0] hover:shadow-md transition-all bg-black"
              @click="goToCategory(category)"
            >
              <div class="absolute inset-0">
                <img
                  v-if="category.image"
                  :src="category.image"
                  :alt="category.name"
                  loading="lazy"
                  class="h-full w-full object-cover"
                />
                <div class="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors"></div>
              </div>
              <div class="relative p-4 sm:p-5 flex flex-col items-start h-full">
                <div class="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#F3DEC0] text-xs font-semibold text-[#6B1238]">
                  {{ category.short }}
                </div>
                <div class="space-y-1">
                  <p class="font-semibold text-sm sm:text-base text-white">
                    {{ category.name }}
                  </p>
                  <p class="text-xs text-[#F3DEC0]">
                    {{ category.description }}
                  </p>
                  <p class="text-[11px] text-[#E4E4EC]">
                    {{ category.count }}+ bottles
                  </p>
                </div>
                <span class="mt-3 text-[11px] font-medium text-[#F3DEC0] group-hover:underline">Shop now</span>
              </div>
            </button>
          </div>
        </div>
      </section>

      <section class="py-10 sm:py-14 bg-[#F3F0EB]">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-baseline justify-between gap-4 mb-6">
            <div>
              <h2 class="text-xl sm:text-2xl font-semibold text-[#111118]">Featured wines</h2>
              <p class="mt-1 text-sm text-[#4A4A54]">Handpicked by our sommeliers for special moments.</p>
            </div>
            <button class="text-sm font-medium text-[#6B1238] hover:text-[#8E1E3A]">View all</button>
          </div>
          <div class="-mx-4 sm:mx-0 overflow-x-auto pb-2">
            <div class="flex gap-4 sm:gap-6 px-4 sm:px-0">
              <article
                v-for="wine in featuredWines"
                :key="wine.id"
                class="min-w-[220px] max-w-[260px] flex-1 rounded-2xl bg-white p-4 sm:p-5 shadow-sm hover:shadow-lg border border-transparent hover:border-[#F3DEC0] transition cursor-pointer"
                @click="openQuickView(wine)"
              >
                <div class="relative mb-4">
                  <div class="aspect-[3/4] w-full overflow-hidden rounded-xl bg-[#FAF7F3]">
                    <img
                      :src="wine.image"
                      :alt="wine.name"
                      loading="lazy"
                      class="h-full w-full object-cover"
                    />
                  </div>
                  <div class="absolute top-2 left-2 rounded-full bg-[#D8B46A] px-2.5 py-1 text-[11px] font-semibold text-[#111118]">
                    Top rated
                  </div>
                  <div
                    v-if="wine.discount"
                    class="absolute top-2 right-2 rounded-full bg-[#6B1238] px-2.5 py-1 text-[11px] font-semibold text-white"
                  >
                    -{{ wine.discount }}%
                  </div>
                </div>
                <div class="space-y-1">
                  <h3 class="text-sm sm:text-base font-semibold text-[#111118]">
                    {{ wine.name }}
                  </h3>
                  <p class="text-xs text-[#4A4A54]">
                    {{ wine.region }} · {{ wine.country }}
                  </p>
                  <div class="flex items-center gap-1 text-[11px] text-[#4A4A54]">
                    <span class="text-[#D8B46A]">★</span>
                    <span class="font-semibold">{{ wine.rating }}</span>
                    <span>({{ wine.reviews }} reviews)</span>
                  </div>
                </div>
                <div class="mt-3 flex items-center justify-between">
                  <div>
                    <p class="text-sm sm:text-base font-semibold text-[#6B1238]">
                      ${{ wine.price }}
                    </p>
                    <p v-if="wine.originalPrice" class="text-xs text-[#A0A0AA] line-through">
                      ${{ wine.originalPrice }}
                    </p>
                  </div>
                  <button
                    class="inline-flex items-center justify-center rounded-full bg-[#6B1238] text-white px-3 py-1.5 text-xs font-medium hover:bg-[#8E1E3A] transition-colors"
                    @click.stop="openQuickView(wine)"
                  >
                    Quick view
                  </button>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section class="py-12 sm:py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-baseline justify-between gap-4 mb-6">
            <div>
              <h2 class="text-xl sm:text-2xl font-semibold text-[#111118]">Popular right now</h2>
              <p class="mt-1 text-sm text-[#4A4A54]">Trending bottles loved by WineHub customers.</p>
            </div>
          </div>
          <div class="flex flex-wrap gap-2 mb-6">
            <button
              v-for="filter in popularFilters"
              :key="filter"
              class="inline-flex items-center rounded-full border border-[#E4E4EC] bg-white px-3 py-1.5 text-xs sm:text-sm text-[#4A4A54] hover:border-[#6B1238] hover:text-[#6B1238] transition-colors"
            >
              {{ filter }}
            </button>
          </div>
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            <article
              v-for="wine in popularWines"
              :key="wine.id"
              class="rounded-2xl bg-white p-3 sm:p-4 shadow-sm hover:shadow-md border border-transparent hover:border-[#F3DEC0] transition cursor-pointer"
              @click="openQuickView(wine)"
            >
              <div class="aspect-[3/4] w-full overflow-hidden rounded-xl bg-[#FAF7F3] mb-3">
                <img
                  :src="wine.image"
                  :alt="wine.name"
                  loading="lazy"
                  class="h-full w-full object-cover"
                />
              </div>
              <div class="space-y-1">
                <h3 class="text-sm font-semibold text-[#111118]">
                  {{ wine.name }}
                </h3>
                <p class="text-[11px] text-[#4A4A54]">
                  {{ wine.region }} · {{ wine.country }}
                </p>
                <div class="flex items-center gap-1 text-[11px] text-[#4A4A54]">
                  <span class="text-[#D8B46A]">★</span>
                  <span class="font-semibold">{{ wine.rating }}</span>
                  <span>({{ wine.reviews }})</span>
                </div>
                <p class="text-sm font-semibold text-[#6B1238]">
                  ${{ wine.price }}
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section class="py-12 sm:py-16 bg-[#190910] text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-10 items-center">
          <div class="max-w-md">
            <p class="uppercase tracking-[0.25em] text-xs text-[#F3DEC0] mb-3">Limited offers</p>
            <h2 class="text-2xl sm:text-3xl font-semibold mb-3">Deals of the week</h2>
            <p class="text-sm sm:text-base text-[#F3DEC0] mb-5">
              Save on curated cases and bestsellers. Offers change weekly, so don't wait.
            </p>
            <div class="flex items-center gap-3 text-sm">
              <div class="flex items-center gap-1">
                <span class="inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-sm font-semibold">02</span>
                <span class="text-[#F3DEC0]">days</span>
              </div>
              <div class="flex items-center gap-1">
                <span class="inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-sm font-semibold">14</span>
                <span class="text-[#F3DEC0]">hours</span>
              </div>
              <div class="flex items-center gap-1">
                <span class="inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-sm font-semibold">32</span>
                <span class="text-[#F3DEC0]">mins</span>
              </div>
            </div>
          </div>
          <div class="flex-1 w-full -mx-4 sm:mx-0 overflow-x-auto pb-2">
            <div class="flex gap-4 sm:gap-6 px-4 sm:px-0">
              <article
                v-for="deal in deals"
                :key="deal.id"
                class="min-w-[240px] max-w-sm rounded-2xl bg-white/5 border border-white/10 p-4 sm:p-5 flex flex-col justify-between"
              >
                <div>
                  <p class="text-xs uppercase tracking-[0.2em] text-[#F3DEC0] mb-2">
                    {{ deal.label }}
                  </p>
                  <h3 class="text-base sm:text-lg font-semibold mb-2">
                    {{ deal.name }}
                  </h3>
                  <p class="text-xs sm:text-sm text-[#F3DEC0] mb-3">
                    {{ deal.description }}
                  </p>
                  <p class="text-[11px] text-[#F3DEC0]">
                    Up to <span class="font-semibold text-[#D8B46A]">{{ deal.discount }}% off</span>
                  </p>
                </div>
                <div class="mt-4 flex items-end justify-between gap-4">
                  <div>
                    <p class="text-sm font-semibold text-[#D8B46A]">
                      From ${{ deal.fromPrice }}
                    </p>
                    <p class="text-[11px] text-[#F3DEC0]">per bottle in case</p>
                  </div>
                  <button
                    class="inline-flex items-center justify-center rounded-full bg-white text-[#6B1238] px-4 py-1.5 text-xs font-semibold hover:bg-[#F3DEC0] transition-colors"
                  >
                    Shop bundle
                  </button>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section class="py-12 sm:py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-baseline justify-between gap-4 mb-6">
            <div>
              <h2 class="text-xl sm:text-2xl font-semibold text-[#111118]">New arrivals</h2>
              <p class="mt-1 text-sm text-[#4A4A54]">Fresh releases and exclusives now on WineHub.</p>
            </div>
            <button class="text-sm font-medium text-[#6B1238] hover:text-[#8E1E3A]">View all</button>
          </div>
          <div class="-mx-4 sm:mx-0 overflow-x-auto pb-2">
            <div class="flex gap-4 sm:gap-6 px-4 sm:px-0">
              <article
                v-for="wine in newArrivals"
                :key="wine.id"
                class="min-w-[220px] max-w-[260px] flex-1 rounded-2xl bg-white p-4 sm:p-5 shadow-sm hover:shadow-lg border border-transparent hover:border-[#F3DEC0] transition cursor-pointer"
                @click="openQuickView(wine)"
              >
                <div class="aspect-[3/4] w-full overflow-hidden rounded-xl bg-[#FAF7F3] mb-4">
                  <img
                    :src="wine.image"
                    :alt="wine.name"
                    loading="lazy"
                    class="h-full w-full object-cover"
                  />
                </div>
                <div class="space-y-1">
                  <p class="inline-flex items-center rounded-full bg-[#F3DEC0] text-[11px] text-[#6B1238] px-2 py-0.5 font-medium mb-1">
                    New
                  </p>
                  <h3 class="text-sm sm:text-base font-semibold text-[#111118]">
                    {{ wine.name }}
                  </h3>
                  <p class="text-[11px] text-[#4A4A54]">
                    {{ wine.region }} · {{ wine.country }}
                  </p>
                  <p class="text-sm font-semibold text-[#6B1238]">
                    ${{ wine.price }}
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section class="py-10 sm:py-14 border-t border-[#E4E4EC] bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 class="text-xl sm:text-2xl font-semibold text-[#111118] mb-2">Get sommelier tips & members-only offers</h2>
            <p class="text-sm text-[#4A4A54]">
              Be the first to hear about limited releases, tasting notes, and cellar recommendations.
            </p>
          </div>
          <form class="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              class="flex-1 rounded-full border border-[#E4E4EC] bg-[#FAF7F3] px-4 py-2.5 text-sm focus:outline-none focus:border-[#6B1238] focus:ring-2 focus:ring-[#F3DEC0]"
            />
            <button
              type="submit"
              class="inline-flex items-center justify-center rounded-full bg-[#6B1238] text-white px-6 py-2.5 text-sm font-semibold hover:bg-[#8E1E3A] transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <CatalogQuickView
        :open="quickViewOpen"
        :wine="quickViewWine"
        @close="closeQuickView"
        @add-to-cart="handleQuickViewAddToCart"
        @checkout="handleQuickViewCheckout"
      />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCart } from '~/composables/useCart'
import CatalogQuickView from '~/components/catalog/CatalogQuickView.vue'
import type { CatalogWine } from '~/types/catalog'

const router = useRouter()
const { addWine: addToCart } = useCart()

const quickViewOpen = ref(false)
const quickViewWine = ref<CatalogWine | null>(null)

const openQuickView = (wine: any) => {
  quickViewWine.value = {
    id: wine.id,
    name: wine.name,
    slug: `home-${wine.id}`,
    image: wine.image,
    shortDescription: `${wine.region} · ${wine.country}`,
    country: wine.country,
    region: wine.region,
    type: 'red',
    year: 2021,
    brand: 'WineBay selection',
    flavorProfiles: [],
    price: wine.price,
    oldPrice: (wine as any).originalPrice,
    rating: wine.rating,
    reviews: wine.reviews
  }
  quickViewOpen.value = true
}

const closeQuickView = () => {
  quickViewOpen.value = false
}

const handleQuickViewAddToCart = () => {
  if (!quickViewWine.value) return
  addToCart(
    {
      id: quickViewWine.value.id,
      name: quickViewWine.value.name,
      slug: quickViewWine.value.slug,
      image: quickViewWine.value.image,
      price: quickViewWine.value.price
    },
    1
  )
}

const handleQuickViewCheckout = () => {
  if (!quickViewWine.value) return
  handleQuickViewAddToCart()
  router.push('/checkout')
}

const goToCategory = (category: { name: string }) => {
  let typeParam: string | null = null

  if (category.name === 'Red wines') typeParam = 'red'
  else if (category.name === 'White wines') typeParam = 'white'
  else if (category.name === 'Sparkling') typeParam = 'sparkling'
  else if (category.name === 'Rosé') typeParam = 'rose'

  const query = typeParam ? { type: typeParam } : {}
  router.push({ path: '/catalog', query })
}

const categories = [
  {
    name: 'Red wines',
    short: 'RW',
    description: 'Cabernet, Merlot, Syrah & more.',
    count: 1200,
    image:
      'https://img.freepik.com/premium-photo/red-rose-white-wine-bottles_522560-15570.jpg?w=2000'
  },
  {
    name: 'White wines',
    short: 'WW',
    description: 'Crisp, mineral & aromatic whites.',
    count: 830,
    image:
      'https://img.freepik.com/free-photo/high-view-bottles-wine-row_23-2148243132.jpg?t=st=1764931929~exp=1764935529~hmac=6e7278479e49784b973b107d504cb2cb6431b94f921130906c6dd683d4ee6e8c&w=2000'
  },
  {
    name: 'Sparkling',
    short: 'SP',
    description: 'Champagne, Prosecco & cava.',
    count: 410,
    image:
      'https://img.freepik.com/free-photo/red-white-one-glasses-beside-bottles_23-2148414264.jpg?t=st=1764931941~exp=1764935541~hmac=4f73f6f9618ef456bbb895d948852fb172a21a6f6a1259247842e6092992a600&w=2000'
  },
  {
    name: 'Rosé',
    short: 'RS',
    description: 'Dry, fresh & summer-ready rosés.',
    count: 290,
    image:
      'https://img.freepik.com/premium-photo/red-rose-white-wine-bottles_522560-15570.jpg?w=2000'
  },
  {
    name: 'Premium cellar',
    short: 'PC',
    description: 'Iconic vintages & rare finds.',
    count: 160,
    image:
      'https://images.unsplash.com/photo-1554381401-dc595be1d842?q=80&w=691&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    name: 'By region',
    short: 'BR',
    description: 'Bordeaux, Napa, Rioja & more.',
    count: 540,
    image:
      'https://img.freepik.com/free-photo/high-view-bottles-wine-row_23-2148243132.jpg?t=st=1764931929~exp=1764935529~hmac=6e7278479e49784b973b107d504cb2cb6431b94f921130906c6dd683d4ee6e8c&w=2000'
  },
  {
    name: 'By grape',
    short: 'BG',
    description: 'Pinot Noir, Chardonnay, Malbec.',
    count: 460,
    image:
      'https://img.freepik.com/premium-photo/red-rose-white-wine-bottles_522560-15570.jpg?w=2000'
  },
  {
    name: 'Gift sets',
    short: 'GS',
    description: 'Curated boxes for every occasion.',
    count: 95,
    image:
      'https://img.freepik.com/free-photo/red-white-one-glasses-beside-bottles_23-2148414264.jpg?t=st=1764931941~exp=1764935541~hmac=4f73f6f9618ef456bbb895d948852fb172a21a6f6a1259247842e6092992a600&w=2000'
  }
]

const featuredWines = [
  {
    id: 1,
    name: 'Château Margaux 2016',
    region: 'Bordeaux',
    country: 'France',
    rating: 4.9,
    reviews: 182,
    price: 389,
    originalPrice: 420,
    discount: 7,
    image:
      'https://images.unsplash.com/photo-1554381401-dc595be1d842?q=80&w=691&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'  },
  {
    id: 2,
    name: 'Opus One 2018',
    region: 'Napa Valley',
    country: 'USA',
    rating: 4.8,
    reviews: 143,
    price: 349,
    originalPrice: 380,
    discount: 8,
    image:
      'https://img.freepik.com/free-photo/high-view-bottles-wine-row_23-2148243132.jpg?t=st=1764931929~exp=1764935529~hmac=6e7278479e49784b973b107d504cb2cb6431b94f921130906c6dd683d4ee6e8c&w=2000'  },
  {
    id: 3,
    name: 'Veuve Clicquot Brut',
    region: 'Champagne',
    country: 'France',
    rating: 4.7,
    reviews: 212,
    price: 69,
    originalPrice: 79,
    discount: 13,
    image:
      'https://img.freepik.com/premium-photo/red-rose-white-wine-bottles_522560-15570.jpg?w=2000'  },
  {
    id: 4,
    name: 'Antinori Tignanello 2019',
    region: 'Tuscany',
    country: 'Italy',
    rating: 4.8,
    reviews: 97,
    price: 155,
    originalPrice: 170,
    discount: 9,
    image:
      'https://img.freepik.com/free-photo/red-white-one-glasses-beside-bottles_23-2148414264.jpg?t=st=1764931941~exp=1764935541~hmac=4f73f6f9618ef456bbb895d948852fb172a21a6f6a1259247842e6092992a600&w=2000'  }
]

const popularFilters = ['All', 'Red', 'White', 'Sparkling', 'Under $50', 'Rated 4.5+']

const popularWines = [
  {
    id: 5,
    name: 'Malbec Reserva 2020',
    region: 'Mendoza',
    country: 'Argentina',
    rating: 4.6,
    reviews: 321,
    price: 29,
    image:
      'https://images.unsplash.com/photo-1554381401-dc595be1d842?q=80&w=691&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 6,
    name: 'Sancerre Blanc 2021',
    region: 'Loire',
    country: 'France',
    rating: 4.5,
    reviews: 198,
    price: 32,
    image:
      'https://img.freepik.com/free-photo/high-view-bottles-wine-row_23-2148243132.jpg?t=st=1764931929~exp=1764935529~hmac=6e7278479e49784b973b107d504cb2cb6431b94f921130906c6dd683d4ee6e8c&w=2000'
  },
  {
    id: 7,
    name: 'Rioja Crianza 2019',
    region: 'Rioja',
    country: 'Spain',
    rating: 4.6,
    reviews: 254,
    price: 24,
    image:
      'https://img.freepik.com/premium-photo/red-rose-white-wine-bottles_522560-15570.jpg?w=2000'
  },
  {
    id: 8,
    name: 'Prosecco Superiore DOCG',
    region: 'Valdobbiadene',
    country: 'Italy',
    rating: 4.4,
    reviews: 176,
    price: 21,
    image:
      'https://img.freepik.com/free-photo/red-white-one-glasses-beside-bottles_23-2148414264.jpg?t=st=1764931941~exp=1764935541~hmac=4f73f6f9618ef456bbb895d948852fb172a21a6f6a1259247842e6092992a600&w=2000'
  },
  {
    id: 9,
    name: 'Pinot Noir Estate 2020',
    region: 'Willamette Valley',
    country: 'USA',
    rating: 4.7,
    reviews: 132,
    price: 42,
    image:
      'https://images.unsplash.com/photo-1554381401-dc595be1d842?q=80&w=691&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 10,
    name: 'New Zealand Sauvignon Blanc',
    region: 'Marlborough',
    country: 'New Zealand',
    rating: 4.5,
    reviews: 289,
    price: 26,
    image:
      'https://img.freepik.com/free-photo/high-view-bottles-wine-row_23-2148243132.jpg?t=st=1764931929~exp=1764935529~hmac=6e7278479e49784b973b107d504cb2cb6431b94f921130906c6dd683d4ee6e8c&w=2000'
  },
  {
    id: 11,
    name: 'Châteauneuf-du-Pape 2018',
    region: 'Rhône',
    country: 'France',
    rating: 4.8,
    reviews: 88,
    price: 79,
    image:
      'https://img.freepik.com/premium-photo/red-rose-white-wine-bottles_522560-15570.jpg?w=2000'
  },
  {
    id: 12,
    name: 'Cava Brut Reserva',
    region: 'Penedès',
    country: 'Spain',
    rating: 4.3,
    reviews: 167,
    price: 18,
    image:
      'https://img.freepik.com/free-photo/red-white-one-glasses-beside-bottles_23-2148414264.jpg?t=st=1764931941~exp=1764935541~hmac=4f73f6f9618ef456bbb895d948852fb172a21a6f6a1259247842e6092992a600&w=2000'
  }
]

const newArrivals = [
  {
    id: 13,
    name: 'Etna Rosso 2021',
    region: 'Sicily',
    country: 'Italy',
    rating: 4.5,
    reviews: 34,
    price: 39,
    image:
      'https://images.unsplash.com/photo-1554381401-dc595be1d842?q=80&w=691&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 14,
    name: 'Chardonnay Single Vineyard 2022',
    region: 'Sonoma Coast',
    country: 'USA',
    rating: 4.4,
    reviews: 27,
    price: 44,
    image:
      'https://img.freepik.com/free-photo/high-view-bottles-wine-row_23-2148243132.jpg?t=st=1764931929~exp=1764935529~hmac=6e7278479e49784b973b107d504cb2cb6431b94f921130906c6dd683d4ee6e8c&w=2000'
  },
  {
    id: 15,
    name: 'Rosé Provence 2023',
    region: 'Provence',
    country: 'France',
    rating: 4.3,
    reviews: 51,
    price: 28,
    image:
      'https://img.freepik.com/premium-photo/red-rose-white-wine-bottles_522560-15570.jpg?w=2000'
  },
  {
    id: 16,
    name: 'Organic Orange Wine 2022',
    region: 'Istria',
    country: 'Croatia',
    rating: 4.2,
    reviews: 19,
    price: 31,
    image:
      'https://img.freepik.com/free-photo/red-white-one-glasses-beside-bottles_23-2148414264.jpg?t=st=1764931941~exp=1764935541~hmac=4f73f6f9618ef456bbb895d948852fb172a21a6f6a1259247842e6092992a600&w=2000'
  }
]

const deals = [
  {
    id: 1,
    name: 'Bordeaux discovery case (6 bottles)',
    label: 'Sommelier pick',
    description: 'Left and right bank blends selected for elegant dinners and celebrations.',
    discount: 35,
    fromPrice: 32
  },
  {
    id: 2,
    name: 'Sparkling celebration trio',
    label: 'Weekend special',
    description: 'Champagne, Prosecco, and Cava for every kind of toast.',
    discount: 28,
    fromPrice: 24
  },
  {
    id: 3,
    name: 'Everyday reds mixed case',
    label: 'Bestseller',
    description: 'Food-friendly reds from Spain, Italy, and South America.',
    discount: 30,
    fromPrice: 17
  }
]
</script>

