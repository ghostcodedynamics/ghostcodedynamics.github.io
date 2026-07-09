import { ComingSoon } from "@/components/coming-soon";
import { Seo } from "@/components/seo";

export default function Page() {
  return (
    <>
      <Seo title={"Courses - GhostCode Dynamics"} description={"Future practical courses on MERN} path={security fundamentals and modern web development."} robots="noindex, follow" />
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
    </>
  );
}
