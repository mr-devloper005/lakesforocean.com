import type { ReactNode } from 'react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'

const shell =
  'min-h-screen bg-[linear-gradient(180deg,#ffffff_0%,#fafafa_48%,#f5f5f7_100%)] text-neutral-950'

export function MarketingInteriorLayout({
  title,
  description,
  kicker,
  children,
  actions,
}: {
  title: string
  description?: string
  kicker?: string
  children: ReactNode
  actions?: ReactNode
}) {
  return (
    <div className={shell}>
      <NavbarShell />
      <main>
        <section className="relative overflow-hidden border-b border-neutral-200/90 bg-white">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#00A8C6]/10 blur-3xl" aria-hidden />
          <div className="pointer-events-none absolute -bottom-8 -left-16 h-56 w-56 rounded-full bg-[#003366]/10 blur-3xl" aria-hidden />
          <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
            {kicker ? (
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#005DAA]">{kicker}</p>
            ) : null}
            <h1 className="max-w-3xl font-sans text-3xl font-semibold tracking-[-0.03em] text-neutral-950 sm:text-4xl lg:text-[2.75rem]">
              {title}
            </h1>
            {description ? (
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-600">{description}</p>
            ) : null}
            {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">{children}</section>
      </main>
      <Footer />
    </div>
  )
}

export const marketingInteriorCard =
  'rounded-[var(--radius)] border border-neutral-200/90 bg-white shadow-[0_22px_64px_rgba(15,15,25,0.05)]'

export const marketingInteriorMutedPanel =
  'rounded-[var(--radius)] border border-neutral-200/80 bg-neutral-50/90'
