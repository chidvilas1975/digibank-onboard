import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Bell,
  CreditCard,
  Droplets,
  LineChart,
  PiggyBank,
  Plus,
  Receipt,
  Send,
  Settings,
  ShieldCheck,
  Smartphone,
  Target,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SiteFooter } from "@/components/site/SiteFooter";
import { WaterBackdrop } from "@/components/site/WaterBackdrop";
import heroCard from "@/assets/hero-card.jpg";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "DigiBank Dashboard — Balances, Cards & Spending" },
      {
        name: "description",
        content:
          "Your DigiBank dashboard: live balances, goal jars, recent transactions, card controls and spending insights in one liquid-glass view.",
      },
      { property: "og:title", content: "DigiBank Dashboard" },
      {
        property: "og:description",
        content: "Live balances, goals, cards and spending insights after you sign in.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DashboardPage,
});

const accounts = [
  { name: "Zero Balance Savings", number: "•••• 4821", balance: 48260, tone: "from-azure/40" },
  { name: "Salary Account", number: "•••• 7734", balance: 132480, tone: "from-mint/40" },
  { name: "Goal Jar — Kyoto", number: "•••• 9910", balance: 27500, tone: "from-sand/45" },
];

const quickActions = [
  { icon: Send, label: "Send money" },
  { icon: Plus, label: "Add funds" },
  { icon: Receipt, label: "Pay bills" },
  { icon: Smartphone, label: "Recharge" },
  { icon: PiggyBank, label: "New jar" },
  { icon: Settings, label: "Limits" },
];

const transactions = [
  { name: "Salary — Northwind Labs", date: "Today, 09:12", amount: 132480, credit: true },
  { name: "Blue Tokai Coffee", date: "Today, 08:04", amount: -420, credit: false },
  { name: "Rent — Anand Villa", date: "Yesterday", amount: -32000, credit: false },
  { name: "UPI from Meera", date: "Yesterday", amount: 1500, credit: true },
  { name: "Electricity board", date: "3 Aug", amount: -2180, credit: false },
];

const spend = [
  { label: "Rent", pct: 46 },
  { label: "Food", pct: 21 },
  { label: "Travel", pct: 14 },
  { label: "Shopping", pct: 11 },
  { label: "Other", pct: 8 },
];

const goals = [
  { name: "Kyoto trip", saved: 27500, target: 90000 },
  { name: "Emergency fund", saved: 118000, target: 200000 },
  { name: "New laptop", saved: 41000, target: 150000 },
];

const inr = (value: number) =>
  `${value < 0 ? "−" : ""}₹${Math.abs(value).toLocaleString("en-IN")}`;

