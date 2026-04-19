import type { SiteRecipe } from '@/design/factory/recipe-types'

export const SITE_RECIPE: SiteRecipe = {
  productFamily: 'visual',
  themePack: 'pinion-visual',
  homepageTemplate: 'image-profile-home',
  navbarTemplate: 'editorial-bar',
  footerTemplate: 'columns-footer',
  motionPack: 'minimal',
  primaryTask: 'image',
  enabledTasks: ['image', 'profile'],
  taskTemplates: { image: 'image-portfolio', profile: 'profile-creator' },
  manualOverrides: {
    navbar: false,
    footer: false,
    homePage: false,
    taskListPage: false,
    taskDetailPage: false,
    taskCard: false,
    contactPage: false,
    loginPage: false,
    registerPage: false,
  },
}
