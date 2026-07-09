import { ComingSoon } from "@/components/coming-soon";
import { Seo } from "@/components/seo";

export default function Page() {
  return (
    <>
      <Seo title={"Student Community - GhostCode Dynamics"} description={"A future community space for students learning to build} path={ship and grow together."} robots="noindex, follow" />
      <ComingSoon
      module="Community"
      title="A home for student builders."
      description="A future community space for students learning to build, ship and grow — together."
    />
    </>
  );
}
