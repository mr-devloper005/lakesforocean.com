import { MarketingInteriorLayout, marketingInteriorCard, marketingInteriorMutedPanel } from '@/components/shared/marketing-interior-layout'
import { Card, CardContent } from '@/components/ui/card'
import { SITE_CONFIG } from '@/lib/site-config'
import { Shield } from 'lucide-react'

const sections = [
  {
    title: 'Information we collect',
    body: 'We collect account details you provide, content you publish (including images and profile fields), technical logs needed to operate the service, and limited usage signals to improve reliability.',
  },
  {
    title: 'How we use information',
    body: 'Data powers authentication, surfaces your public gallery and profile pages, keeps the platform secure, and helps us understand which features deserve deeper investment—without selling personal data to third parties.',
  },
  {
    title: 'Storage & retention',
    body: 'Content remains available while your account is active. You may request deletion of personal data subject to legal or security retention requirements.',
  },
  {
    title: 'Your controls',
    body: 'Manage email preferences, export key account data, or delete your account from settings. For broader requests, contact us through the support form.',
  },
]

export default function PrivacyPage() {
  return (
    <MarketingInteriorLayout
      kicker="Legal"
      title="Privacy policy"
      description={`How ${SITE_CONFIG.name} collects, uses, and protects information across gallery and profile experiences.`}
    >
      <Card className={marketingInteriorCard}>
        <CardContent className="space-y-8 p-6 sm:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200/90 pb-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-[var(--radius)] bg-[#003366]/10">
                <Shield className="h-5 w-5 text-[#003366]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-950">Transparency summary</p>
                <p className="text-xs text-neutral-500">Last updated · April 16, 2026</p>
              </div>
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
