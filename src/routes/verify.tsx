import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/coming-soon";
import { createNoIndexHead } from "@/lib/seo";

export const Route = createFileRoute("/verify")({
  head: () =>
    createNoIndexHead(
      "Certificate Verification - GhostCode Dynamics",
      "Future certificate lookup for GhostCode cohorts, internships and programs.",
      "/verify",
    ),
  component: () => (
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
  ),
});
