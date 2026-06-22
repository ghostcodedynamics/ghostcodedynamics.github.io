import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/coming-soon";

export const Route = createFileRoute("/labs")({
  head: () => ({
    meta: [
      { title: "GhostCode Labs" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: () => (
    <ComingSoon
      module="Labs"
      title="GhostCode Labs."
      description="Where experiments live. Open security labs, side-projects and explorations from the GhostCode workshop."
    />
  ),
});
