<script setup lang="ts">
import { useUser } from '~/composables/useUser'

const { settings, setSettings } = useUser()
</script>

<template>
  <div class="min-h-screen bg-[#FAF7F3] text-[#111118]">
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <header class="mb-6 sm:mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 class="text-xl sm:text-2xl font-semibold mb-1">Settings</h1>
          <p class="text-sm text-[#4A4A54]">
            Basic account preferences for communication, language, and currency.
          </p>
        </div>
      </header>

      <AccountSidebar />

      <section class="grid lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)] gap-6 lg:gap-8 items-start">
        <section class="bg-white rounded-2xl border border-[#E4E4EC] p-4 sm:p-5 space-y-4 text-sm text-[#111118]">
          <header>
            <h2 class="text-sm sm:text-base font-semibold mb-1">Email preferences</h2>
            <p class="text-[11px] sm:text-xs text-[#4A4A54]">
              Choose which types of emails you want to receive.
            </p>
          </header>

          <div class="space-y-2 text-xs sm:text-sm text-[#4A4A54]">
            <label class="flex items-start gap-2">
              <input
                v-model="settings.newsletter"
                type="checkbox"
                class="mt-0.5 h-3.5 w-3.5 rounded border-[#E4E4EC] text-[#6B1238] focus:ring-[#6B1238]"
                @change="setSettings({ newsletter: settings.newsletter })"
              />
              <span>
                <span class="block font-medium text-[#111118]">WineHub newsletter</span>
                <span class="block text-[11px] sm:text-xs">
                  Occasional emails with new arrivals, offers, and cellar tips.
                </span>
              </span>
            </label>

            <label class="flex items-start gap-2">
              <input
                v-model="settings.marketing"
                type="checkbox"
                class="mt-0.5 h-3.5 w-3.5 rounded border-[#E4E4EC] text-[#6B1238] focus:ring-[#6B1238]"
                @change="setSettings({ marketing: settings.marketing })"
              />
              <span>
                <span class="block font-medium text-[#111118]">Promotions and partners</span>
                <span class="block text-[11px] sm:text-xs">
                  Occasional promos from WineHub and trusted partners.
                </span>
              </span>
            </label>
          </div>
        </section>

        <aside class="space-y-3">
          <section class="bg-white rounded-2xl border border-[#E4E4EC] p-4 sm:p-5 space-y-3 text-sm text-[#111118]">
            <h2 class="text-sm sm:text-base font-semibold mb-1">Locale</h2>
            <div class="space-y-2 text-xs sm:text-sm text-[#4A4A54]">
              <div class="space-y-1">
                <label class="block text-[11px] font-medium text-[#4A4A54]">Language</label>
                <select
                  v-model="settings.language"
                  class="w-full rounded-xl border border-[#E4E4EC] bg-[#FAF7F3] px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#6B1238] focus:ring-2 focus:ring-[#F3DEC0]"
                  @change="setSettings({ language: settings.language })"
                >
                  <option>English</option>
                  <option>French</option>
                </select>
              </div>
              <div class="space-y-1">
                <label class="block text-[11px] font-medium text-[#4A4A54]">Currency</label>
                <select
                  v-model="settings.currency"
                  class="w-full rounded-xl border border-[#E4E4EC] bg-[#FAF7F3] px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#6B1238] focus:ring-2 focus:ring-[#F3DEC0]"
                  @change="setSettings({ currency: settings.currency })"
                >
                  <option value="EUR">EUR (€)</option>
                  <option value="USD">USD ($)</option>
                  <option value="NGN">NGN (₦)</option>
                </select>
              </div>
            </div>
          </section>
        </aside>
      </section>
    </main>
  </div>
</template>
