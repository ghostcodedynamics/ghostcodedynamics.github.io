/**
 * BlogInteractionsContext
 * -----------------------
 * Frontend-only store for likes, bookmarks and comments while the
 * backend does not yet exist. State is persisted to localStorage so
 * a reload keeps the reader's session intact. Every mutator is
 * async — swap the body for a fetch/axios call once the API ships
 * and no consumer changes.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export interface Comment {
  id: string;
  postSlug: string;
  parentId: string | null;
  author: string;
  avatar?: string;
  body: string;
  createdAt: string;
  likes: number;
  likedByMe: boolean;
}

interface State {
  likedPosts: Record<string, boolean>;
  bookmarkedPosts: Record<string, boolean>;
  postLikeCounts: Record<string, number>;
  comments: Comment[];
}

const STORAGE_KEY = "ghostcode.blog.interactions.v1";
const CURRENT_USER = "You";

const initialState: State = {
  likedPosts: {},
  bookmarkedPosts: {},
  postLikeCounts: {},
  comments: [],
};

function load(): State {
  if (typeof window === "undefined") return initialState;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialState;
    return { ...initialState, ...JSON.parse(raw) } as State;
  } catch {
    return initialState;
  }
}

function save(state: State) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* quota / private mode — ignore */
  }
}

interface Ctx {
  isLiked: (slug: string) => boolean;
  isBookmarked: (slug: string) => boolean;
  likeCount: (slug: string, base: number) => number;
  commentsFor: (slug: string) => Comment[];
  toggleLike: (slug: string) => Promise<void>;
  toggleBookmark: (slug: string) => Promise<void>;
  addComment: (input: {
    slug: string;
    body: string;
    parentId?: string | null;
  }) => Promise<Comment>;
  editComment: (id: string, body: string) => Promise<void>;
  deleteComment: (id: string) => Promise<void>;
  toggleCommentLike: (id: string) => Promise<void>;
}

const BlogInteractionsContext = createContext<Ctx | null>(null);

export function BlogInteractionsProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(() => load());

  useEffect(() => {
    save(state);
  }, [state]);

  const toggleLike = useCallback(async (slug: string) => {
    setState((s) => {
      const liked = !s.likedPosts[slug];
      const delta = liked ? 1 : -1;
      return {
        ...s,
        likedPosts: { ...s.likedPosts, [slug]: liked },
        postLikeCounts: {
          ...s.postLikeCounts,
          [slug]: (s.postLikeCounts[slug] ?? 0) + delta,
        },
      };
    });
  }, []);

  const toggleBookmark = useCallback(async (slug: string) => {
    setState((s) => ({
      ...s,
      bookmarkedPosts: { ...s.bookmarkedPosts, [slug]: !s.bookmarkedPosts[slug] },
    }));
  }, []);

  const addComment = useCallback<Ctx["addComment"]>(async ({ slug, body, parentId = null }) => {
    const comment: Comment = {
      id: crypto.randomUUID(),
      postSlug: slug,
      parentId,
      author: CURRENT_USER,
      body,
      createdAt: new Date().toISOString(),
      likes: 0,
      likedByMe: false,
    };
    setState((s) => ({ ...s, comments: [comment, ...s.comments] }));
    return comment;
  }, []);

  const editComment = useCallback<Ctx["editComment"]>(async (id, body) => {
    setState((s) => ({
      ...s,
      comments: s.comments.map((c) => (c.id === id ? { ...c, body } : c)),
    }));
  }, []);

  const deleteComment = useCallback<Ctx["deleteComment"]>(async (id) => {
    setState((s) => ({
      ...s,
      comments: s.comments.filter((c) => c.id !== id && c.parentId !== id),
    }));
  }, []);

  const toggleCommentLike = useCallback<Ctx["toggleCommentLike"]>(async (id) => {
    setState((s) => ({
      ...s,
      comments: s.comments.map((c) =>
        c.id === id
          ? { ...c, likedByMe: !c.likedByMe, likes: c.likes + (c.likedByMe ? -1 : 1) }
          : c,
      ),
    }));
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      isLiked: (slug) => Boolean(state.likedPosts[slug]),
      isBookmarked: (slug) => Boolean(state.bookmarkedPosts[slug]),
      likeCount: (slug, base) => base + (state.postLikeCounts[slug] ?? 0),
      commentsFor: (slug) => state.comments.filter((c) => c.postSlug === slug),
      toggleLike,
      toggleBookmark,
      addComment,
      editComment,
      deleteComment,
      toggleCommentLike,
    }),
    [state, toggleLike, toggleBookmark, addComment, editComment, deleteComment, toggleCommentLike],
  );

  return (
    <BlogInteractionsContext.Provider value={value}>{children}</BlogInteractionsContext.Provider>
  );
}

export function useBlogInteractions() {
  const ctx = useContext(BlogInteractionsContext);
  if (!ctx) throw new Error("useBlogInteractions must be used inside BlogInteractionsProvider");
  return ctx;
}

export const CURRENT_USER_NAME = CURRENT_USER;
