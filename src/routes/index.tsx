import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  CreditCard,
  Landmark,
  PiggyBank,
  Search,
  Shield,
  Smartphone,
  Sparkles,
  Wallet,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import heroCard from "@/assets/hero-card.jpg";
import mobileBanking from "@/assets/mobile-banking.jpg";
import loansImage from "@/assets/loans.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DigiBank — Digital-First Banking, Accounts, Cards & Loans" },
      {
        name: "description",
        content:
          "DigiBank offers savings accounts, credit cards, instant loans and 24x7 digital services. Open an account online in minutes with bank-grade security.",
      },
      { property: "og:title", content: "DigiBank — Digital-First Banking" },
      {
        property: "og:description",
        content:
          "Accounts, cards, loans and investments in one secure app. Open a DigiBank account online in minutes.",
      },
    ],
  }),
  component: LandingPage,
});

const solutionTabs = [
  {
    id: "trending",
    label: "Trending",
    cards: [
      {
        title: "Credit Card",
        copy: "Explore a range of credit cards built for every lifestyle.",
        image: heroCard,
      },
      {
        title: "Personal Loan",
        copy: "A loan for everything, from dreams to emergencies.",
        image: loansImage,
      },
    ],
  },
  {
    id: "accounts",
    label: "Accounts",
    cards: [
      {
        title: "Savings Account",
        copy: "Zero-balance digital savings with instant virtual debit card.",
        image: mobileBanking,
      },
      {
        title: "Salary Account",
        copy: "Premium benefits, free transfers and family grouping.",
        image: heroCard,
      },
    ],
  },
  {
    id: "deposits",
    label: "Deposits",
    cards: [
      {
        title: "Fixed Deposit",
        copy: "Up to 7.65% p.a. with flexible tenures from 7 days.",
        image: loansImage,
      },
      {
        title: "Recurring Deposit",
        copy: "Build a corpus with as little as ₹500 every month.",
        image: mobileBanking,
      },
    ],
  },
  {
    id: "loans",
    label: "Loans",
    cards: [
      {
        title: "Home Loan",
        copy: "Rates from 8.45% p.a. with digital sanction in 10 minutes.",
        image: loansImage,
      },
      {
        title: "Car Loan",
        copy: "Finance up to 100% of on-road price with no foreclosure fee.",
        image: heroCard,
      },
    ],
  },
];

const serviceGroups = [
  {
    title: "Account Services",
    icon: Landmark,
    items: ["Address Change", "Nomination", "Update KYC", "Account Transfer", "Cheque Book"],
  },
  {
    title: "Card Services",
    icon: CreditCard,
    items: ["Set Card PIN", "Email ID Update", "Hotlist Card", "Limit Enhancement", "Reissue"],
  },
  {
    title: "Deposit Services",
    icon: PiggyBank,
    items: ["FD/RD Liquidation", "Advice Reissuance", "Form 15 G/H", "Break Deposit"],
  },
  {
    title: "Payment Services",
    icon: Wallet,
    items: ["Pay a Biller", "Add Biller", "Add Beneficiary", "BillPay Steps", "UPI Mandates"],
  },
];

const stats = [
  { value: "9K+", label: "Branches — nationwide reach" },
  { value: "21K+", label: "ATMs — always nearby" },
  { value: "9Cr+", label: "Customers — inspiring trust" },
  { value: "50M+", label: "App downloads — seamless banking" },
];

const loanTabs = [
  { id: "personal", label: "Personal Loan", min: 25000, max: 5000000, rate: 9.99, tenure: 5 },
  { id: "home", label: "Home Loan", min: 500000, max: 50000000, rate: 8.45, tenure: 20 },
  { id: "car", label: "Car Loan", min: 100000, max: 10000000, rate: 9.1, tenure: 7 },
];

function formatINR(value: number) {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Math.round(value));
}

