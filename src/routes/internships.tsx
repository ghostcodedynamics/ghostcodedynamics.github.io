import { ComingSoon } from "@/components/coming-soon";
import { Seo } from "@/components/seo";

export default function Page() {
  return (
    <>
      <Seo title={"Internships - GhostCode Dynamics"} description={"A future internship program for students who want to build production-grade work."} path={"/internships"} robots="noindex, follow" />
      <ComingSoon
      module="Internships"
      title="Real internships. Real projects."
      description="A future internship program at GhostCode Dynamics — for students who want to build production-grade work alongside the team."
      bullets={[
        "Project-based learning, not busywork",
        "Mentorship from the founder",
        "Open-source friendly experience",
        "Certificate of completion",
      ]}
    />
    </>
  );
}
