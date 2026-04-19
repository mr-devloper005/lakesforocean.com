"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Compass, Image as ImageIcon, Search, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContentImage } from "@/components/shared/content-image";
import { SITE_CONFIG, type TaskConfig } from "@/lib/site-config";
import { siteContent } from "@/config/site.content";
import { SITE_THEME } from "@/config/site.theme";

const FALLBACK_IMAGE = "/placeholder.svg?height=1400&width=2400";

const heroClasses = {
  'search-first': {
    section: 'border-b border-slate-200 bg-[linear-gradient(180deg,#edf5ff_0%,#f8fbff_42%,#ffffff_100%)] text-slate-950',
    overlay: 'bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_26%),radial-gradient(circle_at_top_right,rgba(15,23,42,0.12),transparent_26%)]',
    grid: 'lg:grid-cols-[1.08fr_0.92fr]',
    card: 'border border-white/70 bg-white/80 shadow-[0_28px_90px_rgba(15,23,42,0.12)]',
    title: 'text-slate-950',
    body: 'text-slate-600',
    badge: 'bg-slate-950 text-white',
    primary: 'bg-slate-950 text-white hover:bg-slate-800',
    secondary: 'border border-slate-200 bg-white text-slate-900 hover:bg-slate-100',
  },
  'spotlight-split': {
    section: 'border-b border-[rgba(123,72,35,0.14)] bg-[linear-gradient(180deg,#1f1613_0%,#2d1d17_50%,#fff7ed_100%)] text-white',
    overlay: 'bg-[linear-gradient(90deg,rgba(20,12,9,0.88)_0%,rgba(32,19,14,0.66)_45%,rgba(255,247,237,0)_100%)]',
    grid: 'lg:grid-cols-[1.14fr_0.86fr]',
    card: 'border border-white/10 bg-white/8 shadow-[0_28px_100px_rgba(18,9,4,0.4)] backdrop-blur-md',
    title: 'text-white',
    body: 'text-amber-100/78',
    badge: 'bg-[#ffdd9c] text-[#2a160c]',
    primary: 'bg-[#ffdd9c] text-[#2a160c] hover:bg-[#ffd17d]',
    secondary: 'border border-white/18 bg-white/10 text-white hover:bg-white/16',
  },
  'gallery-mosaic': {
    section:
      'border-b border-neutral-200/90 bg-[linear-gradient(180deg,#ffffff_0%,#fafafa_48%,#f5f5f7_100%)] text-neutral-950',
    overlay:
      'bg-[radial-gradient(ellipse_90%_60%_at_0%_-10%,rgba(200,120,200,0.08),transparent_55%),radial-gradient(ellipse_70%_50%_at_100%_0%,rgba(255,160,120,0.07),transparent_50%),linear-gradient(180deg,rgba(255,255,255,0.82)_0%,rgba(252,252,254,0.9)_55%,rgba(250,250,252,0.94)_100%)]',
    grid: 'lg:grid-cols-[0.95fr_1.05fr]',
    card: 'border border-neutral-200/90 bg-white/95 shadow-[0_22px_64px_rgba(15,15,25,0.07)] backdrop-blur-sm',
    title: 'text-neutral-950',
    body: 'text-neutral-600',
    badge: 'editorial-label',
    primary: 'bg-neutral-950 text-white shadow-[0_14px_32px_rgba(0,0,0,0.12)] hover:bg-neutral-800',
    secondary: 'border border-neutral-200 bg-white text-neutral-950 hover:bg-neutral-50',
  },
  'catalog-promo': {
    section: 'border-b border-[rgba(66,74,42,0.14)] bg-[linear-gradient(180deg,#f6f6ee_0%,#f4f7df_35%,#ffffff_100%)] text-[#18210f]',
    overlay: 'bg-[radial-gradient(circle_at_top_right,rgba(163,230,53,0.16),transparent_22%),radial-gradient(circle_at_top_left,rgba(34,197,94,0.14),transparent_24%)]',
    grid: 'lg:grid-cols-[1.12fr_0.88fr]',
    card: 'border border-[#dce5c2] bg-white/90 shadow-[0_28px_80px_rgba(64,76,34,0.12)]',
    title: 'text-[#18210f]',
    body: 'text-[#5c684b]',
    badge: 'bg-[#18210f] text-[#ebf5d9]',
    primary: 'bg-[#18210f] text-[#ebf5d9] hover:bg-[#25331a]',
    secondary: 'border border-[#dce5c2] bg-white text-[#18210f] hover:bg-[#f4f7df]',
  },
} as const;

