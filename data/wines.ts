import type { WineDetail } from '~/types/catalog'

export const wineDetails: WineDetail[] = [
  {
    id: 1,
    name: 'Barolo Riserva Colline Nebbiole 2016',
    slug: 'barolo-riserva-colline-nebbiole-2016',
    image:
      'https://images.pexels.com/photos/2148408/pexels-photo-2148408.jpeg?auto=compress&cs=tinysrgb&w=600',
    shortDescription: 'Piedmont · Italy · Nebbiolo with dark cherry, tar and rose petal.',
    country: 'Italy',
    region: 'Piedmont',
    type: 'red',
    year: 2016,
    brand: 'Colline Nebbiole',
    flavorProfiles: ['Fruity', 'Earthy', 'Spicy'],
    price: 59,
    oldPrice: 78,
    rating: 4.9,
    reviews: 87,
    isLimited: true,
    description:
      'A structured, cellar-worthy Barolo from old Nebbiolo vines, showing layers of dark cherry, tar, rose petal and licorice with a long, savory finish.',
    tastingNotes: ['Dark cherry', 'Tar', 'Rose petal', 'Licorice', 'Dried herbs'],
    alcoholPercent: 14.5,
    grapeVariety: 'Nebbiolo',
    bottleSize: '750ml',
    stockStatus: 'in_stock',
    deliveryEstimate: 'Delivers to Abuja in 3–6 working days with temperature-controlled shipping.',
    images: [
      'https://images.pexels.com/photos/2148408/pexels-photo-2148408.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2148408/pexels-photo-2148408.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/2148408/pexels-photo-2148408.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    foodPairings: ['Braised beef', 'Truffle risotto', 'Aged hard cheeses']
  },
  {
    id: 2,
    name: 'Chablis Premier Cru Côte d’Or 2021',
    slug: 'chablis-premier-cru-cote-dor-2021',
    image:
      'https://images.pexels.com/photos/2903164/pexels-photo-2903164.jpeg?auto=compress&cs=tinysrgb&w=600',
    shortDescription: 'Burgundy · France · Chardonnay with saline, citrus and chalky minerality.',
    country: 'France',
    region: 'Burgundy',
    type: 'white',
    year: 2021,
    brand: 'Domaine Côte d’Or',
    flavorProfiles: ['Mineral', 'Citrus', 'Fresh'],
    price: 32,
    oldPrice: 40,
    rating: 4.6,
    reviews: 54,
    isNew: true,
    description:
      'Precise, mineral-driven Chablis Premier Cru with notes of lemon zest, green apple and wet stone, finishing with mouthwatering acidity.',
    tastingNotes: ['Lemon zest', 'Green apple', 'Chalky minerality', 'Sea spray'],
    alcoholPercent: 13,
    grapeVariety: 'Chardonnay',
    bottleSize: '750ml',
    stockStatus: 'in_stock',
    deliveryEstimate: 'Delivers to Abuja in 4–7 working days.',
    images: [
      'https://images.pexels.com/photos/2903164/pexels-photo-2903164.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2903164/pexels-photo-2903164.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/2903164/pexels-photo-2903164.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    foodPairings: ['Oysters', 'Grilled sea bass', 'Goat cheese']
  },
  {
    id: 3,
    name: 'Ribera del Duero Reserva Sol y Piedra 2018',
    slug: 'ribera-del-duero-reserva-sol-y-piedra-2018',
    image:
      'https://images.pexels.com/photos/6947226/pexels-photo-6947226.jpeg?auto=compress&cs=tinysrgb&w=600',
    shortDescription: 'Castilla y León · Spain · Tempranillo with dark fruit and spice.',
    country: 'Spain',
    region: 'Ribera del Duero',
    type: 'red',
    year: 2018,
    brand: 'Sol y Piedra',
    flavorProfiles: ['Spicy', 'Fruity', 'Oak'],
    price: 42,
    oldPrice: 55,
    rating: 4.8,
    reviews: 63,
    description:
      'Rich and concentrated Tempranillo aged in oak, showing blackberries, plum, vanilla and sweet spice with polished tannins.',
    tastingNotes: ['Blackberry', 'Plum', 'Vanilla', 'Sweet spice'],
    alcoholPercent: 14,
    grapeVariety: 'Tempranillo',
    bottleSize: '750ml',
    stockStatus: 'low_stock',
    deliveryEstimate: 'Delivers to Abuja in 3–5 working days.',
    images: [
      'https://images.pexels.com/photos/6947226/pexels-photo-6947226.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/6947226/pexels-photo-6947226.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/6947226/pexels-photo-6947226.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    foodPairings: ['Grilled lamb', 'BBQ ribs', 'Manchego cheese']
  },
  {
    id: 4,
    name: 'Marlborough Sauvignon Blanc Misty Vines 2023',
    slug: 'marlborough-sauvignon-blanc-misty-vines-2023',
    image:
      'https://images.pexels.com/photos/1407851/pexels-photo-1407851.jpeg?auto=compress&cs=tinysrgb&w=600',
    shortDescription: 'Marlborough · New Zealand · Sauvignon Blanc, zesty and aromatic.',
    country: 'New Zealand',
    region: 'Marlborough',
    type: 'white',
    year: 2023,
    brand: 'Misty Vines',
    flavorProfiles: ['Fruity', 'Herbal', 'Fresh'],
    price: 21,
    oldPrice: 27,
    rating: 4.4,
    reviews: 41,
    isNew: true,
    description:
      'Vibrant Marlborough Sauvignon with notes of passion fruit, lime and fresh-cut herbs, finishing crisp and refreshing.',
    tastingNotes: ['Passion fruit', 'Lime', 'Fresh herbs', 'Gooseberry'],
    alcoholPercent: 12.5,
    grapeVariety: 'Sauvignon Blanc',
    bottleSize: '750ml',
    stockStatus: 'in_stock',
    deliveryEstimate: 'Delivers to Abuja in 3–6 working days.',
    images: [
      'https://images.pexels.com/photos/1407851/pexels-photo-1407851.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1407851/pexels-photo-1407851.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1407851/pexels-photo-1407851.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    foodPairings: ['Fresh salads', 'Goat cheese tart', 'Grilled prawns']
  },
  {
    id: 5,
    name: 'Champagne Étoile Brut NV',
    slug: 'champagne-etoile-brut-nv',
    image:
      'https://images.pexels.com/photos/2903166/pexels-photo-2903166.jpeg?auto=compress&cs=tinysrgb&w=600',
    shortDescription: 'Champagne · France · Classic blend with fine mousse and brioche.',
    country: 'France',
    region: 'Champagne',
    type: 'sparkling',
    year: 2020,
    brand: 'Maison Étoile',
    flavorProfiles: ['Yeasty', 'Citrus', 'Elegant'],
    price: 39,
    oldPrice: 52,
    rating: 4.7,
    reviews: 112,
    description:
      'Elegant non-vintage Champagne with a fine mousse, aromas of brioche and citrus, and a long, creamy finish.',
    tastingNotes: ['Brioche', 'Lemon peel', 'Green apple', 'Almond'],
    alcoholPercent: 12,
    grapeVariety: 'Chardonnay, Pinot Noir, Pinot Meunier',
    bottleSize: '750ml',
    stockStatus: 'in_stock',
    deliveryEstimate: 'Delivers to Abuja in 5–8 working days.',
    images: [
      'https://images.pexels.com/photos/2903166/pexels-photo-2903166.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2903166/pexels-photo-2903166.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/2903166/pexels-photo-2903166.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    foodPairings: ['Canapés', 'Fresh oysters', 'Sushi']
  },
  {
    id: 6,
    name: 'Côtes du Rhône Rouge Vieilles Vignes 2020',
    slug: 'cotes-du-rhone-rouge-vieilles-vignes-2020',
    image:
      'https://images.pexels.com/photos/4664337/pexels-photo-4664337.jpeg?auto=compress&cs=tinysrgb&w=600',
    shortDescription: 'Rhône · France · Old-vine Grenache blend with black fruit and spice.',
    country: 'France',
    region: 'Rhône',
    type: 'red',
    year: 2020,
    brand: 'Domaine des Roches',
    flavorProfiles: ['Spicy', 'Fruity'],
    price: 24,
    oldPrice: 30,
    rating: 4.5,
    reviews: 52,
    description:
      'Supple, fruit-forward Côtes du Rhône from old vines, offering black cherry, pepper and garrigue notes with smooth tannins.',
    tastingNotes: ['Black cherry', 'Pepper', 'Garrigue herbs'],
    alcoholPercent: 14,
    grapeVariety: 'Grenache, Syrah, Mourvèdre',
    bottleSize: '750ml',
    stockStatus: 'in_stock',
    deliveryEstimate: 'Delivers to Abuja in 4–7 working days.',
    images: [
      'https://images.pexels.com/photos/4664337/pexels-photo-4664337.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/4664337/pexels-photo-4664337.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/4664337/pexels-photo-4664337.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    foodPairings: ['Charcuterie', 'Roast chicken', 'Grilled vegetables']
  }
]
