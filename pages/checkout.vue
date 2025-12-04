<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCart } from '~/composables/useCart'
import { useOrder } from '~/composables/useOrder'
import BaseButton from '~/components/ui/BaseButton.vue'

const router = useRouter()
const { items, subtotal, clear } = useCart()
const { setLastOrder } = useOrder()

const currentStep = ref<1 | 2 | 3>(1)

const deliveryForm = ref({
  fullName: '',
  phone: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  postalCode: '',
  deliveryOption: 'standard' as 'standard' | 'express'
})

const paymentMethod = ref<'card' | 'cod' | 'wallet'>('card')

const cardForm = ref({
  cardName: '',
  cardNumber: '',
  expiry: '',
  cvv: ''
})

const errors = ref<string[]>([])
const orderPlaced = ref(false)

const hasItems = computed(() => items.value.length > 0)

const deliveryFee = computed(() => {
  if (!hasItems.value) return 0
  if (deliveryForm.value.deliveryOption === 'express') return 25
  return subtotal.value >= 150 ? 0 : 12
})

const total = computed(() => subtotal.value + deliveryFee.value)

const goToStep = (step: 1 | 2 | 3) => {
  if (!hasItems.value) return
  currentStep.value = step
}

const validateDeliveryStep = () => {
  errors.value = []
  const { fullName, phone, addressLine1, city } = deliveryForm.value

  if (!fullName.trim()) errors.value.push('Name is required.')
  if (!phone.trim()) errors.value.push('Phone number is required.')
  if (!addressLine1.trim()) errors.value.push('Address is required.')
  if (!city.trim()) errors.value.push('City is required.')

  return errors.value.length === 0
}

const validatePaymentStep = () => {
  errors.value = []

  if (paymentMethod.value === 'card') {
    if (!cardForm.value.cardName.trim()) errors.value.push('Cardholder name is required.')
    if (!cardForm.value.cardNumber.trim()) errors.value.push('Card number is required.')
    if (!cardForm.value.expiry.trim()) errors.value.push('Expiry date is required.')
    if (!cardForm.value.cvv.trim()) errors.value.push('Security code is required.')
  }

  return errors.value.length === 0
}

const handleNextFromDelivery = () => {
  if (!validateDeliveryStep()) return
  currentStep.value = 2
}

const handleNextFromPayment = () => {
  if (!validatePaymentStep()) return
  currentStep.value = 3
}

const placeOrder = () => {
  if (!hasItems.value || orderPlaced.value) return

  const currentItems = items.value.map((item) => ({ ...item }))

  const addressParts = [
    deliveryForm.value.addressLine1,
    deliveryForm.value.addressLine2,
    deliveryForm.value.city,
    deliveryForm.value.state,
    deliveryForm.value.postalCode
  ].filter((part) => part && part.trim().length > 0)

  const estimatedDeliveryText =
    deliveryForm.value.deliveryOption === 'express'
      ? 'Estimated delivery: 1–2 working days'
      : 'Estimated delivery: 3–6 working days'

  setLastOrder({
    items: currentItems,
    subtotal: subtotal.value,
    deliveryFee: deliveryFee.value,
    total: total.value,
    deliveryOption: deliveryForm.value.deliveryOption,
    estimatedDeliveryText,
    contactName: deliveryForm.value.fullName,
    contactPhone: deliveryForm.value.phone,
    address: addressParts.join(', '),
    paymentMethod: paymentMethod.value
  })

  orderPlaced.value = true
  clear()
  router.push('/order-confirmation')
}

const handleBackToCart = () => {
  router.push('/cart')
}
</script>

