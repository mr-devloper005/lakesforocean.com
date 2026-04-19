import type { TaskKey } from '@/lib/site-config'

export const siteContent = {
  navbar: {
    tagline: 'Image and profile platform',
  },
  footer: {
    tagline: 'Visual posts, creators, and discoverable profiles',
  },
  hero: {
    badge: 'Gallery & profiles',
    title: ['Image portfolios and profiles, presented with corporate clarity.'],
    description:
      'An image-first platform for galleries, creator profiles, and visually driven discovery.',
    primaryCta: {
      label: 'View gallery',
      href: '/images',
    },
    secondaryCta: {
      label: 'Explore profiles',
      href: '/profile',
    },
    searchPlaceholder: 'Search gallery posts, creators, and profiles',
    focusLabel: 'Focus',
    featureCardBadge: 'latest cover rotation',
    featureCardTitle: 'Latest posts shape the visual identity of the homepage.',
    featureCardDescription:
      'Recent images and stories stay at the center of the experience without changing any core platform behavior.',
  },
  home: {
    metadata: {
      title: 'Gallery and creator profiles',
      description:
        'Explore image-led portfolios and public profiles in a refined, corporate-visual presentation.',
      openGraphTitle: 'Gallery and creator profiles',
      openGraphDescription:
        'Discover visual posts and profiles with strong typography, generous spacing, and a gallery-first layout.',
      keywords: ['gallery', 'visual portfolio', 'creator profiles', 'image sharing'],
    },
    introBadge: 'About this site',
    introTitle: 'Built for imagery and identity—not generic feeds.',
    introParagraphs: [
      'The experience centers on large visual surfaces and trustworthy profile pages, similar to a consultancy-grade creative studio.',
      'Navigation stays minimal so scanning the gallery and opening profiles feels fast and intentional.',
      'Every section uses the same monochrome structure with disciplined gradient accents so the product feels bespoke, not templated.',
    ],
    sideBadge: 'Highlights',
    sidePoints: [
      'Gallery-first layout with masonry-style emphasis on photography and art direction.',
      'Profile cards that read like professional credentials, not social clutter.',
      'Lightweight motion and CSS-first interactions for strong performance.',
      'Responsive behavior from mobile to desktop without sacrificing hierarchy.',
    ],
    primaryLink: {
      label: 'Open gallery',
      href: '/images',
    },
    secondaryLink: {
      label: 'Browse profiles',
      href: '/profile',
    },
  },
  cta: {
    badge: 'Join the studio',
    title: 'Create a profile, publish imagery, and stay discoverable in one place.',
    description:
      'Sign in to manage your public profile and gallery posts with the same polished visual system visitors see on the site.',
    primaryCta: {
      label: 'Create account',
      href: '/register',
    },
    secondaryCta: {
      label: 'Contact us',
      href: '/contact',
    },
  },
  taskSectionHeading: 'Latest {label}',
  taskSectionDescriptionSuffix: 'Browse the newest posts in this section.',
} as const

export const taskPageMetadata: Record<Exclude<TaskKey, 'comment' | 'org' | 'social'>, { title: string; description: string }> = {
  article: {
    title: 'Articles and stories',
    description: 'Read articles, stories, guides, and long-form posts across topics and interests.',
  },
  listing: {
    title: 'Listings and discoverable pages',
    description: 'Explore listings, services, brands, and structured pages organized for easier browsing.',
  },
  classified: {
    title: 'Classifieds and announcements',
    description: 'Browse classifieds, offers, notices, and time-sensitive posts across categories.',
  },
  image: {
    title: 'Images and visual posts',
    description: 'Explore image-led posts, galleries, and visual stories from across the platform.',
  },
  profile: {
    title: 'Profiles and public pages',
    description: 'Discover public profiles, brand pages, and identity-focused posts in one place.',
  },
  sbm: {
    title: 'Curated links and saved resources',
    description: 'Browse useful links, saved references, and curated resources organized for discovery.',
  },
  pdf: {
    title: 'PDFs and downloadable resources',
    description: 'Open reports, documents, and downloadable resources shared across the platform.',
  },
}

export const taskIntroCopy: Record<
  TaskKey,
  { title: string; paragraphs: string[]; links: { label: string; href: string }[] }
