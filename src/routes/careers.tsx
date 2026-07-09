import { ComingSoon } from "@/components/coming-soon";
import { Seo } from "@/components/seo";

export default function Page() {
  return (
    <>
      <Seo title={"Careers - GhostCode Dynamics"} description={"Future roles for developers} path={designers and student collaborators at GhostCode Dynamics."} robots="noindex, follow" />
      <ComingSoon
      module="Careers"
      title="Join the next phase."
      description="As GhostCode grows, we'll open roles for developers, designers and student collaborators who care about craft."
    />
    </>
  );
}