export function HeroSection({
  images,
  tasks,
  layout = "default",
}: {
  images: string[];
  tasks: TaskConfig[];
  layout?: "default" | "minimal";
}) {
  const slides = useMemo(() => {
    const valid = images.filter(Boolean);
    return valid.length ? valid.slice(0, 4) : [FALLBACK_IMAGE];
  }, [images]);

  const [activeIndex, setActiveIndex] = useState(0);
  const primaryTask = tasks.find((task) => task.key === SITE_THEME.home.primaryTask) || tasks[0];
  const featuredTasks = tasks.filter((task) => SITE_THEME.home.featuredTaskKeys.includes(task.key)).slice(0, 3);
  const palette = heroClasses[SITE_THEME.hero.variant];
  const variant = SITE_THEME.hero.variant;
  const isGalleryMosaic = variant === "gallery-mosaic";
  const buttonRound = isGalleryMosaic ? "rounded-[var(--radius)]" : "rounded-full";
  const iconWellClass = isGalleryMosaic
    ? "rounded-[var(--radius)] bg-neutral-100 p-3 text-neutral-700"
    : "rounded-full bg-white/10 p-3 text-current";
  const taskTileClass = isGalleryMosaic
    ? "rounded-[1.15rem] border border-neutral-200/90 bg-white p-4 shadow-[0_8px_24px_rgba(15,15,25,0.05)]"
    : "rounded-[1.4rem] border border-white/10 bg-black/10 p-4";
  const taskMetaClass = isGalleryMosaic ? "text-neutral-500" : "opacity-65";
  const taskBodyClass = isGalleryMosaic ? "text-neutral-600" : "opacity-75";
  const taskLinkClass = isGalleryMosaic
    ? "mt-4 inline-flex items-center gap-2 text-sm font-semibold text-neutral-950 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-950"
    : "mt-4 inline-flex items-center gap-2 text-sm font-semibold underline underline-offset-4";

  useEffect(() => {
    if (layout === "minimal" || slides.length <= 1) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [slides, layout]);

  if (layout === "minimal") {
    const subtitle = siteContent.hero.title[1];
    return (
      <section className="border-b border-neutral-200/90 bg-white text-neutral-950">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20 lg:pb-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-neutral-200/80 bg-gradient-to-r from-violet-100/95 via-white to-orange-100/90 py-1 pl-1 pr-4 shadow-sm">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md pinion-gradient-icon">
                <ImageIcon className="h-4 w-4 text-white" aria-hidden />
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-900">{SITE_THEME.hero.eyebrow}</span>
            </div>
            <h1 className="mt-8 font-sans text-4xl font-semibold tracking-[-0.035em] text-neutral-950 sm:text-5xl lg:text-[2.75rem] lg:leading-[1.12]">
              {siteContent.hero.title[0]}
              {subtitle ? <span className="mt-2 block text-neutral-800">{subtitle}</span> : null}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-neutral-600">{siteContent.hero.description}</p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className={`${isGalleryMosaic ? "rounded-[var(--radius)]" : "rounded-full"} px-6 ${palette.primary}`}>
                <Link href={siteContent.hero.primaryCta.href}>
                  {siteContent.hero.primaryCta.label}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className={`${isGalleryMosaic ? "rounded-[var(--radius)]" : "rounded-full"} px-6 shadow-none ${palette.secondary}`}>
                <Link href={siteContent.hero.secondaryCta.href}>{siteContent.hero.secondaryCta.label}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`relative overflow-hidden ${palette.section}`}>
      <div className="absolute inset-0">
        <ContentImage
          key={slides[activeIndex]}
          src={slides[activeIndex]}
          alt={`Featured visual ${activeIndex + 1} from ${SITE_CONFIG.name}`}
          fill
          priority
          sizes="100vw"
          className={isGalleryMosaic ? "object-cover opacity-[0.22]" : "object-cover opacity-35"}
          intrinsicWidth={1600}
          intrinsicHeight={900}
        />
      </div>
      <div className={`absolute inset-0 ${palette.overlay}`} />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className={`grid items-center gap-12 ${palette.grid}`}>
          <div className="max-w-3xl">
            <div
              className={
                isGalleryMosaic
                  ? `editorial-label gap-2`
                  : `inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] ${palette.badge}`
              }
            >
              <Sparkles className="h-3.5 w-3.5 shrink-0" />
              {SITE_THEME.hero.eyebrow}
            </div>
            <h1 className={`mt-6 text-5xl font-semibold tracking-[-0.06em] sm:text-6xl ${palette.title}`}>
              {siteContent.hero.title[0]}{" "}
              {siteContent.hero.title[1] ? <span className="block opacity-90">{siteContent.hero.title[1]}</span> : null}
            </h1>
            <p className={`mt-6 max-w-2xl text-base leading-8 sm:text-lg ${palette.body}`}>{siteContent.hero.description}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className={`${buttonRound} px-6 ${palette.primary}`}>
                <Link href={siteContent.hero.primaryCta.href}>
                  {siteContent.hero.primaryCta.label}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className={`${buttonRound} px-6 ${palette.secondary}`}>
                <Link href={siteContent.hero.secondaryCta.href}>{siteContent.hero.secondaryCta.label}</Link>
              </Button>
            </div>

            <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-[1.1fr_0.9fr]">
              <div className={`flex items-center gap-3 rounded-[1.25rem] p-4 ${palette.card}`}>
                <div className={iconWellClass}>
                  <Search className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] opacity-70">Primary task</p>
                  <p className="mt-1 text-lg font-semibold">{primaryTask?.label || SITE_CONFIG.name}</p>
                  <p className="mt-1 text-sm opacity-75">{primaryTask?.description}</p>
                </div>
              </div>
              <div className={`flex items-center gap-3 rounded-[1.25rem] p-4 ${palette.card}`}>
                <div className={iconWellClass}>
                  <Compass className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] opacity-70">Explore flow</p>
                  <p className="mt-1 text-lg font-semibold">{featuredTasks.length} highlighted surfaces</p>
                  <p className="mt-1 text-sm opacity-75">Built for discovery without repeating the same layout rhythm.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className={`overflow-hidden rounded-[1.25rem] p-4 sm:p-5 ${palette.card}`}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="relative min-h-[220px] overflow-hidden rounded-[1.15rem] sm:min-h-[280px]">
                  <ContentImage
                    src={slides[(activeIndex + 1) % slides.length] || slides[0]}
                    alt={`Supporting visual from ${SITE_CONFIG.name}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    intrinsicWidth={1000}
                    intrinsicHeight={1200}
                  />
                </div>
                <div className="flex flex-col justify-between gap-4">
                  {featuredTasks.map((task, index) => (
                    <div key={task.key} className={taskTileClass}>
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className={`text-[10px] font-semibold uppercase tracking-[0.24em] ${taskMetaClass}`}>Lane {index + 1}</p>
                          <p className="mt-2 text-xl font-semibold">{task.label}</p>
                        </div>
                        <Star className={`h-4 w-4 ${isGalleryMosaic ? "text-neutral-400" : "opacity-70"}`} />
                      </div>
                      <p className={`mt-3 text-sm leading-6 ${taskBodyClass}`}>{task.description}</p>
                      <Link href={task.route} className={taskLinkClass}>
                        Open section
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {slides.length > 1 ? (
              <div className="flex items-center gap-2">
                {slides.map((_, index) => (
                  <span
                    key={index}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      index === activeIndex
                        ? isGalleryMosaic
                          ? "w-10 bg-neutral-950"
                          : "w-10 bg-primary"
                        : isGalleryMosaic
                          ? "w-2.5 bg-neutral-300"
                          : "w-2.5 bg-current/30"
                    }`}
                  />
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
