import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Mail, Linkedin, Instagram, Github, MessageCircle, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { PageHero, Reveal } from "@/components/section";
import { breadcrumbSchema, createSeoHead, webPageSchema } from "@/lib/seo";

const title = "Contact - GhostCode Dynamics";
const description =
  "Start a conversation about your project, mentorship, or collaboration with GhostCode Dynamics.";

export const Route = createFileRoute("/contact")({
  head: () =>
    createSeoHead({
      title,
      description,
      path: "/contact",
      schemas: [
        webPageSchema(title, description, "/contact"),
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]),
      ],
    }),
  component: ContactPage,
});

const contactSchema = z.object({
  name: z.string().trim().min(1, "Please tell us your name").max(80),
  email: z.string().trim().email("That doesn't look like a valid email").max(160),
  phone: z.string().trim().min(10).max(15),
  topic: z.enum(["project", "mentorship", "collab", "other"]),
  message: z.string().trim().min(10, "A few more words would help").max(1500),
});

type ContactValues = z.infer<typeof contactSchema>;

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<ContactValues | null>(null);
  const [isSending, setIsSending] = useState(false);

  const [errors, setErrors] = useState<Partial<Record<keyof ContactValues, string>>>({});

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget as HTMLFormElement);

    const values = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      topic: String(formData.get("topic") || "project"),
      message: String(formData.get("message") || ""),
    } as ContactValues;

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
    setIsSending(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "6a694fae-2486-48cf-8b5a-c1530b9041b9",
          subject: `New inquiry from GhostCode Dynamics - ${values.topic}`,
          from_name: values.name,
          email: values.email,
          phone: values.phone,
          topic: values.topic,
          message: values.message,
          botcheck: "",
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmittedData(values);
        setSubmitted(true);
        toast.success("Message sent successfully. We'll be in touch soon.");
      } else {
        toast.error("Message could not be sent. Please try again.");
      }
    } catch {
      toast.error("Something went wrong. Please email us directly.");
    } finally {
      setIsSending(false);
    }
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
                      Inquiry received.
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Thanks, {submittedData?.name.split(" ")[0]}. We received your inquiry and will
                      reply within 24–48 hours at{" "}
                      <span className="text-foreground">{submittedData?.email}</span>.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setSubmittedData(null);
                      }}
                      className="mt-6 text-sm font-medium text-primary hover:underline"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={onSubmit} className="space-y-5" noValidate>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field id="contact-name" label="Your name" error={errors.name}>
                        <input
                          id="contact-name"
                          name="name"
                          required
                          maxLength={80}
                          className={inputCls(!!errors.name)}
                          placeholder="Enter your name"
                          autoComplete="name"
                        />
                      </Field>
                      <Field id="contact-email" label="Email" error={errors.email}>
                        <input
                          id="contact-email"
                          name="email"
                          required
                          type="email"
                          maxLength={160}
                          className={inputCls(!!errors.email)}
                          placeholder="you@company.com"
                          autoComplete="email"
                        />
                      </Field>
                      <Field id="contact-phone" label="Mobile Number" error={errors.phone}>
                        <input
                          id="contact-phone"
                          name="phone"
                          type="tel"
                          required
                          maxLength={15}
                          className={inputCls(!!errors.phone)}
                          placeholder="+91 0000000000"
                          autoComplete="tel"
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
                        ).map(([val, label]) => (
                          <label key={val} className="cursor-pointer">
                            <input
                              type="radio"
                              name="topic"
                              value={val}
                              defaultChecked={val === "project"}
                              className="peer sr-only"
                            />
                            <span className="inline-flex rounded-full border border-border bg-surface/60 px-3.5 py-1.5 text-xs font-medium text-muted-foreground transition hover:text-foreground peer-checked:border-primary/60 peer-checked:bg-primary/15 peer-checked:text-foreground">
                              {label}
                            </span>
                          </label>
                        ))}
                      </div>
                    </Field>

                    <Field id="contact-message" label="Message" error={errors.message}>
                      <textarea
                        id="contact-message"
                        name="message"
                        required
                        rows={6}
                        maxLength={1500}
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
                        disabled={isSending}
                        className="inline-flex items-center justify-center rounded-full bg-foreground px-6 py-2.5 text-sm font-medium text-background transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 shadow-elevated"
                      >
                        {isSending ? "Sending..." : "Send message"}
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
  id,
  label,
  error,
  children,
}: {
  id?: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  const labelClass = "text-xs font-medium uppercase tracking-wider text-muted-foreground";
  return (
    <div className="block">
      {id ? (
        <label htmlFor={id} className={labelClass}>
          {label}
        </label>
      ) : (
        <p className={labelClass}>{label}</p>
      )}
      <div className="mt-2">{children}</div>
      {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
    </div>
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
  icon,
  label,
  value,
  href,
  external = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}) {
  const inner = (
    <div className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/40">
      <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-surface-elevated text-primary ring-1 ring-border">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
          {label}
        </p>
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
