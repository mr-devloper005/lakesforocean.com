'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'
import { mockPressAssets, mockPressCoverage } from '@/data/mock-data'
import { marketingInteriorCard } from '@/components/shared/marketing-interior-layout'

export function PressContent() {
  const { toast } = useToast()
  const [activeAssetId, setActiveAssetId] = useState<string | null>(null)
  const activeAsset = mockPressAssets.find((asset) => asset.id === activeAssetId)

  return (
    <>
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className={marketingInteriorCard}>
          <CardContent className="space-y-4 p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-neutral-950">Press kit</h2>
            <p className="text-sm leading-relaxed text-neutral-600">
              Logos, product imagery, and narrative positioning for editorial and broadcast use.
            </p>
            <div className="grid gap-3">
              {mockPressAssets.map((asset) => (
                <div
                  key={asset.id}
                  className="rounded-[var(--radius)] border border-neutral-200/80 bg-neutral-50/80 px-4 py-4"
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-sm font-medium text-neutral-950">{asset.title}</p>
                      <p className="text-xs text-neutral-600">{asset.description}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="secondary" className="border-neutral-200 bg-white">
                        {asset.fileType}
                      </Badge>
                      <Button size="sm" variant="outline" className="border-neutral-200" onClick={() => setActiveAssetId(asset.id)}>
                        Preview
                      </Button>
                      <Button
                        size="sm"
                        className="bg-[#003366] text-white hover:bg-[#005DAA]"
                        onClick={() =>
                          toast({
                            title: 'Download started',
                            description: `${asset.title} is downloading.`,
                          })
                        }
                      >
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <div className="space-y-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#005DAA]">Coverage</p>
          {mockPressCoverage.map((item) => (
            <Card key={item.id} className={`${marketingInteriorCard} transition-shadow hover:shadow-[0_28px_72px_rgba(15,15,25,0.08)]`}>
              <CardContent className="p-6">
                <div className="text-xs font-medium uppercase tracking-wide text-[#6b8caf]">{item.outlet}</div>
                <p className="mt-2 text-sm font-medium text-neutral-950">{item.headline}</p>
                <p className="mt-2 text-xs text-neutral-500">{item.date}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={Boolean(activeAsset)} onOpenChange={() => setActiveAssetId(null)}>
        <DialogContent className="max-w-3xl border-neutral-200">
          <DialogHeader>
            <DialogTitle>{activeAsset?.title}</DialogTitle>
          </DialogHeader>
          {activeAsset?.previewUrl ? (
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100">
              <Image src={activeAsset.previewUrl} alt={activeAsset.title} fill className="object-cover" />
            </div>
          ) : null}
          <p className="text-sm text-neutral-600">{activeAsset?.description}</p>
          <DialogFooter>
            <Button variant="outline" className="border-neutral-200" onClick={() => setActiveAssetId(null)}>
              Close
            </Button>
            <Button
              className="bg-[#003366] text-white hover:bg-[#005DAA]"
              onClick={() =>
                toast({
                  title: 'Download started',
                  description: `${activeAsset?.title} is downloading.`,
                })
              }
            >
              Download {activeAsset?.fileType}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
