import { Layers, ShieldCheck, Server, Gauge, RefreshCw, MessagesSquare } from "lucide-react";
import { PageHero, Reveal, SectionHeader } from "@/components/section";
import { Seo } from "@/components/seo";
import { Faq, FeatureGrid, ProgramCta, StatusNote } from "@/components/program-page";
import { breadcrumbSchema, webPageSchema } from "@/lib/seo";

const title = "Courses - GhostCode Dynamics";
const description =
  "Short, practical courses on MERN, backend fundamentals and web security — written by someone who ships client work, not just teaches.";
const path = "/courses";

const PLANNED = [
  {
    title: "MERN, Properly",
    level: "Intermediate",
    desc: "Build and deploy a full-stack product with real auth, validation, error handling and a database you'd trust.",
    outcomes: ["REST API design", "JWT auth done safely", "MongoDB data modelling", "Deployment & env config"],
  },
  {
    title: "Web Security Fundamentals",
    level: "Beginner → Intermediate",
    desc: "The OWASP Top 10 explained through vulnerable code you fix yourself, line by line.",
    outcomes: ["XSS, CSRF, injection", "Auth & session pitfalls", "Secure headers & CORS", "Dependency hygiene"],
  },
  {
    title: "Frontend That Feels Fast",
    level: "Intermediate",
    desc: "React performance, bundle discipline, accessibility and motion that doesn't fight the user.",
    outcomes: ["Rendering & memoisation", "Core Web Vitals", "A11y in practice", "Tasteful animation"],
  },
];

const PRINCIPLES = [
  {
    icon: <Layers className="h-5 w-5" />,
    title: "Project-first",
    desc: "Every module moves one real project forward. No isolated toy exercises you throw away.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "Security baked in",
    desc: "Secure patterns taught alongside the feature, not as an optional final chapter.",
  },
  {
    icon: <Server className="h-5 w-5" />,
    title: "Ship it",
    desc: "Deployment, environment variables and logs are part of the course, not left as an exercise.",
  },
  {
    icon: <Gauge className="h-5 w-5" />,
    title: "No fluff",
    desc: "Short lessons, dense notes, and a written reference you can search later.",
  },
  {
    icon: <RefreshCw className="h-5 w-5" />,
    title: "Lifetime updates",
    desc: "Stacks move. Buy once and get revisions as the ecosystem changes.",
  },
  {
    icon: <MessagesSquare className="h-5 w-5" />,
    title: "Q&A that answers",
    desc: "Questions go to a real channel with a real person reading them.",
  },
];

const FAQS = [
  {
    q: "Can I buy a course today?",
    a: "No — nothing is on sale yet. The first course is being written and recorded. Join the list to get launch pricing.",
  },
  {
    q: "Video or written?",
    a: "Both. Short screencasts for the build, plus a written reference for every lesson so you can skim instead of scrub.",
  },
  {
    q: "What do I need to know first?",
    a: "Comfort with JavaScript basics and the command line. Each course lists explicit prerequisites before you pay.",
  },
  {
    q: "Refunds?",
    a: "Straightforward: if a course isn't what was described, ask and you get your money back.",
  },
];

export default function Page() {
  return (
    <>
      <Seo
        title={title}
        description={description}
        path={path}
        schemas={[
          webPageSchema(title, description, path),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Courses", path },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Courses · In production"
        title="Practical courses, built by builders."
        description="Short, focused courses on MERN, security fundamentals and modern web development — written from client work, not from other people's tutorials."
      >
        <StatusNote>First course in production · Launch list open</StatusNote>
      </PageHero>

      <section className="relative py-16 md:py-24">
        <div className="container-prose">
          <SectionHeader
            eyebrow="Catalogue"
            title="Planned courses"
            description="Outlines are locked; recording is underway. Order may shift based on what the list asks for."
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {PLANNED.map((c) => (
              <Reveal key={c.title}>
                <article className="flex h-full flex-col rounded-2xl border border-border bg-card/60 p-6 backdrop-blur transition hover:border-primary/40">
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">
                    {c.level}
                  </span>
                  <h3 className="mt-3 font-display text-xl font-semibold tracking-tight text-foreground">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
                  <ul className="mt-5 space-y-2 border-t border-border/60 pt-5 text-sm text-muted-foreground">
                    {c.outcomes.map((o) => (
                      <li key={o} className="flex items-start gap-2.5">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        {o}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FeatureGrid
        eyebrow="Approach"
        title="How these are taught"
        items={PRINCIPLES}
      />

      <Faq items={FAQS} />

      <ProgramCta
        title="Get launch pricing"
        description="Join the list and you'll get the first course early, at the lowest price it will ever be."
        primaryLabel="Join the course list"
        secondaryLabel="See the Academy"
        secondaryTo="/academy"
      />
    </>
  );
}
