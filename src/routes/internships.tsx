import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/coming-soon";
import { createNoIndexHead } from "@/lib/seo";

export const Route = createFileRoute("/internships")({
  head: () =>
    createNoIndexHead(
      "Internships - GhostCode Dynamics",
      "A future internship program for students who want to build production-grade work.",
      "/internships",
    ),
  component: () => (
    <ComingSoon
      module="Internships"
      title="Real internships. Real projects."
      description="A future internship program at GhostCode Dynamics — for students who want to build production-grade work alongside the team."
      bullets={[
        "Project-based learning, not busywork",
        "Mentorship from the founder",
        "Open-source friendly experience",
        "Certificate of completion",
      ]}
    />
  ),
});
