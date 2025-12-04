<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuth } from '~/composables/useAuth'

const router = useRouter()
const { logout } = useAuth()

const handleGoHome = () => {
  logout()
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen bg-[#FAF7F3] text-[#111118] flex items-center justify-center">
    <div class="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white rounded-2xl border border-[#E4E4EC] text-center space-y-3">
      <h1 class="text-lg sm:text-xl font-semibold mb-1">You are now logged out</h1>
      <p class="text-sm text-[#4A4A54]">
        In a real application, this page would clear your session or token. For now, it simply simulates the logout
        experience.
      </p>
      <button
        type="button"
        class="mt-2 inline-flex items-center justify-center rounded-full bg-[#6B1238] text-white px-5 py-2.5 text-sm font-semibold hover:bg-[#8E1E3A]"
        @click="handleGoHome"
      >
        Go to homepage
      </button>
    </div>
  </div>
</template>
