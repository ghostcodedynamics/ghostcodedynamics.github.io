import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Mail, Linkedin, Instagram, Github, MessageCircle, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { PageHero, Reveal } from "@/components/section";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — GhostCode Dynamics" },
      {
        name: "description",
        content: "Start a conversation about your project, mentorship, or collaboration with GhostCode Dynamics.",
      },
      { property: "og:title", content: "Contact — GhostCode Dynamics" },
      { property: "og:description", content: "Reach out for projects, mentorship or collaborations." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const contactSchema = z.object({
  name: z.string().trim().min(1, "Please tell us your name").max(80),
  email: z.string().trim().email("That doesn't look like a valid email").max(160),
  topic: z.enum(["project", "mentorship", "collab", "other"]),
  message: z.string().trim().min(10, "A few more words would help").max(1500),
});

type ContactValues = z.infer<typeof contactSchema>;

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [values, setValues] = useState<ContactValues>({
    name: "",
    email: "",
    topic: "project",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactValues, string>>>({});

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const errs: typeof errors = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as keyof ContactValues;
        if (!errs[k]) errs[k] = issue.message;
      }
      setErrors(errs);
      toast.error("Please fix the highlighted fields.");
      return;
    }
    setErrors({});
    // Future: wire this to an API route or server function
    setSubmitted(true);
    toast.success("Message received — we'll be in touch soon.");
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's build something."
        description="Tell us about your project, idea, or what you're trying to learn. Real replies from a real person — usually within a day or two."
      />

      <section className="container-prose pt-16 pb-24 md:pt-20">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Form */}
          <Reveal className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 md:p-10 shadow-elevated">
              <div className="absolute inset-0 bg-aurora opacity-30" aria-hidden />
              <div className="relative">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="py-10 text-center"
                  >
                    <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-primary">
                      <CheckCircle2 className="h-6 w-6" />
                    </div>
                    <h2 className="mt-5 font-display text-2xl font-semibold text-foreground">
                      Message sent.
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Thanks, {values.name.split(" ")[0]}. We&apos;ll get back to you soon at{" "}
                      <span className="text-foreground">{values.email}</span>.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setValues({ name: "", email: "", topic: "project", message: "" });
                      }}
                      className="mt-6 text-sm font-medium text-primary hover:underline"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={onSubmit} className="space-y-5" noValidate>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Your name" error={errors.name}>
                        <input
                          required
                          maxLength={80}
                          value={values.name}
                          onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
                          className={inputCls(!!errors.name)}
                          placeholder="Jane Doe"
                          autoComplete="name"
                        />
                      </Field>
                      <Field label="Email" error={errors.email}>
                        <input
                          required
                          type="email"
                          maxLength={160}
                          value={values.email}
                          onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
                          className={inputCls(!!errors.email)}
                          placeholder="you@company.com"
                          autoComplete="email"
                        />
                      </Field>
                    </div>

                    <Field label="What can we help with?">
                      <div className="flex flex-wrap gap-2">
                        {(
                          [
                            ["project", "Project"],
                            ["mentorship", "Mentorship"],
                            ["collab", "Collaboration"],
                            ["other", "Other"],
                          ] as const
                        ).map(([val, label]) => {
                          const active = values.topic === val;
                          return (
                            <button
                              type="button"
                              key={val}
                              onClick={() => setValues((v) => ({ ...v, topic: val }))}
                              className={[
                                "rounded-full border px-3.5 py-1.5 text-xs font-medium transition",
                                active
                                  ? "border-primary/60 bg-primary/15 text-foreground"
                                  : "border-border bg-surface/60 text-muted-foreground hover:text-foreground",
                              ].join(" ")}
                            >
                              {label}
                            </button>
                          );
                        })}
                      </div>
                    </Field>

                    <Field label="Message" error={errors.message}>
                      <textarea
                        required
                        rows={6}
                        maxLength={1500}
                        value={values.message}
                        onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
                        className={inputCls(!!errors.message) + " resize-y"}
                        placeholder="Tell us about your project, goal or what you're trying to learn..."
                      />
                    </Field>

                    <div className="flex items-center justify-between gap-4">
                      <p className="text-xs text-muted-foreground">
                        We&apos;ll only use your email to reply. No newsletters, no spam.
                      </p>
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center rounded-full bg-foreground px-6 py-2.5 text-sm font-medium text-background transition hover:opacity-90 shadow-elevated"
                      >
                        Send message
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </Reveal>

          {/* Side info */}
          <Reveal className="lg:col-span-5" delay={0.1}>
            <div className="space-y-4">
              <ContactCard
                icon={<Mail className="h-4 w-4" />}
                label="Email"
                value="ghostcodedynamics@gmail.com"
                href="mailto:ghostcodedynamics@gmail.com"
              />
              <ContactCard
                icon={<Linkedin className="h-4 w-4" />}
                label="LinkedIn — Company"
                value="ghostcodedynamics"
                href="https://www.linkedin.com/company/ghostcodedynamics/"
                external
              />
              <ContactCard
                icon={<Linkedin className="h-4 w-4" />}
                label="LinkedIn — Founder"
                value="jeetahirwar"
                href="https://www.linkedin.com/in/jeetahirwar/"
                external
              />
              <ContactCard
                icon={<Instagram className="h-4 w-4" />}
                label="Instagram"
                value="@ghostcode_dynamics"
                href="https://www.instagram.com/ghostcode_dynamics"
                external
              />
              <ContactCard
                icon={<Github className="h-4 w-4" />}
                label="GitHub"
                value="Coming soon"
              />
              <ContactCard
                icon={<MessageCircle className="h-4 w-4" />}
                label="WhatsApp"
                value="Available on request"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Field({
  label, error, children,
}: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</span>
      <div className="mt-2">{children}</div>
      {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
    </label>
  );
}

function inputCls(hasError: boolean) {
  return [
    "w-full rounded-xl border bg-surface/60 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground",
    "transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background",
    hasError ? "border-destructive" : "border-border focus:border-primary/60",
  ].join(" ");
}

function ContactCard({
  icon, label, value, href, external = false,
}: { icon: React.ReactNode; label: string; value: string; href?: string; external?: boolean }) {
  const inner = (
    <div className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/40">
      <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-surface-elevated text-primary ring-1 ring-border">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{label}</p>
        <p className="truncate text-sm text-foreground">{value}</p>
      </div>
    </div>
  );
  if (!href) return inner;
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="block"
    >
      {inner}
    </a>
  );
}
