<script setup lang="ts">
import { useUser } from '~/composables/useUser'
import BaseButton from '~/components/ui/BaseButton.vue'

const { wishlist } = useUser()
</script>

<template>
  <div class="min-h-screen bg-[#FAF7F3] text-[#111118]">
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <header class="mb-6 sm:mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 class="text-xl sm:text-2xl font-semibold mb-1">Wishlist</h1>
          <p class="text-sm text-[#4A4A54]">
            Wines you’ve saved to revisit later.
          </p>
        </div>
      </header>

      <AccountSidebar />

      <section class="bg-white rounded-2xl border border-[#E4E4EC] p-4 sm:p-5 text-sm text-[#111118]">
        <div v-if="!wishlist.length" class="text-center space-y-3 text-[11px] sm:text-xs text-[#4A4A54]">
          <p>Your wishlist is empty. Explore the catalog and tap the heart icon to save wines here.</p>
          <NuxtLink to="/catalog">
            <BaseButton variant="primary" size="sm">
              Browse wines
            </BaseButton>
          </NuxtLink>
        </div>

        <div v-else class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          <NuxtLink
            v-for="item in wishlist"
            :key="item.id"
            :to="`/wines/${item.slug}`"
            class="group rounded-2xl border border-[#E4E4EC] hover:border-[#F3DEC0] bg-[#FAF7F3] p-3 sm:p-4 flex flex-col gap-2"
          >
            <div class="aspect-[3/4] w-full overflow-hidden rounded-xl bg-[#FAF7F3] flex items-center justify-center">
              <img
                :src="item.image"
                :alt="item.name"
                class="h-full w-full object-cover group-hover:scale-[1.02] transition-transform"
              />
            </div>
            <div class="space-y-1">
              <p class="text-xs sm:text-sm font-semibold text-[#111118] line-clamp-2">
                {{ item.name }}
              </p>
              <p class="text-[11px] text-[#4A4A54]">
                {{ item.region }} · {{ item.country }}
              </p>
              <p class="text-xs sm:text-sm font-semibold text-[#6B1238]">
                €{{ item.price.toFixed(2) }}
              </p>
            </div>
          </NuxtLink>
        </div>
      </section>
    </main>
  </div>
</template>
