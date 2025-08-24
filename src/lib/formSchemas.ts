import { z } from 'zod';

// Application form schema (Sprint 5)
export const BasvuruFormSchema = z.object({
  name: z
    .string({ required_error: 'required' })
    .trim()
    .min(2, 'min_2')
    .max(120, 'max_120'),
  surname: z
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
  experience: z
    .string()
    .trim()
    .max(400, 'max_400')
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
  // cv metadata (validated in API when multipart is used)
  cvName: z.string().optional(),
  cvType: z.string().optional(),
  cvSize: z.number().optional()
});

export type BasvuruFormInput = z.infer<typeof BasvuruFormSchema>;

// Extended job application schema (legacy alignment) for /basvuru-formu
export const BasvuruExtendedFormSchema = z.object({
  common_name_surname: z.string({ required_error: 'required' }).trim().min(3, 'min_3').max(160, 'max_160'),
  common_email: z.string({ required_error: 'required' }).trim().email('email_invalid').max(160, 'max_160'),
  birth_day: z.string().optional().or(z.literal('').transform(() => undefined)), // '1'-'31'
  birth_month: z.string().optional().or(z.literal('').transform(() => undefined)), // '1'-'12'
  birth_year: z.string().optional().or(z.literal('').transform(() => undefined)), // '1944'-'2004'
  common_sex: z.enum(['bay', 'bayan'], { required_error: 'required' }),
  common_maritalStatus: z.enum(['evli', 'bekar'], { required_error: 'required' }),
  common_military: z.enum(['yapildi', 'tecilli', 'muaf'], { required_error: 'required' }),
  common_licence: z.enum(['yok','a1','a2','b','c','d','e','f','g','h'], { required_error: 'required' }),
  userfileName: z.string().optional(),
  userfileType: z.string().optional(),
  userfileSize: z.number().optional(),
  kisiselVerilerinKorunmasi: z.boolean({ required_error: 'consent_required' }).refine(v=>v===true,'consent_required'),
  cerezPolitikasi: z.boolean({ required_error: 'consent_required' }).refine(v=>v===true,'consent_required'),
  iletisim_token: z.string().optional(),
  hp: z.string().optional().or(z.literal('').transform(()=>undefined))
});

export type BasvuruExtendedFormInput = z.infer<typeof BasvuruExtendedFormSchema>;

export type ApiValidationErrors = Record<string, string>;

export function zodErrorToFieldErrors(err: z.ZodError): ApiValidationErrors {
  const out: ApiValidationErrors = {};
  for (const issue of err.issues) {
    const path = issue.path.join('.') || '_';
    out[path] = String(issue.message || 'invalid');
  }
  return out;
}

// Contact form schema
export const IletisimFormSchema = z.object({
  fullName: z
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
  subject: z
    .string({ required_error: 'required' })
    .trim()
    .min(2, 'min_2')
    .max(160, 'max_160'),
  message: z
    .string({ required_error: 'required' })
    .trim()
    .min(10, 'min_10')
    .max(2000, 'max_2000'),
  kisiselVerilerinKorunmasi: z
    .boolean({ required_error: 'consent_required' })
    .refine(v => v === true, 'consent_required'),
  cerezPolitikasi: z
    .boolean({ required_error: 'consent_required' })
    .refine(v => v === true, 'consent_required'),
  hp: z
    .string()
    .optional()
    .or(z.literal('').transform(() => undefined))
});

export type IletisimFormInput = z.infer<typeof IletisimFormSchema>;

// Franchising info form schema
export const FranchisingFormSchema = z.object({
  fullName: z
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
  brand: z.enum(['pidebypide', 'baydoner', 'bursaishakbey'], { required_error: 'required' }),
  budget: z
    .string({ required_error: 'required' })
    .trim()
    .min(1, 'required')
    .max(120, 'max_120'),
  location: z
    .string({ required_error: 'required' })
    .trim()
    .min(2, 'min_2')
    .max(160, 'max_160'),
  hp: z
    .string()
    .optional()
    .or(z.literal('').transform(() => undefined))
});

export type FranchisingFormInput = z.infer<typeof FranchisingFormSchema>;
