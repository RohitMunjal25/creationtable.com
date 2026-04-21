export const siteIdentity = {
  code: process.env.NEXT_PUBLIC_SITE_CODE || 'xjex0s30s1',
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Creationtable',
  tagline: process.env.NEXT_PUBLIC_SITE_TAGLINE || 'PDF library + expert profiles',
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    'Browse curated PDFs and professional profiles on Creationtable—focused discovery without extra clutter.',
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || 'creationtable.com',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://creationtable.com',
  ogImage: process.env.NEXT_PUBLIC_SITE_OG_IMAGE || '/og-default.png',
  googleMapsEmbedApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY || 'AIzaSyBco7dIECu3rJWjP3J0MImnR_uxlbeqAe0',

} as const

export const defaultAuthorProfile = {
  name: siteIdentity.name,
  avatar: '/placeholder.svg?height=80&width=80',
} as const

