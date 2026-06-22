import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/coming-soon";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events & Workshops — GhostCode Dynamics" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: () => (
    <ComingSoon
      module="Events"
      title="Workshops, webinars & live builds."
      description="Free and paid sessions on web development, cybersecurity and shipping real projects."
    />
  ),
});
