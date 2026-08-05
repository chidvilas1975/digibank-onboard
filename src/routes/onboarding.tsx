import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  CreditCard,
  FileCheck2,
  Fingerprint,
  Landmark,
  Smartphone,
  Video,
  Wallet,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { WaterBackdrop } from "@/components/site/WaterBackdrop";

import mobileBanking from "@/assets/mobile-banking.jpg";
import heroCard from "@/assets/hero-card.jpg";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "DigiBank Onboarding — Open Your Account in 4 Guided Steps" },
      {
        name: "description",
        content:
          "See how DigiBank onboarding works: identity check, video KYC, account funding and instant card issuance — fully online.",
      },
      { property: "og:title", content: "DigiBank Onboarding" },
      {
        property: "og:description",
        content: "Open your DigiBank account online in four guided steps.",
      },
    ],
  }),
  component: OnboardingPage,
});

const steps = [
  {
    icon: Fingerprint,
    title: "Verify identity",
    copy: "Enter your PAN and Aadhaar-linked mobile number. We authenticate instantly.",
    time: "60 seconds",
  },
  {
    icon: Video,
    title: "Complete video KYC",
    copy: "A DigiBank officer verifies you on a short, secure video call.",
    time: "3 minutes",
  },
  {
    icon: Wallet,
    title: "Fund your account",
    copy: "Add your first deposit by UPI or transfer from any existing bank.",
    time: "1 minute",
  },
  {
    icon: CreditCard,
    title: "Get your card",
    copy: "Virtual debit card issued instantly, physical card delivered in 3 days.",
    time: "Instant",
  },
];

const perks = [
  { icon: BadgeCheck, title: "Zero balance", copy: "No minimum balance for the first 12 months." },
  { icon: Smartphone, title: "Full app control", copy: "Freeze cards, set limits, track spending." },
  { icon: Landmark, title: "9,000+ branches", copy: "Digital first, never digital only." },
  { icon: FileCheck2, title: "Paperless", copy: "Every document signed and stored digitally." },
];

const faqs = [
  {
    q: "What documents do I need?",
    a: "Your PAN card, Aadhaar-linked mobile number and a valid address proof. Everything is uploaded digitally.",
  },
  {
    q: "How long does approval take?",
    a: "Most accounts are approved the same day. Video KYC slots are available from 8 AM to 10 PM.",
  },
  {
    q: "Is there any joining fee?",
    a: "Digital savings accounts have no joining fee. Premium card variants list their fees before you apply.",
  },
];

