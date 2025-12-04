<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Heart, ChevronLeft, Truck } from 'lucide-vue-next'
import type { WineDetail } from '~/types/catalog'
import { wineDetails } from '~/data/wines'
import { useCart } from '~/composables/useCart'
import ReviewStars from '~/components/ui/ReviewStars.vue'
import BaseButton from '~/components/ui/BaseButton.vue'
import Badge from '~/components/ui/Badge.vue'

const route = useRoute()
const router = useRouter()
const { addWine: addToCart } = useCart()

const slug = computed(() => route.params.slug as string)

const wine = computed<WineDetail | null>(() => {
  return wineDetails.find((w) => w.slug === slug.value) ?? null
})

const quantity = ref(1)
const maxQuantity = 12
const wishlisted = ref(false)
const activeImageIndex = ref(0)

const activeImage = computed(() => {
  if (!wine.value) return ''
  if (!wine.value.images.length) return wine.value.image
  return wine.value.images[activeImageIndex.value]
})

const stockStatusLabel = computed(() => {
  if (!wine.value) return ''
  if (wine.value.stockStatus === 'in_stock') return 'In stock'
  if (wine.value.stockStatus === 'low_stock') return 'Low stock'
  return 'Out of stock'
})

const stockStatusClass = computed(() => {
  if (!wine.value) return ''
  if (wine.value.stockStatus === 'in_stock') return 'text-emerald-600'
  if (wine.value.stockStatus === 'low_stock') return 'text-amber-600'
  return 'text-zinc-500'
})

const similarWines = computed(() => {
  if (!wine.value) return []
  return wineDetails
    .filter(
      (w) =>
        w.slug !== wine.value?.slug &&
        (w.type === wine.value?.type || w.region === wine.value?.region)
    )
    .slice(0, 4)
})

const incrementQuantity = () => {
  if (quantity.value < maxQuantity) {
    quantity.value += 1
  }
}

const decrementQuantity = () => {
  if (quantity.value > 1) {
    quantity.value -= 1
  }
}

const toggleWishlist = () => {
  wishlisted.value = !wishlisted.value
}

const handleAddToCart = () => {
  if (!wine.value) return

  addToCart(
    {
      id: wine.value.id,
      name: wine.value.name,
      slug: wine.value.slug,
      image: wine.value.image,
      price: wine.value.price
    },
    quantity.value
  )
}

const goBackToCatalog = () => {
  router.push('/catalog')
}

const customerReviews = [
  {
    id: 1,
    name: 'Sommelier A.',
    rating: 5,
    date: '2 weeks ago',
    content:
      'Beautiful balance and length. The structure will reward a few more years in the cellar, but it is already drinking wonderfully.'
  },
  {
    id: 2,
    name: 'WineHub customer',
    rating: 4,
    date: '1 month ago',
    content:
      'Arrived perfectly packed and at the right temperature. Great with dinner and impressed our guests.'
  },
  {
    id: 3,
    name: 'Private collector',
    rating: 5,
    date: '3 months ago',
    content:
      'Excellent value for the quality. I have added a few more bottles to my cellar after the first tasting.'
  }
]
</script>

