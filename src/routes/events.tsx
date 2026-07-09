import { ComingSoon } from "@/components/coming-soon";
import { Seo } from "@/components/seo";

export default function Page() {
  return (
    <>
      <Seo title={"Events & Workshops - GhostCode Dynamics"} description={"Future workshops} path={webinars and live builds on web development and cybersecurity."} robots="noindex, follow" />
      <ComingSoon
      module="Events"
      title="Workshops, webinars & live builds."
      description="Free and paid sessions on web development, cybersecurity and shipping real projects."
    />
    </>
  );
}
