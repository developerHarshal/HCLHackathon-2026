const COOKIE_NAME = "hcl_app_numbers";
const MAX_APPLICATIONS = 5;
const ONE_YEAR = 60 * 60 * 24 * 365;

function readList() {
  if (typeof document === "undefined") return [];
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`),
  );
  if (!match) return [];
  try {
    const parsed = JSON.parse(decodeURIComponent(match[1]));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeList(list) {
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(
    JSON.stringify(list),
  )}; path=/; max-age=${ONE_YEAR}; SameSite=Lax`;
}

export function getApplicationNumbers() {
  return readList();
}

export function storeApplicationNumber(applicationNumber) {
  const key = String(applicationNumber || "").trim();
  if (!key) return readList();
  const list = readList();
  if (list.includes(key)) return list;
  if (list.length >= MAX_APPLICATIONS) return list;
  const next = [...list, key];
  writeList(next);
  return next;
}

export function canSubmitMoreApplications() {
  return readList().length < MAX_APPLICATIONS;
}

export { MAX_APPLICATIONS };
