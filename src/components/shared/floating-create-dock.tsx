'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { User, Image as ImageIcon } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { SITE_CONFIG } from '@/lib/site-config'
import { cn } from '@/lib/utils'

const pill = cn(
  'inline-flex h-10 items-center gap-2 rounded-full border border-neutral-200 bg-white',
  'px-5 text-sm font-medium text-neutral-950 shadow-md shadow-neutral-900/8',
  'transition-colors hover:bg-neutral-50',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2',
)

export function FloatingCreateDock() {
  const { isAuthenticated } = useAuth()
  const pathname = usePathname()

  const imageTask = SITE_CONFIG.tasks.find((t) => t.key === 'image' && t.enabled)
  const profileTask = SITE_CONFIG.tasks.find((t) => t.key === 'profile' && t.enabled)

  const hideRoute =
    pathname.startsWith('/login') ||
    pathname.startsWith('/register') ||
    pathname.startsWith('/forgot-password')

  const showDock = isAuthenticated && !hideRoute && (imageTask || profileTask)

  useEffect(() => {
    if (!showDock) return
    const prev = document.body.style.paddingBottom
    document.body.style.paddingBottom = 'max(5.5rem, calc(env(safe-area-inset-bottom) + 4.5rem))'
    return () => {
      document.body.style.paddingBottom = prev
    }
  }, [showDock])

  if (!showDock) return null

  return (
    <div
      className="pointer-events-none fixed bottom-0 left-0 right-0 z-[100] flex justify-center px-4 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))]"
      role="toolbar"
      aria-label="Gallery and profiles"
    >
      <div className="pointer-events-auto flex max-w-[min(100vw-2rem,42rem)] flex-wrap items-center justify-center gap-2">
        {imageTask ? (
          <Link href="/create/image" className={pill} title={`Create ${imageTask.label}`}>
            <ImageIcon className="h-4 w-4 shrink-0" aria-hidden />
            {imageTask.label}
          </Link>
        ) : null}
        {profileTask ? (
          <Link href="/create/profile" className={pill} title={`Create ${profileTask.label}`}>
            <User className="h-4 w-4 shrink-0" aria-hidden />
            {profileTask.label}
          </Link>
        ) : null}
      </div>
    </div>
  )
}
