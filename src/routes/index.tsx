import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Search, ArrowRight, Globe2, Sparkles } from "lucide-react";
import { homepageBlog, countries } from "@/lib/travel-data";
import { LocationImage } from "@/components/LocationImage";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Travel List — Your curated destination guides" },
      { name: "description", content: "Search any country to uncover hand-picked tourist locations, tips, and tickets." },
    ],
  }),
  component: Home,
});

function Home() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    const term = q.trim();
    if (!term) return;
    navigate({ to: "/search/$country", params: { country: term.toLowerCase() } });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-soft" />
        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 20%, oklch(0.75 0.12 270 / 0.45) 0, transparent 45%), radial-gradient(circle at 85% 30%, oklch(0.78 0.14 25 / 0.4) 0, transparent 50%), radial-gradient(circle at 50% 90%, oklch(0.72 0.1 290 / 0.35) 0, transparent 55%)",
          }}
        />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 pt-16 pb-20 sm:pt-24 sm:pb-28 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-card/70 backdrop-blur px-3 py-1 text-xs font-medium text-foreground/80 border border-border/60 shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Hand-picked guides for thoughtful travelers
          </span>
          <h1 className="mt-6 font-display text-4xl sm:text-6xl font-semibold leading-[1.05] tracking-tight">
            Find your next <em className="text-primary not-italic">somewhere</em>.
          </h1>
          <p className="mt-5 mx-auto max-w-xl text-base sm:text-lg text-muted-foreground">
            Type a country and discover the places worth your time — from blue cities and black-sand beaches to temple gardens at dawn.
          </p>

          <form
            onSubmit={onSearch}
            className="mt-8 mx-auto max-w-xl"
          >
            <div className="group flex items-center gap-2 rounded-2xl bg-card/90 backdrop-blur p-2 pl-4 sm:pl-5 shadow-soft border border-border/60 focus-within:ring-2 focus-within:ring-ring/40 transition">
              <Globe2 className="h-5 w-5 text-muted-foreground shrink-0" />
              <input
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search a country — try Japan, Italy, Iceland…"
                className="flex-1 min-w-0 bg-transparent outline-none text-base placeholder:text-muted-foreground/70 py-2"
                aria-label="Search a country"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 sm:px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 active:scale-[0.98] transition shrink-0"
              >
                <Search className="h-4 w-4" />
                <span className="hidden sm:inline">Explore</span>
              </button>
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
              <span className="text-muted-foreground">Popular:</span>
              {countries.slice(0, 6).map((c) => (
                <Link
                  key={c.slug}
                  to="/search/$country"
                  params={{ country: c.slug }}
                  className="rounded-full bg-secondary px-3 py-1 text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </form>
        </div>
      </section>

      {/* Blog / Most Visited */}
      <section id="destinations" className="mx-auto max-w-6xl w-full px-4 sm:px-6 py-16 sm:py-20">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-10">
          <div>
            <p className="text-sm font-medium text-primary uppercase tracking-wider">The journal</p>
            <h2 className="mt-1 font-display text-3xl sm:text-4xl font-semibold">Most visited destinations</h2>
          </div>
          <p className="text-muted-foreground max-w-md sm:text-right">
            Six places our community keeps coming back to — and exactly why you should go.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {homepageBlog.map((loc) => (
            <article
              key={loc.slug}
              className="group flex flex-col rounded-2xl bg-card border border-border/60 overflow-hidden shadow-card hover:-translate-y-1 hover:shadow-soft transition-all duration-300"
            >
              <LocationImage location={loc} className="h-52 w-full" />
              <div className="flex flex-col flex-1 p-6">
                <h3 className="font-display text-xl font-semibold">{loc.name}</h3>
                <p className="mt-1 text-sm text-primary font-medium">{loc.tagline}</p>
                <p className="mt-3 text-sm text-muted-foreground line-clamp-3 flex-1">
                  {loc.description}
                </p>
                <Link
                  to="/location/$slug"
                  params={{ slug: loc.slug }}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors w-fit"
                >
                  Read more
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="mt-auto">
        <SiteFooter />
      </div>
    </div>
  );
}
