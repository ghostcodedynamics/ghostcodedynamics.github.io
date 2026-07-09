import { useMemo } from "react";

interface Heading {
  id: string;
  text: string;
  level: 2 | 3;
}

export function extractHeadings(md: string): Heading[] {
  const lines = md.split("\n");
  const out: Heading[] = [];
  for (const raw of lines) {
    const m2 = /^##\s+(.+)$/.exec(raw);
    const m3 = /^###\s+(.+)$/.exec(raw);
    if (m2) out.push({ id: slugify(m2[1]), text: m2[1], level: 2 });
    else if (m3) out.push({ id: slugify(m3[1]), text: m3[1], level: 3 });
  }
  return out;
}

export function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function TableOfContents({ markdown }: { markdown: string }) {
  const headings = useMemo(() => extractHeadings(markdown), [markdown]);
  if (headings.length === 0) return null;
  return (
    <nav aria-label="On this page" className="text-sm">
      <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        On this page
      </p>
      <ul className="space-y-2 border-l border-border pl-4">
        {headings.map((h) => (
          <li key={h.id} className={h.level === 3 ? "pl-3" : ""}>
            <a
              href={`#${h.id}`}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
