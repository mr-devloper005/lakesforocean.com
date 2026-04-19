import { MarketingInteriorLayout } from '@/components/shared/marketing-interior-layout'
import { PressContent } from './press-content'

export default function PressPage() {
  return (
    <MarketingInteriorLayout
      kicker="Media"
      title="Press room"
      description="Brand narrative, visual assets, and recent coverage—organized for journalists and partners."
    >
      <PressContent />
    </MarketingInteriorLayout>
  )
}
