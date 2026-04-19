import { MarketingInteriorLayout, marketingInteriorCard, marketingInteriorMutedPanel } from '@/components/shared/marketing-interior-layout'
import { Card, CardContent } from '@/components/ui/card'
import { FileCode2 } from 'lucide-react'

const licenses = [
  { name: 'Next.js', description: 'MIT License · App Router & React Server Components runtime' },
  { name: 'React', description: 'MIT License · UI rendering' },
  { name: 'Tailwind CSS', description: 'MIT License · utility-first styling' },
  { name: 'Radix UI', description: 'MIT License · accessible primitives' },
  { name: 'Lucide', description: 'ISC License · iconography' },
  { name: 'Framer Motion', description: 'MIT License · motion experiments' },
]

export default function LicensesPage() {
  return (
    <MarketingInteriorLayout
      kicker="Legal"
      title="Open source notices"
      description="We ship on top of extraordinary open tools. Below are the primary packages powering the interface you see today."
    >
      <Card className={marketingInteriorCard}>
        <CardContent className="space-y-6 p-6 sm:p-10">
          <div className="flex items-center gap-3 border-b border-neutral-200/90 pb-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-[var(--radius)] bg-[#003366]/10">
              <FileCode2 className="h-5 w-5 text-[#003366]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-neutral-950">Attribution</p>
              <p className="text-xs text-neutral-500">Thank you to the maintainers behind these projects.</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {licenses.map((license) => (
              <div key={license.name} className={`rounded-[var(--radius)] p-5 ${marketingInteriorMutedPanel}`}>
                <h3 className="text-sm font-semibold text-neutral-950">{license.name}</h3>
                <p className="mt-2 text-sm text-neutral-600">{license.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </MarketingInteriorLayout>
  )
}