function DashboardPage() {
  const total = accounts.reduce((sum, a) => sum + a.balance, 0);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / 1100, 1);
      setShown(Math.round(total * (1 - Math.pow(1 - p, 3))));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [total]);

  return (
    <div className="min-h-screen bg-background">
      {/* APP BAR */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-lg surface-navy text-sm font-bold">
              D
            </span>
            <span className="font-display text-lg font-bold">
              Digi<span className="text-azure">Bank</span>
            </span>
          </Link>
          <div className="flex items-center gap-3 text-sm">
            <span className="hidden items-center gap-1.5 text-muted-foreground sm:inline-flex">
              <ShieldCheck className="size-4 text-primary" /> Secure session
            </span>
            <Bell className="size-4 text-muted-foreground" />
            <span className="grid size-9 place-items-center rounded-full bg-accent font-semibold text-primary">
              AS
            </span>
          </div>
        </div>
      </header>

      {/* BALANCE HERO */}
      <section className="relative isolate overflow-hidden surface-navy">
        <WaterBackdrop bubbles={9} />
        <div className="scene-3d relative mx-auto grid max-w-7xl gap-10 px-4 py-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="animate-rise-in">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary-foreground/70">
              Welcome back, Aarav
            </p>
            <h1 className="mt-4 font-display text-4xl font-extrabold sm:text-5xl">
              {inr(shown)}
            </h1>
            <p className="mt-2 text-sm text-primary-foreground/75">
              Total across {accounts.length} accounts · +₹12,340 this month
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {accounts.map((account, index) => (
                <div
                  key={account.number}
                  className="relative overflow-hidden rounded-2xl glass-water-dark p-4"
                  style={{ animationDelay: `${index * 120}ms` }}
                >
                  <span
                    aria-hidden
                    className={`animate-water-fill absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t ${account.tone} to-transparent`}
                    style={{ animationDelay: `${index * 150}ms` }}
                  />
                  <p className="relative text-xs text-primary-foreground/70">{account.name}</p>
                  <p className="relative mt-2 font-display text-xl font-bold">
                    {inr(account.balance)}
                  </p>
                  <p className="relative text-xs text-primary-foreground/60">{account.number}</p>
                </div>
              ))}
            </div>

            <Link
              to="/open-account"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-destructive px-6 py-3.5 text-sm font-semibold text-destructive-foreground shadow-float"
            >
              <Plus className="size-4" /> Open another account
            </Link>
          </div>

          <div className="preserve-3d relative mx-auto w-full max-w-xs">
            <div className="animate-float-y preserve-3d">
              <div className="animate-tilt-3d relative overflow-hidden rounded-[1.75rem] glass-water p-4">
                <img
                  src={heroCard}
                  alt="DigiBank platinum debit card"
                  width={1200}
                  height={1200}
                  loading="lazy"
                  className="w-full rounded-2xl"
                />
                <div className="pointer-events-none absolute inset-0 animate-sheen bg-[image:var(--gradient-sheen)]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK ACTIONS */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
          {quickActions.map((action, index) => (
            <Reveal
              key={action.label}
              delay={index * 60}
              className="rounded-2xl border border-border bg-card p-4 text-center shadow-card-soft"
            >
              <span className="mx-auto grid size-10 place-items-center rounded-xl bg-accent">
                <action.icon className="size-4 text-primary" />
              </span>
              <p className="mt-3 text-xs font-semibold">{action.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* TRANSACTIONS + SPEND */}
      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-12 lg:grid-cols-[1.2fr_0.8fr]">
        <Reveal className="rounded-3xl border border-border bg-card p-7 shadow-card-soft">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-display text-xl font-bold">Recent activity</h2>
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              August
            </span>
          </div>
          <ul className="mt-6 divide-y divide-border">
            {transactions.map((tx) => (
              <li key={tx.name} className="flex items-center gap-4 py-4">
                <span
                  className={`grid size-10 shrink-0 place-items-center rounded-xl ${
                    tx.credit ? "bg-mint/20 text-primary" : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {tx.credit ? (
                    <ArrowDownLeft className="size-4" />
                  ) : (
                    <ArrowUpRight className="size-4" />
                  )}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold">{tx.name}</span>
                  <span className="text-xs text-muted-foreground">{tx.date}</span>
                </span>
                <span className="text-sm font-semibold">{inr(tx.amount)}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={100} className="rounded-3xl border border-border bg-card p-7 shadow-card-soft">
          <h2 className="flex items-center gap-2 font-display text-xl font-bold">
            <LineChart className="size-5 text-primary" /> Where money went
          </h2>
          <ul className="mt-6 space-y-4">
            {spend.map((item) => (
              <li key={item.label}>
                <div className="flex justify-between text-sm font-semibold">
                  <span>{item.label}</span>
                  <span className="text-muted-foreground">{item.pct}%</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-azure transition-[width] duration-1000"
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* GOAL JARS */}
      <section className="mx-auto max-w-7xl px-4 pb-12">
        <Reveal className="max-w-xl">
          <h2 className="flex items-center gap-2 font-display text-2xl font-bold">
            <Target className="size-5 text-primary" /> Goal jars
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Each jar fills as you save. Water level is your progress.
          </p>
        </Reveal>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {goals.map((goal, index) => {
            const pct = Math.round((goal.saved / goal.target) * 100);
            return (
              <Reveal
                key={goal.name}
                delay={index * 90}
                className="relative overflow-hidden rounded-3xl border border-border bg-card p-7 shadow-card-soft"
              >
                <span
                  aria-hidden
                  className="animate-water-fill absolute inset-x-0 bottom-0 bg-gradient-to-t from-azure/35 to-azure/5"
                  style={{ height: `${pct}%`, animationDelay: `${index * 120}ms` }}
                />
                <span className="relative grid size-11 place-items-center rounded-2xl bg-accent">
                  <Droplets className="size-5 text-primary" />
                </span>
                <h3 className="relative mt-5 font-display text-lg font-bold">{goal.name}</h3>
                <p className="relative mt-1 text-sm text-muted-foreground">
                  {inr(goal.saved)} of {inr(goal.target)}
                </p>
                <p className="relative mt-4 font-display text-2xl font-bold">{pct}%</p>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* CARD CONTROLS */}
      <section className="mx-auto max-w-7xl px-4 pb-20">
        <Reveal className="relative isolate overflow-hidden rounded-[2rem] surface-navy p-8 sm:p-12">
          <WaterBackdrop bubbles={6} />
          <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="flex items-center gap-2 font-display text-2xl font-bold">
                <CreditCard className="size-5" /> Card controls
              </h2>
              <p className="mt-3 max-w-md text-sm text-primary-foreground/75">
                Freeze the card, cap online spends or switch on international use — changes apply
                the instant you tap.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["Freeze card", "Active"],
                ["Online payments", "On"],
                ["International", "Off"],
                ["Daily limit", "₹75,000"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl glass-water-dark p-4">
                  <p className="text-xs text-primary-foreground/70">{label}</p>
                  <p className="mt-1 font-semibold">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <SiteFooter />
    </div>
  );
}
