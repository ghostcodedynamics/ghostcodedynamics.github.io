import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Calendar, Clock, Eye, Tag } from "lucide-react";
import { Seo } from "@/components/seo";
import { NotFound } from "@/components/not-found";
import { RouteFallback } from "@/components/route-fallback";
import { ArticleActions } from "@/features/blog/components/ArticleActions";
import { ArticleBody } from "@/features/blog/components/ArticleBody";
import { CommentThread } from "@/features/blog/components/CommentThread";
import { NewsletterCard } from "@/features/blog/components/NewsletterCard";
import { PostCard } from "@/features/blog/components/PostCard";
import { ReadingProgress } from "@/features/blog/components/ReadingProgress";
import { TableOfContents } from "@/features/blog/components/TableOfContents";
import { getPostBySlug, getPrevNext, getRelated } from "@/services/blogService";
import { breadcrumbSchema, absoluteUrl } from "@/lib/seo";
import { formatDate } from "@/lib/format";
import type { BlogPost } from "@/features/blog/data/posts";

function articleSchema(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.cover,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: { "@type": "Person", name: post.author.name },
    publisher: {
      "@type": "Organization",
      name: "GhostCode Dynamics",
      url: absoluteUrl("/"),
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(`/blog/${post.slug}`) },
  };
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null | undefined>(undefined);
  const [related, setRelated] = useState<BlogPost[]>([]);
  const [nav, setNav] = useState<{ prev: BlogPost | null; next: BlogPost | null }>({
    prev: null,
    next: null,
  });

  useEffect(() => {
    let live = true;
    if (!slug) return;
    getPostBySlug(slug).then(async (p) => {
      if (!live) return;
      setPost(p);
      if (p) {
        const [rel, prevNext] = await Promise.all([getRelated(p), getPrevNext(p)]);
        if (!live) return;
        setRelated(rel);
        setNav(prevNext);
      }
    });
    return () => {
      live = false;
    };
  }, [slug]);

  if (post === undefined) return <RouteFallback />;
  if (post === null) return <NotFound />;

  return (
    <>
      <Seo
        title={`${post.title} — GhostCode Insights`}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        image={post.cover}
        type="article"
        keywords={post.tags.join(", ")}
        schemas={[
          articleSchema(post),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Insights", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />
      <ReadingProgress />

      <article className="relative pt-32 pb-24">
        <div className="container-prose">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> All Insights
          </Link>

          <header className="mt-6 max-w-3xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
              {post.category}
            </p>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
              {post.title}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">{post.subtitle}</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary/15 font-mono text-[10px] uppercase text-primary">
                  {post.author.name
                    .split(" ")
                    .map((s) => s[0])
                    .join("")
                    .slice(0, 2)}
                </span>
                <span className="text-foreground">{post.author.name}</span>
                <span>· {post.author.role}</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-3 w-3" /> {formatDate(post.publishedAt)}
              </span>
              {post.updatedAt !== post.publishedAt && (
                <span>Updated {formatDate(post.updatedAt)}</span>
              )}
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3 w-3" /> {post.readingMinutes} min read
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Eye className="h-3 w-3" /> {post.views.toLocaleString()}
              </span>
            </div>
          </header>

          <figure className="mt-10 overflow-hidden rounded-3xl border border-border">
            <img
              src={post.cover}
              alt={post.title}
              className="aspect-[16/8] w-full object-cover"
            />
            <figcaption className="sr-only">Cover image for {post.title}</figcaption>
          </figure>

          <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_220px]">
            <div>
              <div className="mb-6">
                <ArticleActions slug={post.slug} title={post.title} baseLikes={post.likes} />
              </div>
              <ArticleBody markdown={post.body} />

              <div className="mt-10 flex flex-wrap items-center gap-2">
                <Tag className="h-3.5 w-3.5 text-muted-foreground" />
                {post.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-border bg-surface/60 px-2.5 py-1 text-xs text-muted-foreground"
                  >
                    #{t}
                  </span>
                ))}
              </div>

              <div className="mt-10">
                <ArticleActions slug={post.slug} title={post.title} baseLikes={post.likes} />
              </div>

              <nav className="mt-14 grid gap-4 sm:grid-cols-2" aria-label="Article pagination">
                {nav.prev ? (
                  <Link
                    to={`/blog/${nav.prev.slug}`}
                    className="group rounded-2xl border border-border bg-card/60 p-5 transition hover:border-primary/40"
                  >
                    <p className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <ArrowLeft className="h-3 w-3" /> Previous
                    </p>
                    <p className="mt-2 font-medium text-foreground group-hover:text-primary">
                      {nav.prev.title}
                    </p>
                  </Link>
                ) : (
                  <div />
                )}
                {nav.next && (
                  <Link
                    to={`/blog/${nav.next.slug}`}
                    className="group rounded-2xl border border-border bg-card/60 p-5 text-right transition hover:border-primary/40"
                  >
                    <p className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                      Next <ArrowRight className="h-3 w-3" />
                    </p>
                    <p className="mt-2 font-medium text-foreground group-hover:text-primary">
                      {nav.next.title}
                    </p>
                  </Link>
                )}
              </nav>

              <CommentThread slug={post.slug} />
            </div>

            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-8">
                <TableOfContents markdown={post.body} />
              </div>
            </aside>
          </div>

          {related.length > 0 && (
            <section className="mt-20">
              <h2 className="font-display text-2xl font-semibold tracking-tight">Related reads</h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((p) => (
                  <PostCard key={p.slug} post={p} />
                ))}
              </div>
            </section>
          )}

          <div className="mt-20">
            <NewsletterCard />
          </div>
        </div>
      </article>
    </>
  );
}