function OnboardingPage() {
  const [active, setActive] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const id = window.setInterval(() => setActive((i) => (i + 1) % steps.length), 3800);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* HERO */}
      <section className="relative isolate overflow-hidden surface-navy">
        <WaterBackdrop />
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 size-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary-foreground/10 animate-spin-slow"
        />
        <div className="scene-3d relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 lg:grid-cols-2">

          <div className="animate-rise-in">
            <span className="inline-flex rounded-full border border-primary-foreground/25 bg-primary-foreground/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em]">
              Onboarding
            </span>
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-tight sm:text-5xl">
              From sign-up to <span className="text-gradient-azure">first payment</span> in one
              sitting.
            </h1>
            <p className="mt-5 max-w-md text-sm text-primary-foreground/75">
              A guided, fully digital journey. No branch queues, no printed forms, no waiting for a
              courier.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/open-account"
                className="inline-flex items-center gap-2 rounded-xl bg-destructive px-6 py-3.5 text-sm font-semibold text-destructive-foreground shadow-float"
              >
                Choose my account <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/login"
                className="rounded-xl glass-water-dark px-6 py-3.5 text-sm font-semibold"
              >
                Resume application
              </Link>
            </div>

          </div>

          <div className="preserve-3d relative mx-auto w-full max-w-sm">
            <div className="animate-float-y preserve-3d">
              <img
                src={mobileBanking}
                alt="DigiBank app onboarding screens"
                width={1024}
                height={1024}
                className="animate-tilt-3d w-full rounded-[2rem] shadow-float"
              />
            </div>
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <Reveal className="max-w-xl">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Four steps, one sitting</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            The journey advances on its own below — or pick any step to preview it.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <ul className="space-y-3">
            {steps.map((step, index) => (
              <li key={step.title}>
                <button
                  type="button"
                  onClick={() => setActive(index)}
                  className={`flex w-full items-start gap-4 rounded-2xl border p-5 text-left transition-colors ${
                    index === active
                      ? "border-primary/40 bg-accent"
                      : "border-border bg-card text-muted-foreground"
                  }`}
                >
                  <span
                    className={`grid size-11 shrink-0 place-items-center rounded-xl ${
                      index === active ? "surface-navy" : "bg-secondary"
                    }`}
                  >
                    <step.icon className="size-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display text-base font-bold text-foreground">
                      {index + 1}. {step.title}
                    </span>
                    <span className="mt-1 block text-sm">{step.copy}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <div className="scene-3d">
            <div
              key={active}
              className="animate-rise-in preserve-3d rounded-3xl border border-border bg-card p-8 shadow-float"
            >
              <span className="grid size-14 place-items-center rounded-2xl surface-navy">
                {(() => {
                  const Icon = steps[active]!.icon;
                  return <Icon className="size-6" />;
                })()}
              </span>
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Step {active + 1} of {steps.length} · {steps[active]!.time}
              </p>
              <h3 className="mt-3 font-display text-2xl font-bold">{steps[active]!.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{steps[active]!.copy}</p>

              <div className="mt-8 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-500"
                  style={{ width: `${((active + 1) / steps.length) * 100}%` }}
                />
              </div>

              <img
                src={heroCard}
                alt="DigiBank card issued at the end of onboarding"
                loading="lazy"
                width={1200}
                height={1200}
                className="animate-float-y mt-8 w-full rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* PERKS MARQUEE */}
      <section className="overflow-hidden border-y border-border bg-secondary/60 py-6">
        <div className="flex w-max animate-marquee-x gap-10 px-4 text-sm font-semibold text-muted-foreground">
          {[...perks, ...perks, ...perks, ...perks].map((perk, index) => (
            <span key={index} className="inline-flex items-center gap-2 whitespace-nowrap">
              <perk.icon className="size-4 text-primary" /> {perk.title}
            </span>
          ))}
        </div>
      </section>

      {/* PERK CARDS */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {perks.map((perk, index) => (
            <Reveal
              key={perk.title}
              delay={index * 90}
              className="rounded-3xl border border-border bg-card p-7 shadow-card-soft"
            >
              <span className="grid size-11 place-items-center rounded-2xl bg-accent">
                <perk.icon className="size-5 text-primary" />
              </span>
              <h3 className="mt-5 font-display text-lg font-bold">{perk.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{perk.copy}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 pb-24">
        <Reveal>
          <h2 className="font-display text-3xl font-bold">Before you start</h2>
        </Reveal>
        <div className="mt-8 space-y-3">
          {faqs.map((faq, index) => (
            <Reveal key={faq.q} delay={index * 80}>
              <div className="overflow-hidden rounded-2xl border border-border bg-card">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left font-semibold"
                  aria-expanded={openFaq === index}
                >
                  {faq.q}
                  <span className="text-muted-foreground">{openFaq === index ? "−" : "+"}</span>
                </button>
                {openFaq === index ? (
                  <p className="animate-rise-in border-t border-border p-5 text-sm text-muted-foreground">
                    {faq.a}
                  </p>
                ) : null}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="mt-10 text-center">
          <Link
            to="/open-account"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground"
          >
            Choose my account type <ArrowRight className="size-4" />
          </Link>
        </Reveal>
      </section>

      {/* NEXT STEP BRIDGE */}
      <section className="relative isolate overflow-hidden surface-navy">
        <WaterBackdrop bubbles={8} />
        <div className="scene-3d relative mx-auto max-w-4xl px-4 py-20 text-center">
          <span className="inline-flex rounded-full glass-water-dark px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em]">
            Up next
          </span>
          <h2 className="mt-6 font-display text-3xl font-bold sm:text-4xl">
            Now pick the account you want to open
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-primary-foreground/75">
            Zero balance savings, salary account, premium savings or a current account for your
            business — compare them and confirm in one flow.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-4">
            {["Zero Balance", "Salary", "Premium", "Current"].map((label) => (
              <div key={label} className="rounded-2xl glass-water-dark p-4 text-sm font-semibold">
                {label}
              </div>
            ))}
          </div>
          <Link
            to="/open-account"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-destructive px-7 py-4 text-sm font-semibold text-destructive-foreground shadow-float"
          >
            Continue to account selection <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>


      <SiteFooter />
    </div>
  );
}
