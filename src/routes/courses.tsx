import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/coming-soon";

export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [
      { title: "Courses — GhostCode Dynamics" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: () => (
    <ComingSoon
      module="Courses"
      title="Practical courses, built by builders."
      description="Short, focused courses on MERN, security fundamentals and modern web — written by someone who ships, not just teaches."
      bullets={[
        "Hands-on projects",
        "Lifetime updates",
        "Honest, no-fluff content",
        "Community Q&A",
      ]}
    />
  ),
});
