export const siteIdentity = {
  code: process.env.NEXT_PUBLIC_SITE_CODE || '6ynahtnp2u',
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Lakes For Ocean',
  tagline: process.env.NEXT_PUBLIC_SITE_TAGLINE || 'Visual profiles and image-led discovery',
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    'An image-first platform for galleries, creator profiles, and visually driven discovery.',
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || 'lakesforocean.com',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://lakesforocean.com',
  ogImage: process.env.NEXT_PUBLIC_SITE_OG_IMAGE || '/og-default.png',
  googleMapsEmbedApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY || 'AIzaSyBco7dIECu3rJWjP3J0MImnR_uxlbeqAe0',

} as const

export const defaultAuthorProfile = {
  name: siteIdentity.name,
  avatar: '/placeholder.svg?height=80&width=80',
} as const