> = {
  listing: {
    title: 'Listings, services, and structured pages',
    paragraphs: [
      'Explore listings, services, brands, and discoverable pages across categories. Each entry is organized to make browsing clearer and help visitors quickly understand what a post offers.',
      'Listings connect naturally with articles, images, resources, and other content types so supporting information stays easy to reach from the same platform.',
      'Browse by category to compare posts in context, discover related content, and move between formats without losing your place.',
    ],
    links: [
      { label: 'Read articles', href: '/articles' },
      { label: 'Explore classifieds', href: '/classifieds' },
      { label: 'View profiles', href: '/profile' },
    ],
  },
  article: {
    title: 'Articles, stories, and long-form reading',
    paragraphs: [
      'This section is built for stories, explainers, guides, and long-form reading across topics and interests.',
      'Articles connect with listings, images, resources, and other content types so deeper reading can lead naturally into related discovery.',
      'Use this section to browse thoughtful posts, revisit useful writing, and move into supporting content when you want more context.',
    ],
    links: [
      { label: 'Explore listings', href: '/listings' },
      { label: 'Open images', href: '/images' },
      { label: 'Browse resources', href: '/pdf' },
    ],
  },
  classified: {
    title: 'Classifieds, offers, and timely updates',
    paragraphs: [
      'Classified posts help surface offers, notices, deals, and time-sensitive opportunities in a faster-scanning format.',
      'They work well alongside articles, listings, and profiles, making it easier to connect short-term posts with more structured content.',
      'Browse by category to find announcements quickly, then continue into related sections when you need more detail.',
    ],
    links: [
      { label: 'Business listings', href: '/listings' },
      { label: 'Read articles', href: '/articles' },
      { label: 'View profiles', href: '/profile' },
    ],
  },
  image: {
    title: 'Image-led posts and visual stories',
    paragraphs: [
      'Images take the lead in this section through galleries, visual posts, and story-led content where imagery carries the experience.',
      'Open any tile for a focused detail view with minimal chrome so the work stays central.',
      'Browse recent uploads, then visit creator profiles to see more from the same source.',
    ],
    links: [
      { label: 'Browse gallery', href: '/images' },
      { label: 'View profiles', href: '/profile' },
    ],
  },
  profile: {
    title: 'Profiles, identities, and public pages',
    paragraphs: [
      'Profiles capture the identity behind a creator, studio, or brand and help visitors understand who is behind the imagery they explore.',
      'Each profile is structured for quick trust: name, focus areas, and visual highlights without noisy widgets.',
      'Browse profiles to find collaborators and creators, then return to the gallery for more visual discovery.',
    ],
    links: [
      { label: 'Open gallery', href: '/images' },
      { label: 'All profiles', href: '/profile' },
    ],
  },
  sbm: {
    title: 'Curated links and bookmarked resources',
    paragraphs: [
      'This section collects useful links, references, tools, and saved resources in a text-first browsing format.',
      'Bookmarks stay connected to the rest of the platform, making it easier to move from a saved link into related stories, listings, or resources.',
      'Use this section to organize helpful sources and discover connected content without leaving the broader site experience.',
    ],
    links: [
      { label: 'Browse articles', href: '/articles' },
      { label: 'Explore listings', href: '/listings' },
      { label: 'Open PDFs', href: '/pdf' },
    ],
  },
  pdf: {
    title: 'PDFs, documents, and downloadable files',
    paragraphs: [
      'The PDF library hosts reports, guides, downloadable files, and longer-form document resources that support reading and discovery.',
      'These resources work alongside stories, listings, and profiles, helping document-style content stay connected to the rest of the platform.',
      'Browse by category to find relevant files quickly, then continue into related sections when you want more context.',
    ],
    links: [
      { label: 'Read articles', href: '/articles' },
      { label: 'See listings', href: '/listings' },
      { label: 'Explore profiles', href: '/profile' },
    ],
  },
  social: {
    title: 'Short updates and community signals',
    paragraphs: [
      'Short updates add quick signals that keep activity flowing across the platform.',
      'They work well with stories, listings, and resources by helping visitors move from brief updates into deeper content.',
      'Use these posts as lightweight entry points into the broader site experience.',
    ],
    links: [
      { label: 'Open listings', href: '/listings' },
      { label: 'Read articles', href: '/articles' },
      { label: 'View PDFs', href: '/pdf' },
    ],
  },
  comment: {
    title: 'Comments and contextual responses',
    paragraphs: [
      'Comments surface responses connected directly to articles and help keep discussion close to the writing it belongs to.',
      'This layer adds perspective and reaction without needing a separate standalone content format.',
      'Use comments as supporting context beneath stories, then continue exploring related content from the same topic area.',
    ],
    links: [
      { label: 'Explore articles', href: '/articles' },
      { label: 'View listings', href: '/listings' },
      { label: 'See classifieds', href: '/classifieds' },
    ],
  },
  org: {
    title: 'Organizations, teams, and structured entities',
    paragraphs: [
      'Organization pages provide structured identity surfaces for teams, brands, communities, and agencies.',
      'Used with listings, stories, profiles, and resources, they help create stronger structure across the platform.',
      'Connect organization pages with related content to build a clearer and more unified site presence.',
    ],
    links: [
      { label: 'Business listings', href: '/listings' },
      { label: 'Read articles', href: '/articles' },
      { label: 'PDF library', href: '/pdf' },
    ],
  },
}
