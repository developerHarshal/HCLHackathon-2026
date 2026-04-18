import { NextResponse } from "next/server";
import { findByPanAndPhone, readApplications } from "@/lib/applications-store";
import {
  isValidDob,
  isValidEmail,
  isValidPan,
  isValidPhone,
  normalizePan,
  parseAnnualIncome,
} from "@/lib/validation";

function badRequest(message, errors) {
  return NextResponse.json(
    { message, ...(errors ? { errors } : {}) },
    { status: 400 }
  );
}

function randomApplicationNumber() {
  return `APP-${Math.floor(10000 + Math.random() * 90000)}`;
}

export async function POST(request) {
  let form;
  try {
    form = await request.formData();
  } catch {
    return badRequest("Invalid form data");
  }

  const name = String(form.get("name") || "").trim();
  const email = String(form.get("email") || "").trim();
  const phone = String(form.get("phone") || "").trim();
  const address = String(form.get("address") || "").trim();
  const panRaw = String(form.get("pan") || "");
  const occupation = String(form.get("occupation") || "").trim();
  const annualIncomeRaw = form.get("annualIncome");
  const dob = String(form.get("dob") || "").trim();
  const file = form.get("incomeProof");

  const errors = {};
  if (!name) errors.name = "Required";
  if (!email) errors.email = "Required";
  else if (!isValidEmail(email)) errors.email = "Invalid email";
  if (!phone) errors.phone = "Required";
  else if (!isValidPhone(phone)) errors.phone = "Enter 10-digit mobile number";
  if (!address) errors.address = "Required";
  const pan = normalizePan(panRaw);
  if (!pan) errors.pan = "Required";
  else if (!isValidPan(pan)) errors.pan = "Invalid PAN";
  if (!occupation) errors.occupation = "Required";
  const annualIncome = parseAnnualIncome(annualIncomeRaw);
  if (annualIncome == null) errors.annualIncome = "Enter a valid amount";
  if (!dob) errors.dob = "Required";
  else if (!isValidDob(dob)) errors.dob = "Invalid date of birth";
  if (!file || typeof file === "string" || file.size === 0) {
    errors.incomeProof = "Upload income proof";
  }

  if (Object.keys(errors).length) {
    return badRequest("Validation failed", errors);
  }

  let list;
  try {
    list = await readApplications();
  } catch {
    return NextResponse.json(
      { message: "Unable to read applications" },
      { status: 500 }
    );
  }

  const existing = findByPanAndPhone(list, pan, phone);
  if (existing) {
    return NextResponse.json({
      alreadyExists: true,
      applicationNumber: existing.applicationNumber,
      status: existing.status,
    });
  }

  return NextResponse.json({
    alreadyExists: false,
    applicationNumber: randomApplicationNumber(),
    status: "PENDING",
  });
}
