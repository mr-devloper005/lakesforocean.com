import { ContentImage } from "@/components/shared/content-image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Globe, Phone, Tag, Mail } from "lucide-react";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { Footer } from "@/components/shared/footer";
import { TaskPostCard } from "@/components/shared/task-post-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { buildPostUrl, fetchTaskPostBySlug, fetchTaskPosts } from "@/lib/task-data";
import { SITE_CONFIG, getTaskConfig, type TaskKey } from "@/lib/site-config";
import type { SitePost } from "@/lib/site-connector";
import { TaskImageCarousel } from "@/components/tasks/task-image-carousel";
import { cn } from "@/lib/utils";
import { ArticleComments } from "@/components/tasks/article-comments";
import { SchemaJsonLd } from "@/components/seo/schema-jsonld";
import { RichContent, formatRichHtml } from "@/components/shared/rich-content";
import { getFactoryState } from "@/design/factory/get-factory-state";
import { getProductKind } from "@/design/factory/get-product-kind";
import { DirectoryTaskDetailPage } from "@/design/products/directory/task-detail-page";
import { TASK_DETAIL_PAGE_OVERRIDE_ENABLED, TaskDetailPageOverride } from "@/overrides/task-detail-page";
import { pinionAppShell } from "@/config/pinion-surfaces";

type PostContent = {
  category?: string;
  location?: string;
  address?: string;
  website?: string;
  phone?: string;
  email?: string;
  description?: string;
  body?: string;
  excerpt?: string;
  author?: string;
  highlights?: string[];
  logo?: string;
  images?: string[];
  latitude?: number | string;
  longitude?: number | string;
};

