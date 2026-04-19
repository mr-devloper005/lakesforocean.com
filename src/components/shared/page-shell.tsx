'use client'

import type { ReactNode } from 'react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { pinionAppShell } from '@/config/pinion-surfaces'

export function PageShell({
  title,
  description,
  actions,
  children,
}: {
  title: string
  description?: string
  actions?: ReactNode
  children?: ReactNode
}) {
  return (
    <div className={pinionAppShell}>
      <NavbarShell />
      <main>
        <section className="border-b border-neutral-200/90 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-3xl">
                <h1 className="font-sans text-3xl font-semibold tracking-[-0.03em] text-neutral-950 sm:text-4xl">{title}</h1>
                {description && (
                  <p className="mt-3 max-w-2xl text-base leading-relaxed text-neutral-600">{description}</p>
                )}
              </div>
              {actions && <div className="flex flex-shrink-0 flex-wrap items-center gap-3">{actions}</div>}
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
          {children}
        </section>
      </main>
      <Footer />
    </div>
  )
}