<template>
  <div class="min-h-screen bg-[#FAF7F3] text-[#111118]">
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div v-if="!wine" class="py-20 text-center text-sm text-[#4A4A54]">
        <p>We could not find this wine. It may have been moved or is no longer available.</p>
      </div>

      <div v-else class="space-y-10">
        <header class="flex items-center justify-between gap-3 mb-2">
          <button
            type="button"
            class="inline-flex items-center gap-2 text-xs sm:text-sm text-[#4A4A54] hover:text-[#6B1238]"
            @click="goBackToCatalog"
          >
            <ChevronLeft class="w-4 h-4" />
            <span>Back to all wines</span>
          </button>
          <ReviewStars
            v-if="wine"
            class="hidden sm:flex"
            :rating="wine.rating"
            :review-count="wine.reviews"
            size="md"
          />
        </header>

        <section class="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] gap-8 lg:gap-10 items-start">
          <div class="space-y-4">
            <div class="relative rounded-3xl bg-white p-3 sm:p-4 shadow-sm">
              <div class="aspect-[3/4] w-full overflow-hidden rounded-2xl bg-[#FAF7F3] flex items-center justify-center">
                <img
                  :src="activeImage"
                  :alt="wine.name"
                  class="h-full w-full object-cover"
                />
              </div>
            </div>

            <div class="flex gap-2 sm:gap-3 overflow-x-auto pb-1">
              <button
                v-for="(imageSrc, index) in wine.images"
                :key="imageSrc + index"
                type="button"
                class="relative flex-shrink-0 w-16 h-20 sm:w-20 sm:h-24 rounded-xl overflow-hidden border"
                :class="
                  index === activeImageIndex
                    ? 'border-[#6B1238] ring-2 ring-[#F3DEC0]'
                    : 'border-[#E4E4EC]'
                "
                @click="activeImageIndex = index"
              >
                <img :src="imageSrc" :alt="wine.name" class="h-full w-full object-cover" />
              </button>
            </div>
          </div>

          <aside class="space-y-5">
            <div class="space-y-2">
              <p class="text-[11px] uppercase tracking-[0.16em] text-[#A0A0AA]">
                {{ wine.region }} · {{ wine.country }} · {{ wine.year }}
              </p>
              <h1 class="text-xl sm:text-2xl lg:text-3xl font-semibold leading-snug">
                {{ wine.name }}
              </h1>
              <p class="flex items-center gap-2 text-xs sm:text-sm text-[#4A4A54]">
                <span>
                  {{ wine.brand }} · {{ wine.grapeVariety }}
                </span>
                <Badge
                  v-if="wine.isNew || wine.isLimited"
                  :variant="wine.isNew ? 'new' : 'sale'"
                >
                  {{ wine.isNew ? 'New' : 'Limited' }}
                </Badge>
              </p>
            </div>

            <div class="flex items-center justify-between gap-3">
              <div>
                <p class="text-2xl sm:text-3xl font-semibold text-[#6B1238]">
                  €{{ wine.price }}
                </p>
                <p
                  v-if="wine.oldPrice"
                  class="text-xs text-[#A0A0AA] line-through"
                >
                  €{{ wine.oldPrice }}
                </p>
              </div>
              <div class="flex flex-col items-end text-[11px] text-[#4A4A54]">
                <ReviewStars
                  :rating="wine.rating"
                  :review-count="wine.reviews"
                  size="sm"
                />
                <span class="text-[#A0A0AA]">{{ wine.reviews }} customer reviews</span>
              </div>
            </div>

            <div class="space-y-3 text-xs sm:text-sm text-[#4A4A54]">
              <p>
                {{ wine.description }}
              </p>
              <div class="flex flex-wrap gap-1.5">
                <span
                  v-for="note in wine.tastingNotes"
                  :key="note"
                  class="inline-flex items-center rounded-full bg-[#F3F0EB] px-3 py-1 text-[11px] text-[#4A4A54]"
                >
                  {{ note }}
                </span>
              </div>
            </div>

            <dl class="grid grid-cols-2 gap-4 text-xs sm:text-sm text-[#4A4A54] bg-white rounded-2xl border border-[#E4E4EC] p-4">
              <div class="space-y-0.5">
                <dt class="text-[11px] uppercase tracking-[0.16em] text-[#A0A0AA]">Origin</dt>
                <dd class="font-medium">
                  {{ wine.region }}, {{ wine.country }}
                </dd>
              </div>
              <div class="space-y-0.5">
                <dt class="text-[11px] uppercase tracking-[0.16em] text-[#A0A0AA]">Alcohol</dt>
                <dd class="font-medium">{{ wine.alcoholPercent }}% ABV</dd>
              </div>
              <div class="space-y-0.5">
                <dt class="text-[11px] uppercase tracking-[0.16em] text-[#A0A0AA]">Grape</dt>
                <dd class="font-medium">{{ wine.grapeVariety }}</dd>
              </div>
              <div class="space-y-0.5">
                <dt class="text-[11px] uppercase tracking-[0.16em] text-[#A0A0AA]">Bottle size</dt>
                <dd class="font-medium">{{ wine.bottleSize }}</dd>
              </div>
            </dl>

            <div class="space-y-3">
              <div class="flex items-center justify-between gap-3 text-xs sm:text-sm">
                <p :class="['font-medium', stockStatusClass]">
                  {{ stockStatusLabel }}
                </p>
                <p class="text-[11px] text-[#4A4A54]">
                  Ships in protective packaging from certified sellers.
                </p>
              </div>

              <div class="flex items-center gap-3">
                <div class="inline-flex items-center rounded-full border border-[#E4E4EC] bg-white px-2 py-1 text-xs">
                  <button
                    type="button"
                    class="px-2 text-lg leading-none text-[#4A4A54]"
                    @click="decrementQuantity"
                  >
                    −
                  </button>
                  <input
                    v-model.number="quantity"
                    type="number"
                    min="1"
                    :max="maxQuantity"
                    class="w-10 text-center border-0 bg-transparent text-sm focus:outline-none"
                  />
                  <button
                    type="button"
                    class="px-2 text-lg leading-none text-[#4A4A54]"
                    @click="incrementQuantity"
                  >
                    +
                  </button>
                </div>
                <p class="text-[11px] text-[#4A4A54]">
                  Max {{ maxQuantity }} bottles per order.
                </p>
              </div>

              <div class="flex flex-col sm:flex-row gap-3">
                <BaseButton
                  variant="primary"
                  size="md"
                  class="flex-1"
                  :disabled="wine.stockStatus === 'out_of_stock'"
                  @click="handleAddToCart"
                >
                  Add to cart
                </BaseButton>
                <BaseButton
                  variant="secondary"
                  size="md"
                  class="inline-flex items-center justify-center gap-2"
                  @click="toggleWishlist"
                >
                  <Heart
                    class="w-4 h-4"
                    :class="wishlisted ? 'text-[#6B1238] fill-[#6B1238]' : ''"
                  />
                  <span>{{ wishlisted ? 'In wishlist' : 'Add to wishlist' }}</span>
                </BaseButton>
              </div>

              <div class="flex items-start gap-2 text-[11px] text-[#4A4A54] bg-[#F3F0EB] rounded-2xl px-3 py-2.5">
                <Truck class="w-4 h-4 text-[#6B1238] mt-0.5" />
                <p>
                  {{ wine.deliveryEstimate }}
                </p>
              </div>
            </div>

            <div v-if="wine.foodPairings.length" class="space-y-2 text-xs sm:text-sm text-[#4A4A54]">
              <p class="text-[11px] uppercase tracking-[0.16em] text-[#A0A0AA]">Food pairing ideas</p>
              <div class="flex flex-wrap gap-1.5">
                <span
                  v-for="food in wine.foodPairings"
                  :key="food"
                  class="inline-flex items-center rounded-full bg-white border border-[#E4E4EC] px-3 py-1 text-[11px]"
                >
                  {{ food }}
                </span>
              </div>
            </div>
          </aside>
        </section>

        <section class="grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.9fr)] gap-8 lg:gap-10 items-start">
          <div class="bg-white rounded-2xl border border-[#E4E4EC] p-4 sm:p-5 space-y-4">
            <header class="flex items-center justify-between gap-3">
              <div>
                <h2 class="text-sm sm:text-base font-semibold">Customer reviews</h2>
                <p class="text-[11px] text-[#4A4A54]">
                  Based on {{ wine.reviews }} verified ratings.
                </p>
              </div>
              <div class="flex items-center gap-2 text-xs text-[#4A4A54]">
                <ReviewStars
                  :rating="wine.rating"
                  :review-count="wine.reviews"
                  size="md"
                />
                <span class="text-[11px] text-[#A0A0AA]">overall</span>
              </div>
            </header>

            <div class="space-y-4">
              <article
                v-for="review in customerReviews"
                :key="review.id"
                class="border-t border-[#F1F1F5] pt-3 first:border-t-0 first:pt-0"
              >
                <div class="flex items-center justify-between gap-3 mb-1.5">
                  <p class="text-xs sm:text-sm font-medium text-[#111118]">
                    {{ review.name }}
                  </p>
                  <p class="text-[11px] text-[#A0A0AA]">
                    {{ review.date }}
                  </p>
                </div>
                <div class="flex items-center gap-1 mb-1">
                  <ReviewStars
                    :rating="review.rating"
                    :show-text="false"
                    size="sm"
                  />
                </div>
                <p class="text-xs sm:text-sm text-[#4A4A54]">
                  {{ review.content }}
                </p>
              </article>
            </div>
          </div>

          <aside class="space-y-3">
            <div class="flex items-baseline justify-between gap-3">
              <h2 class="text-sm sm:text-base font-semibold">Recommended for you</h2>
              <p class="text-[11px] text-[#4A4A54]">
                Similar styles you might also enjoy.
              </p>
            </div>

            <div v-if="!similarWines.length" class="text-[11px] text-[#4A4A54]">
              More recommendations will appear here as our selection grows.
            </div>

            <div
              v-else
              class="grid sm:grid-cols-2 gap-3 sm:gap-4"
            >
              <NuxtLink
                v-for="similar in similarWines"
                :key="similar.slug"
                :to="`/wines/${similar.slug}`"
                class="group rounded-2xl bg-white border border-[#E4E4EC] hover:border-[#F3DEC0] hover:shadow-md transition p-3 flex gap-3"
              >
                <div class="w-16 h-24 rounded-xl overflow-hidden bg-[#FAF7F3] flex items-center justify-center flex-shrink-0">
                  <img :src="similar.image" :alt="similar.name" class="h-full w-full object-cover" />
                </div>
                <div class="flex-1 space-y-1">
                  <p class="text-xs font-semibold text-[#111118] line-clamp-2">
                    {{ similar.name }}
                  </p>
                  <p class="text-[11px] text-[#4A4A54]">
                    {{ similar.region }} · {{ similar.country }}
                  </p>
                  <p class="text-xs font-semibold text-[#6B1238]">
                    €{{ similar.price }}
                  </p>
                </div>
              </NuxtLink>
            </div>
          </aside>
        </section>
      </div>
      </main>
    </div>
  </template>
