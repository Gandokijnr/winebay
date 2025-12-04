<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const error = ref('')

const handleSubmit = () => {
  if (!name.value || !email.value || !password.value || !confirmPassword.value) {
    error.value = 'Please fill in all fields.'
    return
  }

  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match.'
    return
  }

  error.value = ''
  loading.value = true

  setTimeout(() => {
    loading.value = false
    router.push('/verify-email')
  }, 800)
}
</script>

<template>
  <div class="min-h-screen bg-[#FAF7F3] text-[#111118] flex items-center justify-center px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-md bg-white border border-[#E4E4EC] rounded-2xl px-5 py-6 sm:px-6 sm:py-7 shadow-sm">
      <div class="mb-5 text-center space-y-1">
        <p class="text-xs font-semibold tracking-[0.16em] uppercase text-[#A0A0AA]">Join WineHub</p>
        <h1 class="text-xl sm:text-2xl font-semibold">Create your account</h1>
        <p class="text-xs sm:text-sm text-[#4A4A54]">
          Save your details, track orders, and build your perfect cellar.
        </p>
      </div>

      <form class="space-y-4" @submit.prevent="handleSubmit">
        <div class="space-y-1">
          <label class="block text-[11px] font-medium text-[#4A4A54]">Full name</label>
          <input
            v-model="name"
            type="text"
            class="w-full rounded-xl border border-[#E4E4EC] bg-[#FAF7F3] px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#6B1238] focus:ring-2 focus:ring-[#F3DEC0]"
            placeholder="Jane Doe"
          />
        </div>

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
            placeholder="Create a password"
          />
        </div>

        <div class="space-y-1">
          <label class="block text-[11px] font-medium text-[#4A4A54]">Confirm password</label>
          <input
            v-model="confirmPassword"
            type="password"
            class="w-full rounded-xl border border-[#E4E4EC] bg-[#FAF7F3] px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#6B1238] focus:ring-2 focus:ring-[#F3DEC0]"
            placeholder="Repeat your password"
          />
        </div>

        <p v-if="error" class="text-[11px] sm:text-xs text-[#B42318]">
          {{ error }}
        </p>

        <button
          type="submit"
          class="w-full inline-flex items-center justify-center rounded-full bg-[#6B1238] text-white px-4 py-2.5 text-sm font-semibold hover:bg-[#8E1E3A] disabled:opacity-60 disabled:cursor-not-allowed"
          :disabled="loading"
        >
          <span v-if="!loading">Create account</span>
          <span v-else>Creating your account...</span>
        </button>
      </form>

      <p class="mt-4 text-center text-[11px] sm:text-xs text-[#4A4A54]">
        Already have an account?
        <NuxtLink to="/login" class="font-semibold text-[#6B1238] hover:underline">Sign in</NuxtLink>
      </p>
    </div>
  </div>
</template>
