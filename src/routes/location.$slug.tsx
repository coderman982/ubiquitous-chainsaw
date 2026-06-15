import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Ticket, MapPin, Sparkles, Lightbulb, CalendarHeart } from "lucide-react";
import { getLocationBySlug, type Location } from "@/lib/travel-data";
import { LocationImage } from "@/components/LocationImage";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";

export const Route = createFileRoute("/location/$slug")({
  head: ({ params }) => {
    const loc = getLocationBySlug(params.slug);
    const title = loc ? `${loc.name}, ${loc.country} — Travel List` : "Location — Travel List";
    const desc = loc?.description.slice(0, 155) ?? "Travel guide";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  loader: ({ params }): { location: Location } => {
    const location = getLocationBySlug(params.slug);
    if (!location) throw notFound();
    return { location };
  },
  component: LocationDetail,
  notFoundComponent: () => (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <div className="flex-1 grid place-items-center px-4 py-20 text-center">
        <div>
          <h1 className="font-display text-4xl font-semibold">Location not found</h1>
          <p className="mt-2 text-muted-foreground">We don't have a guide for this one yet.</p>
          <Link to="/" className="mt-6 inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground">
            <ArrowLeft className="h-4 w-4" /> Back home
          </Link>
        </div>
      </div>
      <SiteFooter />
    </div>
  ),
});

function LocationDetail() {
  const { location } = Route.useLoaderData() as { location: Location };

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      {/* Hero */}
      <section className="relative">
        <LocationImage
          location={location}
          className="h-[44vh] min-h-[320px] w-full"
          showLabel={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 pb-8">
            <Link
              to="/search/$country"
              params={{ country: location.countrySlug }}
              className="inline-flex items-center gap-1.5 rounded-full bg-card/85 backdrop-blur px-3 py-1.5 text-xs font-medium text-foreground hover:bg-card transition"
            >
              <MapPin className="h-3.5 w-3.5 text-primary" />
              {location.country}
            </Link>
            <h1 className="mt-3 font-display text-4xl sm:text-6xl font-semibold tracking-tight text-foreground drop-shadow-sm">
              {location.name}
            </h1>
            <p className="mt-2 text-lg text-foreground/80 font-display italic">{location.tagline}</p>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="mx-auto max-w-5xl w-full px-4 sm:px-6 py-12 sm:py-16 grid lg:grid-cols-[1fr_320px] gap-10">
        <div className="space-y-12 min-w-0">
          <div>
            <h2 className="font-display text-2xl font-semibold">About {location.name}</h2>
            <p className="mt-4 text-base sm:text-lg text-foreground/85 leading-relaxed">
              {location.description}
            </p>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary">
                <Sparkles className="h-4 w-4" />
              </span>
              <h2 className="font-display text-2xl font-semibold">Highlights</h2>
            </div>
            <ul className="mt-5 grid sm:grid-cols-2 gap-3">
              {location.highlights.map((h: string) => (
                <li
                  key={h}
                  className="rounded-xl bg-card border border-border/60 p-4 text-sm shadow-card flex items-start gap-3"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent/20 text-accent-foreground">
                <Lightbulb className="h-4 w-4" />
              </span>
              <h2 className="font-display text-2xl font-semibold">Travel tips</h2>
            </div>
            <ol className="mt-5 space-y-3">
              {location.tips.map((tip: string, i: number) => (
                <li key={tip} className="flex gap-4 rounded-xl bg-secondary/60 p-4">
                  <span className="font-display text-lg font-semibold text-primary shrink-0 w-6">
                    {i + 1}.
                  </span>
                  <span className="text-sm sm:text-base">{tip}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:sticky lg:top-24 lg:self-start space-y-6">
          <div className="rounded-2xl bg-card border border-border/60 p-6 shadow-card">
            <div className="flex items-center gap-2 text-primary">
              <CalendarHeart className="h-4 w-4" />
              <p className="text-xs font-medium uppercase tracking-wider">Best time to visit</p>
            </div>
            <p className="mt-2 font-display text-lg leading-snug">{location.bestTime}</p>
          </div>

          <div className="rounded-2xl bg-gradient-hero p-6 text-white shadow-soft">
            <p className="text-xs font-medium uppercase tracking-wider opacity-90">Ready to go?</p>
            <h3 className="mt-1 font-display text-2xl font-semibold">Book your {location.name} trip</h3>
            <p className="mt-2 text-sm text-white/85">
              Secure tickets and tours from our trusted partners.
            </p>
            <a
              href="https://www.goindigo.in/"
              className="mt-5 inline-flex items-center justify-center gap-2 w-full rounded-xl bg-white text-primary px-4 py-3 text-sm font-semibold hover:bg-white/90 transition"
              target="_blank" rel="noopener noreferrer"
            >
              <Ticket className="h-4 w-4" />
              Book Tickets
            </a>
          </div>

          <Link
            to="/search/$country"
            params={{ country: location.countrySlug }}
            className="block text-center text-sm text-muted-foreground hover:text-foreground transition"
          >
            ← More in {location.country}
          </Link>
        </aside>
      </section>

      <div className="mt-auto">
        <SiteFooter />
      </div>
    </div>
  );
}
