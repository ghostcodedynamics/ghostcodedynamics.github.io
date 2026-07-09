import { ComingSoon } from "@/components/coming-soon";
import { Seo } from "@/components/seo";

export default function Page() {
  return (
    <>
      <Seo title={"GhostCode Academy - GhostCode Dynamics"} description={"A future education arm for structured learning paths in modern web development and cybersecurity."} path={"/academy"} robots="noindex, follow" />
      <ComingSoon
      module="Academy"
      title="GhostCode Academy."
      description="A future education arm — structured learning paths in modern web development and security, built around real projects."
    />
    </>
  );
}
