import { FlaskConical, ShieldAlert, Terminal, Bug, Boxes, BookOpen } from "lucide-react";
import { PageHero, SectionHeader, Reveal } from "@/components/section";
import { Seo } from "@/components/seo";
import { Faq, FeatureGrid, ProgramCta, StatusNote, Timeline } from "@/components/program-page";
import { breadcrumbSchema, webPageSchema } from "@/lib/seo";

const title = "GhostCode Labs - GhostCode Dynamics";
const description =
  "GhostCode Labs is where experiments live: open security labs, tooling prototypes and engineering write-ups from the GhostCode Dynamics workshop.";
const path = "/labs";

const AREAS = [
  {
    icon: <ShieldAlert className="h-5 w-5" />,
    title: "Web security labs",
    desc: "Deliberately vulnerable apps with guided walkthroughs of injection, broken auth, IDOR and misconfiguration.",
  },
  {
    icon: <Terminal className="h-5 w-5" />,
    title: "Linux and tooling",
    desc: "Practical shell, networking and hardening exercises for people who want to be comfortable on a server.",
  },
  {
    icon: <Bug className="h-5 w-5" />,
    title: "Break-then-fix drills",
    desc: "Each lab ships an exploit path and a patched branch, so you learn the defence alongside the attack.",
  },
  {
    icon: <Boxes className="h-5 w-5" />,
    title: "Prototypes",
    desc: "Small internal tools and UI experiments we build for our own work and open up when they are useful.",
  },
  {
    icon: <FlaskConical className="h-5 w-5" />,
    title: "Performance teardowns",
    desc: "Real profiling sessions on real pages: what was slow, what we changed and what the numbers did.",
  },
  {
    icon: <BookOpen className="h-5 w-5" />,
    title: "Write-ups",
    desc: "Every lab is paired with an Insights article so the reasoning is documented, not just the solution.",
  },
];

const LABS = [
  {
    name: "GhostShop",
    tag: "Web security",
    desc: "A vulnerable e-commerce sandbox covering the OWASP Top 10 with a step-by-step remediation branch.",
  },
  {
    name: "AuthMaze",
    tag: "Authentication",
    desc: "Session handling, JWT pitfalls and password reset flows implemented badly on purpose, then fixed.",
  },
  {
    name: "RecoNotes",
    tag: "Tooling",
    desc: "A small reconnaissance note-taking CLI used in our own engagements, cleaned up for public use.",
  },
  {
    name: "PaintBudget",
    tag: "Performance",
    desc: "A React app instrumented to demonstrate render cost, hydration and image strategy trade-offs.",
  },
];

const PHASES = [
  {
    label: "Phase 01",
    title: "Write-ups first",
    desc: "Published engineering and security articles on Insights while lab environments are being packaged.",
  },
  {
    label: "Phase 02",
    title: "Self-hosted labs",
    desc: "Dockerised lab repositories you can run locally in one command, with solutions in a separate branch.",
  },
  {
    label: "Phase 03",
    title: "Hosted playground",
    desc: "Browser-accessible instances with progress tracking, tied into Academy tracks and certificates.",
  },
];

const FAQS = [
  {
    q: "Are the labs available now?",
    a: "Not publicly. Several exist internally and are being cleaned up for release. The write-ups land on Insights first.",
  },
  {
    q: "Will they be free?",
    a: "Yes. Self-hosted lab repositories and their write-ups will be free and open. Hosted, tracked versions may be bundled with Academy cohorts.",
  },
  {
    q: "Is any of this legal to practice on?",
    a: "The labs are self-contained targets you run yourself. Never apply these techniques to systems you do not own or have written permission to test.",
  },
  {
    q: "Can I contribute a lab?",
    a: "Yes — that is the goal. Once the repositories are public we will accept lab proposals and write-ups from the community.",
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
            { name: "Labs", path },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Labs · In the workshop"
        title="Where the experiments live."
        description="GhostCode Labs is the open side of the studio — security playgrounds, tooling prototypes and teardowns we publish so other people can learn from the same mistakes."
      >
        <StatusNote>Repositories being prepared · Write-ups publishing now</StatusNote>
      </PageHero>

      <FeatureGrid
        eyebrow="Focus areas"
        title="What comes out of the lab"
        description="Security, systems and performance — the parts of the craft that are hard to learn from a tutorial."
        items={AREAS}
      />

      <section className="relative border-t border-border/60 py-16 md:py-24">
        <div className="container-prose">
          <SectionHeader
            eyebrow="In progress"
            title="Labs currently being built"
            description="Names and scope may shift before release. Each one ships with an exploit path and a fixed branch."
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2">
            {LABS.map((lab) => (
              <Reveal key={lab.name}>
                <li className="h-full rounded-2xl border border-border bg-card/60 p-6 backdrop-blur transition hover:border-primary/40">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
                      {lab.name}
                    </h3>
                    <span className="shrink-0 rounded-full border border-border bg-surface/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      {lab.tag}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{lab.desc}</p>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <Timeline
        eyebrow="Roadmap"
        title="How Labs opens up"
        items={PHASES}
      />

      <Faq items={FAQS} />

      <ProgramCta
        title="Want early access to the labs?"
        description="Tell us which area interests you most and we'll send the repository links as each lab goes public."
        primaryLabel="Request lab access"
        secondaryLabel="Read the write-ups"
        secondaryTo="/blog"
      />
    </>
  );
}
