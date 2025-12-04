<script setup lang="ts">
import { reactive } from 'vue'
import { useUser } from '~/composables/useUser'
import BaseButton from '~/components/ui/BaseButton.vue'
import Badge from '~/components/ui/Badge.vue'

const { addresses, addAddress, removeAddress, setDefaultAddress } = useUser()

const newAddress = reactive({
  label: '',
  recipientName: '',
  phone: '',
  line1: '',
  line2: '',
  city: '',
  state: '',
  country: '',
  postalCode: ''
})

const handleAddAddress = () => {
  if (!newAddress.line1 || !newAddress.city || !newAddress.country) return

  addAddress({
    label: newAddress.label || 'New address',
    recipientName: newAddress.recipientName || 'Recipient',
    phone: newAddress.phone || '',
    line1: newAddress.line1,
    line2: newAddress.line2,
    city: newAddress.city,
    state: newAddress.state,
    country: newAddress.country,
    postalCode: newAddress.postalCode,
    isDefault: !addresses.value.length
  })

  newAddress.label = ''
  newAddress.recipientName = ''
  newAddress.phone = ''
  newAddress.line1 = ''
  newAddress.line2 = ''
  newAddress.city = ''
  newAddress.state = ''
  newAddress.country = ''
  newAddress.postalCode = ''
}
</script>

