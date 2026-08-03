import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { AuthLayout } from "@/components/site/AuthLayout";
import { PasswordField } from "@/components/PasswordField";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Reset Password — Set a New DigiBank Password" },
      {
        name: "description",
        content:
          "Set a new DigiBank NetBanking password. Use at least 8 characters with an uppercase letter and a number.",
      },
      { property: "og:title", content: "Reset Password — DigiBank" },
      {
        property: "og:description",
        content: "Create a new secure password for your DigiBank account.",
      },
    ],
  }),
  component: ResetPasswordPage,
});

const schema = z
  .object({
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

const rules = [
  { label: "At least 8 characters", test: (v: string) => v.length >= 8 },
  { label: "One uppercase letter", test: (v: string) => /[A-Z]/.test(v) },
  { label: "One number", test: (v: string) => /[0-9]/.test(v) },
  { label: "One special character", test: (v: string) => /[^A-Za-z0-9]/.test(v) },
];

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ password: "", confirm: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

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
    setDone(true);
    toast.success("Password updated", { description: "Sign in with your new password." });
    setTimeout(() => navigate({ to: "/login" }), 1600);
  };

  return (
    <AuthLayout
      eyebrow="New password"
      title="Set a password only you know."
      subtitle="Your new password takes effect immediately across NetBanking and the DigiBank app."
      highlights={[
        "Old sessions are signed out automatically",
        "Passwords are hashed, never stored in plain text",
        "You'll get an alert once the change is done",
      ]}
    >
      <div className="rounded-3xl border border-border bg-card p-7 shadow-card-soft sm:p-9">
        {done ? (
          <div className="py-8 text-center">
            <span className="mx-auto grid size-16 place-items-center rounded-full bg-accent">
              <CheckCircle2 className="size-8 text-primary" />
            </span>
            <h1 className="mt-6 font-display text-2xl font-bold">Password reset complete</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Taking you to the login page&hellip;
            </p>
            <Link
              to="/login"
              className="mt-6 inline-flex h-12 items-center justify-center rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground"
            >
              Go to login
            </Link>
          </div>
        ) : (
          <>
            <h1 className="font-display text-3xl font-bold">Reset your password</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Choose a strong password you haven't used before.
            </p>

            <form onSubmit={onSubmit} className="mt-7 space-y-5" noValidate>
              <PasswordField
                label="New password"
                name="password"
                autoComplete="new-password"
                value={form.password}
                onChange={(value) => setForm((p) => ({ ...p, password: value }))}
                error={errors["password"]}
              />
              <PasswordField
                label="Confirm new password"
                name="confirm"
                autoComplete="new-password"
                value={form.confirm}
                onChange={(value) => setForm((p) => ({ ...p, confirm: value }))}
                error={errors["confirm"]}
              />

              <ul className="grid gap-2 rounded-2xl bg-secondary/70 p-4 text-xs sm:grid-cols-2">
                {rules.map((rule) => {
                  const ok = rule.test(form.password);
                  return (
                    <li
                      key={rule.label}
                      className={`flex items-center gap-2 ${ok ? "text-primary" : "text-muted-foreground"}`}
                    >
                      <CheckCircle2 className="size-3.5 shrink-0" />
                      {rule.label}
                    </li>
                  );
                })}
              </ul>

              <button
                type="submit"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-primary-foreground"
              >
                Update password <ArrowRight className="size-4" />
              </button>
            </form>
          </>
        )}
      </div>
    </AuthLayout>
  );
}
