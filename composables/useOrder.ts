import { ref } from 'vue'
import type { CartItem } from '~/composables/useCart'

export type OrderDeliveryOption = 'standard' | 'express'
export type OrderPaymentMethod = 'card' | 'cod' | 'wallet'
export type OrderStatus = 'pending' | 'shipped' | 'delivered'

export interface OrderSummary {
  id: string
  items: CartItem[]
  subtotal: number
  deliveryFee: number
  total: number
  deliveryOption: OrderDeliveryOption
  estimatedDeliveryText: string
  placedAt: string
  contactName: string
  contactPhone: string
  address: string
  paymentMethod: OrderPaymentMethod
  status: OrderStatus
}

const lastOrder = ref<OrderSummary | null>(null)
const orders = ref<OrderSummary[]>([])

const generateOrderId = () => {
  const base = Date.now().toString(36).toUpperCase()
  return `WH-${base}`
}

export const useOrder = () => {
  const setLastOrder = (order: Omit<OrderSummary, 'id' | 'placedAt' | 'status'>) => {
    const summary: OrderSummary = {
      ...order,
      id: generateOrderId(),
      placedAt: new Date().toISOString(),
      status: 'pending'
    }

    lastOrder.value = summary
    orders.value = [summary, ...orders.value]

    setTimeout(() => {
      const target = orders.value.find((o) => o.id === summary.id)
      if (target && target.status === 'pending') {
        target.status = 'shipped'
        if (lastOrder.value && lastOrder.value.id === summary.id) {
          lastOrder.value = { ...lastOrder.value, status: 'shipped' }
        }
      }
    }, 15000)
  }

  return {
    lastOrder,
    orders,
    setLastOrder
  }
}
