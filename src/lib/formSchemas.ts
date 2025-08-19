import { z } from 'zod';

// Application form schema (Sprint 5)
export const BasvuruFormSchema = z.object({
  name: z
    .string({ required_error: 'required' })
    .trim()
    .min(2, 'min_2')
    .max(120, 'max_120'),
  email: z
    .string({ required_error: 'required' })
    .trim()
    .email('email_invalid')
    .max(160, 'max_160'),
  phone: z
    .string({ required_error: 'required' })
    .trim()
    .min(7, 'phone_invalid')
    .max(30, 'phone_invalid'),
  position: z
    .string()
    .trim()
    .max(120, 'max_120')
    .optional()
    .or(z.literal('').transform(() => undefined)),
  message: z
    .string({ required_error: 'required' })
    .trim()
    .min(10, 'min_10')
    .max(2000, 'max_2000'),
  consent: z
    .boolean({ required_error: 'consent_required' })
    .refine(v => v === true, 'consent_required'),
  // Honeypot (anti-spam). Empty string transforms to undefined
  hp: z
    .string()
    .optional()
    .or(z.literal('').transform(() => undefined)),
  // CV upload reserved for future sprint
  cv: z.any().optional()
});

export type BasvuruFormInput = z.infer<typeof BasvuruFormSchema>;

export type ApiValidationErrors = Record<string, string>;

export function zodErrorToFieldErrors(err: z.ZodError): ApiValidationErrors {
  const out: ApiValidationErrors = {};
  for (const issue of err.issues) {
    const path = issue.path.join('.') || '_';
    out[path] = String(issue.message || 'invalid');
  }
  return out;
}
