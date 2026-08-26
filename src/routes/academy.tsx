import { BookOpen, Code2, ShieldCheck, Users, Compass, Rocket } from "lucide-react";
import { PageHero } from "@/components/section";
import { Seo } from "@/components/seo";
import { Faq, FeatureGrid, ProgramCta, StatusNote, Timeline } from "@/components/program-page";
import { breadcrumbSchema, webPageSchema } from "@/lib/seo";

const title = "GhostCode Academy - GhostCode Dynamics";
const description =
  "GhostCode Academy is the education arm of GhostCode Dynamics: structured, project-based learning paths in modern web development and cybersecurity.";
const path = "/academy";

const TRACKS = [
  {
    icon: <Code2 className="h-5 w-5" />,
    title: "Modern Web Track",
    desc: "HTML, CSS, JavaScript and React fundamentals taught through one real product you build end to end.",
  },
  {
    icon: <Rocket className="h-5 w-5" />,
    title: "Full-Stack MERN Track",
    desc: "Node, Express, MongoDB and API design — auth, data modelling, deployment and the boring parts that matter.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "Security Foundations",
    desc: "Web application security basics: the OWASP Top 10, safe auth patterns, and how attacks actually work.",
  },
  {
    icon: <Compass className="h-5 w-5" />,
    title: "Career Craft",
    desc: "Portfolio, GitHub hygiene, writing about your work, and interviewing without pretending to know everything.",
  },
  {
    icon: <BookOpen className="h-5 w-5" />,
    title: "Build Journals",
    desc: "Every track ends with a written case study — the artefact that gets you hired, not just a certificate.",
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: "Small Cohorts",
    desc: "Intentionally small groups so feedback stays personal and questions actually get answered.",
  },
];

const PHASES = [
  {
    label: "Phase 01",
    title: "Curriculum in the open",
    desc: "Track outlines and project briefs published publicly so you can start learning before any cohort opens.",
  },
  {
    label: "Phase 02",
    title: "First pilot cohort",
    desc: "A small, invite-based group works through the Modern Web track with direct founder feedback.",
  },
  {
    label: "Phase 03",
    title: "Open enrolment",
    desc: "Tracks open publicly with self-paced material, live sessions and reviewed project submissions.",
  },
];

const FAQS = [
  {
    q: "Is the Academy running right now?",
    a: "Not yet. It is in active development. Joining the list means you hear first when the pilot cohort opens — nothing is being sold today.",
  },
  {
    q: "Who is it for?",
    a: "Students and early-career developers who can already write some code and want to build production-grade work rather than follow tutorials.",
  },
  {
    q: "Will it be free?",
    a: "Curriculum outlines and a good amount of written material will be free. Reviewed cohorts with direct mentorship will be paid, and priced for students.",
  },
  {
    q: "Do I get a certificate?",
    a: "Completed cohorts will issue a verifiable certificate you can check on our verification page. The project you ship matters more.",
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
            { name: "Academy", path },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Academy · In development"
        title="Learn by shipping, not by watching."
        description="GhostCode Academy is the education arm of GhostCode Dynamics — structured learning paths in modern web development and security, built around real projects instead of passive video."
      >
        <StatusNote>Curriculum in progress · Pilot cohort planned</StatusNote>
      </PageHero>

      <FeatureGrid
        eyebrow="Tracks"
        title="What we're building"
        description="Each track is a sequence of briefs, not lectures. You finish with something deployed and documented."
        items={TRACKS}
      />

      <Timeline
        eyebrow="Roadmap"
        title="How the Academy rolls out"
        description="We would rather launch one track properly than ten badly."
        items={PHASES}
      />

      <Faq items={FAQS} />

      <ProgramCta
        title="Be in the first cohort"
        description="Tell us what you want to learn and we'll shape the pilot around real demand. No spam, no drip funnel."
        primaryLabel="Join the Academy list"
        secondaryLabel="Browse Insights"
        secondaryTo="/blog"
      />
    </>
  );
}
