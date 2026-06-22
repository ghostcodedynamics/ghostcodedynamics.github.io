import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/coming-soon";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Student Community — GhostCode Dynamics" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: () => (
    <ComingSoon
      module="Community"
      title="A home for student builders."
      description="A future community space for students learning to build, ship and grow — together."
    />
  ),
});
