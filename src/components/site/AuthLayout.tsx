import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import authBg from "@/assets/auth-bg.jpg";

type AuthLayoutProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  highlights: string[];
  children: ReactNode;
};

/** Split-screen auth shell: 3D glass scene on one side, clean form on the other. */
export function AuthLayout({ eyebrow, title, subtitle, highlights, children }: AuthLayoutProps) {
  return (
    <main className="min-h-screen bg-background lg:grid lg:grid-cols-[1.05fr_1fr]">
      <section className="relative isolate hidden overflow-hidden surface-navy lg:block">
        <img
          src={authBg}
          alt=""
          aria-hidden
          width={1408}
          height={1600}
          className="absolute inset-0 size-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_20%_10%,transparent,oklch(0.18_0.08_264/0.85))]" />

        <div className="scene-3d relative flex h-full flex-col justify-between p-12">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-lg bg-primary-foreground/15 text-sm font-bold">
              D
            </span>
            <span className="font-display text-lg font-bold">DigiBank</span>
          </Link>

          <div className="preserve-3d">
            <div className="animate-float-y preserve-3d">
              <div className="animate-tilt-3d w-fit rounded-3xl border border-primary-foreground/20 bg-primary-foreground/10 p-8 backdrop-blur-xl shadow-float">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary-foreground/70">
                  {eyebrow}
                </p>
                <h2 className="mt-4 max-w-sm font-display text-4xl font-bold leading-tight">
                  {title}
                </h2>
                <p className="mt-4 max-w-sm text-sm text-primary-foreground/75">{subtitle}</p>
              </div>
            </div>
          </div>

          <ul className="space-y-3 text-sm text-primary-foreground/80">
            {highlights.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="relative grid size-2 place-items-center">
                  <span className="absolute inset-0 rounded-full bg-mint animate-pulse-ring" />
                  <span className="size-2 rounded-full bg-mint" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-8">
        <div className="w-full max-w-md animate-rise-in">{children}</div>
      </section>
    </main>
  );
}
