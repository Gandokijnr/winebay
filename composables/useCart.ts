import { ref, computed } from 'vue'

export type CartWine = {
  id: number
  name: string
  slug: string
  image: string
  price: number
}

export type CartItem = CartWine & {
  quantity: number
}

const cartItems = ref<CartItem[]>([])

export const useCart = () => {
  const items = cartItems

  const itemCount = computed(() =>
    items.value.reduce((total, item) => total + item.quantity, 0)
  )

  const subtotal = computed(() =>
    items.value.reduce((total, item) => total + item.price * item.quantity, 0)
  )

  const addWine = (wine: CartWine, quantity = 1) => {
    if (quantity <= 0) return

    const existing = items.value.find((item) => item.id === wine.id)
    if (existing) {
      existing.quantity += quantity
    } else {
      items.value.push({ ...wine, quantity })
    }
  }

  const setWineQuantity = (wineId: number, quantity: number) => {
    if (quantity <= 0) {
      removeWine(wineId)
      return
    }

    const existing = items.value.find((item) => item.id === wineId)
    if (existing) {
      existing.quantity = quantity
    }
  }

  const incrementWine = (wineId: number) => {
    const existing = items.value.find((item) => item.id === wineId)
    if (existing) {
      existing.quantity += 1
    }
  }

  const decrementWine = (wineId: number) => {
    const existing = items.value.find((item) => item.id === wineId)
    if (!existing) return

    if (existing.quantity <= 1) {
      removeWine(wineId)
    } else {
      existing.quantity -= 1
    }
  }

  const removeWine = (wineId: number) => {
    cartItems.value = items.value.filter((item) => item.id !== wineId)
  }

  const clear = () => {
    cartItems.value = []
  }

  return {
    items,
    itemCount,
    subtotal,
    addWine,
    setWineQuantity,
    incrementWine,
    decrementWine,
    removeWine,
    clear
  }
}
