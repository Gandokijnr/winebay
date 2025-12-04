<script setup lang="ts">
import { useRoute } from 'vue-router'
import { User, Package, MapPin, Heart, CreditCard, Settings, LogOut } from 'lucide-vue-next'

const route = useRoute()

const items = [
  { label: 'Profile overview', to: '/account/profile', icon: User },
  { label: 'Orders', to: '/account', icon: Package },
  { label: 'Addresses', to: '/account/addresses', icon: MapPin },
  { label: 'Wishlist', to: '/account/wishlist', icon: Heart },
  { label: 'Payment methods', to: '/account/payments', icon: CreditCard },
  { label: 'Settings', to: '/account/settings', icon: Settings },
  { label: 'Logout', to: '/logout', icon: LogOut }
]

const isActive = (to: string) => route.path === to || route.path.startsWith(to + '/')
</script>

<template>
  <nav class="mb-4 rounded-2xl bg-white border border-[#E4E4EC] px-3 py-2 text-xs sm:text-sm text-[#4A4A54]">
    <div class="flex gap-1 sm:gap-2 overflow-x-auto">
      <NuxtLink
        v-for="item in items"
        :key="item.to"
        :to="item.to"
        class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full whitespace-nowrap border border-transparent hover:border-[#6B1238] hover:text-[#6B1238]"
        :class="isActive(item.to) ? 'bg-[#F3DEC0] text-[#111118] border-[#6B1238]' : 'bg-white'"
      >
        <component
          :is="item.icon"
          class="w-3.5 h-3.5"
        />
        <span>{{ item.label }}</span>
      </NuxtLink>
    </div>
  </nav>
</template>
