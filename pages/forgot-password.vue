<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const submitted = ref(false)
const error = ref('')

const handleSubmit = () => {
  if (!email.value) {
    error.value = 'Please enter your email address.'
    return
  }

  error.value = ''
  submitted.value = true
}
</script>

<template>
  <div class="min-h-screen bg-[#FAF7F3] text-[#111118] flex items-center justify-center px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-md bg-white border border-[#E4E4EC] rounded-2xl px-5 py-6 sm:px-6 sm:py-7 shadow-sm">
      <div class="mb-5 text-center space-y-1">
        <p class="text-xs font-semibold tracking-[0.16em] uppercase text-[#A0A0AA]">Reset password</p>
        <h1 class="text-xl sm:text-2xl font-semibold">Forgot your password?</h1>
        <p class="text-xs sm:text-sm text-[#4A4A54]">
          Enter the email linked to your WineHub account and we’ll send you a reset link.
        </p>
      </div>

      <div v-if="!submitted" class="space-y-4">
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

          <p v-if="error" class="text-[11px] sm:text-xs text-[#B42318]">
            {{ error }}
          </p>

          <button
            type="submit"
            class="w-full inline-flex items-center justify-center rounded-full bg-[#6B1238] text-white px-4 py-2.5 text-sm font-semibold hover:bg-[#8E1E3A]"
          >
            Send reset link
          </button>
        </form>

        <p class="text-center text-[11px] sm:text-xs text-[#4A4A54]">
          Remembered it?
          <NuxtLink to="/login" class="font-semibold text-[#6B1238] hover:underline">Back to sign in</NuxtLink>
        </p>
      </div>

      <div v-else class="space-y-4 text-center">
        <h2 class="text-sm sm:text-base font-semibold">Check your inbox</h2>
        <p class="text-xs sm:text-sm text-[#4A4A54]">
          If an account exists for <span class="font-medium">{{ email }}</span>, you’ll receive a password reset link shortly.
        </p>
        <NuxtLink
          to="/login"
          class="inline-flex items-center justify-center rounded-full bg-[#6B1238] text-white px-4 py-2.5 text-sm font-semibold hover:bg-[#8E1E3A]"
        >
          Back to sign in
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
