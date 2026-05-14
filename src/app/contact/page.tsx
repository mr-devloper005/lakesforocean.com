import { Building2, FileText, Image as ImageIcon, Mail, MapPin, Phone, Sparkles, Bookmark } from 'lucide-react'
import { MarketingInteriorLayout, marketingInteriorCard, marketingInteriorMutedPanel } from '@/components/shared/marketing-interior-layout'
import { SITE_CONFIG } from '@/lib/site-config'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'
import { CONTACT_PAGE_OVERRIDE_ENABLED, ContactPageOverride } from '@/overrides/contact-page'
import { ContactLeadForm } from "@/components/shared/contact-lead-form";

export default function ContactPage() {
  if (CONTACT_PAGE_OVERRIDE_ENABLED) {
    return <ContactPageOverride />
  }

  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "hello@lakesforocean.com"
  const mailtoHref = `mailto:${contactEmail}`
  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const lanes =
    productKind === 'directory'
      ? [
          { icon: Building2, title: 'Business onboarding', body: 'Add listings, verify operational details, and bring your business surface live quickly.' },
          { icon: Phone, title: 'Partnership support', body: 'Talk through bulk publishing, local growth, and operational setup questions.' },
          { icon: MapPin, title: 'Coverage requests', body: 'Need a new geography or category lane? We can shape the directory around it.' },
        ]
      : productKind === 'editorial'
        ? [
            { icon: FileText, title: 'Editorial submissions', body: 'Pitch essays, columns, and long-form ideas that fit the publication.' },
            { icon: Mail, title: 'Newsletter partnerships', body: 'Coordinate sponsorships, collaborations, and issue-level campaigns.' },
            { icon: Sparkles, title: 'Contributor support', body: 'Get help with voice, formatting, and publication workflow questions.' },
          ]
        : productKind === 'visual'
          ? [
              { icon: ImageIcon, title: 'Creator collaborations', body: 'Discuss gallery launches, creator features, and visual campaigns.' },
              { icon: Sparkles, title: 'Licensing and usage', body: 'Reach out about usage rights, commercial requests, and visual partnerships.' },
              { icon: Mail, title: 'Press & media kits', body: 'Request creator decks, editorial support, or visual feature placement.' },
            ]
          : [
              { icon: Bookmark, title: 'Collection submissions', body: 'Suggest resources, boards, and links that deserve a place in the library.' },
              { icon: Mail, title: 'Resource partnerships', body: 'Coordinate curation projects, reference pages, and link programs.' },
              { icon: Sparkles, title: 'Curator support', body: 'Need help organizing shelves, collections, or profile-connected boards?' },
            ]

  return (
    <MarketingInteriorLayout
      kicker="Contact"
      title={`Reach ${SITE_CONFIG.name}`}
      description="Tell us what you are publishing, launching, or refining. We route requests to the right lane—gallery, profile, or partnerships—instead of a generic queue."
    >
      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div>
          <div className="space-y-4">
            {lanes.map((lane) => (
              <div key={lane.title} className={`rounded-[var(--radius)] p-5 sm:p-6 ${marketingInteriorMutedPanel}`}>
                <lane.icon className="h-5 w-5 text-[#00A8C6]" />
                <h2 className="mt-3 text-xl font-semibold text-neutral-950">{lane.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{lane.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={`${marketingInteriorCard} p-7 sm:p-8`}>
          <h2 className="text-2xl font-semibold text-neutral-950">Send a message</h2>
          <p className="mt-2 text-sm text-neutral-600">We typically reply within two business days.</p>
          <ContactLeadForm />
        </div>
      </div>
    </MarketingInteriorLayout>
  )
}
