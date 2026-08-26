import { Video, Users, Mic, Hammer, ShieldCheck, GraduationCap } from "lucide-react";
import { PageHero, Reveal, SectionHeader } from "@/components/section";
import { Seo } from "@/components/seo";
import { Faq, FeatureGrid, ProgramCta, StatusNote } from "@/components/program-page";
import { breadcrumbSchema, webPageSchema } from "@/lib/seo";

const title = "Events & Workshops - GhostCode Dynamics";
const description =
  "Workshops, webinars and live builds on modern web development and cybersecurity, hosted by GhostCode Dynamics.";
const path = "/events";

const FORMATS = [
  {
    icon: <Hammer className="h-5 w-5" />,
    title: "Live builds",
    desc: "A feature built from empty file to deployed, unedited — including the parts that break.",
  },
  {
    icon: <Mic className="h-5 w-5" />,
    title: "Webinars",
    desc: "Sixty-minute deep dives on one topic with a proper Q&A at the end.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "Security clinics",
    desc: "Break a deliberately vulnerable app, then patch it together on the call.",
  },
  {
    icon: <GraduationCap className="h-5 w-5" />,
    title: "Campus sessions",
    desc: "Guest sessions for colleges and student clubs on getting hired and building real projects.",
  },
];

const PLANNED = [
  {
    kind: "Live build",
    title: "Ship a portfolio that gets replies",
    desc: "Design, build and deploy a developer portfolio in one sitting, with brutal feedback on real submissions.",
    when: "Date to be announced",
  },
  {
    kind: "Security clinic",
    title: "Breaking (and fixing) auth",
    desc: "Session handling, JWT mistakes and the login flows that quietly leak accounts.",
    when: "Date to be announced",
  },
  {
    kind: "Webinar",
    title: "MERN in the real world",
    desc: "What actually changes when a side project has paying users: errors, logs, backups and cost.",
    when: "Date to be announced",
  },
];

const FAQS = [
  {
    q: "When is the first event?",
    a: "Dates are not published yet. The schedule opens once the community core is in place, so sessions have people in them.",
  },
  {
    q: "Free or paid?",
    a: "Most sessions will be free. Longer hands-on workshops with reviewed exercises may be paid, and always clearly priced up front.",
  },
  {
    q: "Are recordings available?",
    a: "Yes — free sessions get published afterwards, with notes and the repo.",
  },
  {
    q: "Can you speak at our college?",
    a: "Yes. Reach out with your dates, audience size and topic interest and we'll work it out.",
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
            { name: "Events", path },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Events · Scheduling"
        title="Workshops, webinars & live builds."
        description="Sessions on web development, cybersecurity and shipping real projects — practical, recorded, and open to students."
      >
        <StatusNote>Calendar opening soon · Topics being finalised</StatusNote>
      </PageHero>

      <FeatureGrid eyebrow="Formats" title="The kinds of sessions we run" items={FORMATS} columns={4} />

      <section className="relative border-t border-border/60 py-16 md:py-24">
        <div className="container-prose">
          <SectionHeader
            eyebrow="Line-up"
            title="First sessions planned"
            description="Topics are set; dates get announced to the list before they go public."
          />
          <ul className="mt-12 grid gap-4">
            {PLANNED.map((e) => (
              <Reveal key={e.title}>
                <li className="flex flex-col gap-3 rounded-2xl border border-border bg-card/60 p-6 backdrop-blur transition hover:border-primary/40 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">
                      {e.kind}
                    </span>
                    <h3 className="mt-2 font-display text-lg font-semibold tracking-tight text-foreground">
                      {e.title}
                    </h3>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                      {e.desc}
                    </p>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1.5 text-xs text-muted-foreground">
                    <Video className="h-3.5 w-3.5" aria-hidden />
                    {e.when}
                  </span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <Faq items={FAQS} />

      <ProgramCta
        title="Get the schedule first"
        description="Seats in hands-on sessions are limited. The list gets dates and links before anything is posted publicly."
        primaryLabel="Notify me about events"
        secondaryLabel="Join the community"
        secondaryTo="/community"
      />
    </>
  );
}
