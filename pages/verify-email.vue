<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const status = computed(() => {
  const value = route.query.status
  if (value === 'success' || value === 'error') {
    return value
  }
  return 'pending'
})

const handleGoToLogin = () => {
  router.push('/login')
}
</script>

<template>
  <div class="min-h-screen bg-[#FAF7F3] text-[#111118] flex items-center justify-center px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-md bg-white border border-[#E4E4EC] rounded-2xl px-5 py-6 sm:px-6 sm:py-7 shadow-sm text-center space-y-4">
      <div v-if="status === 'pending'" class="space-y-2">
        <p class="text-xs font-semibold tracking-[0.16em] uppercase text-[#A0A0AA]">Verify email</p>
        <h1 class="text-xl sm:text-2xl font-semibold">Check your email</h1>
        <p class="text-xs sm:text-sm text-[#4A4A54]">
          We’ve sent a verification link to your inbox. Click the link to activate your WineHub account.
        </p>
      </div>

      <div v-else-if="status === 'success'" class="space-y-2">
        <p class="text-xs font-semibold tracking-[0.16em] uppercase text-[#A0A0AA]">Email verified</p>
        <h1 class="text-xl sm:text-2xl font-semibold">You’re all set</h1>
        <p class="text-xs sm:text-sm text-[#4A4A54]">
          Your email has been successfully verified. You can now sign in to your WineHub account.
        </p>
      </div>

      <div v-else class="space-y-2">
        <p class="text-xs font-semibold tracking-[0.16em] uppercase text-[#A0A0AA]">Something went wrong</p>
        <h1 class="text-xl sm:text-2xl font-semibold">Verification failed</h1>
        <p class="text-xs sm:text-sm text-[#4A4A54]">
          The verification link may have expired or already been used. You can request a new one from your account
          settings.
        </p>
      </div>

      <button
        type="button"
        class="w-full inline-flex items-center justify-center rounded-full bg-[#6B1238] text-white px-4 py-2.5 text-sm font-semibold hover:bg-[#8E1E3A]"
        @click="handleGoToLogin"
      >
        Go to sign in
      </button>
    </div>
  </div>
</template>
