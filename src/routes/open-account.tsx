import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  BadgeIndianRupee,
  Briefcase,
  Check,
  CreditCard,
  Crown,
  Droplets,
  FileText,
  IdCard,
  Landmark,
  PiggyBank,
  ShieldCheck,
  Sparkles,
  Wallet,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { WaterBackdrop } from "@/components/site/WaterBackdrop";
import heroCard from "@/assets/hero-card.jpg";

export const Route = createFileRoute("/open-account")({
  head: () => ({
    meta: [
      { title: "Open a DigiBank Account — Zero Balance, Salary & Premium" },
      {
        name: "description",
        content:
          "Choose a DigiBank account that fits you: zero balance savings, salary account, premium savings or current account. Apply online and get confirmed instantly.",
      },
      { property: "og:title", content: "Open a DigiBank Account" },
      {
        property: "og:description",
        content: "Zero balance, salary, premium or current — pick your account and open it online.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OpenAccountPage,
});

type AccountType = {
  id: string;
  name: string;
  icon: typeof PiggyBank;
  tagline: string;
  minBalance: string;
  interest: string;
  best: string;
  perks: string[];
  accent: string;
};

const accountTypes: AccountType[] = [
  {
    id: "zero",
    name: "Zero Balance Savings",
    icon: Droplets,
    tagline: "Bank with nothing held back",
    minBalance: "₹0",
    interest: "3.5% p.a.",
    best: "Students, first-time earners",
    perks: ["No minimum balance ever", "Free virtual debit card", "5 free ATM withdrawals / month"],
    accent: "from-azure/30 to-mint/20",
  },
  {
    id: "salary",
    name: "Salary Account",
    icon: BadgeIndianRupee,
    tagline: "Your paycheck, working harder",
    minBalance: "₹0 with active salary credit",
    interest: "4.0% p.a.",
    best: "Salaried professionals",
    perks: ["Free unlimited ATM access", "Overdraft up to 2x salary", "Complimentary term cover"],
    accent: "from-primary/30 to-azure/20",
  },
  {
    id: "premium",
    name: "Premium Savings",
    icon: Crown,
    tagline: "Priority banking, glass-smooth",
    minBalance: "₹25,000 AMB",
    interest: "4.5% p.a.",
    best: "High savers, families",
    perks: ["Dedicated relationship manager", "Metal debit card", "Airport lounge access"],
    accent: "from-sand/40 to-azure/20",
  },
  {
    id: "current",
    name: "Current / Business",
    icon: Briefcase,
    tagline: "Built for cash-flow days",
    minBalance: "₹10,000 AMB",
    interest: "Not applicable",
    best: "Founders, shops, MSMEs",
    perks: ["Unlimited NEFT & RTGS", "GST-ready statements", "Payment gateway in 1 click"],
    accent: "from-primary/25 to-signal/15",
  },
];

const comparison = [
  { label: "Minimum balance", values: ["₹0", "₹0*", "₹25,000", "₹10,000"] },
  { label: "Interest rate", values: ["3.5%", "4.0%", "4.5%", "—"] },
  { label: "Debit card", values: ["Virtual", "Platinum", "Metal", "Business"] },
  { label: "Free ATM / month", values: ["5", "Unlimited", "Unlimited", "10"] },
  { label: "Relationship manager", values: ["—", "Shared", "Dedicated", "Dedicated"] },
];

const documents = [
  { icon: IdCard, title: "PAN card", copy: "Used for tax reporting and identity match." },
  { icon: ShieldCheck, title: "Aadhaar", copy: "OTP verification on your linked mobile." },
  { icon: FileText, title: "Address proof", copy: "Any utility bill, passport or rent agreement." },
  { icon: Wallet, title: "First deposit", copy: "Optional for zero balance accounts." },
];

const voices = [
  {
    name: "Ananya R.",
    role: "Product designer, Bengaluru",
    quote: "Salary account opened between two meetings. The card was live before lunch.",
  },
  {
    name: "Vikram S.",
    role: "Founder, Pune",
    quote: "Current account with GST-ready statements saved my accountant a full weekend.",
  },
  {
    name: "Meera J.",
    role: "Student, Kochi",
    quote: "Zero balance meant I could start banking without borrowing money to start banking.",
  },
];

const steps = ["Choose account", "Your details", "Review", "Confirmed"];

function OpenAccountPage() {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<string>("zero");
  const [form, setForm] = useState({ name: "", email: "", mobile: "", city: "", funding: "1000" });
  const [confirming, setConfirming] = useState(false);
  const [accountNo, setAccountNo] = useState("");

  const chosen = accountTypes.find((a) => a.id === selected)!;

  useEffect(() => {
    if (!confirming) return;
    const id = window.setTimeout(() => {
      setAccountNo(
        `5010 ${Math.floor(1000 + Math.random() * 8999)} ${Math.floor(1000 + Math.random() * 8999)}`,
      );
      setConfirming(false);
      setStep(3);
    }, 2400);
    return () => window.clearTimeout(id);
  }, [confirming]);

  const detailsValid =
    form.name.trim().length > 2 && /\S+@\S+\.\S+/.test(form.email) && form.mobile.length >= 10;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* HERO */}
      <section className="relative isolate overflow-hidden surface-navy">
        <WaterBackdrop />
        <div className="scene-3d relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 lg:grid-cols-2">
          <div className="animate-rise-in">
            <span className="inline-flex items-center gap-2 rounded-full glass-water-dark px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em]">
              <Sparkles className="size-3.5" /> Step 2 of onboarding
            </span>
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-tight sm:text-5xl">
              Pick the account that <span className="text-gradient-azure">fits your flow</span>.
            </h1>
            <p className="mt-5 max-w-md text-sm text-primary-foreground/75">
              Zero balance, salary, premium or business — each one opens online, funds instantly and
              settles into your app the moment it is confirmed.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#apply"
                className="inline-flex items-center gap-2 rounded-xl bg-destructive px-6 py-3.5 text-sm font-semibold text-destructive-foreground shadow-float"
              >
                Open my account <ArrowRight className="size-4" />
              </a>
              <Link
                to="/onboarding"
                className="rounded-xl glass-water-dark px-6 py-3.5 text-sm font-semibold"
              >
                Back to onboarding
              </Link>
            </div>
          </div>

          <div className="preserve-3d relative mx-auto w-full max-w-sm">
            <div className="animate-float-y preserve-3d">
              <div className="animate-tilt-3d relative overflow-hidden rounded-[2rem] glass-water p-6">
                <img
                  src={heroCard}
                  alt="DigiBank debit card issued with a new account"
                  width={1200}
                  height={1200}
                  className="w-full rounded-2xl"
                />
                <div className="pointer-events-none absolute inset-0 animate-sheen bg-[image:var(--gradient-sheen)]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ACCOUNT TYPES */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <Reveal className="max-w-xl">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Four accounts, one bank</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Select a card to preview it in the application form below.
          </p>
        </Reveal>

        <div className="scene-3d mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {accountTypes.map((account, index) => (
            <Reveal key={account.id} delay={index * 80} as="article">
              <button
                type="button"
                onClick={() => {
                  setSelected(account.id);
                  setStep(1);
                }}
                className={`relative h-full w-full overflow-hidden rounded-3xl border p-6 text-left transition-[border-color,box-shadow,transform] duration-500 ${
                  selected === account.id
                    ? "border-primary/50 shadow-float"
                    : "border-border shadow-card-soft"
                } bg-card`}
              >
                <span
                  aria-hidden
                  className={`absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t ${account.accent} ${
                    selected === account.id ? "animate-water-fill" : "opacity-50"
                  }`}
                />
                <span className="relative grid size-12 place-items-center rounded-2xl surface-navy">
                  <account.icon className="size-5" />
                </span>
                <h3 className="relative mt-5 font-display text-lg font-bold">{account.name}</h3>
                <p className="relative mt-1 text-sm text-muted-foreground">{account.tagline}</p>
                <dl className="relative mt-5 space-y-1.5 text-xs">
                  <div className="flex justify-between gap-2">
                    <dt className="text-muted-foreground">Min balance</dt>
                    <dd className="font-semibold">{account.minBalance}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-muted-foreground">Interest</dt>
                    <dd className="font-semibold">{account.interest}</dd>
                  </div>
                </dl>
                <ul className="relative mt-5 space-y-2 text-sm">
                  {account.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                      {perk}
                    </li>
                  ))}
                </ul>
                <span className="relative mt-6 block text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  {selected === account.id ? "Selected" : "Choose this"}
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      {/* COMPARISON */}
      <section className="border-y border-border bg-secondary/50 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <Reveal>
            <h2 className="font-display text-3xl font-bold">Compare side by side</h2>
          </Reveal>
          <Reveal delay={80} className="mt-8 overflow-x-auto rounded-3xl border border-border bg-card">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="surface-navy text-left">
                  <th className="p-4 font-semibold">Feature</th>
                  {accountTypes.map((a) => (
                    <th key={a.id} className="p-4 font-semibold">
                      {a.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.label} className="border-t border-border">
                    <th scope="row" className="p-4 text-left font-medium text-muted-foreground">
                      {row.label}
                    </th>
                    {row.values.map((value, index) => (
                      <td key={index} className="p-4 font-semibold">
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
          <p className="mt-3 text-xs text-muted-foreground">
            *Salary account stays zero balance while a salary credit lands every 90 days.
          </p>
        </div>
      </section>

      {/* APPLICATION */}
      <section id="apply" className="relative isolate overflow-hidden py-20">
        <div className="mx-auto max-w-5xl px-4">
          <Reveal className="max-w-xl">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">Open your account</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Three short steps. The confirmation happens right here.
            </p>
          </Reveal>

          <ol className="mt-8 flex flex-wrap gap-2 text-xs font-semibold">
            {steps.map((label, index) => (
              <li
                key={label}
                className={`rounded-full px-4 py-2 transition-colors duration-500 ${
                  index <= step
                    ? "surface-navy"
                    : "border border-border bg-card text-muted-foreground"
                }`}
              >
                {index + 1}. {label}
              </li>
            ))}
          </ol>

          <div className="scene-3d mt-8">
            <div className="preserve-3d relative overflow-hidden rounded-[2rem] border border-border bg-card p-8 shadow-float">
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-azure/25 to-transparent transition-[height] duration-700"
                style={{ height: `${(step + 1) * 22}%` }}
              />

              {step === 0 ? (
                <div className="relative animate-rise-in">
                  <h3 className="font-display text-xl font-bold">Choose an account type</h3>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {accountTypes.map((account) => (
                      <button
                        key={account.id}
                        type="button"
                        onClick={() => setSelected(account.id)}
                        className={`flex items-start gap-3 rounded-2xl border p-4 text-left transition-colors ${
                          selected === account.id
                            ? "border-primary/50 bg-accent"
                            : "border-border bg-card text-muted-foreground"
                        }`}
                      >
                        <account.icon className="mt-0.5 size-5 text-primary" />
                        <span>
                          <span className="block font-semibold text-foreground">
                            {account.name}
                          </span>
                          <span className="text-sm">{account.best}</span>
                        </span>
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="mt-7 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground"
                  >
                    Continue <ArrowRight className="size-4" />
                  </button>
                </div>
              ) : null}

              {step === 1 ? (
                <form
                  className="relative animate-rise-in"
                  onSubmit={(event) => {
                    event.preventDefault();
                    if (detailsValid) setStep(2);
                  }}
                >
                  <h3 className="font-display text-xl font-bold">Your details</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Applying for <strong className="text-foreground">{chosen.name}</strong>
                  </p>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {(
                      [
                        ["name", "Full name", "Aarav Sharma", "text"],
                        ["email", "Email", "aarav@example.com", "email"],
                        ["mobile", "Mobile number", "98765 43210", "tel"],
                        ["city", "City", "Mumbai", "text"],
                      ] as const
                    ).map(([key, label, placeholder, type]) => (
                      <label key={key} className="space-y-2 text-sm font-semibold">
                        {label}
                        <input
                          type={type}
                          value={form[key]}
                          placeholder={placeholder}
                          onChange={(event) =>
                            setForm((prev) => ({ ...prev, [key]: event.target.value }))
                          }
                          className="h-12 w-full rounded-xl border border-input bg-card px-4 text-sm font-normal outline-none transition-shadow placeholder:text-muted-foreground focus:border-ring focus:ring-4 focus:ring-ring/15"
                        />
                      </label>
                    ))}
                  </div>

                  <label className="mt-5 block space-y-2 text-sm font-semibold">
                    Opening deposit — ₹{Number(form.funding).toLocaleString("en-IN")}
                    <input
                      type="range"
                      min={0}
                      max={100000}
                      step={500}
                      value={form.funding}
                      onChange={(event) =>
                        setForm((prev) => ({ ...prev, funding: event.target.value }))
                      }
                      className="w-full accent-[var(--azure)]"
                    />
                  </label>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(0)}
                      className="rounded-xl border border-border px-6 py-3.5 text-sm font-semibold"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={!detailsValid}
                      className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground disabled:opacity-50"
                    >
                      Review application <ArrowRight className="size-4" />
                    </button>
                  </div>
                </form>
              ) : null}

              {step === 2 ? (
                <div className="relative animate-rise-in">
                  <h3 className="font-display text-xl font-bold">Review and confirm</h3>
                  <dl className="mt-6 grid gap-3 sm:grid-cols-2">
                    {[
                      ["Account type", chosen.name],
                      ["Name", form.name],
                      ["Email", form.email],
                      ["Mobile", form.mobile],
                      ["City", form.city || "—"],
                      ["Opening deposit", `₹${Number(form.funding).toLocaleString("en-IN")}`],
                    ].map(([label, value]) => (
                      <div key={label} className="rounded-2xl border border-border bg-secondary/50 p-4">
                        <dt className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                          {label}
                        </dt>
                        <dd className="mt-1 font-semibold">{value}</dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="rounded-xl border border-border px-6 py-3.5 text-sm font-semibold"
                    >
                      Edit details
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirming(true)}
                      className="relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-destructive px-6 py-3.5 text-sm font-semibold text-destructive-foreground shadow-float"
                    >
                      Confirm and open account <ArrowRight className="size-4" />
                    </button>
                  </div>
                </div>
              ) : null}

              {step === 3 ? (
                <div className="relative animate-rise-in text-center">
                  <div className="scene-3d">
                    <span className="animate-seal-pop mx-auto grid size-20 place-items-center rounded-full glass-water text-primary">
                      <Check className="size-9" />
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-bold">Account confirmed</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Your {chosen.name} is live. Welcome to DigiBank, {form.name || "there"}.
                  </p>
                  <p className="mt-6 font-display text-2xl font-bold tracking-[0.18em]">
                    {accountNo}
                  </p>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Account number
                  </p>
                  <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <Link
                      to="/dashboard"
                      className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground"
                    >
                      Go to my dashboard <ArrowRight className="size-4" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => setStep(0)}
                      className="rounded-xl border border-border px-6 py-3.5 text-sm font-semibold"
                    >
                      Open another account
                    </button>
                  </div>
                </div>
              ) : null}

              {confirming ? (
                <div className="absolute inset-0 z-10 grid place-items-center overflow-hidden surface-navy">
                  <WaterBackdrop bubbles={10} />
                  <div
                    aria-hidden
                    className="animate-water-fill absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-azure/60 via-azure/25 to-transparent"
                  />
                  <div className="relative text-center">
                    <span className="relative mx-auto grid size-24 place-items-center">
                      <span className="animate-ripple-out absolute inset-0 rounded-full border border-primary-foreground/50" />
                      <span
                        className="animate-ripple-out absolute inset-0 rounded-full border border-primary-foreground/40"
                        style={{ animationDelay: "0.8s" }}
                      />
                      <span className="grid size-16 place-items-center rounded-full glass-water-dark">
                        <Landmark className="size-7" />
                      </span>
                    </span>
                    <p className="mt-6 font-display text-lg font-bold text-primary-foreground">
                      Opening your {chosen.name}
                    </p>
                    <p className="mt-1 text-sm text-primary-foreground/75">
                      Verifying KYC · reserving account number · issuing card
                    </p>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* DOCUMENTS */}
      <section className="border-y border-border bg-secondary/50 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <Reveal className="max-w-xl">
            <h2 className="font-display text-3xl font-bold">Keep these handy</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Four items, all uploaded digitally during the flow.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {documents.map((doc, index) => (
              <Reveal
                key={doc.title}
                delay={index * 80}
                className="rounded-3xl border border-border bg-card p-7 shadow-card-soft"
              >
                <span className="grid size-11 place-items-center rounded-2xl bg-accent">
                  <doc.icon className="size-5 text-primary" />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold">{doc.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{doc.copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* VOICES */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <Reveal className="max-w-xl">
          <h2 className="font-display text-3xl font-bold">Opened this week</h2>
        </Reveal>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {voices.map((voice, index) => (
            <Reveal
              key={voice.name}
              delay={index * 90}
              className="rounded-3xl border border-border bg-card p-7 shadow-card-soft"
            >
              <p className="font-display text-lg leading-relaxed">“{voice.quote}”</p>
              <p className="mt-6 text-sm font-semibold">{voice.name}</p>
              <p className="text-sm text-muted-foreground">{voice.role}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative isolate overflow-hidden surface-navy">
        <WaterBackdrop bubbles={9} />
        <div className="relative mx-auto max-w-3xl px-4 py-20 text-center">
          <CreditCard className="mx-auto size-8" />
          <h2 className="mt-5 font-display text-3xl font-bold sm:text-4xl">
            Your account is minutes away
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-primary-foreground/75">
            Start with zero balance today and upgrade whenever your money grows.
          </p>
          <a
            href="#apply"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-destructive px-7 py-4 text-sm font-semibold text-destructive-foreground shadow-float"
          >
            Open my account <ArrowRight className="size-4" />
          </a>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
