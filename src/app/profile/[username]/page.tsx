import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/shared/footer";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { ContentImage } from "@/components/shared/content-image";
import { TaskPostCard } from "@/components/shared/task-post-card";
import { Button } from "@/components/ui/button";
import { SchemaJsonLd } from "@/components/seo/schema-jsonld";
import { RichContent, formatRichHtml } from "@/components/shared/rich-content";
import { buildPostUrl } from "@/lib/task-data";
import { buildPostMetadata, buildTaskMetadata } from "@/lib/seo";
import { fetchTaskPostBySlug, fetchTaskPosts } from "@/lib/task-data";
import { SITE_CONFIG } from "@/lib/site-config";

export const revalidate = 3;

export async function generateStaticParams() {
  const posts = await fetchTaskPosts("profile", 50);
  if (!posts.length) {
    return [{ username: "placeholder" }];
  }
  return posts.map((post) => ({ username: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = await params;
  try {
    const post = await fetchTaskPostBySlug("profile", resolvedParams.username);
    return post ? await buildPostMetadata("profile", post) : await buildTaskMetadata("profile");
  } catch (error) {
    console.warn("Profile metadata lookup failed", error);
    return await buildTaskMetadata("profile");
  }
}

export default async function ProfileDetailPage({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = await params;
  const post = await fetchTaskPostBySlug("profile", resolvedParams.username);
  if (!post) {
    notFound();
  }
  const content = (post.content || {}) as Record<string, any>;
  const logoUrl = typeof content.logo === "string" ? content.logo : undefined;
  const brandName =
    (content.brandName as string | undefined) ||
    (content.companyName as string | undefined) ||
    (content.name as string | undefined) ||
    post.title;
  const website = content.website as string | undefined;
  const domain = website ? website.replace(/^https?:\/\//, "").replace(/\/.*$/, "") : undefined;
  const description =
    (content.description as string | undefined) ||
    post.summary ||
    "Profile details will appear here once available.";
  const descriptionHtml = formatRichHtml(description);
  const suggestedArticles = await fetchTaskPosts("article", 6);
  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, "");
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Profiles",
        item: `${baseUrl}/profile`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: brandName,
        item: `${baseUrl}/profile/${post.slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      <NavbarShell />
      
      {/* Animated background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/20 blur-[100px] animate-pulse" />
        <div className="absolute top-1/3 -left-40 h-[400px] w-[400px] rounded-full bg-gradient-to-br from-orange-500/20 to-red-500/20 blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute -bottom-40 right-1/4 h-[450px] w-[450px] rounded-full bg-gradient-to-br from-amber-500/15 to-yellow-500/15 blur-[100px] animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      <main className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        <SchemaJsonLd data={breadcrumbData} />
        
        {/* Profile Header - No Card */}
        <section className="grid gap-8 md:grid-cols-[220px_1fr] md:items-start">
          <div className="flex justify-center md:justify-start">
            <div className="relative h-40 w-40 overflow-hidden rounded-2xl bg-white/10">
              {logoUrl ? (
                <ContentImage src={logoUrl} alt={post.title} fill className="object-cover" sizes="160px" intrinsicWidth={160} intrinsicHeight={160} />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-3xl font-semibold text-white/60">
                  {post.title.slice(0, 1).toUpperCase()}
                </div>
              )}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-300">Profile</p>
            <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">{brandName}</h1>
            {domain ? (
              <p className="mt-2 text-sm font-medium text-white/60">{domain}</p>
            ) : null}
            <RichContent html={descriptionHtml} className="mt-6 max-w-3xl text-white/80 prose-p:text-white/80" />
            <div className="mt-8 flex flex-wrap gap-3">
              {website ? (
                <Button asChild size="lg" className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 px-7 text-base text-white shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50">
                  <Link href={website} target="_blank" rel="noopener noreferrer">
                    Visit Official Site
                  </Link>
                </Button>
              ) : null}
              {typeof content.email === "string" && content.email ? (
                <Button asChild size="lg" variant="outline" className="border-white/20 px-7 text-base text-white bg-white/10 hover:bg-white/20 hover:text-white">
                  <Link href={`mailto:${content.email}`}>
                    Email Profile
                  </Link>
                </Button>
              ) : null}
            </div>
          </div>
        </section>

        {suggestedArticles.length ? (
          <section className="mt-12">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Suggested articles</h2>
              <Link href="/articles" className="text-sm font-medium text-amber-400 hover:text-amber-300">
                View all
              </Link>
            </div>
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {suggestedArticles.slice(0, 3).map((article) => (
                <TaskPostCard
                  key={article.id}
                  post={article}
                  href={buildPostUrl("article", article.slug)}
                  compact
                />
              ))}
            </div>
          </section>
        ) : null}
      </main>
      <Footer />
    </div>
  );
}
