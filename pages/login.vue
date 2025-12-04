<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '~/composables/useAuth'

const router = useRouter()
const { login } = useAuth()

const email = ref('')
const password = ref('')
const remember = ref(false)
const loading = ref(false)
const error = ref('')

const handleSubmit = () => {
  if (!email.value || !password.value) {
    error.value = 'Please enter your email and password.'
    return
  }

  error.value = ''
  loading.value = true

  setTimeout(() => {
    loading.value = false
    login()
    router.push('/account/profile')
  }, 800)
}
</script>

<template>
  <div class="min-h-screen bg-[#FAF7F3] text-[#111118] flex items-center justify-center px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-md bg-white border border-[#E4E4EC] rounded-2xl px-5 py-6 sm:px-6 sm:py-7 shadow-sm">
      <div class="mb-5 text-center space-y-1">
        <p class="text-xs font-semibold tracking-[0.16em] uppercase text-[#A0A0AA]">Welcome back</p>
        <h1 class="text-xl sm:text-2xl font-semibold">Sign in to WineHub</h1>
        <p class="text-xs sm:text-sm text-[#4A4A54]">
          Access your orders, wishlist, and personalized recommendations.
        </p>
      </div>

      <form class="space-y-4" @submit.prevent="handleSubmit">
        <div class="space-y-1">
          <label class="block text-[11px] font-medium text-[#4A4A54]">Email</label>
          <input
            v-model="email"
            type="email"
            class="w-full rounded-xl border border-[#E4E4EC] bg-[#FAF7F3] px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#6B1238] focus:ring-2 focus:ring-[#F3DEC0]"
            placeholder="you@example.com"
          />
        </div>

        <div class="space-y-1">
          <label class="block text-[11px] font-medium text-[#4A4A54]">Password</label>
          <input
            v-model="password"
            type="password"
            class="w-full rounded-xl border border-[#E4E4EC] bg-[#FAF7F3] px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#6B1238] focus:ring-2 focus:ring-[#F3DEC0]"
            placeholder="••••••••"
          />
        </div>

        <div class="flex items-center justify-between text-[11px] sm:text-xs text-[#4A4A54]">
          <label class="inline-flex items-center gap-2">
            <input
              v-model="remember"
              type="checkbox"
              class="h-3.5 w-3.5 rounded border-[#E4E4EC] text-[#6B1238] focus:ring-[#6B1238]"
            />
            <span>Keep me signed in</span>
          </label>

          <NuxtLink to="/forgot-password" class="font-medium text-[#6B1238] hover:underline">
            Forgot password?
          </NuxtLink>
        </div>

        <p v-if="error" class="text-[11px] sm:text-xs text-[#B42318]">
          {{ error }}
        </p>

        <button
          type="submit"
          class="w-full inline-flex items-center justify-center rounded-full bg-[#6B1238] text-white px-4 py-2.5 text-sm font-semibold hover:bg-[#8E1E3A] disabled:opacity-60 disabled:cursor-not-allowed"
          :disabled="loading"
        >
          <span v-if="!loading">Sign in</span>
          <span v-else>Signing you in...</span>
        </button>
      </form>

      <div class="mt-3 text-center text-[11px] sm:text-xs text-[#4A4A54]">
        <button
          type="button"
          class="inline-flex items-center justify-center rounded-full border border-[#E4E4EC] bg-white px-3 py-1.5 text-[11px] sm:text-xs font-medium text-[#4A4A54] hover:border-[#6B1238] hover:text-[#6B1238]"
          @click="router.push('/catalog')"
        >
          Continue as guest
        </button>
      </div>

      <p class="mt-4 text-center text-[11px] sm:text-xs text-[#4A4A54]">
        New to WineHub?
        <NuxtLink to="/register" class="font-semibold text-[#6B1238] hover:underline">Create an account</NuxtLink>
      </p>
    </div>
  </div>
</template>
