/**
 * Centralized Image Registry for GreenNest.
 *
 * To replace any image with your own photography later,
 * place files in `/public/images/` and update the paths below
 * (e.g., '/images/monstera.jpg').
 */

export const IMAGES = {
  heroJungle: '/src/assets/images/hero_indoor_jungle_1794929649136.jpg',
  tropicalBroadleaf: '/src/assets/images/tropical_broadleaf_plants_1794929650124.jpg',
  trailingFoliage: '/src/assets/images/trailing_foliage_plants_1794929650279.jpg',
  sculpturalSucculent: '/src/assets/images/sculptural_succulents_snake_1794929651043.jpg',
  floweringBloom: '/src/assets/images/flowering_houseplants_orchid_1794929651657.jpg',
  careTools: '/src/assets/images/botanical_care_tools_1794929651292.jpg',
} as const;

export type ImageKey = keyof typeof IMAGES;

export const PLANT_IMAGE_MAP: Record<string, string> = {
  monstera: IMAGES.tropicalBroadleaf,
  pothos: IMAGES.trailingFoliage,
  'snake-plant': IMAGES.sculpturalSucculent,
  'zz-plant': IMAGES.sculpturalSucculent,
  'peace-lily': IMAGES.floweringBloom,
  'aloe-vera': IMAGES.sculpturalSucculent,
  'spider-plant': IMAGES.trailingFoliage,
  'fiddle-leaf-fig': IMAGES.heroJungle,
  'rubber-plant': IMAGES.tropicalBroadleaf,
  orchid: IMAGES.floweringBloom,
  cactus: IMAGES.sculpturalSucculent,
  echeveria: IMAGES.sculpturalSucculent,
  'ficus-benjamina': IMAGES.heroJungle,
  calathea: IMAGES.tropicalBroadleaf,
  'boston-fern': IMAGES.trailingFoliage,
  philodendron: IMAGES.tropicalBroadleaf,
  dracaena: IMAGES.sculpturalSucculent,
  'jade-plant': IMAGES.sculpturalSucculent,
  'english-ivy': IMAGES.trailingFoliage,
  anthurium: IMAGES.floweringBloom,
  begonia: IMAGES.floweringBloom,
  'chinese-evergreen': IMAGES.tropicalBroadleaf,
  'money-tree': IMAGES.heroJungle,
  'lucky-bamboo': IMAGES.sculpturalSucculent,
};

export function getPlantImage(slug: string, fallbackKey: ImageKey = 'tropicalBroadleaf'): string {
  return PLANT_IMAGE_MAP[slug] || IMAGES[fallbackKey];
}
