import { MessagesSquare, Github, CalendarDays, Sparkles, LifeBuoy, Trophy } from "lucide-react";
import { PageHero } from "@/components/section";
import { Seo } from "@/components/seo";
import { Faq, FeatureGrid, ProgramCta, StatusNote, Timeline } from "@/components/program-page";
import { breadcrumbSchema, webPageSchema } from "@/lib/seo";

const title = "Student Community - GhostCode Dynamics";
const description =
  "A community space for student builders learning to ship real software — code reviews, build logs, study groups and honest feedback.";
const path = "/community";

const PILLARS = [
  {
    icon: <MessagesSquare className="h-5 w-5" />,
    title: "Ask anything",
    desc: "A no-ego help channel. Beginner questions are welcome; 'just Google it' is not an accepted answer.",
  },
  {
    icon: <Github className="h-5 w-5" />,
    title: "Code reviews",
    desc: "Post a repo, get real feedback on structure, naming, accessibility and security — not just style nits.",
  },
  {
    icon: <Sparkles className="h-5 w-5" />,
    title: "Build in public",
    desc: "Weekly build logs where members share progress, blockers and what they shipped.",
  },
  {
    icon: <CalendarDays className="h-5 w-5" />,
    title: "Study groups",
    desc: "Small accountability pods working through the same track at the same pace.",
  },
  {
    icon: <Trophy className="h-5 w-5" />,
    title: "Mini challenges",
    desc: "Short, scoped builds with a deadline. Best submissions get featured and reviewed on stream.",
  },
  {
    icon: <LifeBuoy className="h-5 w-5" />,
    title: "Career help",
    desc: "Resume and portfolio teardowns, plus referrals to internships and collaborator work when they open.",
  },
];

const PHASES = [
  {
    label: "Phase 01",
    title: "Invite-only core",
    desc: "A small founding group of active student builders sets the tone before we open the doors.",
  },
  {
    label: "Phase 02",
    title: "Public channels",
    desc: "Help, reviews and build logs open to anyone learning seriously, with light moderation.",
  },
  {
    label: "Phase 03",
    title: "Programme integration",
    desc: "Academy cohorts, internships and Labs write-ups all get a home inside the community.",
  },
];

const FAQS = [
  {
    q: "Is the community live?",
    a: "Not yet. We're assembling a small founding group first so it starts with real conversation rather than an empty server.",
  },
  {
    q: "Does it cost anything?",
    a: "The core community will be free. Paid programmes get private channels, but help and reviews stay open.",
  },
  {
    q: "Do I need to be a student?",
    a: "It's built for students and self-taught beginners, but anyone learning in good faith is welcome.",
  },
  {
    q: "What are the rules?",
    a: "Be useful, be kind, credit your sources, and no recruitment spam. That's about it.",
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
            { name: "Community", path },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Community · Forming"
        title="A home for student builders."
        description="A space for students learning to build, ship and grow together — code reviews, build logs and honest feedback from people slightly ahead of you."
      >
        <StatusNote>Founding group forming · Invites first</StatusNote>
      </PageHero>

      <FeatureGrid
        eyebrow="Inside"
        title="What happens here"
        description="Structured enough to be useful, small enough to still feel human."
        items={PILLARS}
      />

      <Timeline eyebrow="Roadmap" title="How it opens up" items={PHASES} />

      <Faq items={FAQS} />

      <ProgramCta
        title="Claim a founding seat"
        description="Tell us what you're building right now. Founding members help shape the channels, challenges and pace."
        primaryLabel="Request an invite"
        secondaryLabel="Read the blog"
        secondaryTo="/blog"
      />
    </>
  );
}
