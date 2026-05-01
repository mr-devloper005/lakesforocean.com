import Link from 'next/link'
import { ArrowRight, Globe, Mail, MapPin, Phone, ShieldCheck, Tag } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { TaskPostCard } from '@/components/shared/task-post-card'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'

export function DirectoryTaskDetailPage({
  task,
  taskLabel,
  taskRoute,
  post,
  description,
  category,
  images,
  mapEmbedUrl,
  related,
}: {
  task: TaskKey
  taskLabel: string
  taskRoute: string
  post: SitePost
  description: string
  category: string
  images: string[]
  mapEmbedUrl: string | null
  related: SitePost[]
}) {
  const content = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const location = typeof content.address === 'string' ? content.address : typeof content.location === 'string' ? content.location : ''
  const website = typeof content.website === 'string' ? content.website : ''
  const phone = typeof content.phone === 'string' ? content.phone : ''
  const email = typeof content.email === 'string' ? content.email : ''
  const highlights = Array.isArray(content.highlights) ? content.highlights.filter((item): item is string => typeof item === 'string') : []
  const schemaPayload = {
    '@context': 'https://schema.org',
    '@type': task === 'profile' ? 'Organization' : 'LocalBusiness',
    name: post.title,
    description,
    image: images[0],
    url: `${taskRoute}/${post.slug}`,
    address: location || undefined,
    telephone: phone || undefined,
    email: email || undefined,
  }

  return (
    <div className="min-h-screen !bg-slate-950 text-white overflow-x-hidden" style={{ backgroundColor: '#020617' }}>
      <SchemaJsonLd data={schemaPayload} />
      
      {/* Animated background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/20 blur-[100px] animate-pulse" />
        <div className="absolute top-1/3 -left-40 h-[400px] w-[400px] rounded-full bg-gradient-to-br from-orange-500/20 to-red-500/20 blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute -bottom-40 right-1/4 h-[450px] w-[450px] rounded-full bg-gradient-to-br from-amber-500/15 to-yellow-500/15 blur-[100px] animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      <main className="relative z-10 mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Link href={taskRoute} className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/70 backdrop-blur-md transition-all hover:bg-white/10 hover:text-white">
          ← Back to {taskLabel}
        </Link>

        <section className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
          <div>
            {/* Main image - No Card */}
            <div className="relative">
              <div className="h-[420px] overflow-hidden rounded-2xl">
                <ContentImage src={images[0]} alt={post.title} fill className="object-cover" />
              </div>
              
              {images.length > 1 ? (
                <div className="mt-4 grid grid-cols-4 gap-3">
                  {images.slice(1, 5).map((image) => (
                    <div key={image} className="relative h-24 overflow-hidden rounded-xl">
                      <ContentImage src={image} alt={post.title} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-300">About this {task}</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white">Structured details instead of a generic content block.</h2>
              <p className="mt-4 text-sm leading-8 text-white/70">{description}</p>
              {highlights.length ? (
                <div className="mt-6 grid gap-3 md:grid-cols-2">
                  {highlights.slice(0, 4).map((item, idx) => (
                    <div key={item} className="flex items-center gap-3 text-sm text-white/80">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-xs font-bold text-amber-300">
                        {idx + 1}
                      </span>
                      {item}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          <div className="space-y-6">
            {/* Main Info - No Card */}
            <div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-amber-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                    {category || taskLabel}
                  </p>
                  <h1 className="mt-3 text-4xl font-bold tracking-tight text-white bg-gradient-to-r from-white to-white/80 bg-clip-text">{post.title}</h1>
                </div>
                <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-white shadow-lg shadow-amber-500/30">
                  <ShieldCheck className="h-4 w-4" /> Verified
                </span>
              </div>

              <div className="mt-6 grid gap-3">
                {location ? (
                  <div className="flex items-center gap-3 text-sm text-white/80">
                    <MapPin className="h-4 w-4 text-amber-400" />
                    {location}
                  </div>
                ) : null}
                {phone ? (
                  <div className="flex items-center gap-3 text-sm text-white/80">
                    <Phone className="h-4 w-4 text-amber-400" />
                    {phone}
                  </div>
                ) : null}
                {email ? (
                  <div className="flex items-center gap-3 text-sm text-white/80">
                    <Mail className="h-4 w-4 text-amber-400" />
                    {email}
                  </div>
                ) : null}
                {website ? (
                  <div className="flex items-center gap-3 text-sm text-white/80">
                    <Globe className="h-4 w-4 text-amber-400" />
                    {website}
                  </div>
                ) : null}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {website ? (
                  <a href={website} target="_blank" rel="noreferrer" className="group/btn inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/30 transition-all hover:shadow-orange-500/50 hover:scale-105">
                    Visit website 
                    <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </a>
                ) : null}
                <Link href={taskRoute} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-md transition-all hover:bg-white/20 hover:scale-105">
                  Browse more
                </Link>
              </div>
            </div>

            {mapEmbedUrl ? (
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-300 mb-3">Location</p>
                <iframe src={mapEmbedUrl} title={`${post.title} map`} className="h-[320px] w-full rounded-2xl border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
            ) : null}

            {/* Trust Cues */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck className="h-4 w-4 text-amber-400" />
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-amber-300">Quick trust cues</p>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {[
                  'Clear contact details',
                  'Stronger business framing',
                  'Map and location cues',
                  'Related surfaces nearby'
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-white/80">
                    <span className="text-amber-400 font-bold">✓</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {related.length ? (
          <section className="mt-16">
            <div className="flex items-end justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-amber-300">Related surfaces</p>
                </div>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">Keep browsing nearby matches.</h2>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white/70 backdrop-blur-md">
                <Tag className="h-3.5 w-3.5" /> {taskLabel}
              </span>
            </div>
            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {related.map((item) => (
                <TaskPostCard key={item.id} post={item} href={`${taskRoute}/${item.slug}`} taskKey={task} />
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </div>
  )
}
