import { useEffect, useState } from "react";
import type { Location } from "@/lib/travel-data";
import {
  isDirectWikimediaImageUrl,
  isWikipediaFilePageUrl,
  resolveWikipediaImageUrl,
} from "@/lib/wikipedia-image";
import { MapPin } from "lucide-react";

type Props = {
  location: Pick<Location, "name" | "country" | "hero" | "image">;
  className?: string;
  showLabel?: boolean;
};

export function LocationImage({ location, className = "", showLabel = true }: Props) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setImageFailed(false);
    setImageSrc(null);

    const input = location.image?.trim();
    if (!input) return;

    if (isDirectWikimediaImageUrl(input)) {
      setImageSrc(input);
      return;
    }

    if (!isWikipediaFilePageUrl(input)) {
      setImageSrc(input);
      return;
    }

    let cancelled = false;
    resolveWikipediaImageUrl(input).then((url) => {
      if (cancelled) return;
      if (url) setImageSrc(url);
      else setImageFailed(true);
    });

    return () => {
      cancelled = true;
    };
  }, [location.image]);

  const showPhoto = Boolean(imageSrc) && !imageFailed;

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ background: location.hero }}
    >
      {showPhoto && (
        <img
          src={imageSrc!}
          alt={`${location.name}, ${location.country}`}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setImageFailed(true)}
        />
      )}

      {!showPhoto && (
        <div
          className="absolute inset-0 opacity-30 mix-blend-overlay"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.4) 0, transparent 40%), radial-gradient(circle at 80% 70%, rgba(0,0,0,0.25) 0, transparent 45%)",
          }}
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
      {showLabel && (
        <div className="absolute bottom-3 left-3 right-3 flex items-center gap-1.5 text-white">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          <span className="text-xs font-medium uppercase tracking-wider opacity-90 truncate">
            {location.country}
          </span>
        </div>
      )}
    </div>
  );
}
