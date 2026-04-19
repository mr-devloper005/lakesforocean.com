import type { SiteFactoryRecipe } from '@/design/factory/types'

export const SITE_FACTORY_RECIPE: SiteFactoryRecipe = {
  brandPack: 'editorial-luxe',
  navbar: 'editorial-bar',
  footer: 'columns-footer',
  homeLayout: 'image-profile-home',
  motionPack: 'minimal',
  primaryTask: 'image',
  enabledTasks: ['image', 'profile'],
  taskLayouts: {
    image: 'image-portfolio',
    profile: 'profile-creator',
  },
}
