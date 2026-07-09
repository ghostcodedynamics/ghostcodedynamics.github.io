import { useState } from "react";
import { Heart, MessageCircle, Pencil, Trash2, X, Check } from "lucide-react";
import { toast } from "sonner";
import { CURRENT_USER_NAME, useBlogInteractions, type Comment } from "@/context/BlogInteractionsContext";
import { timeAgo } from "@/lib/format";
import { cn } from "@/lib/utils";

function CommentForm({
  onSubmit,
  onCancel,
  initial = "",
  placeholder = "Share your thoughts…",
  submitLabel = "Post",
}: {
  onSubmit: (body: string) => Promise<void> | void;
  onCancel?: () => void;
  initial?: string;
  placeholder?: string;
  submitLabel?: string;
}) {
  const [body, setBody] = useState(initial);
  const [busy, setBusy] = useState(false);
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const trimmed = body.trim();
        if (trimmed.length < 2) {
          toast.error("Comment is too short");
          return;
        }
        if (trimmed.length > 1000) {
          toast.error("Comment is too long");
          return;
        }
        setBusy(true);
        try {
          await onSubmit(trimmed);
          setBody("");
        } finally {
          setBusy(false);
        }
      }}
      className="space-y-2"
    >
      <label className="sr-only" htmlFor={`comment-${Math.random()}`}>
        Comment
      </label>
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder={placeholder}
        rows={3}
        maxLength={1000}
        className="w-full resize-y rounded-xl border border-border bg-surface/60 p-3 text-sm outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
      />
      <div className="flex justify-end gap-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-border px-3.5 py-1.5 text-xs text-muted-foreground hover:text-foreground"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={busy}
          className="rounded-full bg-foreground px-4 py-1.5 text-xs font-medium text-background transition hover:opacity-90 disabled:opacity-60"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}

function CommentItem({ comment, slug, depth = 0 }: { comment: Comment; slug: string; depth?: number }) {
  const { commentsFor, toggleCommentLike, addComment, editComment, deleteComment } =
    useBlogInteractions();
  const [replying, setReplying] = useState(false);
  const [editing, setEditing] = useState(false);
  const replies = commentsFor(slug).filter((c) => c.parentId === comment.id);
  const isMine = comment.author === CURRENT_USER_NAME;

  return (
    <li className={cn("space-y-3", depth > 0 && "ml-6 border-l border-border/60 pl-4")}>
      <div className="rounded-xl border border-border bg-card/50 p-4">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary/15 font-mono text-[10px] uppercase text-primary">
              {comment.author.slice(0, 2)}
            </span>
            <span className="font-medium text-foreground">{comment.author}</span>
            <span className="text-muted-foreground">· {timeAgo(comment.createdAt)}</span>
          </div>
          {isMine && !editing && (
            <div className="flex gap-1 text-muted-foreground">
              <button
                type="button"
                onClick={() => setEditing(true)}
                aria-label="Edit comment"
                className="rounded-md p-1 hover:text-foreground"
              >
                <Pencil className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteComment(comment.id);
                  toast.success("Comment deleted");
                }}
                aria-label="Delete comment"
                className="rounded-md p-1 hover:text-foreground"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>
        {editing ? (
          <div className="mt-3">
            <CommentForm
              initial={comment.body}
              submitLabel="Save"
              onCancel={() => setEditing(false)}
              onSubmit={async (body) => {
                await editComment(comment.id, body);
                setEditing(false);
              }}
            />
          </div>
        ) : (
          <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">
            {comment.body}
          </p>
        )}
        {!editing && (
          <div className="mt-3 flex items-center gap-3 text-xs">
            <button
              type="button"
              onClick={() => toggleCommentLike(comment.id)}
              aria-pressed={comment.likedByMe}
              className={cn(
                "inline-flex items-center gap-1 transition",
                comment.likedByMe
                  ? "text-red-400"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Heart className={cn("h-3.5 w-3.5", comment.likedByMe && "fill-current")} />
              {comment.likes}
            </button>
            {depth === 0 && (
              <button
                type="button"
                onClick={() => setReplying((r) => !r)}
                className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"
              >
                {replying ? <X className="h-3.5 w-3.5" /> : <MessageCircle className="h-3.5 w-3.5" />}
                {replying ? "Cancel" : "Reply"}
              </button>
            )}
          </div>
        )}
      </div>
      {replying && (
        <div className="ml-6">
          <CommentForm
            placeholder="Write a reply…"
            submitLabel="Reply"
            onCancel={() => setReplying(false)}
            onSubmit={async (body) => {
              await addComment({ slug, body, parentId: comment.id });
              setReplying(false);
              toast.success("Reply posted");
            }}
          />
        </div>
      )}
      {replies.length > 0 && (
        <ul className="space-y-3">
          {replies.map((r) => (
            <CommentItem key={r.id} comment={r} slug={slug} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}

export function CommentThread({ slug }: { slug: string }) {
  const { commentsFor, addComment } = useBlogInteractions();
  const all = commentsFor(slug);
  const top = all.filter((c) => c.parentId === null);
  return (
    <section aria-labelledby="comments-heading" className="mt-16">
      <h2 id="comments-heading" className="font-display text-2xl font-semibold tracking-tight">
        Comments{" "}
        <span className="text-muted-foreground text-base font-normal">({all.length})</span>
      </h2>
      <div className="mt-6">
        <CommentForm
          onSubmit={async (body) => {
            await addComment({ slug, body });
            toast.success("Comment posted");
          }}
        />
      </div>
      {top.length === 0 ? (
        <p className="mt-8 rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
          No comments yet — be the first to start the conversation.
        </p>
      ) : (
        <ul className="mt-8 space-y-4">
          {top.map((c) => (
            <CommentItem key={c.id} comment={c} slug={slug} />
          ))}
        </ul>
      )}
    </section>
  );
}
