import { Link } from "@tanstack/react-router";

const columns = [
  {
    title: "Products",
    links: ["Savings Accounts", "Credit Cards", "Personal Loans", "Fixed Deposits"],
  },
  {
    title: "Digital Services",
    links: ["NetBanking", "Mobile Banking", "UPI & Payments", "FASTag"],
  },
  {
    title: "Support",
    links: ["Help Centre", "Branch & ATM Locator", "Raise a Complaint", "Security Tips"],
  },
  {
    title: "Company",
    links: ["About DigiBank", "Careers", "Investor Relations", "Newsroom"],
  },
];

export function SiteFooter() {
  return (
    <footer className="surface-navy">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-lg bg-primary-foreground/15 text-sm font-bold">
                D
              </span>
              <span className="font-display text-lg font-bold">DigiBank</span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-primary-foreground/70">
              Digital-first banking built on trust, speed and security.
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold">{column.title}</h3>
              <ul className="mt-4 space-y-2.5 text-sm text-primary-foreground/70">
                {column.links.map((link) => (
                  <li key={link}>{link}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-primary-foreground/15 pt-6 text-xs text-primary-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} DigiBank Ltd. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <Link to="/register">Open an account</Link>
            <Link to="/login">NetBanking login</Link>
            <span>Privacy Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
