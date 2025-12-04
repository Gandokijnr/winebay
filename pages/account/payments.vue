<script setup lang="ts">
import { useUser } from '~/composables/useUser'
import Badge from '~/components/ui/Badge.vue'

const { paymentMethods } = useUser()
</script>

<template>
  <div class="min-h-screen bg-[#FAF7F3] text-[#111118]">
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <header class="mb-6 sm:mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 class="text-xl sm:text-2xl font-semibold mb-1">Payment methods</h1>
          <p class="text-sm text-[#4A4A54]">
            View how you pay for orders. You can extend this with real payment integrations later.
          </p>
        </div>
      </header>

      <AccountSidebar />

      <section class="bg-white rounded-2xl border border-[#E4E4EC] p-4 sm:p-5 space-y-3 text-sm text-[#111118]">
        <div v-if="!paymentMethods.length" class="text-[11px] sm:text-xs text-[#4A4A54]">
          You don't have any saved payment methods yet.
        </div>

        <div v-else class="space-y-3">
          <article
            v-for="method in paymentMethods"
            :key="method.id"
            class="rounded-2xl border border-[#E4E4EC] px-3 py-3 flex items-center justify-between gap-3 text-xs sm:text-sm text-[#4A4A54] bg-[#FAF7F3]"
          >
            <div class="space-y-0.5">
              <p class="font-semibold text-[#111118] flex items-center gap-1">
                <span v-if="method.type === 'card'">{{ method.brand }} card</span>
                <span v-else>{{ method.brand }}</span>
                <Badge v-if="method.isDefault" variant="neutral">
                  Default
                </Badge>
              </p>
              <p v-if="method.type === 'card'" class="text-[11px] sm:text-xs">
                Ending in {{ method.last4 }} · Expires {{ method.expiry }}
              </p>
              <p v-else class="text-[11px] sm:text-xs">
                {{ method.label }}
              </p>
            </div>
          </article>
        </div>
      </section>
    </main>
  </div>
</template>
