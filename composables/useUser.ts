import { ref, computed } from 'vue'

export interface UserProfile {
  id: string
  name: string
  email: string
  phone: string
  createdAt: string
}

export interface UserAddress {
  id: number
  label: string
  recipientName: string
  phone: string
  line1: string
  line2?: string
  city: string
  state: string
  country: string
  postalCode?: string
  isDefault: boolean
}

export interface PaymentMethod {
  id: number
  type: 'card' | 'wallet'
  brand: string
  last4?: string
  expiry?: string
  label?: string
  isDefault: boolean
}

export interface AccountSettings {
  newsletter: boolean
  marketing: boolean
  language: string
  currency: string
}

export interface WishlistItem {
  id: number
  name: string
  region: string
  country: string
  price: number
  slug: string
  image: string
}

const profile = ref<UserProfile>({
  id: 'user-1',
  name: 'Ada WineHub',
  email: 'ada@example.com',
  phone: '+234 800 000 0000',
  createdAt: '2024-02-01T00:00:00.000Z'
})

const addresses = ref<UserAddress[]>([
  {
    id: 1,
    label: 'Home',
    recipientName: 'Ada WineHub',
    phone: '+234 800 000 0000',
    line1: '12 Wine Street',
    line2: 'Apartment 4B',
    city: 'Abuja',
    state: 'FCT',
    country: 'Nigeria',
    postalCode: '900108',
    isDefault: true
  },
  {
    id: 2,
    label: 'Office',
    recipientName: 'Ada WineHub',
    phone: '+234 800 000 0000',
    line1: '7 Vineyard Close',
    line2: 'Floor 3',
    city: 'Lagos',
    state: 'Lagos',
    country: 'Nigeria',
    postalCode: '100001',
    isDefault: false
  }
])

let nextAddressId = 3

const paymentMethods = ref<PaymentMethod[]>([
  {
    id: 1,
    type: 'card',
    brand: 'Visa',
    last4: '4242',
    expiry: '08/27',
    isDefault: true
  },
  {
    id: 2,
    type: 'wallet',
    brand: 'WineHub wallet',
    label: 'Credits balance',
    isDefault: false
  }
])

const wishlist = ref<WishlistItem[]>([
  {
    id: 1,
    name: 'Barolo Riserva Colline Nebbiole 2016',
    region: 'Piedmont',
    country: 'Italy',
    price: 59,
    slug: 'barolo-riserva-colline-nebbiole-2016',
    image:
      'https://images.pexels.com/photos/2148408/pexels-photo-2148408.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 2,
    name: 'Champagne Étoile Brut NV',
    region: 'Champagne',
    country: 'France',
    price: 39,
    slug: 'champagne-etoile-brut-nv',
    image:
      'https://images.pexels.com/photos/2903166/pexels-photo-2903166.jpeg?auto=compress&cs=tinysrgb&w=600'
  }
])

const settings = ref<AccountSettings>({
  newsletter: true,
  marketing: false,
  language: 'English',
  currency: 'EUR'
})

const defaultAddress = computed(() => {
  if (!addresses.value.length) return null
  return addresses.value.find((addr) => addr.isDefault) ?? addresses.value[0]
})

const addAddress = (payload: Omit<UserAddress, 'id' | 'isDefault'> & { isDefault?: boolean }) => {
  const id = nextAddressId++
  const isDefault = !!payload.isDefault

  if (isDefault) {
    addresses.value = addresses.value.map((addr) => ({ ...addr, isDefault: false }))
  }

  addresses.value.push({
    ...payload,
    id,
    isDefault
  })
}

const updateAddress = (id: number, updates: Partial<Omit<UserAddress, 'id'>>) => {
  const index = addresses.value.findIndex((addr) => addr.id === id)
  if (index === -1) return

  const updated = { ...addresses.value[index], ...updates }

  if (updated.isDefault) {
    addresses.value = addresses.value.map((addr, i) => ({ ...addr, isDefault: i === index }))
  } else {
    addresses.value[index] = updated
  }
}

const removeAddress = (id: number) => {
  const wasDefault = addresses.value.find((addr) => addr.id === id)?.isDefault
  addresses.value = addresses.value.filter((addr) => addr.id !== id)

  if (wasDefault && addresses.value.length) {
    addresses.value[0].isDefault = true
  }
}

const setDefaultAddress = (id: number) => {
  addresses.value = addresses.value.map((addr) => ({ ...addr, isDefault: addr.id === id }))
}

const setSettings = (updates: Partial<AccountSettings>) => {
  settings.value = { ...settings.value, ...updates }
}

export const useUser = () => {
  return {
    profile,
    addresses,
    defaultAddress,
    paymentMethods,
    wishlist,
    settings,
    addAddress,
    updateAddress,
    removeAddress,
    setDefaultAddress,
    setSettings
  }
}
