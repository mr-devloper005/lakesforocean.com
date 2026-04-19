import { MarketingInteriorLayout, marketingInteriorCard, marketingInteriorMutedPanel } from '@/components/shared/marketing-interior-layout'
import { Card, CardContent } from '@/components/ui/card'
import { Activity, Radio } from 'lucide-react'

const services = [
  { name: 'Web application', detail: 'Gallery, profiles, authentication', status: 'Operational' },
  { name: 'Media delivery', detail: 'Image optimization & caching', status: 'Operational' },
  { name: 'Search & discovery', detail: 'Public indexes', status: 'Operational' },
]

const incidents = [
  { date: 'Apr 2, 2026', title: 'Elevated latency on profile saves', status: 'Resolved' },
  { date: 'Mar 18, 2026', title: 'Scheduled maintenance — CDN edge', status: 'Resolved' },
]

export default function StatusPage() {
  return (
    <MarketingInteriorLayout
      kicker="Systems"
      title="Platform status"
      description="Live health for core surfaces that power gallery browsing, profile rendering, and media delivery."
    >
      <div className="space-y-8">
        <div className="grid gap-4 md:grid-cols-3">
          {services.map((service) => (
            <Card key={service.name} className={`${marketingInteriorCard} overflow-hidden`}>
              <div className="h-1 bg-gradient-to-r from-[#00A8C6] to-[#003366]" />
              <CardContent className="p-6">
                <div className="flex items-center gap-2 text-sm font-semibold text-neutral-950">
                  <Radio className="h-4 w-4 text-[#00A8C6]" />
                  {service.name}
                </div>
                <p className="mt-2 text-xs text-neutral-500">{service.detail}</p>
                <p className="mt-4 inline-flex items-center rounded-full bg-[#00A8C6]/15 px-3 py-1 text-xs font-semibold text-[#005DAA]">
                  {service.status}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className={marketingInteriorCard}>
          <CardContent className="p-6 sm:p-8">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-[#003366]" />
              <h3 className="text-lg font-semibold text-neutral-950">Incident history</h3>
            </div>
            <div className="mt-6 space-y-4">
              {incidents.map((incident) => (
                <div key={incident.title} className={`rounded-[var(--radius)] px-4 py-4 ${marketingInteriorMutedPanel}`}>
                  <div className="text-xs font-medium uppercase tracking-wide text-[#6b8caf]">{incident.date}</div>
                  <div className="mt-1 text-sm font-medium text-neutral-950">{incident.title}</div>
                  <div className="mt-2 text-xs text-neutral-600">{incident.status}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MarketingInteriorLayout>
  )
}
