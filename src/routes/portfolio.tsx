import { createFileRoute } from "@tanstack/react-router";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { PageHero, Reveal, fadeUp, stagger } from "@/components/section";
import { breadcrumbSchema, createSeoHead, webPageSchema } from "@/lib/seo";

const title = "Portfolio - GhostCode Dynamics";
const description =
  "Selected GhostCode Dynamics projects across MERN web applications and cybersecurity labs, built end-to-end and documented.";

export const Route = createFileRoute("/portfolio")({
  head: () =>
    createSeoHead({
      title,
      description,
      path: "/portfolio",
      schemas: [
        webPageSchema(title, description, "/portfolio"),
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Portfolio", path: "/portfolio" },
        ]),
      ],
    }),
  component: PortfolioPage,
});

interface Project {
  name: string;
  category: "Web App" | "Real-Time" | "Cybersecurity";
  problem: string;
  solution: string;
  tech: string[];
  github?: string;
  live?: string;
}

const PROJECTS: Project[] = [
  {
    name: "OpportunityX",
    category: "Web App",
    problem:
      "Job seekers and recruiters lack a clean, modern portal that connects them with relevant matches and real-time updates.",
    solution:
      "A full-stack MERN job portal with role-based dashboards, smart filtering, application tracking and authentication.",
    tech: ["React", "Node.js", "Express", "MongoDB", "TailwindCSS"],
    github: "https://github.com/",
  },
  {
    name: "Real-Time Chat App",
    category: "Real-Time",
    problem:
      "Building a responsive messaging experience with presence, typing indicators and zero perceived lag.",
    solution:
      "Socket.IO powered chat with rooms, online status, typing indicators and persistent message history.",
    tech: ["React", "Socket.IO", "Node.js", "Express", "MongoDB"],
    github: "https://github.com/",
  },
  {
    name: "Phishing Email Investigation",
    category: "Cybersecurity",
    problem:
      "Suspicious email reaches an inbox — how do you triage, extract IOCs and document the case?",
    solution:
      "A walkthrough case study: header analysis, URL/sender reputation, payload inspection, and a structured response report.",
    tech: ["Email Headers", "VirusTotal", "URLScan", "OSINT", "Markdown report"],
    github: "https://github.com/",
  },
  {
    name: "SIEM Brute Force Detection Lab",
    category: "Cybersecurity",
    problem:
      "Detecting brute-force authentication attempts against Windows endpoints with low noise.",
    solution:
      "Splunk-based detection rules, dashboards and triage workflow using ingested Windows event logs.",
    tech: ["Splunk", "SPL", "Sysmon", "Windows Event Logs"],
    github: "https://github.com/",
  },
];

function PortfolioPage() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Work that ships."
        description="A growing collection of real projects across full-stack development and cybersecurity. Code-first, polished, documented."
      />

      <section className="container-prose pt-16 pb-24 md:pt-20">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="grid gap-6 lg:grid-cols-2"
        >
          {PROJECTS.map((p, i) => (
            <motion.article
              key={p.name}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 md:p-8 transition-colors hover:border-primary/40 shadow-elevated"
            >
              <div
                className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"
                aria-hidden
              />

              {/* Visual band (screenshot placeholder) */}
              <div className="relative -mx-6 md:-mx-8 -mt-6 md:-mt-8 mb-6 h-44 overflow-hidden rounded-t-3xl border-b border-border bg-aurora">
                <div className="absolute inset-0 bg-grid opacity-50" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/40">
                    Screenshot · #{String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>

              <p className="font-mono text-[10px] uppercase tracking-widest text-primary">
                {p.category}
              </p>
              <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-foreground">
                {p.name}
              </h2>

              <div className="mt-5 space-y-4 text-sm leading-relaxed">
                <Block label="Problem" text={p.problem} />
                <Block label="Solution" text={p.solution} />
              </div>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center rounded-full border border-border bg-surface-elevated px-2 py-0.5 text-[10px] font-mono text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-2">
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface/60 px-3 py-1.5 text-xs font-medium text-foreground hover:border-primary/40"
                  >
                    <Github className="h-3.5 w-3.5" /> GitHub
                  </a>
                )}
                <span className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-border px-3 py-1.5 text-xs font-medium text-muted-foreground">
                  <ExternalLink className="h-3.5 w-3.5" /> Live link — coming soon
                </span>
                <ArrowUpRight className="ml-auto h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            </motion.article>
          ))}
        </motion.div>

        <Reveal className="mt-16 text-center">
          <p className="text-sm text-muted-foreground">
            More projects in progress. Want to collaborate or commission something custom?
          </p>
          <a
            href="mailto:ghostcodedynamics@gmail.com"
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary"
          >
            ghostcodedynamics@gmail.com <ArrowUpRight className="h-4 w-4" />
          </a>
        </Reveal>
      </section>
    </>
  );
}

function Block({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-foreground/90">{text}</p>
    </div>
  );
}
