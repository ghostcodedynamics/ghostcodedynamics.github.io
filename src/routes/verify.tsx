import { ComingSoon } from "@/components/coming-soon";
import { Seo } from "@/components/seo";

export default function Page() {
  return (
    <>
      <Seo title={"Certificate Verification - GhostCode Dynamics"} description={"Future certificate lookup for GhostCode cohorts} path={internships and programs."} robots="noindex, follow" />
      <ComingSoon
      module="Verify"
      title="Verify a GhostCode certificate."
      description="Once cohorts and internships go live, certificate IDs will be verifiable here in seconds."
      bullets={[
        "Public certificate lookup",
        "Tamper-proof IDs",
        "Issued-on / recipient info",
        "QR-code friendly",
      ]}
    />
    </>
  );
}
