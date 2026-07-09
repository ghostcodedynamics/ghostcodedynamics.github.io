import { z } from "zod";
import { API_BASE } from "@/constants/api";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  subject: z.string().trim().min(2, "Subject is required").max(150),
  message: z.string().trim().min(10, "Tell us a bit more").max(2000),
});

export type ContactInput = z.infer<typeof contactSchema>;

export async function sendContactMessage(input: ContactInput): Promise<{ ok: true }> {
  const parsed = contactSchema.parse(input);
  // TODO(api): POST `${API_BASE}/contact`
  void API_BASE;
  void parsed;
  await new Promise((r) => setTimeout(r, 500));
  return { ok: true };
}
