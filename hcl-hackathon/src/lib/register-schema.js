import { z } from "zod";
import {
  isValidDob,
  isValidEmail,
  isValidPan,
  isValidPhone,
  normalizePan,
  parseAnnualIncome,
} from "@/lib/validation";

function digits10(v) {
  return String(v ?? "")
    .replace(/\D/g, "")
    .slice(0, 10);
}

export const registerSchema = z.object({
  name: z.string().trim().min(1, "Required").max(120, "Too long"),
  email: z.string().trim().min(1, "Required").refine(isValidEmail, "Invalid email"),
  phone: z
    .string()
    .refine((v) => digits10(v).length > 0, "Required")
    .refine((v) => isValidPhone(digits10(v)), "Enter 10-digit mobile number"),
  address: z.string().trim().min(1, "Required").max(500, "Too long"),
  pan: z
    .string()
    .refine((v) => normalizePan(v).length > 0, "Required")
    .refine(isValidPan, "Invalid PAN"),
  occupation: z.string().trim().min(1, "Required").max(500, "Too long"),
  annualIncome: z
    .string()
    .refine((v) => parseAnnualIncome(v) != null, "Enter a valid amount"),
  dob: z.string().min(1, "Required").refine(isValidDob, "Invalid date of birth"),
});

export function phoneDigits(v) {
  return digits10(v);
}
