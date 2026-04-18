import fs from "fs/promises";
import path from "path";
import { normalizePan } from "@/lib/validation";

const dataPath = path.join(process.cwd(), "data", "applications.json");

export async function readApplications() {
  const raw = await fs.readFile(dataPath, "utf8");
  return JSON.parse(raw);
}

export function findByPanAndPhone(list, pan, phone) {
  const p = normalizePan(pan);
  const ph = String(phone || "")
    .replace(/\D/g, "")
    .slice(-10);
  return list.find((a) => a.pan === p || a.phone === ph);
}
