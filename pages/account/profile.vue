<script setup lang="ts">
import { computed } from 'vue'
import { useUser } from '~/composables/useUser'
import { useOrder } from '~/composables/useOrder'
import Badge from '~/components/ui/Badge.vue'

const { profile, defaultAddress, wishlist } = useUser()
const { orders } = useOrder()

const ordersCount = computed(() => orders.value.length)
const memberSince = computed(() => new Date(profile.value.createdAt).toLocaleDateString())
</script>

<template>
  <div class="min-h-screen bg-[#FAF7F3] text-[#111118]">
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <header class="mb-6 sm:mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 class="text-xl sm:text-2xl font-semibold mb-1">Profile overview</h1>
          <p class="text-sm text-[#4A4A54]">
            Manage your basic details and see a quick snapshot of your WineHub activity.
          </p>
        </div>
      </header>

      <AccountSidebar />

      <section class="grid lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)] gap-6 lg:gap-8 items-start">
        <div class="space-y-4">
          <section class="bg-white rounded-2xl border border-[#E4E4EC] p-4 sm:p-5 space-y-3 text-sm text-[#111118]">
            <header class="flex items-center justify-between gap-3">
              <div>
                <p class="text-xs text-[#4A4A54]">Account details</p>
                <p class="text-sm sm:text-base font-semibold">{{ profile.name }}</p>
              </div>
            </header>

            <dl class="grid sm:grid-cols-2 gap-3 text-xs sm:text-sm text-[#4A4A54] mt-1">
              <div class="space-y-0.5">
                <dt class="text-[11px] uppercase tracking-[0.16em] text-[#A0A0AA]">Email</dt>
                <dd class="font-medium">{{ profile.email }}</dd>
              </div>
              <div class="space-y-0.5">
                <dt class="text-[11px] uppercase tracking-[0.16em] text-[#A0A0AA]">Phone</dt>
                <dd class="font-medium">{{ profile.phone }}</dd>
              </div>
              <div class="space-y-0.5">
                <dt class="text-[11px] uppercase tracking-[0.16em] text-[#A0A0AA]">Member since</dt>
                <dd class="font-medium">{{ memberSince }}</dd>
              </div>
              <div class="space-y-0.5">
                <dt class="text-[11px] uppercase tracking-[0.16em] text-[#A0A0AA]">Customer ID</dt>
                <dd class="font-mono text-[11px]">{{ profile.id }}</dd>
              </div>
            </dl>
          </section>

          <section class="bg-white rounded-2xl border border-[#E4E4EC] p-4 sm:p-5 space-y-3 text-sm text-[#111118]">
            <header class="flex items-center justify-between gap-3">
              <h2 class="text-sm sm:text-base font-semibold">Default delivery address</h2>
            </header>

            <div v-if="!defaultAddress" class="text-[11px] sm:text-xs text-[#4A4A54]">
              You haven't saved any addresses yet. Add one from the Addresses tab to speed up checkout.
            </div>

            <div v-else class="space-y-1 text-xs sm:text-sm text-[#4A4A54]">
              <p class="font-semibold text-[#111118]">
                {{ defaultAddress.recipientName }}
                <Badge variant="neutral" class="ml-1">
                  Default
                </Badge>
              </p>
              <p>
                {{ defaultAddress.line1 }}<span v-if="defaultAddress.line2">, {{ defaultAddress.line2 }}</span>
              </p>
              <p>
                {{ defaultAddress.city }}, {{ defaultAddress.state }}, {{ defaultAddress.country }}
                <span v-if="defaultAddress.postalCode"> · {{ defaultAddress.postalCode }}</span>
              </p>
              <p class="text-[11px] text-[#A0A0AA]">{{ defaultAddress.phone }}</p>
            </div>
          </section>
        </div>

        <aside class="space-y-3">
          <section class="bg-white rounded-2xl border border-[#E4E4EC] p-4 sm:p-5 space-y-3 text-sm text-[#111118]">
            <h2 class="text-sm sm:text-base font-semibold mb-1">Account snapshot</h2>
            <div class="grid grid-cols-2 gap-3 text-xs sm:text-sm text-[#4A4A54]">
              <div class="rounded-2xl bg-[#FAF7F3] p-3">
                <p class="text-[11px] uppercase tracking-[0.16em] text-[#A0A0AA] mb-1">Orders</p>
                <p class="text-lg font-semibold text-[#111118]">{{ ordersCount }}</p>
              </div>
              <div class="rounded-2xl bg-[#FAF7F3] p-3">
                <p class="text-[11px] uppercase tracking-[0.16em] text-[#A0A0AA] mb-1">Wishlist</p>
                <p class="text-lg font-semibold text-[#111118]">{{ wishlist.length }}</p>
              </div>
            </div>
          </section>
        </aside>
      </section>
    </main>
  </div>
</template>
