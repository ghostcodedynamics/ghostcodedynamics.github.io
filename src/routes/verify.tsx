import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/coming-soon";

export const Route = createFileRoute("/verify")({
  head: () => ({
    meta: [
      { title: "Certificate Verification — GhostCode Dynamics" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
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
