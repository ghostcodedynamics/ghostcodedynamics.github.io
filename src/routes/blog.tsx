import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/coming-soon";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — GhostCode Dynamics" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: () => (
    <ComingSoon
      module="Blog"
      title="Notes from the lab."
      description="Build journals, security write-ups and honest reflections on running a founder-led tech brand."
    />
  ),
});
