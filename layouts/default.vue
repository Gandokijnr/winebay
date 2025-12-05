<template>
  <div class="min-h-screen flex flex-col bg-[#FAFAFA]">
    <Header />
    <main class="flex-1 pb-16 md:pb-0">
      <slot />
    </main>

    <!-- Mobile bottom navigation -->
    <nav class="fixed inset-x-0 bottom-0 z-40 bg-white border-t border-zinc-200 md:hidden">
      <div class="max-w-7xl mx-auto px-4 flex items-center justify-between h-14 text-[11px] text-zinc-600">
        <NuxtLink
          to="/"
          class="flex flex-col items-center justify-center gap-0.5 flex-1"
          :class="isActive('/') ? 'text-[#6B1238]' : ''"
        >
          <Home :size="18" />
          <span>Home</span>
        </NuxtLink>
        <NuxtLink
          to="/catalog"
          class="flex flex-col items-center justify-center gap-0.5 flex-1"
          :class="isActive('/catalog') ? 'text-[#6B1238]' : ''"
        >
          <Grid3X3 :size="18" />
          <span>Shop</span>
        </NuxtLink>
        <NuxtLink
          to="/cart"
          class="flex flex-col items-center justify-center gap-0.5 flex-1"
          :class="isActive('/cart') ? 'text-[#6B1238]' : ''"
        >
          <div class="relative flex items-center justify-center">
            <ShoppingCart :size="18" />
            <span
              v-if="itemCount > 0"
              class="absolute -top-2 -right-3 inline-flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-[#D8B46A] text-[10px] font-semibold text-[#111118] px-1"
            >
              {{ itemCount }}
            </span>
          </div>
          <span>Cart</span>
        </NuxtLink>
        <NuxtLink
          to="/account"
          class="flex flex-col items-center justify-center gap-0.5 flex-1"
          :class="isActive('/account') ? 'text-[#6B1238]' : ''"
        >
          <User :size="18" />
          <span>Account</span>
        </NuxtLink>
      </div>
    </nav>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
import { Home, Grid3X3, Compass, User, HelpCircle, ShoppingCart } from 'lucide-vue-next'
import { useRoute } from 'vue-router'
import { useCart } from '~/composables/useCart'

const route = useRoute()
const { itemCount } = useCart()

const isActive = (to: string) => route.path === to || route.path.startsWith(to + '/')
</script>