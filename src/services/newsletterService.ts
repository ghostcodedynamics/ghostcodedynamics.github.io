import { z } from "zod";
import { API_BASE } from "@/constants/api";

export const newsletterSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: "Enter a valid email address" })
    .max(255, { message: "Email is too long" }),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;

export async function subscribe(input: NewsletterInput): Promise<{ ok: true }> {
  const parsed = newsletterSchema.parse(input);
  // TODO(api): POST `${API_BASE}/newsletter/subscribe`
  void API_BASE;
  void parsed;
  await new Promise((r) => setTimeout(r, 400));
  return { ok: true };
}