const isValidImageUrl = (value?: string | null) =>
  typeof value === "string" && (value.startsWith("/") || /^https?:\/\//i.test(value));

const absoluteUrl = (value?: string | null) => {
  if (!value) return null;
  if (/^https?:\/\//i.test(value)) return value;
  if (!value.startsWith("/")) return null;
  return `${SITE_CONFIG.baseUrl.replace(/\/$/, "")}${value}`;
};

const getContent = (post: SitePost): PostContent => {
  const content = post.content && typeof post.content === "object" ? post.content : {};
  return content as PostContent;
};

const formatArticleHtml = (content: PostContent, post: SitePost) => {
  const raw =
    (typeof content.body === "string" && content.body.trim()) ||
    (typeof content.description === "string" && content.description.trim()) ||
    (typeof post.summary === "string" && post.summary.trim()) ||
    "";

  return formatRichHtml(raw, "Details coming soon.");
};

const getImageUrls = (post: SitePost, content: PostContent) => {
  const media = Array.isArray(post.media) ? post.media : [];
  const mediaImages = media
    .map((item) => item?.url)
    .filter((url): url is string => isValidImageUrl(url));
  const contentImages = Array.isArray(content.images)
    ? content.images.filter((url): url is string => isValidImageUrl(url))
    : [];
  const merged = [...mediaImages, ...contentImages];
  if (merged.length) return merged;
  if (isValidImageUrl(content.logo)) return [content.logo as string];
  return ["/placeholder.svg?height=900&width=1400"];
};

const toNumber = (value?: number | string) => {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
};

const buildMapEmbedUrl = (
  latitude?: number | string,
  longitude?: number | string,
  address?: string
) => {
  const lat = toNumber(latitude);
  const lon = toNumber(longitude);
  const normalizedAddress = typeof address === "string" ? address.trim() : "";
  const googleMapsEmbedApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY?.trim();

  if (googleMapsEmbedApiKey) {
    const query = lat !== null && lon !== null ? `${lat},${lon}` : normalizedAddress;
    if (!query) return null;
    return `https://www.google.com/maps/embed/v1/place?key=${encodeURIComponent(
      googleMapsEmbedApiKey
    )}&q=${encodeURIComponent(query)}`;
  }

  if (lat !== null && lon !== null) {
    const delta = 0.01;
    const left = lon - delta;
    const right = lon + delta;
    const bottom = lat - delta;
    const top = lat + delta;
    const bbox = `${left},${bottom},${right},${top}`;
    return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(
      bbox
    )}&layer=mapnik&marker=${encodeURIComponent(`${lat},${lon}`)}`;
  }

  if (normalizedAddress) {
    return `https://www.google.com/maps?q=${encodeURIComponent(normalizedAddress)}&output=embed`;
  }

  return null;
};

export async function TaskDetailPage({ task, slug }: { task: TaskKey; slug: string }) {
  if (TASK_DETAIL_PAGE_OVERRIDE_ENABLED) {
    return await TaskDetailPageOverride({ task, slug });
  }

  const taskConfig = getTaskConfig(task);
  let post: SitePost | null = null;
  try {
    post = await fetchTaskPostBySlug(task, slug);
  } catch (error) {
    console.warn("Failed to load post detail", error);
  }

  if (!post) {
    notFound();
  }

  const content = getContent(post);
  const isClassified = task === "classified";
  const isArticle = task === "article";
  const isImage = task === "image";
  const isProfile = task === "profile";
  const category = content.category || post.tags?.[0] || taskConfig?.label || task;
  const description = content.description || post.summary || "Details coming soon.";
  const descriptionHtml = !isArticle ? formatRichHtml(description, "Details coming soon.") : "";
  const articleHtml = isArticle ? formatArticleHtml(content, post) : "";
  const articleSummary =
    post.summary ||
    (typeof content.excerpt === "string" ? content.excerpt : "") ||
    "";
  const articleAuthor =
    (typeof content.author === "string" && content.author.trim()) ||
    post.authorName ||
    "Editorial Team";
  const articleDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";
  const postTags = Array.isArray(post.tags) ? post.tags.filter((tag) => typeof tag === "string") : [];
  const location = content.address || content.location;
  const images = getImageUrls(post, content);
  const mapEmbedUrl = buildMapEmbedUrl(content.latitude, content.longitude, location);
  const isBookmark = task === "sbm" || task === "social";
  const hideSidebar = isClassified || isArticle || task === "image" || isBookmark;
  const profileWebsite = typeof content.website === "string" ? content.website : "";
  const profileDomain = profileWebsite ? profileWebsite.replace(/^https?:\/\//, "").replace(/\/.*$/, "") : "";
  const profileName =
    (typeof (content as Record<string, unknown>).brandName === "string" && String((content as Record<string, unknown>).brandName)) ||
    (typeof (content as Record<string, unknown>).companyName === "string" && String((content as Record<string, unknown>).companyName)) ||
    (typeof (content as Record<string, unknown>).name === "string" && String((content as Record<string, unknown>).name)) ||
    post.title;
  const related = (await fetchTaskPosts(task, 6))
    .filter((item) => item.slug !== post.slug)
    .filter((item) => {
      if (!content.category) return true;
      const itemContent = getContent(item);
      return itemContent.category === content.category;
    })
    .slice(0, 3);
  const articleUrl = `${SITE_CONFIG.baseUrl.replace(/\/$/, "")}${taskConfig?.route || "/articles"}/${post.slug}`;
  const articleImage = absoluteUrl(images[0]) || absoluteUrl(SITE_CONFIG.defaultOgImage);
  const articleSchema = isArticle
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        description: articleSummary || description,
        image: articleImage ? [articleImage] : [],
        author: {
          "@type": "Person",
          name: articleAuthor,
        },
        datePublished: post.publishedAt || undefined,
        dateModified: post.publishedAt || undefined,
        articleSection: category,
        keywords: postTags.join(", "),
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": articleUrl,
        },
      }
    : null;
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_CONFIG.baseUrl.replace(/\/$/, ""),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: taskConfig?.label || "Posts",
        item: `${SITE_CONFIG.baseUrl.replace(/\/$/, "")}${taskConfig?.route || "/"}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${SITE_CONFIG.baseUrl.replace(/\/$/, "")}${taskConfig?.route || "/posts"}/${post.slug}`,
      },
    ],
  };
  const schemaPayload = articleSchema ? [articleSchema, breadcrumbSchema] : breadcrumbSchema;
  const { recipe } = getFactoryState();
  const productKind = getProductKind(recipe);

  if (productKind === "directory" && (task === "listing" || task === "classified" || task === "profile")) {
    return (
      <>
        <NavbarShell />
        <DirectoryTaskDetailPage
          task={task}
          taskLabel={taskConfig?.label || task}
          taskRoute={taskConfig?.route || "/"}
          post={post}
          description={description}
          category={category}
          images={images}
          mapEmbedUrl={mapEmbedUrl}
          related={related}
        />
        <Footer />
      </>
    );
  }

  return (
    <div className={pinionAppShell}>
      <NavbarShell />
      <main className={cn("mx-auto py-10", isProfile ? "w-full px-0" : "max-w-7xl px-4 sm:px-6 lg:px-8")}>
        <SchemaJsonLd data={schemaPayload} />
        <Link
          href={taskConfig?.route || "/"}
          className="mb-6 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          ← Back to {taskConfig?.label || "posts"}
        </Link>

        <div
          className={cn(
            isProfile ? "flex flex-col" : "grid gap-10",
            !isProfile && (hideSidebar ? "lg:grid-cols-1" : "lg:grid-cols-[2fr_1fr]")
          )}
        >
          <div className={cn(isClassified ? "space-y-8" : "")}>
            {isArticle ? (
              <div className="mx-auto w-full max-w-4xl space-y-6">
                <h1 className="text-4xl font-semibold leading-tight text-foreground">
                  {post.title}
                </h1>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                  <span>By {articleAuthor}</span>
                  {articleDate ? <span>{articleDate}</span> : null}
                  <Badge variant="secondary" className="inline-flex items-center gap-1">
                    <Tag className="h-3.5 w-3.5" />
                    {category}
                  </Badge>
                </div>
                {postTags.length ? (
                  <div className="flex flex-wrap gap-2">
                    {postTags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                ) : null}
                {images[0] ? (
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[1.25rem] border border-neutral-200/90 bg-muted">
                    <ContentImage
                      src={images[0]}
                      alt={`${post.title} featured image`}
                      fill
                      className="object-cover"
                      intrinsicWidth={1600}
                      intrinsicHeight={900}
                    />
                  </div>
                ) : null}
                <RichContent html={articleHtml} className="leading-8 prose-p:my-6 prose-h2:my-8 prose-h3:my-6 prose-ul:my-6" />
                <ArticleComments slug={post.slug} />
              </div>
            ) : null}

            {!isArticle ? (
              <>
                {isImage ? (
                  <div className="relative -mx-4 w-[calc(100%+2rem)] overflow-hidden bg-slate-950 sm:-mx-6 sm:w-[calc(100%+3rem)] lg:-mx-8 lg:w-[calc(100%+4rem)]">
                    <div className="absolute inset-0 z-0 opacity-30">
                      <ContentImage
                        src={images[0]}
                        alt=""
                        fill
                        className="object-cover"
                        intrinsicWidth={800}
                        intrinsicHeight={800}
                      />
                    </div>
                    <div className="absolute inset-0 z-0 bg-gradient-to-br from-emerald-600/80 via-teal-600/60 to-cyan-500/80 mix-blend-multiply" />
                    <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-emerald-400/30 blur-3xl animate-pulse" />
                    <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-teal-400/30 blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
                    
                    <div className="relative z-10 flex flex-col">
                      <div className="flex flex-wrap items-center justify-center gap-8 p-16">
                        {images.map((image, index) => (
                          <div key={index} className="relative group">
                            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 opacity-75 blur transition duration-1000 group-hover:opacity-100 group-hover:duration-200" />
                            <div className="relative h-56 w-56 overflow-hidden rounded-full border-4 border-white/30 bg-white/10 backdrop-blur-xl shadow-2xl">
                              <ContentImage
                                src={image}
                                alt={`${post.title} image ${index + 1}`}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                intrinsicWidth={800}
                                intrinsicHeight={800}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-col justify-center space-y-8 bg-black/40 p-16 backdrop-blur-2xl border-t border-white/10">
                        <div className="flex flex-wrap items-center justify-center gap-4">
                          <Badge className="border-2 border-emerald-400/50 bg-emerald-400/20 px-5 py-2.5 text-base font-semibold text-emerald-100 backdrop-blur-md shadow-lg shadow-emerald-400/20">{category}</Badge>
                          {location ? (
                            <span className="inline-flex items-center gap-2 text-white/70">
                              <MapPin className="h-5 w-5" />
                              {location}
                            </span>
                          ) : null}
                        </div>
                        <h1 className="text-center text-5xl font-black text-white tracking-tight">{post.title}</h1>
                        <RichContent html={descriptionHtml} className="max-w-none text-center text-xl text-white/80 leading-relaxed" />
                        <div className="flex flex-wrap justify-center gap-6 pt-6">
                          {content.email ? (
                            <a href={`mailto:${content.email}`} className="inline-flex items-center gap-3 rounded-2xl border-2 border-white/30 bg-white/10 px-8 py-4 text-lg font-bold text-white backdrop-blur-md hover:bg-white/20 transition-all hover:scale-105">
                              <Mail className="h-5 w-5" />
                              {content.email}
                            </a>
                          ) : null}
                          {content.website ? (
                            <a href={content.website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 px-8 py-4 text-lg font-bold text-white shadow-2xl shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all hover:scale-105">
                              <Globe className="h-5 w-5" />
                              Visit source
                            </a>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}

                {isProfile ? (
                  <div className="relative -mx-4 w-[calc(100%+2rem)] overflow-hidden bg-slate-950 sm:-mx-6 sm:w-[calc(100%+3rem)] lg:-mx-8 lg:w-[calc(100%+4rem)]">
                    <div className="absolute inset-0 z-0 opacity-40">
                      <ContentImage
                        src={images[0]}
                        alt=""
                        fill
                        className="object-cover"
                        intrinsicWidth={800}
                        intrinsicHeight={800}
                      />
                    </div>
                    <div className="absolute inset-0 z-0 bg-gradient-to-br from-violet-600/80 via-fuchsia-600/60 to-cyan-500/80 mix-blend-multiply" />
                    <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-cyan-400/30 blur-3xl animate-pulse" />
                    <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-fuchsia-400/30 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                    <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-400/20 blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
                    
                    <div className="relative z-10 flex flex-col">
                      <div className="flex flex-col items-center justify-center gap-8 p-16">
                        <div className="relative group">
                          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-violet-400 opacity-75 blur transition duration-1000 group-hover:opacity-100 group-hover:duration-200" />
                          <div className="relative h-80 w-80 overflow-hidden rounded-full border-4 border-white/30 bg-white/10 backdrop-blur-xl shadow-2xl">
                            <ContentImage
                              src={images[0]}
                              alt={profileName}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-110"
                              intrinsicWidth={400}
                              intrinsicHeight={400}
                            />
                          </div>
                        </div>
                        <div className="flex flex-wrap justify-center gap-4">
                          <Badge className="border-2 border-cyan-400/50 bg-cyan-400/20 px-5 py-2.5 text-base font-semibold text-cyan-100 backdrop-blur-md shadow-lg shadow-cyan-400/20">{category}</Badge>
                          {location ? <Badge className="border-2 border-fuchsia-400/50 bg-fuchsia-400/20 px-5 py-2.5 text-base font-semibold text-fuchsia-100 backdrop-blur-md shadow-lg shadow-fuchsia-400/20">{location}</Badge> : null}
                        </div>
                      </div>
                      <div className="flex flex-col justify-center space-y-8 bg-black/40 p-16 backdrop-blur-2xl border-t border-white/10">
                        <div className="text-center">
                          <p className="text-sm font-bold uppercase tracking-[0.4em] text-cyan-300">{taskConfig?.label || "Profile"}</p>
                          <h1 className="mt-4 text-5xl font-black text-white tracking-tight">{profileName}</h1>
                          {profileDomain ? <p className="mt-3 text-xl font-medium text-white/70">{profileDomain}</p> : null}
                        </div>
                        <RichContent html={descriptionHtml} className="max-w-none text-center text-xl text-white/80 leading-relaxed" />
                        <div className="flex flex-wrap justify-center gap-6 pt-6">
                          {profileWebsite ? (
                            <Button className="h-14 rounded-2xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 px-10 text-lg font-bold text-white shadow-2xl shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all hover:scale-105" asChild>
                              <a href={profileWebsite} target="_blank" rel="noreferrer">Visit website</a>
                            </Button>
                          ) : null}
                          {content.email ? (
                            <Button variant="outline" className="h-14 rounded-2xl border-2 border-white/30 bg-white/10 px-10 text-lg font-bold text-white backdrop-blur-md hover:bg-white/20 transition-all hover:scale-105" asChild>
                              <a href={`mailto:${content.email}`}>Email profile</a>
                            </Button>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}

                {!isBookmark && !isImage && !isProfile ? (
                  <div className={cn(isClassified ? "w-full" : "")}>
                    <TaskImageCarousel images={images} />
                  </div>
                ) : null}

                {!isImage && !isProfile ? (
                <div className={cn(isClassified ? "mx-auto w-full max-w-4xl" : "mt-6")}>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <Badge variant="secondary" className="inline-flex items-center gap-1">
                      <Tag className="h-3.5 w-3.5" />
                      {category}
                    </Badge>
                    {location && (
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {location}
                      </span>
                    )}
                  </div>
                  <h1 className="mt-4 text-3xl font-semibold text-foreground">{post.title}</h1>
                  <RichContent html={descriptionHtml} className="mt-3 max-w-3xl" />
                </div>
                ) : null}
              </>
            ) : null}

            {isClassified ? (
              <div className="mx-auto w-full max-w-4xl rounded-2xl border border-border bg-card p-6">
                <h2 className="text-lg font-semibold text-foreground">Business details</h2>
                <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                  {content.website && (
                    <div className="flex items-start gap-2">
                      <Globe className="mt-0.5 h-4 w-4" />
                      <a
                        href={content.website}
                        className="break-all text-foreground hover:underline"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {content.website}
                      </a>
                    </div>
                  )}
                  {content.phone && (
                    <div className="flex items-start gap-2">
                      <Phone className="mt-0.5 h-4 w-4" />
                      <span>{content.phone}</span>
                    </div>
                  )}
                  {content.email && (
                    <div className="flex items-start gap-2">
                      <Mail className="mt-0.5 h-4 w-4" />
                      <a
                        href={`mailto:${content.email}`}
                        className="break-all text-foreground hover:underline"
                      >
                        {content.email}
                      </a>
                    </div>
                  )}
                  {location && (
                    <div className="flex items-start gap-2">
                      <MapPin className="mt-0.5 h-4 w-4" />
                      <span>{location}</span>
                    </div>
                  )}
                </div>
              </div>
            ) : null}

            {content.highlights?.length && !isArticle ? (
              <div className={cn("mt-8 rounded-2xl border border-border bg-card p-6", isClassified ? "mx-auto w-full max-w-4xl" : "")}>
                <h2 className="text-lg font-semibold text-foreground">Highlights</h2>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {content.highlights.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            {isClassified && mapEmbedUrl ? (
              <div className="mx-auto w-full max-w-4xl rounded-2xl border border-border bg-card p-4">
                <p className="text-sm font-semibold text-foreground">Location map</p>
                <div className="mt-4 overflow-hidden rounded-xl border border-border">
                  <iframe
                    title="Business location map"
                    src={mapEmbedUrl}
                    className="h-56 w-full"
                    loading="lazy"
                  />
                </div>
              </div>
            ) : null}

          </div>

          {!hideSidebar ? (
            <aside className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-lg font-semibold text-foreground">Listing details</h2>
                <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                  {content.website && (
                    <div className="flex items-start gap-2">
                      <Globe className="mt-0.5 h-4 w-4" />
                      <a
                        href={content.website}
                        className="break-all text-foreground hover:underline"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {content.website}
                      </a>
                    </div>
                  )}
                  {content.phone && (
                    <div className="flex items-start gap-2">
                      <Phone className="mt-0.5 h-4 w-4" />
                      <span>{content.phone}</span>
                    </div>
                  )}
                  {content.email && (
                    <div className="flex items-start gap-2">
                      <Mail className="mt-0.5 h-4 w-4" />
                      <a
                        href={`mailto:${content.email}`}
                        className="break-all text-foreground hover:underline"
                      >
                        {content.email}
                      </a>
                    </div>
                  )}
                  {location && (
                    <div className="flex items-start gap-2">
                      <MapPin className="mt-0.5 h-4 w-4" />
                      <span>{location}</span>
                    </div>
                  )}
                </div>
              {content.website ? (
                <Button className="mt-5 w-full" asChild>
                  <a href={content.website} target="_blank" rel="noreferrer">
                    Visit Website
                  </a>
                </Button>
              ) : null}
            </div>

            {mapEmbedUrl ? (
              <div className="rounded-2xl border border-border bg-card p-4">
                <p className="text-sm font-semibold text-foreground">Location map</p>
                <div className="mt-4 overflow-hidden rounded-xl border border-border">
                  <iframe
                    title="Business location map"
                    src={mapEmbedUrl}
                    className="h-56 w-full"
                    loading="lazy"
                  />
                </div>
              </div>
            ) : null}

          </aside>
          ) : null}
        </div>

        <section className="mt-12">
          {related.length ? (
            <>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">
                More in {category}
              </h2>
              {taskConfig?.route && (
                <Link
                  href={taskConfig.route}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  View all
                </Link>
              )}
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <TaskPostCard
                  key={item.id}
                  post={item}
                  href={buildPostUrl(task, item.slug)}
                />
              ))}
            </div>
            </>
          ) : null}
          <nav className="mt-6 rounded-2xl border border-border bg-card/60 p-4">
            <p className="text-sm font-semibold text-foreground">Related links</p>
            <ul className="mt-2 space-y-2 text-sm">
              {related.map((item) => (
                <li key={`link-${item.id}`}>
                  <Link
                    href={buildPostUrl(task, item.slug)}
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
              {taskConfig?.route ? (
                <li>
                  <Link
                    href={taskConfig.route}
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    Browse all {taskConfig.label}
                  </Link>
                </li>
              ) : null}
              <li>
                <Link
                  href={`/search?q=${encodeURIComponent(category)}`}
                  className="text-primary underline-offset-4 hover:underline"
                >
                  Search more in {category}
                </Link>
              </li>
            </ul>
          </nav>
        </section>
      </main>
      <Footer />
    </div>
  );
}
