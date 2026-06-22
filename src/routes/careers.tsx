import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/coming-soon";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers — GhostCode Dynamics" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: () => (
    <ComingSoon
      module="Careers"
      title="Join the next phase."
      description="As GhostCode grows, we'll open roles for developers, designers and student collaborators who care about craft."
    />
  ),
});
