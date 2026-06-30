import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/coming-soon";
import { createNoIndexHead } from "@/lib/seo";

export const Route = createFileRoute("/community")({
  head: () =>
    createNoIndexHead(
      "Student Community - GhostCode Dynamics",
      "A future community space for students learning to build, ship and grow together.",
      "/community",
    ),
  component: () => (
    <ComingSoon
      module="Community"
      title="A home for student builders."
      description="A future community space for students learning to build, ship and grow — together."
    />
  ),
});
