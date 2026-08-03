import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, User } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { AuthLayout } from "@/components/site/AuthLayout";
import { PasswordField } from "@/components/PasswordField";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "DigiBank Login — Secure NetBanking Sign In" },
      {
        name: "description",
        content:
          "Sign in to DigiBank NetBanking with your user ID and password. Reset a forgotten password securely in a few steps.",
      },
      { property: "og:title", content: "DigiBank Login" },
      {
        property: "og:description",
        content: "Secure NetBanking sign in for DigiBank customers.",
      },
    ],
  }),
  component: LoginPage,
});

const schema = z.object({
  userId: z.string().trim().min(4, "Enter your user ID").max(24),
  password: z.string().min(8, "Password must be at least 8 characters").max(72),
});

function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ userId: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

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
      toast.success("Signed in", { description: "Welcome back to DigiBank." });
      navigate({ to: "/onboarding" });
    }, 700);
  };

  return (
    <AuthLayout
      eyebrow="Welcome back"
      title="Your money, one secure login away."
      subtitle="Sign in with your DigiBank user ID to manage accounts, cards, payments and investments."
      highlights={[
        "Device binding and OTP protection",
        "Instant alerts on every transaction",
        "Reset your password in under a minute",
      ]}
    >
      <div className="rounded-3xl border border-border bg-card p-7 shadow-card-soft sm:p-9">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
          NetBanking
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold">Login to DigiBank</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          New to DigiBank?{" "}
          <Link to="/register" className="font-semibold text-primary underline underline-offset-4">
            Create an account
          </Link>
        </p>

        <form onSubmit={onSubmit} className="mt-7 space-y-5" noValidate>
          <div className="space-y-2">
            <label htmlFor="userId" className="text-sm font-semibold">
              User ID
            </label>
            <div className="relative">
              <User className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                id="userId"
                name="userId"
                value={form.userId}
                autoComplete="username"
                placeholder="aarav.sharma"
                onChange={(event) => setForm((p) => ({ ...p, userId: event.target.value }))}
                className={`h-12 w-full rounded-xl border bg-card pl-10 pr-4 text-sm outline-none transition-shadow placeholder:text-muted-foreground focus:border-ring focus:ring-4 focus:ring-ring/15 ${
                  errors.userId ? "border-destructive" : "border-input"
                }`}
              />
            </div>
            {errors.userId ? (
              <p className="text-xs font-medium text-destructive">{errors.userId}</p>
            ) : null}
          </div>

          <PasswordField
            label="Password"
            name="password"
            value={form.password}
            onChange={(value) => setForm((p) => ({ ...p, password: value }))}
            error={errors.password}
          />

          <div className="flex items-center justify-between gap-3">
            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              <input type="checkbox" className="size-4 rounded border-input accent-primary" />
              Remember this device
            </label>
            <Link
              to="/forgot-password"
              className="text-sm font-semibold text-primary underline underline-offset-4"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-primary-foreground disabled:opacity-70"
          >
            {submitting ? "Signing in…" : "Secure login"}
            <ArrowRight className="size-4" />
          </button>
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
