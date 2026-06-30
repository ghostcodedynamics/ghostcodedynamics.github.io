import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/coming-soon";
import { createNoIndexHead } from "@/lib/seo";

export const Route = createFileRoute("/courses")({
  head: () =>
    createNoIndexHead(
      "Courses - GhostCode Dynamics",
      "Future practical courses on MERN, security fundamentals and modern web development.",
      "/courses",
    ),
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
