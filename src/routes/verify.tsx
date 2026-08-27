import { useState } from "react";
import { motion } from "framer-motion";
import { BadgeCheck, QrCode, Search, ShieldCheck, FileText, Loader2 } from "lucide-react";
import { PageHero, SectionHeader, Reveal } from "@/components/section";
import { Seo } from "@/components/seo";
import { Faq, FeatureGrid, ProgramCta, StatusNote } from "@/components/program-page";
import { breadcrumbSchema, webPageSchema } from "@/lib/seo";
import { formatDate } from "@/lib/format";

const title = "Certificate Verification - GhostCode Dynamics";
const description =
  "Verify a GhostCode Dynamics certificate ID issued for internships, Academy cohorts and programs. Public, tamper-evident certificate lookup.";
const path = "/verify";

const FEATURES = [
  {
    icon: <Search className="h-5 w-5" />,
    title: "Public lookup",
    desc: "Anyone with a certificate ID can confirm it without an account, a login or a support email.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "Tamper-evident IDs",
    desc: "Each certificate carries a signed identifier tied to the cohort record, so edited PDFs fail verification.",
  },
  {
    icon: <FileText className="h-5 w-5" />,
    title: "Issued-on details",
    desc: "Verification returns the recipient name, program, issue date and completion status — nothing more.",
  },
  {
    icon: <QrCode className="h-5 w-5" />,
    title: "QR friendly",
    desc: "Every certificate prints a QR code that opens this page with the ID already filled in.",
  },
];

const FAQS = [
  {
    q: "Is verification live?",
    a: "The lookup form is here and ready, but no certificates have been issued yet. The registry goes live with the first completed cohort.",
  },
  {
    q: "What does a certificate ID look like?",
    a: "GCD-YYYY-XXXXXX — for example GCD-2026-A81C4F. It is printed on the certificate and encoded in its QR code.",
  },
  {
    q: "Can an employer trust this?",
    a: "Yes. Verification is served from our own registry, and results include the exact program and dates so claims can be checked against the certificate itself.",
  },
  {
    q: "I lost my certificate ID.",
    a: "Email us from the address you enrolled with and we will re-issue your ID and a fresh PDF copy.",
  },
];

type Status = "idle" | "loading" | "invalid" | "notfound";

const ID_PATTERN = /^GCD-\d{4}-[A-Z0-9]{6}$/i;

export default function Page() {
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const id = value.trim();
    if (!ID_PATTERN.test(id)) {
      setStatus("invalid");
      return;
    }
    setStatus("loading");
    // Placeholder lookup. Swap for a real registry call when cohorts go live.
    await new Promise((r) => setTimeout(r, 700));
    setStatus("notfound");
  }

  return (
    <>
      <Seo
        title={title}
        description={description}
        path={path}
        schemas={[
          webPageSchema(title, description, path),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Verify", path },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Verify · Registry opening soon"
        title="Verify a GhostCode certificate."
        description="Certificates issued for internships, Academy cohorts and programs can be checked here in seconds using the ID printed on the document."
      >
        <StatusNote>Registry empty until the first cohort completes</StatusNote>
      </PageHero>

      <section className="relative py-8 md:py-12">
        <div className="container-prose">
          <Reveal className="mx-auto max-w-2xl rounded-3xl border border-border bg-card/60 p-6 backdrop-blur sm:p-8">
            <h2 className="font-display text-xl font-semibold tracking-tight text-foreground">
              Certificate lookup
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Enter the ID exactly as printed, for example{" "}
              <span className="font-mono text-foreground">GCD-2026-A81C4F</span>.
            </p>

            <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
              <label htmlFor="cert-id" className="sr-only">
                Certificate ID
              </label>
              <input
                id="cert-id"
                name="cert-id"
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                  setStatus("idle");
                }}
                placeholder="GCD-2026-A81C4F"
                autoComplete="off"
                spellCheck={false}
                className="w-full rounded-full border border-border bg-surface/60 px-5 py-3 font-mono text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary/50"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background shadow-elevated transition hover:opacity-90 disabled:opacity-60"
              >
                {status === "loading" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <BadgeCheck className="h-4 w-4" />
                )}
                Verify
              </button>
            </form>

            <div aria-live="polite" className="mt-5 min-h-[1.5rem]">
              {status === "invalid" && (
                <motion.p
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-destructive"
                >
                  That does not look like a GhostCode certificate ID. The format is GCD-YYYY-XXXXXX.
                </motion.p>
              )}
              {status === "notfound" && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border border-border bg-surface/60 p-4 text-sm leading-relaxed text-muted-foreground"
                >
                  No certificate found for that ID. The registry is empty until our first cohort
                  completes — checked on {formatDate(new Date().toISOString())}. If you hold a
                  certificate and see this message, contact us and we will confirm it manually.
                </motion.div>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <FeatureGrid
        eyebrow="How it works"
        title="What verification guarantees"
        items={FEATURES}
        columns={4}
      />

      <section className="relative border-t border-border/60 py-16 md:py-24">
        <div className="container-prose">
          <SectionHeader
            eyebrow="Anatomy"
            title="What's on a GhostCode certificate"
            description="Every issued certificate carries the same fields so verification results can be matched line for line."
          />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { k: "Recipient", v: "Full name as enrolled" },
              { k: "Program", v: "Cohort, track or internship block" },
              { k: "Issued on", v: "Completion date" },
              { k: "Certificate ID", v: "GCD-YYYY-XXXXXX + QR" },
            ].map((f) => (
              <Reveal key={f.k}>
                <li className="h-full rounded-2xl border border-border bg-card/60 p-5 backdrop-blur">
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
                    {f.k}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">{f.v}</p>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <Faq items={FAQS} />

      <ProgramCta
        title="Need a certificate checked manually?"
        description="Send us the ID or a copy of the document and we will confirm its authenticity directly."
        primaryLabel="Contact us"
        secondaryLabel="See the Academy"
        secondaryTo="/academy"
      />
    </>
  );
}
