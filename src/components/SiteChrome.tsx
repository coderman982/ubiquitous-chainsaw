import { Link } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/75 border-b border-border/60">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-hero text-white shadow-soft group-hover:scale-105 transition-transform">
            <ListChecks className="h-5 w-5" />
          </span>
          <span className="font-display text-xl font-semibold tracking-tight">Travel List</span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2 text-sm">
          <ThemeToggle />
          <Link
            to="/"
            activeOptions={{ exact: true }}
            activeProps={{ className: "text-foreground" }}
            inactiveProps={{ className: "text-muted-foreground hover:text-foreground" }}
            className="px-3 py-2 rounded-lg transition-colors"
          >
            Home
          </Link>
          <a
            href="#destinations"
            className="px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
          >
            Destinations
          </a>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p className="font-display text-base text-foreground">Travel List</p>
        <p>© {new Date().getFullYear()} Travel List. Plan every journey.</p>
      </div>
    </footer>
  );
}