<template>
  <div class="min-h-screen bg-[#FAF7F3] text-[#111118]">
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <header class="mb-6 sm:mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 class="text-xl sm:text-2xl font-semibold mb-1">Address book</h1>
          <p class="text-sm text-[#4A4A54]">
            Manage your delivery addresses to check out faster.
          </p>
        </div>
      </header>

      <AccountSidebar />

      <section class="grid lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)] gap-6 lg:gap-8 items-start">
        <section class="bg-white rounded-2xl border border-[#E4E4EC] p-4 sm:p-5 space-y-3 text-sm text-[#111118]">
          <header class="flex items-center justify-between gap-3">
            <h2 class="text-sm sm:text-base font-semibold">Saved addresses</h2>
          </header>

          <div v-if="!addresses.length" class="text-[11px] sm:text-xs text-[#4A4A54]">
            You haven't added any addresses yet.
          </div>

          <div v-else class="space-y-3">
            <article
              v-for="address in addresses"
              :key="address.id"
              class="rounded-2xl border border-[#E4E4EC] px-3 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs sm:text-sm text-[#4A4A54] bg-[#FAF7F3]"
            >
              <div class="space-y-0.5">
                <p class="font-semibold text-[#111118] flex items-center gap-1">
                  {{ address.label }}
                  <Badge v-if="address.isDefault" variant="neutral">
                    Default
                  </Badge>
                </p>
                <p>{{ address.recipientName }}</p>
                <p>
                  {{ address.line1 }}<span v-if="address.line2">, {{ address.line2 }}</span>
                </p>
                <p>
                  {{ address.city }}, {{ address.state }}, {{ address.country }}
                  <span v-if="address.postalCode"> · {{ address.postalCode }}</span>
                </p>
                <p class="text-[11px] text-[#A0A0AA]">{{ address.phone }}</p>
              </div>

              <div class="flex items-center gap-2 sm:flex-col sm:items-end sm:gap-1 text-[11px] sm:text-xs">
                <BaseButton
                  v-if="!address.isDefault"
                  variant="secondary"
                  size="sm"
                  @click="setDefaultAddress(address.id)"
                >
                  Make default
                </BaseButton>
                <BaseButton
                  variant="secondary"
                  size="sm"
                  class="text-[#A0A0AA]"
                  @click="removeAddress(address.id)"
                >
                  Remove
                </BaseButton>
              </div>
            </article>
          </div>
        </section>

        <aside class="space-y-3">
          <section class="bg-white rounded-2xl border border-[#E4E4EC] p-4 sm:p-5 space-y-3 text-sm text-[#111118]">
            <h2 class="text-sm sm:text-base font-semibold mb-1">Add new address</h2>
            <div class="space-y-2 text-xs sm:text-sm text-[#4A4A54]">
              <div class="grid sm:grid-cols-2 gap-2">
                <div class="space-y-1">
                  <label class="block text-[11px] font-medium text-[#4A4A54]">Label</label>
                  <input
                    v-model="newAddress.label"
                    type="text"
                    class="w-full rounded-xl border border-[#E4E4EC] bg-[#FAF7F3] px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#6B1238] focus:ring-2 focus:ring-[#F3DEC0]"
                    placeholder="Home, Office..."
                  />
                </div>
                <div class="space-y-1">
                  <label class="block text-[11px] font-medium text-[#4A4A54]">Recipient name</label>
                  <input
                    v-model="newAddress.recipientName"
                    type="text"
                    class="w-full rounded-xl border border-[#E4E4EC] bg-[#FAF7F3] px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#6B1238] focus:ring-2 focus:ring-[#F3DEC0]"
                  />
                </div>
              </div>
              <div class="space-y-1">
                <label class="block text-[11px] font-medium text-[#4A4A54]">Phone</label>
                <input
                  v-model="newAddress.phone"
                  type="tel"
                  class="w-full rounded-xl border border-[#E4E4EC] bg-[#FAF7F3] px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#6B1238] focus:ring-2 focus:ring-[#F3DEC0]"
                />
              </div>
              <div class="space-y-1">
                <label class="block text-[11px] font-medium text-[#4A4A54]">Address line 1</label>
                <input
                  v-model="newAddress.line1"
                  type="text"
                  class="w-full rounded-xl border border-[#E4E4EC] bg-[#FAF7F3] px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#6B1238] focus:ring-2 focus:ring-[#F3DEC0]"
                />
              </div>
              <div class="space-y-1">
                <label class="block text-[11px] font-medium text-[#4A4A54]">Address line 2 (optional)</label>
                <input
                  v-model="newAddress.line2"
                  type="text"
                  class="w-full rounded-xl border border-[#E4E4EC] bg-[#FAF7F3] px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#6B1238] focus:ring-2 focus:ring-[#F3DEC0]"
                />
              </div>
              <div class="grid sm:grid-cols-2 gap-2">
                <div class="space-y-1">
                  <label class="block text-[11px] font-medium text-[#4A4A54]">City</label>
                  <input
                    v-model="newAddress.city"
                    type="text"
                    class="w-full rounded-xl border border-[#E4E4EC] bg-[#FAF7F3] px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#6B1238] focus:ring-2 focus:ring-[#F3DEC0]"
                  />
                </div>
                <div class="space-y-1">
                  <label class="block text-[11px] font-medium text-[#4A4A54]">State</label>
                  <input
                    v-model="newAddress.state"
                    type="text"
                    class="w-full rounded-xl border border-[#E4E4EC] bg-[#FAF7F3] px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#6B1238] focus:ring-2 focus:ring-[#F3DEC0]"
                  />
                </div>
              </div>
              <div class="grid sm:grid-cols-2 gap-2">
                <div class="space-y-1">
                  <label class="block text-[11px] font-medium text-[#4A4A54]">Country</label>
                  <input
                    v-model="newAddress.country"
                    type="text"
                    class="w-full rounded-xl border border-[#E4E4EC] bg-[#FAF7F3] px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#6B1238] focus:ring-2 focus:ring-[#F3DEC0]"
                  />
                </div>
                <div class="space-y-1">
                  <label class="block text-[11px] font-medium text-[#4A4A54]">Postal code (optional)</label>
                  <input
                    v-model="newAddress.postalCode"
                    type="text"
                    class="w-full rounded-xl border border-[#E4E4EC] bg-[#FAF7F3] px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#6B1238] focus:ring-2 focus:ring-[#F3DEC0]"
                  />
                </div>
              </div>
              <div class="pt-1 flex justify-end">
                <BaseButton
                  type="button"
                  variant="primary"
                  size="sm"
                  :disabled="!newAddress.line1 || !newAddress.city || !newAddress.country"
                  @click="handleAddAddress"
                >
                  Save address
                </BaseButton>
              </div>
            </div>
          </section>
        </aside>
      </section>
    </main>
  </div>
</template>
