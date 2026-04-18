"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormHelperText from "@mui/material/FormHelperText";
import InputAdornment from "@mui/material/InputAdornment";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  MAX_APPLICATIONS,
  canSubmitMoreApplications,
  getApplicationNumbers,
  storeApplicationNumber,
} from "@/lib/client-app-cookies";
import { phoneDigits, registerSchema } from "@/lib/register-schema";
import { normalizePan } from "@/lib/validation";

const defaultValues = {
  name: "",
  email: "",
  phone: "",
  address: "",
  pan: "",
  occupation: "",
  annualIncome: "",
  dob: "",
};

const MAX_INCOME_PROOF_BYTES = 5 * 1024 * 1024;

export default function ApplicationForm() {
  const [storedNumbers, setStoredNumbers] = useState([]);
  const [file, setFile] = useState(null);
  const [fileInputKey, setFileInputKey] = useState(0);
  const [panVisible, setPanVisible] = useState(false);
  const [apiError, setApiError] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    setStoredNumbers(getApplicationNumbers());
  }, []);

  const atLimit = storedNumbers.length >= MAX_APPLICATIONS;

  const {
    register,
    control,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues,
  });

  const onSubmit = handleSubmit(async (data) => {
    setApiError("");
    setResult(null);
    if (!canSubmitMoreApplications()) {
      setApiError(
        `can submit at most ${MAX_APPLICATIONS} applications from this browser.`,
      );
      return;
    }
    if (!file) {
      setError("incomeProof", {
        type: "manual",
        message: "Upload income proof",
      });
      return;
    }
    if (file.size > MAX_INCOME_PROOF_BYTES) {
      setError("incomeProof", {
        type: "manual",
        message: "File must be 5 MB or smaller",
      });
      return;
    }

    const fd = new FormData();
    fd.set("name", data.name.trim());
    fd.set("email", data.email.trim());
    fd.set("phone", phoneDigits(data.phone));
    fd.set("address", data.address.trim());
    fd.set("pan", normalizePan(data.pan));
    fd.set("occupation", data.occupation.trim());
    fd.set("annualIncome", String(data.annualIncome).trim());
    fd.set("dob", data.dob);
    fd.set("incomeProof", file);

    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        body: fd,
      });
      const payload = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (payload.errors && typeof payload.errors === "object") {
          Object.entries(payload.errors).forEach(([k, v]) =>
            setError(k, { type: "server", message: String(v) }),
          );
        }
        setApiError(payload.message || "Submission failed");
        return;
      }
      setResult(payload);
      if (payload.applicationNumber) {
        const next = storeApplicationNumber(payload.applicationNumber);
        setStoredNumbers(next);
      }
      if (!payload.alreadyExists) {
        reset(defaultValues);
        setFile(null);
        setFileInputKey((k) => k + 1);
      }
    } catch {
      setApiError("Network error. Try again.");
    }
  });

  return (
    <Box component="form" onSubmit={onSubmit} noValidate autoComplete="off">
      <Stack spacing={2}>
        {storedNumbers.length > 0 ? (
          <Alert severity={atLimit ? "warning" : "info"}>
            <Stack spacing={1}>
              <span>
                Your applications <br />
                {/* ({storedNumbers.length}/{MAX_APPLICATIONS}):{" "} */}
                {storedNumbers.join(", ")}
              </span>
              <Stack
                direction="row"
                gap={2}
                flexWrap="wrap"
                alignItems="center"
              >
                <Link component={NextLink} href="/status">
                  View status page
                </Link>
                {!atLimit ? (
                  <Button
                    type="button"
                    size="small"
                    variant="outlined"
                    onClick={() => {
                      window.location.assign("/register");
                    }}
                  >
                    {"  "}Submit new application
                  </Button>
                ) : null}
              </Stack>
            </Stack>
          </Alert>
        ) : null}

        <TextField
          required
          label="Name"
          size="small"
          fullWidth
          autoComplete="name"
          spellCheck={false}
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
        />

        <Controller
          name="phone"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              required
              label="Contact No."
              size="small"
              fullWidth
              {...field}
              onChange={(e) =>
                field.onChange(e.target.value.replace(/\D/g, "").slice(0, 10))
              }
              inputProps={{
                inputMode: "numeric",
                maxLength: 10,
                spellCheck: false,
                autoComplete: "tel",
              }}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <TextField
          required
          label="Email"
          type="email"
          size="small"
          fullWidth
          autoComplete="email"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          required
          label="Address"
          multiline
          minRows={3}
          size="small"
          fullWidth
          autoComplete="street-address"
          spellCheck={false}
          {...register("address")}
          error={!!errors.address}
          helperText={errors.address?.message}
        />

        <Controller
          name="pan"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              required
              label="PAN"
              size="small"
              fullWidth
              type={panVisible ? "text" : "password"}
              {...field}
              onChange={(e) => field.onChange(e.target.value.toUpperCase())}
              inputProps={{
                maxLength: 10,
                spellCheck: false,
                autoComplete: "off",
                autoCapitalize: "characters",
                autoCorrect: "off",
                onCopy: (e) => e.preventDefault(),
                onCut: (e) => e.preventDefault(),
              }}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        type="button"
                        size="small"
                        tabIndex={-1}
                        onClick={() => setPanVisible((v) => !v)}
                      >
                        {panVisible ? "Hide" : "Show"}
                      </Button>
                    </InputAdornment>
                  ),
                },
              }}
            />
          )}
        />

        <TextField
          required
          label="Occupation"
          multiline
          minRows={3}
          size="small"
          fullWidth
          autoComplete="off"
          spellCheck={false}
          {...register("occupation")}
          error={!!errors.occupation}
          helperText={errors.occupation?.message}
        />

        <TextField
          required
          label="Annual Income"
          size="small"
          fullWidth
          inputProps={{ inputMode: "decimal", autoComplete: "off" }}
          {...register("annualIncome")}
          error={!!errors.annualIncome}
          helperText={errors.annualIncome?.message}
        />

        <TextField
          required
          label="Date of Birth"
          type="date"
          size="small"
          fullWidth
          autoComplete="off"
          {...register("dob")}
          error={!!errors.dob}
          helperText={errors.dob?.message}
          slotProps={{
            inputLabel: { shrink: true },
            htmlInput: { autoComplete: "off" },
          }}
        />

        <Box>
          <Button variant="outlined" component="label" size="small">
            Income proof
            <input
              key={fileInputKey}
              hidden
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,image/jpeg,image/png,application/pdf"
              onChange={(e) => {
                const f = e.target.files?.[0] ?? null;
                if (f && f.size > MAX_INCOME_PROOF_BYTES) {
                  setFile(null);
                  setError("incomeProof", {
                    type: "manual",
                    message: "File must be 5 MB or smaller",
                  });
                  setFileInputKey((k) => k + 1);
                  return;
                }
                setFile(f);
                clearErrors("incomeProof");
              }}
            />
          </Button>
          <FormHelperText sx={{ mt: 0.5 }}>
            PDF or image, up to 5 MB
          </FormHelperText>
          {file ? <FormHelperText>{file.name}</FormHelperText> : null}
          {errors.incomeProof ? (
            <FormHelperText error>{errors.incomeProof.message}</FormHelperText>
          ) : null}
        </Box>

        <Box>
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting || atLimit}
          >
            {isSubmitting ? "Submitting…" : "Submit application"}
          </Button>
          {atLimit ? (
            <FormHelperText error sx={{ mt: 1 }}>
              Maximum {MAX_APPLICATIONS} applications reached for this browser.
            </FormHelperText>
          ) : null}
        </Box>

        {apiError ? <Alert severity="error">{apiError}</Alert> : null}

        {result && !result.alreadyExists ? (
          <Alert severity="success">
            Application created. Number:{" "}
            <strong>{result.applicationNumber}</strong>. Status:{" "}
            <strong>{result.status}</strong>
          </Alert>
        ) : null}

        {result && result.alreadyExists ? (
          <Alert severity="info">
            An application already exists for these details. Application Number:{" "}
            <strong>{result.applicationNumber}</strong>. Status:{" "}
            <strong>{result.status}</strong>. Check status:{" "}
            <Link component={NextLink} href="/status">
              View status page
            </Link>
          </Alert>
        ) : null}
      </Stack>
    </Box>
  );
}
