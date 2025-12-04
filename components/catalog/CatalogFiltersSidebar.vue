<script setup lang="ts">
import { computed } from 'vue'

export type CatalogSortOption = 'newest' | 'price_asc' | 'price_desc' | 'rating' | 'popularity'

export type WineType = 'red' | 'white' | 'rose' | 'sparkling' | 'dessert' | 'fortified'

export interface CatalogFilters {
  priceMin: number | null
  priceMax: number | null
  types: WineType[]
  countries: string[]
  flavors: string[]
  brands: string[]
  ratingMin: number | null
  yearMin: number | null
  yearMax: number | null
}

const props = defineProps<{
  modelValue: CatalogFilters
  availableTypes: { value: WineType; label: string }[]
  availableCountries: string[]
  availableBrands: string[]
  availableFlavors: string[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: CatalogFilters): void
  (e: 'reset'): void
}>()

const filters = computed<CatalogFilters>({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const toggleArrayValue = <T,>(arr: T[], value: T): T[] => {
  return arr.includes(value) ? arr.filter((item) => item !== value) : [...arr, value]
}

const onToggleType = (type: WineType) => {
  filters.value = {
    ...filters.value,
    types: toggleArrayValue(filters.value.types, type)
  }
}

const onToggleCountry = (country: string) => {
  filters.value = {
    ...filters.value,
    countries: toggleArrayValue(filters.value.countries, country)
  }
}

const onToggleBrand = (brand: string) => {
  filters.value = {
    ...filters.value,
    brands: toggleArrayValue(filters.value.brands, brand)
  }
}

const onToggleFlavor = (flavor: string) => {
  filters.value = {
    ...filters.value,
    flavors: toggleArrayValue(filters.value.flavors, flavor)
  }
}

const onRatingChange = (rating: number) => {
  filters.value = {
    ...filters.value,
    ratingMin: rating
  }
}

const onPriceChange = (key: 'priceMin' | 'priceMax', value: string) => {
  const parsed = value === '' ? null : Number(value)
  filters.value = {
    ...filters.value,
    [key]: Number.isNaN(parsed) ? null : parsed
  }
}

const onYearChange = (key: 'yearMin' | 'yearMax', value: string) => {
  const parsed = value === '' ? null : Number(value)
  filters.value = {
    ...filters.value,
    [key]: Number.isNaN(parsed) ? null : parsed
  }
}

const resetFilters = () => {
  emit('reset')
}
</script>

<template>
  <aside class="bg-white rounded-2xl border border-[#E4E4EC] p-4 sm:p-5 text-[#111118] text-sm">
    <header class="flex items-center justify-between mb-4">
      <div>
        <h2 class="text-sm font-semibold">Filter wines</h2>
        <p class="text-xs text-[#4A4A54]">Refine by style, region, price and more.</p>
      </div>
      <button
        type="button"
        class="text-xs text-[#6B1238] hover:text-[#8E1E3A] font-medium"
        @click="resetFilters"
      >
        Clear all
      </button>
    </header>

    <!-- Price range -->
    <section class="border-t border-[#E4E4EC] pt-4 mt-4">
      <h3 class="text-xs font-semibold mb-2 uppercase tracking-[0.16em] text-[#4A4A54]">Price range</h3>
      <div class="flex items-center gap-2 text-xs">
        <div class="flex-1 flex items-center gap-1">
          <span class="text-[#4A4A54]">€</span>
          <input
            :value="filters.priceMin ?? ''"
            class="w-full rounded-full border border-[#E4E4EC] bg-[#FAF7F3] px-2 py-1 focus:outline-none focus:border-[#6B1238] focus:ring-1 focus:ring-[#F3DEC0]"
            placeholder="Min"
            inputmode="decimal"
            @input="onPriceChange('priceMin', ($event.target as HTMLInputElement).value)"
          />
        </div>
        <span class="text-[#A0A0AA]">–</span>
        <div class="flex-1 flex items-center gap-1">
          <span class="text-[#4A4A54]">€</span>
          <input
            :value="filters.priceMax ?? ''"
            class="w-full rounded-full border border-[#E4E4EC] bg-[#FAF7F3] px-2 py-1 focus:outline-none focus:border-[#6B1238] focus:ring-1 focus:ring-[#F3DEC0]"
            placeholder="Max"
            inputmode="decimal"
            @input="onPriceChange('priceMax', ($event.target as HTMLInputElement).value)"
          />
        </div>
      </div>
    </section>

    <!-- Wine type -->
    <section class="border-t border-[#E4E4EC] pt-4 mt-4">
      <h3 class="text-xs font-semibold mb-2 uppercase tracking-[0.16em] text-[#4A4A54]">Wine type</h3>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="type in availableTypes"
          :key="type.value"
          type="button"
          class="inline-flex items-center rounded-full border px-3 py-1 text-xs"
          :class="
            filters.types.includes(type.value)
              ? 'border-[#6B1238] bg-[#F3DEC0] text-[#6B1238]'
              : 'border-[#E4E4EC] bg-white text-[#4A4A54] hover:border-[#6B1238] hover:text-[#6B1238]'
          "
          @click="onToggleType(type.value)"
        >
          {{ type.label }}
        </button>
      </div>
    </section>

    <!-- Country -->
    <section class="border-t border-[#E4E4EC] pt-4 mt-4">
      <h3 class="text-xs font-semibold mb-2 uppercase tracking-[0.16em] text-[#4A4A54]">Country</h3>
      <div class="max-h-40 overflow-y-auto pr-1 space-y-1 text-xs">
        <label
          v-for="country in availableCountries"
          :key="country"
          class="flex items-center justify-between gap-2 py-0.5 cursor-pointer"
        >
          <span class="text-[#4A4A54]">{{ country }}</span>
          <input
            type="checkbox"
            class="h-3.5 w-3.5 rounded border border-[#D4D4E0] text-[#6B1238] focus:ring-[#6B1238]"
            :checked="filters.countries.includes(country)"
            @change="onToggleCountry(country)"
          />
        </label>
      </div>
    </section>

    <!-- Brand -->
    <section class="border-t border-[#E4E4EC] pt-4 mt-4">
      <h3 class="text-xs font-semibold mb-2 uppercase tracking-[0.16em] text-[#4A4A54]">Brand / winery</h3>
      <div class="max-h-32 overflow-y-auto pr-1 space-y-1 text-xs">
        <label
          v-for="brand in availableBrands"
          :key="brand"
          class="flex items-center justify-between gap-2 py-0.5 cursor-pointer"
        >
          <span class="text-[#4A4A54]">{{ brand }}</span>
          <input
            type="checkbox"
            class="h-3.5 w-3.5 rounded border border-[#D4D4E0] text-[#6B1238] focus:ring-[#6B1238]"
            :checked="filters.brands.includes(brand)"
            @change="onToggleBrand(brand)"
          />
        </label>
      </div>
    </section>

    <!-- Flavor profile -->
    <section class="border-t border-[#E4E4EC] pt-4 mt-4">
      <h3 class="text-xs font-semibold mb-2 uppercase tracking-[0.16em] text-[#4A4A54]">Flavor profile</h3>
      <div class="flex flex-wrap gap-1.5 text-xs">
        <button
          v-for="flavor in availableFlavors"
          :key="flavor"
          type="button"
          class="rounded-full border px-3 py-1"
          :class="
            filters.flavors.includes(flavor)
              ? 'border-[#6B1238] bg-[#F3DEC0] text-[#6B1238]'
              : 'border-[#E4E4EC] bg-white text-[#4A4A54] hover:border-[#6B1238] hover:text-[#6B1238]'
          "
          @click="onToggleFlavor(flavor)"
        >
          {{ flavor }}
        </button>
      </div>
    </section>

    <!-- Rating -->
    <section class="border-t border-[#E4E4EC] pt-4 mt-4">
      <h3 class="text-xs font-semibold mb-2 uppercase tracking-[0.16em] text-[#4A4A54]">Rating</h3>
      <div class="flex flex-col gap-1 text-xs">
        <label class="inline-flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="rating"
            class="h-3 w-3 text-[#6B1238] focus:ring-[#6B1238]"
            :checked="filters.ratingMin === 4.5"
            @change="onRatingChange(4.5)"
          />
          <span>4.5★ & up</span>
        </label>
        <label class="inline-flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="rating"
            class="h-3 w-3 text-[#6B1238] focus:ring-[#6B1238]"
            :checked="filters.ratingMin === 4"
            @change="onRatingChange(4)
            "
          />
          <span>4.0★ & up</span>
        </label>
        <label class="inline-flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="rating"
            class="h-3 w-3 text-[#6B1238] focus:ring-[#6B1238]"
            :checked="filters.ratingMin === null"
            @change="onRatingChange(null as unknown as number)"
          />
          <span>Any rating</span>
        </label>
      </div>
    </section>

    <!-- Year -->
    <section class="border-t border-[#E4E4EC] pt-4 mt-4">
      <h3 class="text-xs font-semibold mb-2 uppercase tracking-[0.16em] text-[#4A4A54]">Vintage year</h3>
      <div class="flex items-center gap-2 text-xs">
        <input
          :value="filters.yearMin ?? ''"
          class="w-full rounded-full border border-[#E4E4EC] bg-[#FAF7F3] px-2 py-1 focus:outline-none focus:border-[#6B1238] focus:ring-1 focus:ring-[#F3DEC0]"
          placeholder="From"
          inputmode="numeric"
          @input="onYearChange('yearMin', ($event.target as HTMLInputElement).value)"
        />
        <span class="text-[#A0A0AA]">–</span>
        <input
          :value="filters.yearMax ?? ''"
          class="w-full rounded-full border border-[#E4E4EC] bg-[#FAF7F3] px-2 py-1 focus:outline-none focus:border-[#6B1238] focus:ring-1 focus:ring-[#F3DEC0]"
          placeholder="To"
          inputmode="numeric"
          @input="onYearChange('yearMax', ($event.target as HTMLInputElement).value)"
        />
      </div>
    </section>
  </aside>
</template>
