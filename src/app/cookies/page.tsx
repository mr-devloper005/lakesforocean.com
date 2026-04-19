import Link from 'next/link'
import { MarketingInteriorLayout, marketingInteriorCard, marketingInteriorMutedPanel } from '@/components/shared/marketing-interior-layout'
import { Card, CardContent } from '@/components/ui/card'
import { Cookie } from 'lucide-react'

const sections = [
  {
    title: 'Essential cookies',
    body: 'Required for sign-in sessions, security tokens, and core navigation. These cannot be disabled without breaking authentication.',
  },
  {
    title: 'Preference cookies',
    body: 'Remember interface choices such as theme or layout density so returning visits feel consistent.',
  },
  {
    title: 'Analytics cookies',
    body: 'Help us understand aggregate traffic patterns and performance bottlenecks. No third-party ad networks are included by default.',
  },
]

export default function CookiesPage() {
  return (
    <MarketingInteriorLayout
      kicker="Legal"
      title="Cookie policy"
      description="How we use cookies and similar technologies to keep sessions secure and measure product health."
    >
      <Card className={marketingInteriorCard}>
        <CardContent className="space-y-8 p-6 sm:p-10">
          <div className="flex items-center gap-3 border-b border-neutral-200/90 pb-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-[var(--radius)] bg-[#005DAA]/12">
              <Cookie className="h-5 w-5 text-[#003366]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-neutral-950">Cookie practices</p>
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
          <p className="text-sm text-neutral-600">
            Questions about tracking? Read our{' '}
            <Link href="/privacy" className="font-medium text-[#005DAA] hover:text-[#003366]">
              privacy policy
            </Link>{' '}
            or reach out via the contact page.
          </p>
        </CardContent>
      </Card>
    </MarketingInteriorLayout>
  )
}
