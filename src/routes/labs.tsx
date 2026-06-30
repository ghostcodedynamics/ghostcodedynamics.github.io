import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/coming-soon";
import { createNoIndexHead } from "@/lib/seo";

export const Route = createFileRoute("/labs")({
  head: () =>
    createNoIndexHead(
      "GhostCode Labs - GhostCode Dynamics",
      "Future open security labs, side projects and experiments from GhostCode Dynamics.",
      "/labs",
    ),
  component: () => (
    <ComingSoon
      module="Labs"
      title="GhostCode Labs."
      description="Where experiments live. Open security labs, side-projects and explorations from the GhostCode workshop."
    />
  ),
});
