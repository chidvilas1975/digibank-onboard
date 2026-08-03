import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Mail, ShieldCheck, User } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { AuthLayout } from "@/components/site/AuthLayout";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Forgot Password — Recover Your DigiBank Login" },
      {
        name: "description",
        content:
          "Recover your DigiBank NetBanking access. Verify your user ID and registered email, then set a new password securely.",
      },
      { property: "og:title", content: "Forgot Password — DigiBank" },
      {
        property: "og:description",
        content: "Verify your identity and reset your DigiBank password securely.",
      },
    ],
  }),
  component: ForgotPasswordPage,
});

const schema = z.object({
  userId: z.string().trim().min(4, "Enter your user ID").max(24),
  email: z.string().trim().email("Enter your registered email").max(255),
});

function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ userId: "", email: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [step, setStep] = useState<"identify" | "otp">("identify");
  const [otp, setOtp] = useState("");

  const onIdentify = (event: React.FormEvent) => {
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
    setStep("otp");
    toast.success("Verification code sent", { description: "Check your registered email." });
  };

  const onVerify = (event: React.FormEvent) => {
    event.preventDefault();
    if (otp.trim().length !== 6) {
      toast.error("Enter the 6-digit code");
      return;
    }
    navigate({ to: "/reset-password" });
  };

  return (
    <AuthLayout
      eyebrow="Account recovery"
      title="Locked out? Back in, in two steps."
      subtitle="We verify your identity with your user ID and registered email before any password change."
      highlights={[
        "One-time code valid for 10 minutes",
        "No password ever sent over email",
        "All attempts logged for your safety",
      ]}
    >
      <div className="rounded-3xl border border-border bg-card p-7 shadow-card-soft sm:p-9">
        <div className="flex items-center gap-3">
          <StepDot active index={1} done={step === "otp"} />
          <span className="h-px flex-1 bg-border" />
          <StepDot active={step === "otp"} index={2} done={false} />
        </div>

        <h1 className="mt-6 font-display text-3xl font-bold">
          {step === "identify" ? "Forgot password" : "Verify your code"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {step === "identify"
            ? "Tell us who you are and we'll send a one-time code."
            : `We sent a 6-digit code to ${form.email}.`}
        </p>

        {step === "identify" ? (
          <form onSubmit={onIdentify} className="mt-7 space-y-5" noValidate>
            <Field
              label="User ID"
              name="userId"
              icon={<User className="size-4" />}
              value={form.userId}
              onChange={(value) => setForm((p) => ({ ...p, userId: value }))}
              placeholder="aarav.sharma"
              error={errors["userId"]}
            />
            <Field
              label="Registered email"
              name="email"
              type="email"
              icon={<Mail className="size-4" />}
              value={form.email}
              onChange={(value) => setForm((p) => ({ ...p, email: value }))}
              placeholder="you@example.com"
              error={errors["email"]}
            />
            <button
              type="submit"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-primary-foreground"
            >
              Send verification code <ArrowRight className="size-4" />
            </button>
          </form>
        ) : (
          <form onSubmit={onVerify} className="mt-7 space-y-5">
            <div className="space-y-2">
              <label htmlFor="otp" className="text-sm font-semibold">
                6-digit code
              </label>
              <div className="relative">
                <ShieldCheck className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="otp"
                  inputMode="numeric"
                  maxLength={6}
                  value={otp}
                  onChange={(event) => setOtp(event.target.value.replace(/\D/g, ""))}
                  placeholder="123456"
                  className="h-12 w-full rounded-xl border border-input bg-card pl-10 pr-4 text-sm tracking-[0.4em] outline-none focus:border-ring focus:ring-4 focus:ring-ring/15"
                />
              </div>
            </div>
            <button
              type="submit"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-primary-foreground"
            >
              Continue to reset password <ArrowRight className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => setStep("identify")}
              className="w-full text-sm font-medium text-muted-foreground underline underline-offset-4"
            >
              Use a different user ID
            </button>
          </form>
        )}

        <p className="mt-7 text-sm text-muted-foreground">
          Remembered it?{" "}
          <Link to="/login" className="font-semibold text-primary underline underline-offset-4">
            Back to login
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}

function StepDot({ active, index, done }: { active: boolean; index: number; done: boolean }) {
  return (
    <span
      className={`grid size-8 shrink-0 place-items-center rounded-full text-xs font-bold ${
        active || done ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
      }`}
    >
      {index}
    </span>
  );
}

function Field({
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
  placeholder?: string | undefined;
  error?: string | undefined;
  icon: React.ReactNode;
  type?: string | undefined;
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
          className={`h-12 w-full rounded-xl border bg-card pl-10 pr-4 text-sm outline-none focus:border-ring focus:ring-4 focus:ring-ring/15 ${
            error ? "border-destructive" : "border-input"
          }`}
        />
      </div>
      {error ? <p className="text-xs font-medium text-destructive">{error}</p> : null}
    </div>
  );
}
