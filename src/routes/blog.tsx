import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/coming-soon";
import { createNoIndexHead } from "@/lib/seo";

export const Route = createFileRoute("/blog")({
  head: () =>
    createNoIndexHead(
      "Blog - GhostCode Dynamics",
      "Future build journals, security write-ups and reflections from GhostCode Dynamics.",
      "/blog",
    ),
  component: () => (
    <ComingSoon
      module="Blog"
      title="Notes from the lab."
      description="Build journals, security write-ups and honest reflections on running a founder-led tech brand."
    />
  ),
});
