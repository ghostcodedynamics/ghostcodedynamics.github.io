import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/coming-soon";

export const Route = createFileRoute("/academy")({
  head: () => ({
    meta: [
      { title: "GhostCode Academy" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: () => (
    <ComingSoon
      module="Academy"
      title="GhostCode Academy."
      description="A future education arm — structured learning paths in modern web development and security, built around real projects."
    />
  ),
});
