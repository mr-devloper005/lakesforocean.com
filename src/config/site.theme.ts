import { defineSiteTheme } from '@/config/site.theme.defaults'

export const SITE_THEME = defineSiteTheme({
  shell: 'editorial',
  hero: {
    variant: 'gallery-mosaic',
    eyebrow: 'Visual studio',
  },
  home: {
    layout: 'studio-showcase',
    primaryTask: 'image',
    featuredTaskKeys: ['image', 'profile'],
  },
  navigation: {
    variant: 'editorial',
  },
  footer: {
    variant: 'columns',
  },
  cards: {
    listing: 'listing-elevated',
    article: 'editorial-feature',
    image: 'editorial-feature',
    profile: 'editorial-feature',
    classified: 'catalog-grid',
    pdf: 'catalog-grid',
    sbm: 'editorial-feature',
    social: 'editorial-feature',
    org: 'catalog-grid',
    comment: 'editorial-feature',
  },
})
