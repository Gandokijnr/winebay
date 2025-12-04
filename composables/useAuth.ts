import { useState } from '#app'
import { computed } from 'vue'

export const useAuth = () => {
  const authState = useState<boolean>('auth:isAuthenticated', () => false)

  const login = () => {
    authState.value = true
  }

  const logout = () => {
    authState.value = false
  }

  const isAuthenticated = computed(() => authState.value)

  return {
    isAuthenticated,
    login,
    logout
  }
}
