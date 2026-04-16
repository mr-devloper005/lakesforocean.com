import Link from 'next/link'
import { MarketingInteriorLayout, marketingInteriorCard, marketingInteriorMutedPanel } from '@/components/shared/marketing-interior-layout'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { mockTeamMembers } from '@/data/mock-data'
import { SITE_CONFIG } from '@/lib/site-config'
import { Image as ImageIcon, Sparkles, Target, User } from 'lucide-react'

const pillars = [
  {
    title: 'Clarity over noise',
    body: 'Large imagery, restrained typography, and predictable layouts keep attention on the work—not the chrome.',
    icon: ImageIcon,
  },
  {
    title: 'Profiles that earn trust',
    body: 'Public profiles read like credentials: structured, scannable, and ready for professional contexts.',
    icon: User,
  },
  {
    title: 'Built for steady iteration',
    body: 'The surface is designed so teams can refresh content often without fighting the template.',
    icon: Target,
  },
]

const stats = [
  { label: 'Visual posts staged', value: '24k+' },
  { label: 'Active public profiles', value: '9.2k' },
  { label: 'Markets represented', value: '42' },
]

export default function AboutPage() {
  return (
    <MarketingInteriorLayout
      kicker="Company"
      title={`About ${SITE_CONFIG.name}`}
      description="We build a calm, image-forward platform for portfolios, creator identity, and discoverable profiles—presented with the restraint of a corporate visual system."
      actions={
        <>
          <Button asChild className="bg-[#003366] text-white hover:bg-[#005DAA]">
            <Link href="/contact">Talk with us</Link>
          </Button>
          <Button variant="outline" asChild className="border-neutral-200 bg-white">
            <Link href="/images">View gallery</Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <Card className={marketingInteriorCard}>
          <CardContent className="space-y-6 p-6 sm:p-8">
            <Badge variant="secondary" className="border-neutral-200 bg-neutral-50 text-[#003366]">
              Studio principles
            </Badge>
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">Why the experience feels different</h2>
            <p className="text-sm leading-relaxed text-neutral-600">
              {SITE_CONFIG.name} treats imagery and identity as first-class surfaces. Navigation stays minimal so visitors
              move from gallery to profile without friction—and creators keep a single visual language end to end.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {stats.map((item) => (
                <div key={item.label} className={`rounded-[var(--radius)] p-4 ${marketingInteriorMutedPanel}`}>
                  <div className="text-2xl font-semibold text-[#003366]">{item.value}</div>
                  <div className="mt-1 text-xs text-neutral-600">{item.label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <div className="space-y-4">
          {pillars.map((pillar) => (
            <div key={pillar.title} className={`rounded-[var(--radius)] border border-neutral-200/90 bg-white p-6 shadow-[0_18px_48px_rgba(15,15,25,0.04)]`}>
              <pillar.icon className="h-5 w-5 text-[#00A8C6]" />
              <h3 className="mt-3 text-lg font-semibold text-neutral-950">{pillar.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">{pillar.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <div className="mb-8 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-[#005DAA]" />
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#005DAA]">Leadership & craft</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {mockTeamMembers.map((member) => (
            <Card key={member.id} className={`${marketingInteriorCard} transition-shadow hover:shadow-[0_28px_72px_rgba(15,15,25,0.07)]`}>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 border border-neutral-200">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold text-neutral-950">{member.name}</p>
                    <p className="text-xs text-[#6b8caf]">{member.role}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-neutral-600">{member.bio}</p>
                <p className="mt-3 text-xs text-neutral-500">{member.location}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MarketingInteriorLayout>
  )
}
