/**
 * Shared marketing/task shell tokens so inner pages match the homepage Pinion theme.
 */

export const pinionListPageShell =
  'min-h-screen bg-[linear-gradient(180deg,#ffffff_0%,#fafafa_48%,#f5f5f7_100%)] text-neutral-950'

export const pinionInteractive = {
  muted: 'text-neutral-600',
  panel:
    'border border-neutral-200/90 bg-white shadow-[0_22px_64px_rgba(15,15,25,0.05)]',
  soft: 'border border-neutral-200/80 bg-neutral-50/80',
  input: 'border border-neutral-200 bg-white text-neutral-950',
  button: 'bg-neutral-950 text-white hover:bg-neutral-800',
} as const

export const pinionMarketingShell = {
  shell: 'bg-[#fafafa] text-neutral-950',
  panel: 'border border-neutral-200 bg-white shadow-[0_24px_64px_rgba(15,15,25,0.07)]',
  soft: 'border border-neutral-200 bg-neutral-50',
  muted: 'text-neutral-600',
  action: 'bg-neutral-950 text-white hover:bg-neutral-800',
} as const

export const pinionAppShell = 'min-h-screen bg-background text-foreground'
