import { ComingSoon } from "@/components/coming-soon";
import { Seo } from "@/components/seo";

export default function Page() {
  return (
    <>
      <Seo title={"GhostCode Labs - GhostCode Dynamics"} description={"Future open security labs} path={side projects and experiments from GhostCode Dynamics."} robots="noindex, follow" />
      <ComingSoon
      module="Labs"
      title="GhostCode Labs."
      description="Where experiments live. Open security labs, side-projects and explorations from the GhostCode workshop."
    />
    </>
  );
}
