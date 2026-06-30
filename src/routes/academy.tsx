import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/coming-soon";
import { createNoIndexHead } from "@/lib/seo";

export const Route = createFileRoute("/academy")({
  head: () =>
    createNoIndexHead(
      "GhostCode Academy - GhostCode Dynamics",
      "A future education arm for structured learning paths in modern web development and cybersecurity.",
      "/academy",
    ),
  component: () => (
    <ComingSoon
      module="Academy"
      title="GhostCode Academy."
      description="A future education arm — structured learning paths in modern web development and security, built around real projects."
    />
  ),
});
