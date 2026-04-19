import { MarketingInteriorLayout, marketingInteriorCard, marketingInteriorMutedPanel } from '@/components/shared/marketing-interior-layout'
import { Card, CardContent } from '@/components/ui/card'
import { SITE_CONFIG } from '@/lib/site-config'
import { Scale } from 'lucide-react'

const sections = [
  {
    title: 'Acceptable use',
    body: 'Harassment, deceptive impersonation, illegal content, or attempts to compromise other accounts are prohibited. We may suspend access to protect the community.',
  },
  {
    title: 'Your content',
    body: 'You retain rights to the media and text you upload. By publishing, you grant the platform a license to host, display, and distribute that content in connection with the service.',
  },
  {
    title: 'Service changes',
    body: 'We continuously improve layouts and infrastructure. When material changes affect you, we will provide reasonable notice through in-product messaging or email.',
  },
  {
    title: 'Limitation of liability',
    body: 'The service is provided as-is to the extent permitted by law. Our aggregate liability is limited to the fees you paid in the prior twelve months, if any.',
  },
]

export default function TermsPage() {
  return (
    <MarketingInteriorLayout
      kicker="Legal"
      title="Terms of service"
      description={`Guidelines for using ${SITE_CONFIG.name}, including responsibilities for gallery posts, profiles, and shared content.`}
    >
      <Card className={marketingInteriorCard}>
        <CardContent className="space-y-8 p-6 sm:p-10">
          <div className="flex items-center gap-3 border-b border-neutral-200/90 pb-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-[var(--radius)] bg-[#00A8C6]/15">
              <Scale className="h-5 w-5 text-[#005DAA]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-neutral-950">Agreement overview</p>
              <p className="text-xs text-neutral-500">Last updated · April 16, 2026</p>
            </div>
          </div>
          <div className="space-y-6">
            {sections.map((section) => (
              <div key={section.title} className={`rounded-[var(--radius)] p-5 sm:p-6 ${marketingInteriorMutedPanel}`}>
                <h3 className="text-base font-semibold text-neutral-950">{section.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">{section.body}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </MarketingInteriorLayout>
  )
}
