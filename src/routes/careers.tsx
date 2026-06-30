import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/coming-soon";
import { createNoIndexHead } from "@/lib/seo";

export const Route = createFileRoute("/careers")({
  head: () =>
    createNoIndexHead(
      "Careers - GhostCode Dynamics",
      "Future roles for developers, designers and student collaborators at GhostCode Dynamics.",
      "/careers",
    ),
  component: () => (
    <ComingSoon
      module="Careers"
      title="Join the next phase."
      description="As GhostCode grows, we'll open roles for developers, designers and student collaborators who care about craft."
    />
  ),
});
