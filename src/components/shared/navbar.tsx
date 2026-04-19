'use client'

import { Fragment, useEffect, useId, useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, Menu, X, User, FileText, Building2, LayoutGrid, Tag, Image as ImageIcon, ChevronRight, Sparkles, MapPin, Plus, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { cn } from '@/lib/utils'
import { siteContent } from '@/config/site.content'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { NAVBAR_OVERRIDE_ENABLED, NavbarOverride } from '@/overrides/navbar'

const NavbarAuthControls = dynamic(() => import('@/components/shared/navbar-auth-controls').then((mod) => mod.NavbarAuthControls), {
  ssr: false,
  loading: () => null,
})

const taskIcons: Record<TaskKey, any> = {
  article: FileText,
  listing: Building2,
  sbm: LayoutGrid,
  classified: Tag,
  image: ImageIcon,
  profile: User,
  social: LayoutGrid,
  pdf: FileText,
  org: Building2,
  comment: FileText,
}

const variantClasses = {
  'compact-bar': {
    shell: 'border-b border-slate-200/80 bg-white/88 text-slate-950 backdrop-blur-xl',
    logo: 'rounded-2xl border border-slate-200 bg-white shadow-sm',
    active: 'bg-slate-950 text-white',
    idle: 'text-slate-600 hover:bg-slate-100 hover:text-slate-950',
    cta: 'rounded-full bg-slate-950 text-white hover:bg-slate-800',
    mobile: 'border-t border-slate-200/70 bg-white/95',
  },
  'editorial-bar': {
    shell: 'border-b border-neutral-200/90 bg-white/95 text-neutral-950 backdrop-blur-xl supports-[backdrop-filter]:bg-white/80',
    logo: 'rounded-[var(--radius)] border border-neutral-200 bg-white shadow-sm',
    active: 'bg-neutral-950 text-white',
    idle: 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950',
    cta: 'rounded-[var(--radius)] bg-neutral-950 text-white shadow-[0_14px_32px_rgba(0,0,0,0.12)] hover:bg-neutral-800',
    mobile: 'border-t border-neutral-200 bg-white',
  },
  'floating-bar': {
    shell: 'border-b border-transparent bg-transparent text-white',
    logo: 'rounded-[1.35rem] border border-white/12 bg-white/8 shadow-[0_16px_48px_rgba(15,23,42,0.22)] backdrop-blur',
    active: 'bg-[#8df0c8] text-[#07111f]',
    idle: 'text-slate-200 hover:bg-white/10 hover:text-white',
    cta: 'rounded-full bg-[#8df0c8] text-[#07111f] hover:bg-[#77dfb8]',
    mobile: 'border-t border-white/10 bg-[#09101d]/96',
  },
  'utility-bar': {
    shell: 'border-b border-[#d7deca] bg-[#f4f6ef]/94 text-[#1f2617] backdrop-blur-xl',
    logo: 'rounded-xl border border-[#d7deca] bg-white shadow-sm',
    active: 'bg-[#1f2617] text-[#edf5dc]',
    idle: 'text-[#56604b] hover:bg-[#e7edd9] hover:text-[#1f2617]',
    cta: 'rounded-lg bg-[#1f2617] text-[#edf5dc] hover:bg-[#2f3a24]',
    mobile: 'border-t border-[#d7deca] bg-[#f4f6ef]',
  },
} as const

const directoryPalette = {
  'directory-clean': {
    shell: 'border-b border-slate-200 bg-white/94 text-slate-950 shadow-[0_1px_0_rgba(15,23,42,0.04)] backdrop-blur-xl',
    logo: 'rounded-2xl border border-slate-200 bg-slate-50',
    nav: 'text-slate-600 hover:text-slate-950',
    search: 'border border-slate-200 bg-slate-50 text-slate-600',
    cta: 'bg-slate-950 text-white hover:bg-slate-800',
    post: 'border border-slate-200 bg-white text-slate-950 hover:bg-slate-50',
    mobile: 'border-t border-slate-200 bg-white',
  },
  'market-utility': {
    shell: 'border-b border-[#d7deca] bg-[#f4f6ef]/96 text-[#1f2617] shadow-[0_1px_0_rgba(64,76,34,0.06)] backdrop-blur-xl',
    logo: 'rounded-xl border border-[#d7deca] bg-white',
    nav: 'text-[#56604b] hover:text-[#1f2617]',
    search: 'border border-[#d7deca] bg-white text-[#56604b]',
    cta: 'bg-[#1f2617] text-[#edf5dc] hover:bg-[#2f3a24]',
    post: 'border border-[#d7deca] bg-white text-[#1f2617] hover:bg-[#eef2e4]',
    mobile: 'border-t border-[#d7deca] bg-[#f4f6ef]',
  },
} as const

const navFocus =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background'

export function Navbar() {
  if (NAVBAR_OVERRIDE_ENABLED) {
    return <NavbarOverride />
  }

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const mobileNavId = useId()
  const { isAuthenticated, logout } = useAuth()
  const { recipe } = getFactoryState()

  const createTasks = useMemo(() => SITE_CONFIG.tasks.filter((task) => task.enabled), [])

  const profileLink = useMemo(() => {
    const task = SITE_CONFIG.tasks.find((t) => t.key === 'profile' && t.enabled)
    return task ? { href: task.route, label: task.label } : null
  }, [])

  const navigation = useMemo(() => SITE_CONFIG.tasks.filter((task) => task.enabled && task.key !== 'profile'), [])
  const primaryNavigation = navigation.slice(0, 5)
  const mobileNavigation = navigation.map((task) => ({
    name: task.label,
    href: task.route,
    icon: taskIcons[task.key] || LayoutGrid,
  }))
  const primaryTask = SITE_CONFIG.tasks.find((task) => task.key === recipe.primaryTask && task.enabled) || primaryNavigation[0]
  const isDirectoryProduct = recipe.homeLayout === 'listing-home' || recipe.homeLayout === 'classified-home'

  const closeMobile = () => setIsMobileMenuOpen(false)

  useEffect(() => {
    if (!isMobileMenuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [isMobileMenuOpen])

  if (isDirectoryProduct) {
    const palette = directoryPalette[(recipe.brandPack === 'market-utility' ? 'market-utility' : 'directory-clean') as keyof typeof directoryPalette]

    return (
      <Fragment>
        {isMobileMenuOpen ? (
          <button
            type="button"
            aria-hidden
            tabIndex={-1}
            className="fixed inset-0 z-40 bg-slate-950/20 backdrop-blur-[2px] transition-opacity lg:hidden dark:bg-black/40"
            onClick={closeMobile}
          />
        ) : null}
        <header className={cn('relative z-50 w-full', palette.shell)}>
        <nav className="sticky top-0 z-50 mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 bg-[inherit] px-4 sm:px-6 lg:px-8" aria-label="Primary">
          <div className="flex min-w-0 items-center gap-4">
            <Link href="/" className={cn('flex shrink-0 items-center gap-3', navFocus)}>
              <div className={cn('flex h-12 w-12 items-center justify-center overflow-hidden p-1.5', palette.logo)}>
                <img src="/favicon.png?v=lq2026" alt={`${SITE_CONFIG.name} logo`} width="48" height="48" className="h-full w-full object-contain" />
              </div>
              <div className="min-w-0 hidden sm:block">
                <span className="block truncate text-xl font-semibold">{SITE_CONFIG.name}</span>
                <span className="block text-[10px] uppercase tracking-[0.24em] opacity-60">{siteContent.navbar.tagline}</span>
              </div>
            </Link>

            <div className="hidden items-center gap-1 xl:flex">
              {primaryNavigation.slice(0, 4).map((task) => {
                const isActive = pathname.startsWith(task.route)
                return (
                  <Link
                    key={task.key}
                    href={task.route}
                    className={cn(
                      'rounded-full px-3 py-2 text-sm font-semibold transition-colors duration-200',
                      navFocus,
                      isActive ? 'bg-foreground/10 text-foreground' : palette.nav,
                    )}
                  >
                    {task.label}
                  </Link>
                )
              })}
              {profileLink ? (
                <Link
                  href={profileLink.href}
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold transition-colors duration-200',
                    navFocus,
                    pathname.startsWith(profileLink.href) ? 'bg-foreground/10 text-foreground' : palette.nav,
                  )}
                >
                  <User className="h-4 w-4" />
                  {profileLink.label}
                </Link>
              ) : null}
            </div>
          </div>

          <div className="hidden min-w-0 flex-1 items-center justify-center lg:flex">
            <Link
              href="/search"
              className={cn(
                'flex w-full max-w-xl items-center gap-3 rounded-full px-4 py-3 text-left transition-shadow duration-200 hover:shadow-md',
                navFocus,
                palette.search,
              )}
            >
              <Search className="h-4 w-4 shrink-0 opacity-70" />
              <span className="text-sm">Find businesses, spaces, and local services</span>
              <div className="ml-auto hidden items-center gap-1 text-xs opacity-75 md:flex">
                <MapPin className="h-3.5 w-3.5" />
                Local discovery
              </div>
            </Link>
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            {primaryTask ? (
              <Link
                href={primaryTask.route}
                className={cn(
                  'hidden items-center gap-2 rounded-full border border-current/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] opacity-80 transition-opacity hover:opacity-100 md:inline-flex',
                  navFocus,
                )}
              >
                <Sparkles className="h-3.5 w-3.5" />
                {primaryTask.label}
              </Link>
            ) : null}

            {isAuthenticated ? (
              <NavbarAuthControls />
            ) : (
              <div className="hidden items-center gap-2 md:flex">
                <Button variant="ghost" size="sm" asChild className="rounded-full px-4">
                  <Link href="/login" className={navFocus}>
                    Sign In
                  </Link>
                </Button>
                <Button size="sm" asChild className={cn('rounded-full', palette.cta)}>
                  <Link href="/register" className={navFocus}>
                    <Plus className="mr-1 h-4 w-4" />
                    Add Listing
                  </Link>
                </Button>
              </div>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="rounded-full lg:hidden"
              aria-expanded={isMobileMenuOpen}
              aria-controls={mobileNavId}
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              onClick={() => setIsMobileMenuOpen((o) => !o)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </nav>

        {isMobileMenuOpen ? (
          <div id={mobileNavId} className={cn('relative z-50 max-h-[min(70vh,calc(100dvh-5rem))] overflow-y-auto overscroll-contain border-t lg:hidden', palette.mobile)} role="dialog" aria-modal="true" aria-label="Site navigation">
            <div className="space-y-1 px-4 py-4">
              <Link
                href="/search"
                onClick={closeMobile}
                className={cn('mb-2 flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-colors', palette.search, navFocus)}
              >
                <Search className="h-4 w-4 shrink-0" />
                Find businesses, spaces, and services
              </Link>
              {mobileNavigation.map((item) => {
                const isActive = pathname.startsWith(item.href)
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={closeMobile}
                    className={cn(
                      'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-colors duration-200',
                      navFocus,
                      isActive ? 'bg-foreground text-background' : palette.post,
                    )}
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    {item.name}
                  </Link>
                )
              })}
              {profileLink ? (
                <Link
                  href={profileLink.href}
                  onClick={closeMobile}
                  className={cn(
                    'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-colors duration-200',
                    navFocus,
                    pathname.startsWith(profileLink.href) ? 'bg-foreground text-background' : palette.post,
                  )}
                >
                  <User className="h-5 w-5 shrink-0" />
                  {profileLink.label}
                </Link>
              ) : null}

              <div
                className={cn(
                  'mt-4 space-y-2 border-t pt-4',
                  recipe.brandPack === 'market-utility' ? 'border-[#d7deca]' : 'border-slate-200',
                )}
              >
                {!isAuthenticated ? (
                  <>
                    <Button variant="outline" size="sm" asChild className="w-full justify-center rounded-2xl">
                      <Link href="/login" onClick={closeMobile}>
                        Sign in
                      </Link>
                    </Button>
                    <Button size="sm" asChild className={cn('w-full justify-center rounded-2xl', palette.cta)}>
                      <Link href="/register" onClick={closeMobile}>
                        <Plus className="mr-1 h-4 w-4" />
                        Add listing
                      </Link>
                    </Button>
                  </>
                ) : (
                  <>
                    <p className="px-1 text-[10px] font-semibold uppercase tracking-[0.2em] opacity-60">Create</p>
                    {createTasks.map((task) => {
                      const Icon = taskIcons[task.key] || LayoutGrid
                      return (
                        <Link
                          key={task.key}
                          href={`/create/${task.key}`}
                          onClick={closeMobile}
                          title={`Create ${task.label}`}
                          className={cn('flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-colors', navFocus, palette.post)}
                        >
                          <Icon className="h-5 w-5 shrink-0" />
                          {task.label}
                        </Link>
                      )
                    })}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mt-1 w-full justify-center gap-2 rounded-2xl"
                      onClick={() => {
                        logout()
                        closeMobile()
                      }}
                    >
                      <LogOut className="h-4 w-4" />
                      Sign out
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </header>
      </Fragment>
    )
  }

  const style = variantClasses[recipe.navbar]
  const isFloating = recipe.navbar === 'floating-bar'
  const isEditorial = recipe.navbar === 'editorial-bar'
  const isUtility = recipe.navbar === 'utility-bar'

  const authAccountTriggerClass = isFloating ? 'text-slate-200 hover:bg-white/10 hover:text-white' : undefined
  const mobileSearchCardClass = isFloating
    ? 'border border-white/10 bg-white/5 text-slate-200'
    : isUtility
      ? 'border border-[#d7deca] bg-white text-[#56604b]'
      : 'border border-border bg-card text-muted-foreground'
  const mobileFooterBorderClass = isFloating ? 'border-white/10' : isUtility ? 'border-[#d7deca]' : 'border-neutral-200/80'

  return (
    <Fragment>
      {isMobileMenuOpen ? (
        <button
          type="button"
          aria-hidden
          tabIndex={-1}
          className={cn('fixed inset-0 z-40 backdrop-blur-[2px] transition-opacity lg:hidden', isFloating ? 'bg-slate-950/50' : 'bg-neutral-950/25')}
          onClick={closeMobile}
        />
      ) : null}
      <header className={cn('relative z-50 w-full', style.shell)}>
        <nav
          className={cn(
            'sticky top-0 z-50 mx-auto flex max-w-7xl items-center justify-between gap-3 bg-[inherit] px-4 sm:px-6 lg:px-8',
            isFloating ? 'h-24 pt-4' : 'h-20',
          )}
          aria-label="Primary"
        >
        <div className="flex min-w-0 flex-1 items-center gap-4 lg:gap-7">
          <Link href="/" className={cn('flex shrink-0 items-center gap-3 whitespace-nowrap pr-2', navFocus)}>
            <div className={cn('flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden p-1.5', style.logo)}>
              <img src="/favicon.png?v=lq2026" alt={`${SITE_CONFIG.name} logo`} width="48" height="48" className="h-full w-full object-contain" />
            </div>
            <div className="min-w-0 hidden sm:block">
              <span className="block truncate text-xl font-semibold">{SITE_CONFIG.name}</span>
              <span className="hidden text-[10px] uppercase tracking-[0.28em] opacity-70 sm:block">{siteContent.navbar.tagline}</span>
            </div>
          </Link>

          {isEditorial ? (
            <div className="hidden min-w-0 flex-1 items-center gap-4 xl:flex">
              <div className="h-px min-w-[2rem] flex-1 bg-neutral-200" />
              {primaryNavigation.map((task) => {
                const isActive = pathname.startsWith(task.route)
                return (
                  <Link
                    key={task.key}
                    href={task.route}
                    className={cn(
                      'rounded-sm px-1 py-1 text-sm font-semibold uppercase tracking-[0.16em] transition-colors duration-200',
                      navFocus,
                      isActive ? 'text-neutral-950 underline decoration-neutral-950 decoration-2 underline-offset-[10px]' : 'text-neutral-500 hover:text-neutral-950',
                    )}
                  >
                    {task.label}
                  </Link>
                )
              })}
              {profileLink ? (
                <Link
                  href={profileLink.href}
                  className={cn(
                    'rounded-sm px-1 py-1 text-sm font-semibold uppercase tracking-[0.16em] transition-colors duration-200',
                    navFocus,
                    pathname.startsWith(profileLink.href)
                      ? 'text-neutral-950 underline decoration-neutral-950 decoration-2 underline-offset-[10px]'
                      : 'text-neutral-500 hover:text-neutral-950',
                  )}
                >
                  {profileLink.label}
                </Link>
              ) : null}
              <div className="h-px min-w-[2rem] flex-1 bg-neutral-200" />
            </div>
          ) : isFloating ? (
            <div className="hidden min-w-0 flex-1 items-center gap-2 xl:flex">
              {primaryNavigation.map((task) => {
                const Icon = taskIcons[task.key] || LayoutGrid
                const isActive = pathname.startsWith(task.route)
                return (
                  <Link
                    key={task.key}
                    href={task.route}
                    className={cn(
                      'flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200',
                      navFocus,
                      isActive ? style.active : style.idle,
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{task.label}</span>
                  </Link>
                )
              })}
              {profileLink ? (
                <Link
                  href={profileLink.href}
                  className={cn(
                    'flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200',
                    navFocus,
                    pathname.startsWith(profileLink.href) ? style.active : style.idle,
                  )}
                >
                  <User className="h-4 w-4" />
                  <span>{profileLink.label}</span>
                </Link>
              ) : null}
            </div>
          ) : isUtility ? (
            <div className="hidden min-w-0 flex-1 items-center gap-2 xl:flex">
              {primaryNavigation.map((task) => {
                const isActive = pathname.startsWith(task.route)
                return (
                  <Link
                    key={task.key}
                    href={task.route}
                    className={cn('rounded-lg px-3 py-2 text-sm font-semibold transition-colors duration-200', navFocus, isActive ? style.active : style.idle)}
                  >
                    {task.label}
                  </Link>
                )
              })}
              {profileLink ? (
                <Link
                  href={profileLink.href}
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold transition-colors duration-200',
                    navFocus,
                    pathname.startsWith(profileLink.href) ? style.active : style.idle,
                  )}
                >
                  <User className="h-4 w-4" />
                  {profileLink.label}
                </Link>
              ) : null}
            </div>
          ) : (
            <div className="hidden min-w-0 flex-1 items-center gap-1 overflow-hidden xl:flex">
              {primaryNavigation.map((task) => {
                const Icon = taskIcons[task.key] || LayoutGrid
                const isActive = pathname.startsWith(task.route)
                return (
                  <Link
                    key={task.key}
                    href={task.route}
                    className={cn(
                      'flex items-center gap-2 whitespace-nowrap rounded-full px-3 py-2 text-sm font-semibold transition-colors duration-200',
                      navFocus,
                      isActive ? style.active : style.idle,
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{task.label}</span>
                  </Link>
                )
              })}
              {profileLink ? (
                <Link
                  href={profileLink.href}
                  className={cn(
                    'flex items-center gap-2 whitespace-nowrap rounded-full px-3 py-2 text-sm font-semibold transition-colors duration-200',
                    navFocus,
                    pathname.startsWith(profileLink.href) ? style.active : style.idle,
                  )}
                >
                  <User className="h-4 w-4" />
                  <span>{profileLink.label}</span>
                </Link>
              ) : null}
            </div>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {primaryTask && (recipe.navbar === 'utility-bar' || recipe.navbar === 'floating-bar') ? (
            <Link
              href={primaryTask.route}
              className={cn(
                'hidden items-center gap-2 rounded-full border border-current/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] opacity-80 transition-opacity hover:opacity-100 md:inline-flex',
                navFocus,
              )}
            >
              <Sparkles className="h-3.5 w-3.5" />
              {primaryTask.label}
            </Link>
          ) : null}

          <Button variant="ghost" size="icon" asChild className={cn('hidden rounded-full md:flex', isFloating && 'text-slate-200 hover:bg-white/10 hover:text-white')}>
            <Link href="/search" className={navFocus}>
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Link>
          </Button>

          {isAuthenticated ? (
            <NavbarAuthControls accountTriggerClassName={authAccountTriggerClass} />
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <Button variant="ghost" size="sm" asChild className={cn('rounded-[var(--radius)] px-4', isFloating ? 'text-slate-200 hover:bg-white/10 hover:text-white' : 'text-neutral-700')}>
                <Link href="/login" className={navFocus}>
                  Sign in
                </Link>
              </Button>
              {isEditorial ? (
                <>
                  <Button variant="outline" size="sm" asChild className="rounded-[var(--radius)] border-neutral-200 bg-white px-4 shadow-none hover:bg-neutral-50">
                    <Link href="/contact" className={navFocus}>
                      Contact us
                    </Link>
                  </Button>
                  <Button size="sm" asChild className={style.cta}>
                    <Link href="/register" className={navFocus}>
                      Join
                    </Link>
                  </Button>
                </>
              ) : (
                <Button size="sm" asChild className={style.cta}>
                  <Link href="/register" className={navFocus}>
                    {isUtility ? 'Post Now' : 'Get Started'}
                  </Link>
                </Button>
              )}
            </div>
          )}

          <Button
            variant="ghost"
            size="icon"
            className={cn('rounded-full lg:hidden', isFloating && 'text-slate-200 hover:bg-white/10 hover:text-white')}
            aria-expanded={isMobileMenuOpen}
            aria-controls={mobileNavId}
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setIsMobileMenuOpen((o) => !o)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {isFloating && primaryTask ? (
        <div className="mx-auto hidden max-w-7xl px-4 pb-3 sm:px-6 lg:block lg:px-8">
          <Link
            href={primaryTask.route}
            className={cn(
              'inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-200 backdrop-blur transition-colors hover:bg-white/12',
              navFocus,
            )}
          >
            Featured surface
            <span>{primaryTask.label}</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      ) : null}

      {isMobileMenuOpen ? (
        <div
          id={mobileNavId}
          className={cn('relative z-50 max-h-[min(70vh,calc(100dvh-5rem))] overflow-y-auto overscroll-contain border-t lg:hidden', style.mobile)}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
        >
          <div className="space-y-1 px-4 py-4">
            <Link
              href="/search"
              onClick={closeMobile}
              className={cn('mb-2 flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-colors', mobileSearchCardClass, navFocus)}
            >
              <Search className="h-4 w-4 shrink-0 opacity-80" />
              Search the site
            </Link>
            {mobileNavigation.map((item) => {
              const isActive = pathname.startsWith(item.href)
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={closeMobile}
                  className={cn(
                    'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-colors duration-200',
                    navFocus,
                    isActive ? style.active : style.idle,
                  )}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  {item.name}
                </Link>
              )
            })}
            {profileLink ? (
              <Link
                href={profileLink.href}
                onClick={closeMobile}
                className={cn(
                  'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-colors duration-200',
                  navFocus,
                  pathname.startsWith(profileLink.href) ? style.active : style.idle,
                )}
              >
                <User className="h-5 w-5 shrink-0" />
                {profileLink.label}
              </Link>
            ) : null}

            <div className={cn('mt-4 space-y-2 border-t pt-4', mobileFooterBorderClass)}>
              {!isAuthenticated ? (
                <>
                  <Button variant="outline" size="sm" asChild className="w-full justify-center rounded-2xl">
                    <Link href="/login" onClick={closeMobile}>
                      Sign in
                    </Link>
                  </Button>
                  {isEditorial ? (
                    <>
                      <Button variant="outline" size="sm" asChild className="w-full justify-center rounded-2xl">
                        <Link href="/contact" onClick={closeMobile}>
                          Contact us
                        </Link>
                      </Button>
                      <Button size="sm" asChild className={cn('w-full justify-center rounded-2xl', style.cta)}>
                        <Link href="/register" onClick={closeMobile}>
                          Join
                        </Link>
                      </Button>
                    </>
                  ) : (
                    <Button size="sm" asChild className={cn('w-full justify-center rounded-2xl', style.cta)}>
                      <Link href="/register" onClick={closeMobile}>
                        {isUtility ? 'Post Now' : 'Get Started'}
                      </Link>
                    </Button>
                  )}
                </>
              ) : (
                <>
                  <p
                    className={cn(
                      'px-1 text-[10px] font-semibold uppercase tracking-[0.2em] opacity-60',
                      isFloating && 'text-slate-300',
                    )}
                  >
                    Create
                  </p>
                  {createTasks.map((task) => {
                    const Icon = taskIcons[task.key] || LayoutGrid
                    return (
                      <Link
                        key={task.key}
                        href={`/create/${task.key}`}
                        onClick={closeMobile}
                        title={`Create ${task.label}`}
                        className={cn(
                          'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-colors duration-200',
                          navFocus,
                          style.idle,
                        )}
                      >
                        <Icon className="h-5 w-5 shrink-0" />
                        {task.label}
                      </Link>
                    )
                  })}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className={cn('mt-1 w-full justify-center gap-2 rounded-2xl', isFloating && 'border-white/20 bg-transparent text-slate-100 hover:bg-white/10 hover:text-white')}
                    onClick={() => {
                      logout()
                      closeMobile()
                    }}
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      ) : null}
      </header>
    </Fragment>
  )
}
