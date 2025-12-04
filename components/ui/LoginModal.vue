<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseModal from './BaseModal.vue'
import BaseButton from './BaseButton.vue'

const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submit', payload: { email: string; password: string }): void
}>()

const router = useRouter()

const email = ref('')
const password = ref('')

const signupName = ref('')
const signupEmail = ref('')
const signupPassword = ref('')
const signupConfirmPassword = ref('')
const signupError = ref('')
const signupLoading = ref(false)

const mode = ref<'login' | 'signup'>('login')

const handleSubmit = () => {
  emit('submit', { email: email.value, password: password.value })
}

const handleSignupSubmit = () => {
  if (!signupName.value || !signupEmail.value || !signupPassword.value || !signupConfirmPassword.value) {
    signupError.value = 'Please fill in all fields.'
    return
  }

  if (signupPassword.value !== signupConfirmPassword.value) {
    signupError.value = 'Passwords do not match.'
    return
  }

  signupError.value = ''
  signupLoading.value = true

  setTimeout(() => {
    signupLoading.value = false
    emit('close')
    router.push('/verify-email')
  }, 800)
}

const showLogin = () => {
  mode.value = 'login'
}

const showSignup = () => {
  mode.value = 'signup'
}

const handleClose = () => {
  mode.value = 'login'
  emit('close')
}
</script>

<template>
  <BaseModal
    :open="open"
    :title="mode === 'login' ? 'Sign in to WineBay' : 'Create your WineBay account'"
    description="Account"
    size="md"
    @close="handleClose"
  >
    <div v-if="mode === 'login'" class="space-y-4">
      <form class="space-y-3" @submit.prevent="handleSubmit">
        <div class="space-y-1">
          <label for="login-email" class="text-[11px] font-medium text-[#111118]">Email</label>
          <input
            id="login-email"
            v-model="email"
            type="email"
            required
            class="w-full rounded-full border border-[#E4E4EC] bg-[#FAF7F3] px-3 py-1.5 text-xs focus:outline-none focus:border-[#6B1238] focus:ring-1 focus:ring-[#F3DEC0]"
            placeholder="you@example.com"
          />
        </div>
        <div class="space-y-1">
          <label for="login-password" class="text-[11px] font-medium text-[#111118]">Password</label>
          <input
            id="login-password"
            v-model="password"
            type="password"
            required
            class="w-full rounded-full border border-[#E4E4EC] bg-[#FAF7F3] px-3 py-1.5 text-xs focus:outline-none focus:border-[#6B1238] focus:ring-1 focus:ring-[#F3DEC0]"
            placeholder="••••••••"
          />
        </div>
        <div class="flex items-center justify-between text-[11px]">
          <label class="inline-flex items-center gap-1">
            <input type="checkbox" class="h-3 w-3 rounded border-[#D4D4E0] text-[#6B1238] focus:ring-[#6B1238]" />
            <span class="text-[#4A4A54]">Remember me</span>
          </label>
          <button type="button" class="text-[#6B1238] hover:text-[#8E1E3A]">Forgot password?</button>
        </div>
        <div class="flex flex-col gap-2 mt-2">
          <BaseButton type="submit" variant="primary" size="md" fullWidth>
            Continue
          </BaseButton>
          <p class="text-[11px] text-[#A0A0AA] text-center">
            By continuing, you agree to WineBay's Terms and Privacy Policy.
          </p>
        </div>
      </form>
      <div class="border-t border-[#F1F1F5] pt-3 text-[11px] text-[#4A4A54] text-center">
        <span>New to WineBay?</span>
        <button
          type="button"
          class="ml-1 text-[#6B1238] hover:text-[#8E1E3A] font-medium"
          @click="showSignup"
        >
          Create an account
        </button>
      </div>
    </div>
    <div v-else class="space-y-4">
      <div class="space-y-3">
        <h3 class="text-[11px] font-semibold text-[#111118]">Create your account</h3>
        <form class="space-y-3" @submit.prevent="handleSignupSubmit">
          <div class="space-y-1">
            <label for="signup-name" class="text-[11px] font-medium text-[#111118]">Full name</label>
            <input
              id="signup-name"
              v-model="signupName"
              type="text"
              class="w-full rounded-full border border-[#E4E4EC] bg-[#FAF7F3] px-3 py-1.5 text-xs focus:outline-none focus:border-[#6B1238] focus:ring-1 focus:ring-[#F3DEC0]"
              placeholder="Jane Doe"
            />
          </div>
          <div class="space-y-1">
            <label for="signup-email" class="text-[11px] font-medium text-[#111118]">Email</label>
            <input
              id="signup-email"
              v-model="signupEmail"
              type="email"
              class="w-full rounded-full border border-[#E4E4EC] bg-[#FAF7F3] px-3 py-1.5 text-xs focus:outline-none focus:border-[#6B1238] focus:ring-1 focus:ring-[#F3DEC0]"
              placeholder="you@example.com"
            />
          </div>
          <div class="space-y-1">
            <label for="signup-password" class="text-[11px] font-medium text-[#111118]">Password</label>
            <input
              id="signup-password"
              v-model="signupPassword"
              type="password"
              class="w-full rounded-full border border-[#E4E4EC] bg-[#FAF7F3] px-3 py-1.5 text-xs focus:outline-none focus:border-[#6B1238] focus:ring-1 focus:ring-[#F3DEC0]"
              placeholder="Create a password"
            />
          </div>
          <div class="space-y-1">
            <label for="signup-confirm-password" class="text-[11px] font-medium text-[#111118]">Confirm password</label>
            <input
              id="signup-confirm-password"
              v-model="signupConfirmPassword"
              type="password"
              class="w-full rounded-full border border-[#E4E4EC] bg-[#FAF7F3] px-3 py-1.5 text-xs focus:outline-none focus:border-[#6B1238] focus:ring-1 focus:ring-[#F3DEC0]"
              placeholder="Repeat your password"
            />
          </div>
          <p v-if="signupError" class="text-[11px] text-[#B42318]">
            {{ signupError }}
          </p>
          <BaseButton type="submit" variant="secondary" size="md" fullWidth :disabled="signupLoading">
            <span v-if="!signupLoading">Create an account</span>
            <span v-else>Creating your account...</span>
          </BaseButton>
        </form>
        <p class="text-[11px] text-center text-[#4A4A54]">
          Already have an account?
          <button
            type="button"
            class="ml-1 text-[#6B1238] hover:text-[#8E1E3A] font-medium"
            @click="showLogin"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  </BaseModal>
</template>
