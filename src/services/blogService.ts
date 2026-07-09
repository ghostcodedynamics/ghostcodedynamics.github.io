/**
 * blogService — thin async wrapper around the mock data source.
 * Replace the body of each function with a `fetch(API_BASE + ...)`
 * or axios call when the backend ships. Components already await
 * these functions, so no UI code changes.
 */
import { API_BASE } from "@/constants/api";
import { POSTS, type BlogPost } from "@/features/blog/data/posts";

const NETWORK_DELAY_MS = 120;
const wait = () => new Promise((r) => setTimeout(r, NETWORK_DELAY_MS));

export interface ListParams {
  category?: string;
  tag?: string;
  search?: string;
  sort?: "newest" | "oldest" | "views" | "likes" | "comments";
  limit?: number;
}

export async function listPosts(params: ListParams = {}): Promise<BlogPost[]> {
  await wait();
  // TODO(api): `${API_BASE}/blog/posts?${qs}`
  void API_BASE;
  let out = [...POSTS];
  if (params.category && params.category !== "All") {
    out = out.filter((p) => p.category === params.category);
  }
  if (params.tag) {
    out = out.filter((p) => p.tags.includes(params.tag!));
  }
  if (params.search) {
    const q = params.search.toLowerCase().trim();
    out = out.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)),
    );
  }
  switch (params.sort) {
    case "oldest":
      out.sort((a, b) => +new Date(a.publishedAt) - +new Date(b.publishedAt));
      break;
    case "views":
      out.sort((a, b) => b.views - a.views);
      break;
    case "likes":
      out.sort((a, b) => b.likes - a.likes);
      break;
    case "comments":
      out.sort((a, b) => b.commentsCount - a.commentsCount);
      break;
    case "newest":
    default:
      out.sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));
  }
  return params.limit ? out.slice(0, params.limit) : out;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  await wait();
  return POSTS.find((p) => p.slug === slug) ?? null;
}

export async function getFeaturedPost(): Promise<BlogPost | null> {
  await wait();
  return POSTS.find((p) => p.featured) ?? POSTS[0] ?? null;
}

export async function getEditorsPicks(limit = 3): Promise<BlogPost[]> {
  await wait();
  return POSTS.filter((p) => p.editorsPick).slice(0, limit);
}

export async function getTrending(limit = 4): Promise<BlogPost[]> {
  await wait();
  return POSTS.filter((p) => p.trending)
    .sort((a, b) => b.views - a.views)
    .slice(0, limit);
}

export async function getRelated(post: BlogPost, limit = 3): Promise<BlogPost[]> {
  await wait();
  return POSTS.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, limit);
}

export async function getPrevNext(
  post: BlogPost,
): Promise<{ prev: BlogPost | null; next: BlogPost | null }> {
  await wait();
  const ordered = [...POSTS].sort(
    (a, b) => +new Date(a.publishedAt) - +new Date(b.publishedAt),
  );
  const i = ordered.findIndex((p) => p.slug === post.slug);
  return {
    prev: i > 0 ? ordered[i - 1] : null,
    next: i < ordered.length - 1 ? ordered[i + 1] : null,
  };
}