<template>
  <div class="min-h-screen bg-[#FAF7F3] text-[#111118]">
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <header class="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 class="text-xl sm:text-2xl font-semibold mb-1">Checkout</h1>
          <p class="text-sm text-[#4A4A54]">
            A fast, clean checkout to confirm your delivery details, payment, and order summary.
          </p>
        </div>
        <BaseButton variant="secondary" size="sm" @click="handleBackToCart">
          Back to cart
        </BaseButton>
      </header>

      <div v-if="!hasItems && !orderPlaced" class="py-16 text-center text-sm text-[#4A4A54]">
        <p class="mb-3">Your cart is empty. Add some wines before checking out.</p>
        <NuxtLink to="/catalog">
          <BaseButton variant="primary" size="md">
            Browse wines
          </BaseButton>
        </NuxtLink>
      </div>

      <div v-else class="grid lg:grid-cols-[minmax(0,1.5fr)_minmax(0,0.9fr)] gap-6 lg:gap-8 items-start">
        <section class="space-y-4">
          <!-- Step indicator -->
          <ol class="flex items-center gap-3 text-xs sm:text-sm mb-2">
            <li
              class="flex items-center gap-2 cursor-pointer"
              :class="currentStep >= 1 ? 'text-[#111118]' : 'text-[#A0A0AA]'"
              @click="goToStep(1)"
            >
              <span
                class="inline-flex h-6 w-6 items-center justify-center rounded-full border text-[11px] font-semibold"
                :class="currentStep >= 1 ? 'border-[#6B1238] bg-[#6B1238] text-white' : 'border-[#E4E4EC] bg-white'"
              >
                1
              </span>
              <span>Delivery details</span>
            </li>
            <span class="h-px flex-1 bg-[#E4E4EC]"></span>
            <li
              class="flex items-center gap-2 cursor-pointer"
              :class="currentStep >= 2 ? 'text-[#111118]' : 'text-[#A0A0AA]'"
              @click="currentStep > 1 && goToStep(2)"
            >
              <span
                class="inline-flex h-6 w-6 items-center justify-center rounded-full border text-[11px] font-semibold"
                :class="currentStep >= 2 ? 'border-[#6B1238] bg-[#6B1238] text-white' : 'border-[#E4E4EC] bg-white'"
              >
                2
              </span>
              <span>Payment</span>
            </li>
            <span class="h-px flex-1 bg-[#E4E4EC]"></span>
            <li
              class="flex items-center gap-2 cursor-pointer"
              :class="currentStep === 3 ? 'text-[#111118]' : 'text-[#A0A0AA]'"
              @click="currentStep === 3 && goToStep(3)"
            >
              <span
                class="inline-flex h-6 w-6 items-center justify-center rounded-full border text-[11px] font-semibold"
                :class="currentStep === 3 ? 'border-[#6B1238] bg-[#6B1238] text-white' : 'border-[#E4E4EC] bg-white'"
              >
                3
              </span>
              <span>Summary</span>
            </li>
          </ol>

          <!-- Errors -->
          <div v-if="errors.length" class="rounded-2xl border border-[#F97373] bg-[#FEF2F2] px-3 py-2.5 text-[11px] text-[#7F1D1D]">
            <p class="font-semibold mb-1">Please check the following:</p>
            <ul class="list-disc list-inside space-y-0.5">
              <li v-for="err in errors" :key="err">{{ err }}</li>
            </ul>
          </div>

          <!-- Step 1: Delivery details -->
          <section
            v-if="currentStep === 1"
            class="bg-white rounded-2xl border border-[#E4E4EC] p-4 sm:p-5 space-y-4 text-sm text-[#111118]"
          >
            <header>
              <h2 class="text-sm sm:text-base font-semibold mb-1">Step 1 · Delivery details</h2>
              <p class="text-xs text-[#4A4A54]">
                Enter the delivery contact and address where we should send your wines.
              </p>
            </header>

            <div class="grid sm:grid-cols-2 gap-3">
              <div class="space-y-1">
                <label class="block text-[11px] font-medium text-[#4A4A54]">Name</label>
                <input
                  v-model="deliveryForm.fullName"
                  type="text"
                  class="w-full rounded-xl border border-[#E4E4EC] bg-[#FAF7F3] px-3 py-2 text-sm focus:outline-none focus:border-[#6B1238] focus:ring-2 focus:ring-[#F3DEC0]"
                  placeholder="Full name"
                />
              </div>
              <div class="space-y-1">
                <label class="block text-[11px] font-medium text-[#4A4A54]">Phone number</label>
                <input
                  v-model="deliveryForm.phone"
                  type="tel"
                  class="w-full rounded-xl border border-[#E4E4EC] bg-[#FAF7F3] px-3 py-2 text-sm focus:outline-none focus:border-[#6B1238] focus:ring-2 focus:ring-[#F3DEC0]"
                  placeholder="e.g. +234 ..."
                />
              </div>
            </div>

            <div class="space-y-1">
              <label class="block text-[11px] font-medium text-[#4A4A54]">Address</label>
              <input
                v-model="deliveryForm.addressLine1"
                type="text"
                class="w-full rounded-xl border border-[#E4E4EC] bg-[#FAF7F3] px-3 py-2 text-sm focus:outline-none focus:border-[#6B1238] focus:ring-2 focus:ring-[#F3DEC0]"
                placeholder="Street address, building, etc."
              />
              <p class="text-[11px] text-[#A0A0AA]">
                Address auto-completion can be connected later to your preferred maps API.
              </p>
            </div>

            <div class="grid sm:grid-cols-2 gap-3">
              <div class="space-y-1">
                <label class="block text-[11px] font-medium text-[#4A4A54]">Apartment / suite (optional)</label>
                <input
                  v-model="deliveryForm.addressLine2"
                  type="text"
                  class="w-full rounded-xl border border-[#E4E4EC] bg-[#FAF7F3] px-3 py-2 text-sm focus:outline-none focus:border-[#6B1238] focus:ring-2 focus:ring-[#F3DEC0]"
                  placeholder="Apartment, suite, etc."
                />
              </div>
              <div class="space-y-1">
                <label class="block text-[11px] font-medium text-[#4A4A54]">City</label>
                <input
                  v-model="deliveryForm.city"
                  type="text"
                  class="w-full rounded-xl border border-[#E4E4EC] bg-[#FAF7F3] px-3 py-2 text-sm focus:outline-none focus:border-[#6B1238] focus:ring-2 focus:ring-[#F3DEC0]"
                  placeholder="City"
                />
              </div>
            </div>

            <div class="grid sm:grid-cols-2 gap-3">
              <div class="space-y-1">
                <label class="block text-[11px] font-medium text-[#4A4A54]">State / region (optional)</label>
                <input
                  v-model="deliveryForm.state"
                  type="text"
                  class="w-full rounded-xl border border-[#E4E4EC] bg-[#FAF7F3] px-3 py-2 text-sm focus:outline-none focus:border-[#6B1238] focus:ring-2 focus:ring-[#F3DEC0]"
                  placeholder="State or region"
                />
              </div>
              <div class="space-y-1">
                <label class="block text-[11px] font-medium text-[#4A4A54]">Postal code (optional)</label>
                <input
                  v-model="deliveryForm.postalCode"
                  type="text"
                  class="w-full rounded-xl border border-[#E4E4EC] bg-[#FAF7F3] px-3 py-2 text-sm focus:outline-none focus:border-[#6B1238] focus:ring-2 focus:ring-[#F3DEC0]"
                  placeholder="Postal code"
                />
              </div>
            </div>

            <div class="space-y-2">
              <p class="text-[11px] font-medium text-[#4A4A54]">Delivery options</p>
              <div class="grid sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                <button
                  type="button"
                  class="flex flex-col items-start rounded-2xl border px-3 py-2 text-left"
                  :class="
                    deliveryForm.deliveryOption === 'standard'
                      ? 'border-[#6B1238] bg-[#F3DEC0] text-[#111118]'
                      : 'border-[#E4E4EC] bg-white text-[#4A4A54] hover:border-[#6B1238]'
                  "
                  @click="deliveryForm.deliveryOption = 'standard'"
                >
                  <span class="font-medium">Standard delivery</span>
                  <span class="text-[11px] text-[#4A4A54]">3–6 working days · from €12 or free over €150</span>
                </button>
                <button
                  type="button"
                  class="flex flex-col items-start rounded-2xl border px-3 py-2 text-left"
                  :class="
                    deliveryForm.deliveryOption === 'express'
                      ? 'border-[#6B1238] bg-[#F3DEC0] text-[#111118]'
                      : 'border-[#E4E4EC] bg-white text-[#4A4A54] hover:border-[#6B1238]'
                  "
                  @click="deliveryForm.deliveryOption = 'express'"
                >
                  <span class="font-medium">Express delivery</span>
                  <span class="text-[11px] text-[#4A4A54]">1–2 working days · from €25</span>
                </button>
              </div>
            </div>

            <div class="flex justify-end mt-2">
              <button
                type="button"
                class="inline-flex items-center justify-center rounded-full bg-[#6B1238] text-white px-5 py-2.5 text-sm font-semibold hover:bg-[#8E1E3A]"
                @click="handleNextFromDelivery"
              >
                Continue to payment
              </button>
            </div>
          </section>

          <!-- Step 2: Payment -->
          <section
            v-else-if="currentStep === 2"
            class="bg-white rounded-2xl border border-[#E4E4EC] p-4 sm:p-5 space-y-4 text-sm text-[#111118]"
          >
            <header>
              <h2 class="text-sm sm:text-base font-semibold mb-1">Step 2 · Payment</h2>
              <p class="text-xs text-[#4A4A54]">
                Choose how you would like to pay for this order.
              </p>
            </header>

            <div class="grid sm:grid-cols-3 gap-2 text-xs sm:text-sm">
              <button
                type="button"
                class="flex flex-col items-start rounded-2xl border px-3 py-2 text-left"
                :class="
                  paymentMethod === 'card'
                    ? 'border-[#6B1238] bg-[#F3DEC0] text-[#111118]'
                    : 'border-[#E4E4EC] bg-white text-[#4A4A54] hover:border-[#6B1238]'
                "
                @click="paymentMethod = 'card'"
              >
                <span class="font-medium">Card payment</span>
                <span class="text-[11px] text-[#4A4A54]">Visa, Mastercard &amp; major cards</span>
              </button>
              <button
                type="button"
                class="flex flex-col items-start rounded-2xl border px-3 py-2 text-left"
                :class="
                  paymentMethod === 'cod'
                    ? 'border-[#6B1238] bg-[#F3DEC0] text-[#111118]'
                    : 'border-[#E4E4EC] bg-white text-[#4A4A54] hover:border-[#6B1238]'
                "
                @click="paymentMethod = 'cod'"
              >
                <span class="font-medium">Pay on delivery</span>
                <span class="text-[11px] text-[#4A4A54]">Cash or POS on delivery (where allowed)</span>
              </button>
              <button
                type="button"
                class="flex flex-col items-start rounded-2xl border px-3 py-2 text-left"
                :class="
                  paymentMethod === 'wallet'
                    ? 'border-[#6B1238] bg-[#F3DEC0] text-[#111118]'
                    : 'border-[#E4E4EC] bg-white text-[#4A4A54] hover:border-[#6B1238]'
                "
                @click="paymentMethod = 'wallet'"
              >
                <span class="font-medium">Wallet / credits</span>
                <span class="text-[11px] text-[#4A4A54]">Use WineHub wallet or promo credits</span>
              </button>
            </div>

            <div v-if="paymentMethod === 'card'" class="space-y-3 mt-2">
              <div class="space-y-1">
                <label class="block text-[11px] font-medium text-[#4A4A54]">Name on card</label>
                <input
                  v-model="cardForm.cardName"
                  type="text"
                  class="w-full rounded-xl border border-[#E4E4EC] bg-[#FAF7F3] px-3 py-2 text-sm focus:outline-none focus:border-[#6B1238] focus:ring-2 focus:ring-[#F3DEC0]"
                />
              </div>
              <div class="space-y-1">
                <label class="block text-[11px] font-medium text-[#4A4A54]">Card number</label>
                <input
                  v-model="cardForm.cardNumber"
                  type="text"
                  inputmode="numeric"
                  class="w-full rounded-xl border border-[#E4E4EC] bg-[#FAF7F3] px-3 py-2 text-sm focus:outline-none focus:border-[#6B1238] focus:ring-2 focus:ring-[#F3DEC0]"
                  placeholder="XXXX XXXX XXXX XXXX"
                />
              </div>
              <div class="grid sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-3">
                <div class="space-y-1">
                  <label class="block text-[11px] font-medium text-[#4A4A54]">Expiry</label>
                  <input
                    v-model="cardForm.expiry"
                    type="text"
                    class="w-full rounded-xl border border-[#E4E4EC] bg-[#FAF7F3] px-3 py-2 text-sm focus:outline-none focus:border-[#6B1238] focus:ring-2 focus:ring-[#F3DEC0]"
                    placeholder="MM / YY"
                  />
                </div>
                <div class="space-y-1">
                  <label class="block text-[11px] font-medium text-[#4A4A54]">Security code</label>
                  <input
                    v-model="cardForm.cvv"
                    type="password"
                    inputmode="numeric"
                    maxlength="4"
                    class="w-full rounded-xl border border-[#E4E4EC] bg-[#FAF7F3] px-3 py-2 text-sm focus:outline-none focus:border-[#6B1238] focus:ring-2 focus:ring-[#F3DEC0]"
                    placeholder="CVV"
                  />
                </div>
              </div>
              <p class="text-[11px] text-[#A0A0AA]">
                Card details are processed securely. This demo does not charge real cards.
              </p>
            </div>

            <div v-else-if="paymentMethod === 'cod'" class="mt-2 text-xs text-[#4A4A54] space-y-1">
              <p>
                You will pay with cash or POS when your order is delivered. Please ensure your contact details and
                delivery address are correct.
              </p>
            </div>

            <div v-else class="mt-2 text-xs text-[#4A4A54] space-y-1">
              <p>
                Wallet and credits can be integrated with your payment provider. For now, this option behaves like
                a placeholder.
              </p>
            </div>

            <div class="flex items-center justify-between mt-3">
              <BaseButton variant="secondary" size="sm" @click="currentStep = 1">
                Back to delivery
              </BaseButton>
              <BaseButton variant="primary" size="md" @click="handleNextFromPayment">
                Continue to summary
              </BaseButton>
            </div>
          </section>

          <!-- Step 3: Summary -->
          <section
            v-else
            class="bg-white rounded-2xl border border-[#E4E4EC] p-4 sm:p-5 space-y-4 text-sm text-[#111118]"
          >
            <header class="flex flex-col gap-1">
              <h2 class="text-sm sm:text-base font-semibold">Step 3 · Order summary</h2>
              <p class="text-xs text-[#4A4A54]">
                Review your wines and confirm your order.
              </p>
              <p v-if="orderPlaced" class="text-xs font-medium text-emerald-600">
                Your order has been placed. A confirmation email would be sent to you in a live environment.
              </p>
            </header>

            <div class="divide-y divide-[#F1F1F5]">
              <article
                v-for="item in items"
                :key="item.id"
                class="py-3 flex items-center gap-3 sm:gap-4"
              >
                <div class="w-14 h-20 sm:w-16 sm:h-24 rounded-xl overflow-hidden bg-[#FAF7F3] flex-shrink-0 flex items-center justify-center">
                  <img :src="item.image" :alt="item.name" class="h-full w-full object-cover" />
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-xs sm:text-sm font-medium text-[#111118] line-clamp-2">
                    {{ item.name }}
                  </p>
                  <p class="text-[11px] text-[#4A4A54]">
                    {{ item.quantity }} × €{{ item.price.toFixed(2) }}
                  </p>
                </div>
                <div class="text-xs sm:text-sm font-semibold text-[#6B1238]">
                  €{{ (item.price * item.quantity).toFixed(2) }}
                </div>
              </article>
            </div>

            <div v-if="!items.length" class="text-[11px] text-[#4A4A54]">
              Your cart is now empty. This section would list the wines for your order.
            </div>

            <div class="flex items-center justify-between mt-3">
              <BaseButton variant="secondary" size="sm" @click="currentStep = 2">
                Back to payment
              </BaseButton>
              <BaseButton
                variant="primary"
                size="md"
                :disabled="orderPlaced || !hasItems"
                @click="placeOrder"
              >
                Place order
              </BaseButton>
            </div>
          </section>
        </section>

        <!-- Summary sidebar -->
        <aside class="space-y-3">
          <section class="bg-white rounded-2xl border border-[#E4E4EC] p-4 sm:p-5 space-y-3 text-sm text-[#111118]">
            <h2 class="text-sm sm:text-base font-semibold mb-1">Order summary</h2>
            <div class="flex items-center justify-between text-[13px] text-[#4A4A54]">
              <span>Items ({{ items.length }})</span>
              <span>€{{ subtotal.toFixed(2) }}</span>
            </div>
            <div class="flex items-center justify-between text-[13px] text-[#4A4A54]">
              <span>Delivery fee</span>
              <span>
                <span v-if="deliveryFee === 0">Free</span>
                <span v-else>€{{ deliveryFee.toFixed(2) }}</span>
              </span>
            </div>
            <div class="flex items-center justify-between pt-2 border-t border-[#F1F1F5] text-sm font-semibold">
              <span>Total</span>
              <span>€{{ total.toFixed(2) }}</span>
            </div>
            <p class="text-[11px] text-[#4A4A54]">
              Taxes and exact delivery fees may vary at final confirmation.
            </p>
          </section>
        </aside>
      </div>
    </main>
  </div>
</template>
