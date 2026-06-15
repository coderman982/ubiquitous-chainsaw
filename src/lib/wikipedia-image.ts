type WikiSource = "commons.wikimedia.org" | "en.wikipedia.org";

export function extractWikipediaFilename(input: string): string | null {
  const wikiMatch = input.match(/\/wiki\/File:(.+)$/i);
  if (!wikiMatch) return null;
  return decodeURIComponent(wikiMatch[1].replace(/\+/g, " "));
}

export function getWikiSource(input: string): WikiSource {
  return input.includes("en.wikipedia.org") ? "en.wikipedia.org" : "commons.wikimedia.org";
}

export function isDirectWikimediaImageUrl(input: string): boolean {
  return input.includes("upload.wikimedia.org");
}

export function isWikipediaFilePageUrl(input: string): boolean {
  return /\/wiki\/File:/i.test(input);
}

export async function fetchWikimediaImageUrl(
  filename: string,
  wikiHost: WikiSource = "commons.wikimedia.org",
): Promise<string | null> {
  const params = new URLSearchParams({
    action: "query",
    titles: `File:${filename}`,
    prop: "imageinfo",
    iiprop: "url",
    format: "json",
    origin: "*",
  });

  const response = await fetch(`https://${wikiHost}/w/api.php?${params}`);
  if (!response.ok) return null;

  const data = (await response.json()) as {
    query?: {
      pages?: Record<string, { missing?: boolean; imageinfo?: { url: string }[] }>;
    };
  };

  const page = Object.values(data.query?.pages ?? {})[0];
  if (!page || page.missing || !page.imageinfo?.[0]?.url) return null;
  return page.imageinfo[0].url;
}

export async function resolveWikipediaImageUrl(input?: string): Promise<string | null> {
  if (!input?.trim()) return null;
  const trimmed = input.trim();

  if (isDirectWikimediaImageUrl(trimmed)) return trimmed;

  if (isWikipediaFilePageUrl(trimmed)) {
    const filename = extractWikipediaFilename(trimmed);
    if (!filename) return null;

    const primaryWiki = getWikiSource(trimmed);
    const fallbackWiki: WikiSource =
      primaryWiki === "en.wikipedia.org" ? "commons.wikimedia.org" : "en.wikipedia.org";

    return (
      (await fetchWikimediaImageUrl(filename, primaryWiki)) ??
      (await fetchWikimediaImageUrl(filename, fallbackWiki))
    );
  }

  return trimmed;
}
