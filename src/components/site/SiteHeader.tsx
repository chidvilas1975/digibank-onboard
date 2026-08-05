import { Link } from "@tanstack/react-router";
import { Bell, Menu, ShieldCheck, X } from "lucide-react";
import { useState } from "react";

const segments = ["Personal", "NRI", "Wealth", "Business", "MSME", "Government"];
const primaryNav = [
  { label: "Products", to: "/" },
  { label: "Digital Services", to: "/" },
  { label: "Onboarding", to: "/onboarding" },
  { label: "Open Account", to: "/open-account" },
  { label: "Dashboard", to: "/dashboard" },
];


export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <div className="surface-navy hidden md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 text-xs">
          <nav className="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-1">
            {segments.map((segment, index) => (
              <span
                key={segment}
                className={
                  index === 0
                    ? "font-semibold text-primary-foreground"
                    : "text-primary-foreground/70"
                }
              >
                {segment}
              </span>
            ))}
          </nav>
          <div className="flex shrink-0 items-center gap-4 text-primary-foreground/85">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="size-3.5" /> Secure Banking
            </span>
            <span>English</span>
            <Bell className="size-3.5" />
          </div>
        </div>
      </div>

      <div className="border-b border-border bg-card/85 backdrop-blur-xl">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 lg:flex lg:justify-between">
          <Link to="/" className="flex min-w-0 items-center gap-2.5">
            <span className="grid size-9 shrink-0 place-items-center rounded-lg surface-navy text-sm font-bold">
              D
            </span>
            <span className="truncate font-display text-lg font-bold tracking-tight text-foreground">
              Digi<span className="text-azure">Bank</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-medium text-foreground/80 lg:flex">
            {primaryNav.map((item) => (
              <Link key={item.label} to={item.to} className="whitespace-nowrap">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2.5 lg:flex">
            <Link
              to="/login"
              className="rounded-lg bg-destructive px-5 py-2.5 text-sm font-semibold text-destructive-foreground"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="rounded-lg border border-input px-5 py-2.5 text-sm font-semibold text-foreground"
            >
              Open Account
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="grid size-10 shrink-0 place-items-center rounded-lg border border-input lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {open ? (
          <div className="border-t border-border bg-card px-4 py-4 lg:hidden">
            <nav className="flex flex-col gap-3 text-sm font-medium">
              {primaryNav.map((item) => (
                <Link key={item.label} to={item.to} onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-4 flex gap-2">
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-lg bg-destructive px-4 py-2.5 text-center text-sm font-semibold text-destructive-foreground"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-lg border border-input px-4 py-2.5 text-center text-sm font-semibold"
              >
                Register
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
