export type WineType = 'red' | 'white' | 'rose' | 'sparkling' | 'dessert' | 'fortified'

export type CatalogSortOption = 'newest' | 'price_asc' | 'price_desc' | 'rating' | 'popularity'

export interface CatalogWine {
  id: number
  name: string
  slug: string
  image: string
  shortDescription: string
  country: string
  region: string
  type: WineType
  year: number
  brand: string
  flavorProfiles: string[]
  price: number
  oldPrice?: number
  rating: number
  reviews: number
  isNew?: boolean
  isLimited?: boolean
}

export interface WineDetail extends CatalogWine {
  description: string
  tastingNotes: string[]
  alcoholPercent: number
  grapeVariety: string
  bottleSize: string
  stockStatus: 'in_stock' | 'low_stock' | 'out_of_stock'
  deliveryEstimate: string
  images: string[]
  foodPairings: string[]
}

export interface CatalogFilters {
  priceMin: number | null
  priceMax: number | null
  types: WineType[]
  countries: string[]
  flavors: string[]
  brands: string[]
  ratingMin: number | null
  yearMin: number | null
  yearMax: number | null
}
