const PHONE_IN = /^[6-9]\d{9}$/;
const EMAIL =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const PAN = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

export function isValidPhone(value) {
  return PHONE_IN.test(String(value).trim());
}

export function isValidEmail(value) {
  return EMAIL.test(String(value).trim());
}

export function normalizePan(value) {
  return String(value || "")
    .replace(/\s/g, "")
    .toUpperCase();
}

export function isValidPan(value) {
  return PAN.test(normalizePan(value));
}

export function parseAnnualIncome(value) {
  const n = Number(String(value).replace(/,/g, "").trim());
  if (!Number.isFinite(n) || n <= 0) return null;
  return Math.round(n);
}

export function isValidDob(value) {
  if (!value) return false;
  const d = new Date(value + "T12:00:00");
  if (Number.isNaN(d.getTime())) return false;
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  return d <= today;
}
