import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useMemo, type FormEvent } from "react";
import { ArrowLeft, Search, Ticket, MapPin } from "lucide-react";
import { findLocations, countries } from "@/lib/travel-data";
import { LocationImage } from "@/components/LocationImage";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";

export const Route = createFileRoute("/search/$country")({
  head: ({ params }) => ({
    meta: [
      { title: `Tourist locations in ${decodeURIComponent(params.country)} — Travel List` },
      { name: "description", content: `Hand-picked tourist locations and travel guides for ${decodeURIComponent(params.country)}.` },
    ],
  }),
  component: SearchResults,
});

function titleCase(s: string) {
  return s
    .split(/[-\s]+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

function SearchResults() {
  const { country } = Route.useParams();
  const navigate = useNavigate();
  const decoded = decodeURIComponent(country);
  const results = useMemo(() => findLocations(decoded), [decoded]);
  const [q, setQ] = useState(decoded);

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    const term = q.trim();
    if (!term) return;
    navigate({ to: "/search/$country", params: { country: term.toLowerCase() } });
  };

  const displayCountry = results.length > 0 ? results[0].country : titleCase(decoded);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <section className="bg-gradient-soft border-b border-border/60">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-14">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back home
          </Link>
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 sm:flex sm:flex-wrap sm:justify-between">
            <div className="min-w-0">
              <p className="text-sm font-medium text-primary uppercase tracking-wider">Search results</p>
              <h1 className="mt-1 font-display text-3xl sm:text-5xl font-semibold truncate">
                {displayCountry}
              </h1>
              <p className="mt-2 text-muted-foreground">
                {results.length > 0
                  ? `${results.length} place${results.length === 1 ? "" : "s"} to explore`
                  : "No matches yet — try another country."}
              </p>
            </div>
          </div>

          <form onSubmit={onSearch} className="mt-6 max-w-xl">
            <div className="flex items-center gap-2 rounded-2xl bg-card/90 backdrop-blur p-2 pl-4 shadow-card border border-border/60 focus-within:ring-2 focus-within:ring-ring/40">
              <Search className="h-4 w-4 text-muted-foreground shrink-0" />
              <input
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search another country…"
                className="flex-1 min-w-0 bg-transparent outline-none text-sm py-2"
              />
              <button
                type="submit"
                className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition shrink-0"
              >
                Go
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-6xl w-full px-4 sm:px-6 py-12 sm:py-16">
        {results.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((loc) => (
              <article
                key={loc.slug}
                className="group flex flex-col rounded-2xl bg-card border border-border/60 overflow-hidden shadow-card hover:-translate-y-1 hover:shadow-soft transition-all duration-300"
              >
                <Link to="/location/$slug" params={{ slug: loc.slug }} className="block">
                  <LocationImage location={loc} className="h-48 w-full" showLabel={false} />
                </Link>
                <div className="flex flex-col flex-1 p-6">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground uppercase tracking-wider">
                    <MapPin className="h-3.5 w-3.5" />
                    {loc.country}
                  </div>
                  <h2 className="mt-2 font-display text-xl font-semibold">
                    <Link to="/location/$slug" params={{ slug: loc.slug }} className="hover:text-primary transition-colors">
                      {loc.name}
                    </Link>
                  </h2>
                  <p className="mt-3 text-sm text-muted-foreground line-clamp-3 flex-1">
                    {loc.description}
                  </p>
                  <div className="mt-5 flex items-center justify-between gap-3">
                    <Link
                      to="/location/$slug"
                      params={{ slug: loc.slug }}
                      className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                    >
                      Details →
                    </Link>
                    <a
                      href="#"
                      className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition shrink-0"
                    >
                      <Ticket className="h-4 w-4" />
                      Get Tickets
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-secondary/40 p-10 text-center">
            <h2 className="font-display text-2xl font-semibold">Nothing here yet</h2>
            <p className="mt-2 text-muted-foreground">We couldn't find guides for "{decoded}". Try one of these:</p>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {countries.map((c) => (
                <Link
                  key={c.slug}
                  to="/search/$country"
                  params={{ country: c.slug }}
                  className="rounded-full bg-card border border-border px-4 py-1.5 text-sm hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      <div className="mt-auto">
        <SiteFooter />
      </div>
    </div>
  );
}
