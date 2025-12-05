<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Heart, User, ShoppingCart, Search as SearchIcon, Menu } from 'lucide-vue-next'
import { useCart } from '~/composables/useCart'
import { useAuth } from '~/composables/useAuth'
import BaseButton from '~/components/ui/BaseButton.vue'
import LoginModal from '~/components/ui/LoginModal.vue'

const mobileMenuOpen = ref(false)
const mobileSearchOpen = ref(false)
const searchTerm = ref('')
const loginModalOpen = ref(false)

const router = useRouter()

const { itemCount } = useCart()
const { isAuthenticated, login } = useAuth()

const handleSearch = () => {
  const term = searchTerm.value.trim()
  router.push({
    path: '/search',
    query: { q: term }
  })
  mobileSearchOpen.value = false
}

const handleLoginSubmit = (payload: { email: string; password: string }) => {
  // For now we just mark the user as authenticated and redirect to account
  login()
  loginModalOpen.value = false
  router.push('/account/profile')
}
</script>

<template>
  <header class="sticky top-0 inset-x-0 z-40 bg-white/90 backdrop-blur border-b border-[#E4E4EC]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="hidden md:flex items-center justify-between text-xs text-[#4A4A54] py-2">
        <div class="flex items-center gap-2">
          <span class="font-semibold">Deliver to</span>
          <button class="inline-flex items-center gap-1 hover:text-[#6B1238] transition-colors">
            <span>Abuja, Nigeria</span>
          </button>
        </div>
        <div class="flex items-center gap-6">
          <button class="hover:text-[#6B1238] transition-colors">Help</button>
          <button class="hover:text-[#6B1238] transition-colors">Sell on WineHub</button>
        </div>
      </div>
      <div class="flex items-center justify-between gap-4 py-3">
        <div class="flex items-center gap-2">
          <NuxtLink
            to="/"
            class="flex items-center gap-2"
          >
            <div class="h-9 w-9 rounded-full bg-gradient-to-br from-[#6B1238] to-[#D8B46A] flex items-center justify-center text-white font-semibold">
              WB
            </div>
            <span class="text-2xl font-semibold tracking-tight text-[#111118]">WineBay</span>
          </NuxtLink>
        </div>
        <div class="hidden md:flex flex-1 items-center gap-3">
          <div class="relative flex-1">
            <div
              class="flex items-stretch rounded-full bg-[#F3F0EB] border border-transparent focus-within:border-[#6B1238] focus-within:ring-2 focus-within:ring-[#F3DEC0] transition"
            >
              <select
                class="hidden lg:block pl-4 pr-3 py-2 text-sm bg-transparent text-[#4A4A54] border-r border-[#E4E4EC] focus:outline-none"
              >
                <option>All</option>
                <option>Red</option>
                <option>White</option>
                <option>Sparkling</option>
                <option>Rosé</option>
                <option>Spirits</option>
              </select>
              <input
                v-model="searchTerm"
                type="search"
                class="flex-1 bg-transparent px-4 py-2 text-sm focus:outline-none"
                placeholder="Search by wine, region, grape, or winery..."
                @keyup.enter="handleSearch"
              />
              <BaseButton
                variant="primary"
                size="md"
                class="mx-1"
                @click="handleSearch"
              >
                Search
              </BaseButton>
            </div>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <button
            class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E4E4EC] text-[#4A4A54] hover:border-[#6B1238] hover:text-[#6B1238] transition-colors md:hidden"
            @click="mobileSearchOpen = !mobileSearchOpen"
          >
            <span class="sr-only">Toggle search</span>
            <SearchIcon class="w-4 h-4" />
          </button>
          <!-- <button
            class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E4E4EC] text-[#4A4A54] hover:border-[#6B1238] hover:text-[#6B1238] transition-colors md:hidden"
            @click="mobileMenuOpen = !mobileMenuOpen"
          >
            <span class="sr-only">Toggle navigation</span>
            <Menu class="w-4 h-4" />
          </button> -->
          <div class="hidden md:flex items-center gap-3">
            <NuxtLink
              v-if="isAuthenticated"
              to="/account/wishlist"
              class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#E4E4EC] text-[#4A4A54] hover:border-[#6B1238] hover:text-[#6B1238] transition-colors"
            >
              <span class="sr-only">Wishlist</span>
              <Heart class="w-4 h-4" />
            </NuxtLink>
            <button
              v-else
              type="button"
              class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#E4E4EC] text-[#4A4A54] hover:border-[#6B1238] hover:text-[#6B1238] transition-colors"
              @click="loginModalOpen = true"
            >
              <span class="sr-only">Wishlist</span>
              <Heart class="w-4 h-4" />
            </button>
            <NuxtLink
              v-if="isAuthenticated"
              to="/account/profile"
              class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#E4E4EC] text-[#4A4A54] hover:border-[#6B1238] hover:text-[#6B1238] transition-colors"
            >
              <span class="sr-only">Account</span>
              <User class="w-4 h-4" />
            </NuxtLink>
            <button
              v-else
              type="button"
              class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#E4E4EC] text-[#4A4A54] hover:border-[#6B1238] hover:text-[#6B1238] transition-colors"
              @click="loginModalOpen = true"
            >
              <span class="sr-only">Account</span>
              <User class="w-4 h-4" />
            </button>
            <NuxtLink
              to="/cart"
              class="relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#6B1238] text-white hover:bg-[#8E1E3A] transition-colors"
            >
              <span class="sr-only">Cart</span>
              <ShoppingCart class="w-4 h-4" />
              <span
                v-if="itemCount > 0"
                class="absolute -top-1 -right-1 inline-flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-[#D8B46A] text-[10px] font-semibold text-[#111118] px-1"
              >
                {{ itemCount }}
              </span>
            </NuxtLink>
            <NuxtLink v-if="itemCount > 0" to="/checkout">
              <BaseButton variant="secondary" size="sm">
                Continue to checkout
              </BaseButton>
            </NuxtLink>
          </div>
        </div>
      </div>
      <div v-if="mobileSearchOpen" class="md:hidden pb-3">
        <div class="relative">
          <input
            v-model="searchTerm"
            type="search"
            class="w-full rounded-full bg-[#F3F0EB] px-4 py-2 text-sm focus:outline-none border border-[#6B1238] focus:ring-2 focus:ring-[#F3DEC0]"
            placeholder="Search wines, regions, grapes..."
            @keyup.enter="handleSearch"
          />
        </div>
      </div>
      <div v-if="mobileMenuOpen" class="md:hidden pb-3 border-t border-[#E4E4EC] pt-3">
        <nav class="flex flex-col gap-2 text-sm text-[#4A4A54]">
          <button class="text-left py-1 hover:text-[#6B1238]">Categories</button>
          <button class="text-left py-1 hover:text-[#6B1238]">Deals</button>
          <button class="text-left py-1 hover:text-[#6B1238]">New arrivals</button>
          <button class="text-left py-1 hover:text-[#6B1238]">Help</button>
        </nav>
      </div>
    </div>
    <LoginModal
      :open="loginModalOpen"
      @close="loginModalOpen = false"
      @submit="handleLoginSubmit"
    />
  </header>
</template>
