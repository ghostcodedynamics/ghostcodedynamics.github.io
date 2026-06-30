import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/coming-soon";
import { createNoIndexHead } from "@/lib/seo";

export const Route = createFileRoute("/events")({
  head: () =>
    createNoIndexHead(
      "Events & Workshops - GhostCode Dynamics",
      "Future workshops, webinars and live builds on web development and cybersecurity.",
      "/events",
    ),
  component: () => (
    <ComingSoon
      module="Events"
      title="Workshops, webinars & live builds."
      description="Free and paid sessions on web development, cybersecurity and shipping real projects."
    />
  ),
});