function LandingPage() {
  const [activeSolution, setActiveSolution] = useState(solutionTabs[0]!.id);
  const [loanTab, setLoanTab] = useState(loanTabs[0]!);
  const [amount, setAmount] = useState(750000);
  const [tenure, setTenure] = useState(5);
  const [rate, setRate] = useState(9.99);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const months = tenure * 12;
  const monthlyRate = rate / 12 / 100;
  const emi =
    monthlyRate === 0
      ? amount / months
      : (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);
  const payable = emi * months;

  const solution = solutionTabs.find((tab) => tab.id === activeSolution) ?? solutionTabs[0]!;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* ---------- HERO ---------- */}
      <section className="relative isolate overflow-hidden surface-navy">
        <div
          aria-hidden
          className="absolute -left-40 top-10 size-[520px] rounded-full bg-azure/25 blur-3xl"
        />
        <div
          aria-hidden
          className="absolute -right-32 bottom-0 size-[460px] rounded-full bg-mint/15 blur-3xl"
        />

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 lg:grid-cols-2 lg:py-24">
          <div className="animate-rise-in">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 bg-primary-foreground/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em]">
              <Sparkles className="size-3.5" /> The new DigiBank
            </span>
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl">
              Experience
              <br />
              banking
              <br />
              <span className="text-gradient-azure">differently.</span>
            </h1>
            <p className="mt-6 max-w-md text-base text-primary-foreground/75">
              One account for payments, savings, cards, loans and investments — opened online in
              under five minutes.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 rounded-xl bg-destructive px-6 py-3.5 text-sm font-semibold text-destructive-foreground shadow-float"
              >
                Create your account <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 rounded-xl border border-primary-foreground/30 bg-primary-foreground/10 px-6 py-3.5 text-sm font-semibold backdrop-blur-md"
              >
                NetBanking Login
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-primary-foreground/65">
              <span className="inline-flex items-center gap-1.5">
                <Shield className="size-3.5" /> RBI licensed
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Smartphone className="size-3.5" /> 24x7 mobile banking
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Building2 className="size-3.5" /> 9,000+ branches
              </span>
            </div>
          </div>

          {/* 3D card scene */}
          <div className="scene-3d relative mx-auto w-full max-w-lg">
            <div
              className="preserve-3d"
              style={{ transform: `translate3d(0, ${scrollY * -0.06}px, 0)` }}
            >
              <div className="animate-float-y preserve-3d">
                <div className="animate-tilt-3d preserve-3d relative rounded-[2rem]">
                  <img
                    src={heroCard}
                    alt="DigiBank premium card floating in a 3D scene"
                    width={1200}
                    height={1200}
                    className="w-full rounded-[2rem] shadow-float"
                  />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2rem]"
                  >
                    <span className="absolute inset-y-0 w-1/3 animate-sheen bg-[image:var(--gradient-sheen)]" />
                  </span>
                </div>
              </div>
            </div>

            <div
              aria-hidden
              className="absolute -left-6 top-8 hidden rounded-2xl border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-3 text-xs backdrop-blur-md sm:block"
              style={{ transform: `translateY(${scrollY * 0.05}px)` }}
            >
              <p className="font-semibold">Instant UPI</p>
              <p className="text-primary-foreground/65">₹0 transfer fee</p>
            </div>
            <div
              aria-hidden
              className="absolute -right-4 bottom-10 hidden rounded-2xl border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-3 text-xs backdrop-blur-md sm:block"
              style={{ transform: `translateY(${scrollY * -0.04}px)` }}
            >
              <p className="font-semibold">7.65% p.a.</p>
              <p className="text-primary-foreground/65">on fixed deposits</p>
            </div>
          </div>
        </div>

        {/* Assistant search bar */}
        <div className="mx-auto max-w-5xl px-4 pb-14">
          <Reveal className="flex items-center gap-3 rounded-2xl border border-primary-foreground/20 bg-primary-foreground/95 p-2.5 shadow-float">
            <span className="ml-2 grid size-9 shrink-0 place-items-center rounded-xl surface-navy text-xs font-bold">
              AI
            </span>
            <input
              aria-label="Ask DigiBank Assist"
              placeholder="What are you looking for today?"
              className="h-11 min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
            />
            <button
              type="button"
              aria-label="Search"
              className="grid size-11 shrink-0 place-items-center rounded-xl surface-navy"
            >
              <Search className="size-4" />
            </button>
          </Reveal>
        </div>
      </section>

      {/* ---------- SOLUTIONS ---------- */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <Reveal className="text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            Banking solutions tailor-made for you
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
            Pick a category and see what fits your plans right now.
          </p>
        </Reveal>

        <Reveal delay={80} className="mt-8 flex flex-wrap justify-center gap-2">
          {solutionTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveSolution(tab.id)}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                tab.id === activeSolution
                  ? "surface-navy"
                  : "border border-input bg-card text-muted-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </Reveal>

        <div key={solution.id} className="mt-10 grid gap-6 md:grid-cols-2">
          {solution.cards.map((card, index) => (
            <article
              key={card.title}
              className="animate-rise-in overflow-hidden rounded-3xl border border-border bg-card shadow-card-soft"
              style={{ animationDelay: `${index * 110}ms` }}
            >
              <div className="grid gap-4 p-7 sm:grid-cols-[1.1fr_0.9fr] sm:items-center">
                <div>
                  <h3 className="font-display text-xl font-bold">{card.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{card.copy}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <Link
                      to="/register"
                      className="rounded-lg bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground"
                    >
                      Apply now
                    </Link>
                    <Link
                      to="/onboarding"
                      className="rounded-lg border border-input px-4 py-2.5 text-xs font-semibold"
                    >
                      Know more
                    </Link>
                  </div>
                </div>
                <img
                  src={card.image}
                  alt={card.title}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="animate-float-y w-full rounded-2xl object-cover"
                />
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ---------- DIGITAL SERVICES ---------- */}
      <section className="relative overflow-hidden bg-[oklch(0.97_0.03_92)]">
        <div className="mx-auto max-w-7xl px-4 py-20">
          <Reveal className="max-w-2xl">
            <h2 className="font-display text-3xl font-bold text-navy-deep sm:text-4xl">
              Explore all DigiBank digital services
            </h2>
            <p className="mt-3 text-sm text-navy/70">
              Over 200 requests you can complete online — no branch visit, no paperwork.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {serviceGroups.map((group, index) => (
              <Reveal
                key={group.title}
                delay={index * 90}
                className="rounded-3xl border border-navy/10 bg-card p-6 shadow-card-soft"
              >
                <span className="grid size-11 place-items-center rounded-2xl surface-navy">
                  <group.icon className="size-5" />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold">{group.title}</h3>
                <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <span className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-destructive">
                  View more <ArrowUpRight className="size-3.5" />
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- EMI CALCULATOR ---------- */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <Reveal className="text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            Simplify financial planning with the right tools
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">Flexible EMIs to address your needs</p>
        </Reveal>

        <Reveal delay={80} className="mt-8 flex flex-wrap justify-center gap-2">
          {loanTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setLoanTab(tab);
                setAmount(Math.min(Math.max(amount, tab.min), tab.max));
                setRate(tab.rate);
                setTenure(Math.min(tenure, tab.tenure));
              }}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                tab.id === loanTab.id
                  ? "surface-navy"
                  : "border border-input bg-card text-muted-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </Reveal>

        <Reveal delay={120} className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-3xl border border-border bg-accent/60 p-7">
            <Field label="Loan Amount" value={`₹ ${formatINR(amount)}`}>
              <input
                type="range"
                min={loanTab.min}
                max={loanTab.max}
                step={5000}
                value={amount}
                onChange={(event) => setAmount(Number(event.target.value))}
                className="w-full accent-[oklch(0.36_0.13_262)]"
                aria-label="Loan amount"
              />
              <Scale left={`₹ ${formatINR(loanTab.min)}`} right={`₹ ${formatINR(loanTab.max)}`} />
            </Field>

            <Field label="Loan Tenure" value={`${tenure} yr`}>
              <input
                type="range"
                min={1}
                max={loanTab.tenure}
                value={tenure}
                onChange={(event) => setTenure(Number(event.target.value))}
                className="w-full accent-[oklch(0.36_0.13_262)]"
                aria-label="Loan tenure in years"
              />
              <Scale left="1 year" right={`${loanTab.tenure} years`} />
            </Field>

            <Field label="Interest Rate" value={`${rate.toFixed(2)} %`}>
              <input
                type="range"
                min={loanTab.rate}
                max={24}
                step={0.01}
                value={rate}
                onChange={(event) => setRate(Number(event.target.value))}
                className="w-full accent-[oklch(0.36_0.13_262)]"
                aria-label="Interest rate"
              />
              <Scale left={`${loanTab.rate}% PA`} right="24% PA" />
            </Field>
          </div>

          <div className="rounded-3xl border border-border bg-card p-7 shadow-card-soft">
            <div className="rounded-2xl bg-accent px-5 py-6 text-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Your monthly EMI will be
              </p>
              <p className="mt-2 font-display text-4xl font-extrabold text-primary">
                ₹ {formatINR(emi)}
              </p>
            </div>
            <dl className="mt-6 space-y-4 text-sm">
              <Row label="Amount Payable" value={`₹ ${formatINR(payable)}`} />
              <Row label="Interest Amount" value={`₹ ${formatINR(payable - amount)}`} />
              <Row label="Principal Amount" value={`₹ ${formatINR(amount)}`} />
            </dl>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
              >
                Apply now <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/onboarding"
                className="rounded-xl border border-input px-5 py-3 text-sm font-semibold"
              >
                Know more
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ---------- STATS ---------- */}
      <section className="border-y border-border bg-secondary/60">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 lg:grid-cols-2">
          <Reveal>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">Banking beyond numbers</h2>
            <p className="mt-3 text-sm text-muted-foreground">Built to serve you.</p>
            <img
              src={mobileBanking}
              alt="DigiBank mobile app dashboard"
              loading="lazy"
              width={1024}
              height={1024}
              className="animate-float-y mt-8 w-full max-w-sm rounded-3xl shadow-float"
            />
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {stats.map((stat, index) => (
              <Reveal
                key={stat.value}
                delay={index * 90}
                className="rounded-3xl border border-border bg-card p-7 shadow-card-soft"
              >
                <p className="font-display text-4xl font-extrabold text-primary">{stat.value}</p>
                <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CTA / REGISTER ---------- */}
      <section className="relative isolate overflow-hidden surface-navy">
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 size-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary-foreground/10 animate-spin-slow"
        />
        <div className="scene-3d mx-auto max-w-3xl px-4 py-24 text-center">
          <Reveal>
            <h2 className="font-display text-3xl font-bold sm:text-5xl">
              Ready to bank the DigiBank way?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm text-primary-foreground/75">
              Create your account with a user ID and password, complete video KYC, and start banking
              the same day.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 rounded-xl bg-destructive px-7 py-4 text-sm font-semibold text-destructive-foreground shadow-float"
              >
                Go to register page <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/login"
                className="rounded-xl border border-primary-foreground/30 bg-primary-foreground/10 px-7 py-4 text-sm font-semibold backdrop-blur-md"
              >
                I already have an account
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function Field({
  label,
  value,
  children,
}: {
  label: string;
  value: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-8 last:mb-0">
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-semibold">{label}</span>
        <span className="rounded-lg bg-card px-3 py-1.5 text-sm font-semibold tabular-nums">
          {value}
        </span>
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function Scale({ left, right }: { left: string; right: string }) {
  return (
    <div className="mt-2 flex justify-between text-xs text-muted-foreground">
      <span>{left}</span>
      <span>{right}</span>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border pb-3 last:border-0">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-semibold tabular-nums">{value}</dd>
    </div>
  );
}
