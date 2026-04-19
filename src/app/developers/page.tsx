import type { Metadata } from 'next'
import Link from 'next/link'
import { MarketingInteriorLayout, marketingInteriorCard, marketingInteriorMutedPanel } from '@/components/shared/marketing-interior-layout'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { buildPageMetadata } from '@/lib/seo'
import { SITE_CONFIG } from '@/lib/site-config'
import { BookOpen, Braces, Webhook } from 'lucide-react'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/developers',
    title: `Developers — ${SITE_CONFIG.name}`,
    description: 'Documentation hooks, integration patterns, and support channels for teams extending the gallery and profile platform.',
    openGraphTitle: `Developers — ${SITE_CONFIG.name}`,
    openGraphDescription: 'Extend gallery and profile experiences with clear integration guidance.',
  })
}

const resources = [
  {
    title: 'Content model',
    body: 'Understand how gallery posts, media payloads, and profile fields map to public routes and structured data.',
    icon: BookOpen,
  },
  {
    title: 'Embeds & components',
    body: 'Drop-in patterns for hero imagery, profile cards, and responsive grids that inherit the Pinion visual system.',
    icon: Braces,
  },
  {
    title: 'Webhooks & automation',
    body: 'Wire publishing workflows to your DAM or CRM with signed callbacks and idempotent handlers.',
    icon: Webhook,
  },
]

export default function DevelopersPage() {
  return (
    <MarketingInteriorLayout
      kicker="Developers"
      title="Build on a visual platform"
      description="Integrate with gallery feeds, profile data, and publishing flows—documented for product engineers and creative technologists."
      actions={
        <>
          <Button asChild className="bg-[#003366] text-white hover:bg-[#005DAA]">
            <Link href="/contact">Request API access</Link>
          </Button>
          <Button variant="outline" asChild className="border-neutral-200 bg-white">
            <Link href="/help">Read guides</Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {resources.map((item) => (
          <Card key={item.title} className={`${marketingInteriorCard} border-t-4 border-t-[#00A8C6]/80`}>
            <CardContent className="p-6 sm:p-8">
              <item.icon className="h-5 w-5 text-[#005DAA]" />
              <h2 className="mt-4 text-lg font-semibold text-neutral-950">{item.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">{item.body}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className={`mt-10 rounded-[var(--radius)] p-6 sm:p-8 ${marketingInteriorMutedPanel}`}>
        <p className="text-sm leading-relaxed text-neutral-700">
          Need a partner review before launch? Share your integration plan—we will help validate schema, caching headers, and
          accessibility checks for embedded experiences.
        </p>
      </div>
    </MarketingInteriorLayout>
  )
}
