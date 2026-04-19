import Link from 'next/link'
import { MarketingInteriorLayout, marketingInteriorCard, marketingInteriorMutedPanel } from '@/components/shared/marketing-interior-layout'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { SITE_CONFIG } from '@/lib/site-config'
import { Compass, Heart, Laptop } from 'lucide-react'

const roles = [
  { title: 'Brand & visual design', location: 'Remote', type: 'Full-time', level: 'Senior', focus: 'Art direction for gallery surfaces' },
  { title: 'Frontend engineer', location: 'Hybrid — NYC', type: 'Full-time', level: 'Mid', focus: 'Performance, motion, and layout systems' },
  { title: 'Creator partnerships', location: 'Remote', type: 'Contract', level: 'Lead', focus: 'Onboarding studios and independent photographers' },
]

const benefits = [
  { title: 'Remote-first', body: 'Deep work blocks, async rituals, and quarterly in-person studio weeks.' },
  { title: 'Learning budget', body: 'Conference passes, courses, and tooling stipends every year.' },
  { title: 'Health & balance', body: 'Medical coverage options, mental health days, and flexible PTO.' },
]

export default function CareersPage() {
  return (
    <MarketingInteriorLayout
      kicker="Careers"
      title="Build the calm side of the creative web"
      description={`${SITE_CONFIG.name} is a small, product-minded team. We care about typography, image fidelity, and the quiet confidence of a well-made profile page.`}
      actions={
        <Button asChild className="bg-[#003366] text-white hover:bg-[#005DAA]">
          <Link href="/contact">Introduce yourself</Link>
        </Button>
      }
    >
      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-4">
          {roles.map((role) => (
            <Card key={role.title} className={marketingInteriorCard}>
              <CardContent className="p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary" className="border-neutral-200 bg-white">
                    {role.level}
                  </Badge>
                  <Badge variant="outline" className="border-neutral-200 text-neutral-700">
                    {role.type}
                  </Badge>
                </div>
                <h2 className="mt-4 text-xl font-semibold text-neutral-950">{role.title}</h2>
                <p className="mt-1 text-sm text-[#6b8caf]">{role.location}</p>
                <p className="mt-3 text-sm text-neutral-600">{role.focus}</p>
                <Button variant="outline" className="mt-5 border-neutral-200" asChild>
                  <Link href="/contact">Request full brief</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className={`${marketingInteriorCard} border-t-4 border-t-[#00A8C6]`}>
          <CardContent className="space-y-6 p-6 sm:p-8">
            <div className="flex items-center gap-2 text-[#003366]">
              <Heart className="h-5 w-5" />
              <h3 className="text-lg font-semibold text-neutral-950">How we work</h3>
            </div>
            <p className="text-sm leading-relaxed text-neutral-600">
              Small squads, crisp critiques, and a shared obsession with shipping interfaces that feel expensive without
              feeling busy.
            </p>
            <div className="space-y-3">
              {benefits.map((b) => (
                <div key={b.title} className={`rounded-[var(--radius)] p-4 ${marketingInteriorMutedPanel}`}>
                  <div className="flex items-center gap-2 text-sm font-semibold text-neutral-950">
                    <Laptop className="h-4 w-4 text-[#005DAA]" />
                    {b.title}
                  </div>
                  <p className="mt-2 text-sm text-neutral-600">{b.body}</p>
                </div>
              ))}
            </div>
            <div className={`flex items-start gap-3 rounded-[var(--radius)] border border-[#005DAA]/25 bg-[#00A8C6]/8 p-4`}>
              <Compass className="mt-0.5 h-5 w-5 shrink-0 text-[#003366]" />
              <p className="text-sm text-neutral-700">
                No open role that fits? Send a portfolio link anyway—we regularly create roles for exceptional makers.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </MarketingInteriorLayout>
  )
}
