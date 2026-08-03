import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Check, Mail, User } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { AuthLayout } from "@/components/site/AuthLayout";
import { PasswordField } from "@/components/PasswordField";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Create Your DigiBank Account — Secure Online Registration" },
      {
        name: "description",
        content:
          "Register for DigiBank in minutes. Choose a user ID, set a strong password and get instant access to accounts, cards and payments.",
      },
      { property: "og:title", content: "Create Your DigiBank Account" },
      {
        property: "og:description",
        content: "Open a DigiBank account online with a secure user ID and password.",
      },
    ],
  }),
  component: RegisterPage,
});

const schema = z
  .object({
    fullName: z.string().trim().min(2, "Enter your full name").max(80),
    userId: z
      .string()
      .trim()
      .min(4, "User ID must be at least 4 characters")
      .max(24)
      .regex(/^[a-zA-Z0-9._]+$/, "Only letters, numbers, dot and underscore"),
    email: z.string().trim().email("Enter a valid email").max(255),
    password: z
      .string()
      .min(8, "Use at least 8 characters")
      .max(72)
      .regex(/[A-Z]/, "Add an uppercase letter")
      .regex(/[0-9]/, "Add a number"),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    path: ["confirm"],
    message: "Passwords do not match",
  });

const strengthLabels = ["Too short", "Weak", "Fair", "Strong", "Excellent"];

function scorePassword(password: string) {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password) && password.length >= 12) score += 1;
  return score;
}

function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    userId: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const score = scorePassword(form.password);

  const update = (key: keyof typeof form) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      parsed.error.issues.forEach((issue) => {
        const key = String(issue.path[0]);
        if (!next[key]) next[key] = issue.message;
      });
      setErrors(next);
      return;
    }
    setErrors({});
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Account created", { description: "Continue with your guided onboarding." });
      navigate({ to: "/onboarding" });
    }, 700);
  };

  return (
    <AuthLayout
      eyebrow="Create account"
      title="Banking that starts in five minutes."
      subtitle="Choose a user ID, set a password, and finish video KYC from anywhere in India."
      highlights={[
        "256-bit encryption on every session",
        "Instant virtual debit card on approval",
        "Zero-balance digital savings account",
      ]}
    >
      <div className="rounded-3xl border border-border bg-card p-7 shadow-card-soft sm:p-9">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
          DigiBank
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold">Create your account</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Already registered?{" "}
          <Link to="/login" className="font-semibold text-primary underline underline-offset-4">
            Login here
          </Link>
        </p>

        <form onSubmit={onSubmit} className="mt-7 space-y-5" noValidate>
          <TextField
            label="Full name"
            name="fullName"
            icon={<User className="size-4" />}
            value={form.fullName}
            onChange={update("fullName")}
            placeholder="Aarav Sharma"
            error={errors.fullName}
          />
          <TextField
            label="User ID"
            name="userId"
            icon={<User className="size-4" />}
            value={form.userId}
            onChange={update("userId")}
            placeholder="aarav.sharma"
            error={errors.userId}
          />
          <TextField
            label="Email address"
            name="email"
            type="email"
            icon={<Mail className="size-4" />}
            value={form.email}
            onChange={update("email")}
            placeholder="you@example.com"
            error={errors.email}
          />

          <div>
            <PasswordField
              label="Password"
              name="password"
              autoComplete="new-password"
              value={form.password}
              onChange={update("password")}
              error={errors.password}
            />
            <div className="mt-3 flex items-center gap-3">
              <div className="flex h-1.5 flex-1 gap-1">
                {[0, 1, 2, 3].map((index) => (
                  <span
                    key={index}
                    className={`h-full flex-1 rounded-full transition-colors ${
                      index < score ? "bg-primary" : "bg-muted"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-medium text-muted-foreground">
                {strengthLabels[score]}
              </span>
            </div>
          </div>

          <PasswordField
            label="Confirm password"
            name="confirm"
            autoComplete="new-password"
            value={form.confirm}
            onChange={update("confirm")}
            error={errors.confirm}
          />

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-primary-foreground disabled:opacity-70"
          >
            {submitting ? "Creating account…" : "Create account"}
            <ArrowRight className="size-4" />
          </button>

          <p className="flex items-start gap-2 text-xs text-muted-foreground">
            <Check className="mt-0.5 size-3.5 shrink-0 text-primary" />
            By continuing you agree to DigiBank's Terms of Service and Privacy Policy.
          </p>
        </form>
      </div>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        <Link to="/" className="underline underline-offset-4">
          Back to home
        </Link>
      </p>
    </AuthLayout>
  );
}

function TextField({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  icon,
  type = "text",
}: {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  icon: React.ReactNode;
  type?: string;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="text-sm font-semibold">
        {label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          {icon}
        </span>
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          className={`h-12 w-full rounded-xl border bg-card pl-10 pr-4 text-sm outline-none transition-shadow placeholder:text-muted-foreground focus:border-ring focus:ring-4 focus:ring-ring/15 ${
            error ? "border-destructive" : "border-input"
          }`}
        />
      </div>
      {error ? <p className="text-xs font-medium text-destructive">{error}</p> : null}
    </div>
  );
}
