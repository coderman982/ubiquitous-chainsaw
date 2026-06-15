export type Location = {
  slug: string;
  name: string;
  country: string;
  countrySlug: string;
  tagline: string;
  description: string;
  hero: string; // gradient fallback when no image is set
  highlights: string[];
  tips: string[];
  bestTime: string;
  featured?: boolean;
  /** Wikipedia image — paste the File page URL (e.g. https://en.wikipedia.org/wiki/File:Photo.jpg) or a direct upload.wikimedia.org link */
  image?: string;
};

const g = (a: string, b: string) => `linear-gradient(135deg, ${a} 0%, ${b} 100%)`;

export const locations: Location[] = [
  {
    slug: "kyoto",
    name: "Kyoto",
    country: "Japan",
    countrySlug: "japan",
    tagline: "Temples, tea & timeless gardens",
    description:
      "Once the imperial capital of Japan, Kyoto is a city of more than a thousand shrines, mossy gardens and lantern-lit alleys. Wander Gion at dusk, sip matcha in centuries-old teahouses, and watch cherry blossoms drift across the Philosopher's Path.",
    hero: g("#e88aab", "#c45c7c"),
    highlights: ["Fushimi Inari's vermilion gates", "Arashiyama bamboo grove", "Kinkaku-ji golden pavilion", "Traditional kaiseki dinners"],
    tips: ["Buy a bus day-pass — the metro misses most temples", "Visit popular sites before 8am to avoid crowds", "Carry small cash for shrine offerings"],
    bestTime: "Late March–April (cherry blossom) or November (autumn foliage)",
    featured: true,
    image: "https://upload.wikimedia.org/wikipedia/commons/8/83/Kiyomizu-dera%2C_Kyoto%2C_November_2016_-01.jpg",
  },
  {
    slug: "tokyo",
    name: "Tokyo",
    country: "Japan",
    countrySlug: "japan",
    tagline: "Neon nights & quiet shrines",
    description:
      "A city where neon-lit skyscrapers meet hidden shrines and the world's best ramen counters. From Shibuya's crossing to the calm of Meiji Jingu, Tokyo rewards curious wanderers at every turn.",
    hero: g("#574b90", "#ee5a70"),
    highlights: ["Shibuya Crossing at night", "TeamLab digital art museum", "Tsukiji outer market breakfast", "Sumo practice at a heya"],
    tips: ["Get a Suica IC card on arrival", "Tipping is not expected — anywhere", "Use coin lockers to lighten your day"],
    bestTime: "March–May and September–November",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/b2/Skyscrapers_of_Shinjuku_2009_January.jpg",
  },
  {
    slug: "santorini",
    name: "Santorini",
    country: "Greece",
    countrySlug: "greece",
    tagline: "Whitewashed cliffs over the Aegean",
    description:
      "Sun-bleached villages cascade down volcanic cliffs into a cobalt sea. Watch the sunset from Oia, swim in warm caldera waters, and dine on fresh seafood under a sky of impossible stars.",
    hero: g("#7dd3fc", "#2e6b8a"),
    highlights: ["Sunset in Oia", "Red Beach & Akrotiri ruins", "Caldera catamaran cruise", "Assyrtiko wine tasting"],
    tips: ["Book sunset dinners 2+ weeks ahead", "Rent an ATV to escape cruise crowds", "Stay in Imerovigli for quieter views"],
    bestTime: "May–June or September",
    featured: true,
    image: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Oia_Santorini_Greece.jpg",
  },
  {
    slug: "athens",
    name: "Athens",
    country: "Greece",
    countrySlug: "greece",
    tagline: "Marble myths & modern life",
    description:
      "Walk in the footsteps of philosophers between olive trees and ouzo bars. The Acropolis still crowns the city, but the real magic is in the lively neighborhoods of Plaka and Koukaki.",
    hero: g("#f0d78c", "#c9a84c"),
    highlights: ["The Acropolis & Parthenon", "Anafiotika village walk", "Central Market food tour", "Day trip to Cape Sounion"],
    tips: ["Visit the Acropolis at opening", "Tap water is safe to drink", "Sundays bring lively flea markets"],
    bestTime: "April–May and October",
    image: "https://en.wikipedia.org/wiki/File:Monastiraki_Square_and_Acropolis_in_Athens_(44149181684).jpg",
  },
  {
    slug: "marrakech",
    name: "Marrakech",
    country: "Morocco",
    countrySlug: "morocco",
    tagline: "Spice, color & desert light",
    description:
      "A sensory feast where snake charmers, lantern shops and orange-blossom courtyards collide. Lose yourself in the medina, recover in a riad pool, and end the day with mint tea on a rooftop.",
    hero: g("#ff6b35", "#e84393"),
    highlights: ["Jemaa el-Fnaa at sunset", "Bahia Palace tilework", "Majorelle Garden", "Atlas Mountains day trip"],
    tips: ["Agree on a taxi price before getting in", "Carry small dirham notes for tips", "Dress modestly outside hotels"],
    bestTime: "March–May and October–November",
    featured: true,
    image: "https://upload.wikimedia.org/wikipedia/commons/d/dc/Jemaa_el-Fnaa.jpg",
  },
  {
    slug: "chefchaouen",
    name: "Chefchaouen",
    country: "Morocco",
    countrySlug: "morocco",
    tagline: "The blue pearl of the Rif",
    description:
      "A mountain village painted in every shade of blue, tucked into the green folds of the Rif. Wander winding alleys, sip mint tea on hidden squares, and hike to the Spanish Mosque at golden hour.",
    hero: g("#6ba3c8", "#1a4a6e"),
    highlights: ["Sunset from the Spanish Mosque", "Photogenic blue alleys", "Waterfalls of Akchour", "Local goat cheese tasting"],
    tips: ["Bring comfortable walking shoes — steep streets", "Ask before photographing locals", "It cools off at night — pack a layer"],
    bestTime: "April–June and September–October",
    image: "https://en.wikipedia.org/wiki/File:Chefchaouen_(52189357475).jpg",
  },
  {
    slug: "reykjavik",
    name: "Reykjavík",
    country: "Iceland",
    countrySlug: "iceland",
    tagline: "Gateway to fire & ice",
    description:
      "A pocket-sized capital of colorful rooftops, geothermal pools and creative cafés. From here, the Golden Circle, glacier lagoons and northern lights are only a drive away.",
    hero: g("#b8d4e8", "#0c2340"),
    highlights: ["Hallgrímskirkja viewpoint", "Sky Lagoon at sunset", "Golden Circle day trip", "Northern lights tour (winter)"],
    tips: ["Weather changes hourly — layer up", "Tap water is among the world's purest", "Fuel up before driving the ring road"],
    bestTime: "June–August (midnight sun) or Sept–March (auroras)",
    featured: true,
    image: "https://upload.wikimedia.org/wikipedia/commons/8/86/Reykjavik_from_Hallgrimskirkja.jpg",
  },
  {
    slug: "vik",
    name: "Vík",
    country: "Iceland",
    countrySlug: "iceland",
    tagline: "Black sands at the edge of the world",
    description:
      "A tiny village beneath dramatic sea cliffs, where puffins nest and basalt columns rise from black volcanic sand. The perfect base for exploring Iceland's wild south coast.",
    hero: g("#2d3748", "#718096"),
    highlights: ["Reynisfjara black sand beach", "Dyrhólaey arch & puffins", "Sólheimajökull glacier hike", "Skógafoss waterfall"],
    tips: ["Never turn your back on the ocean here", "Check road.is before driving", "Fill up — gas stations are sparse"],
    bestTime: "May–September",
    image: "https://en.wikipedia.org/wiki/File:Vik,_%C3%96sterlen,_juli_2015.jpg",
  },
  {
    slug: "rome",
    name: "Rome",
    country: "Italy",
    countrySlug: "italy",
    tagline: "Eternal city, endless cacio e pepe",
    description:
      "Two thousand years of history layered into every street, between gelato stops and golden-hour piazzas. Toss a coin in the Trevi, climb the Palatine, and let dinner stretch until midnight.",
    hero: g("#9b4423", "#d4842a"),
    highlights: ["Colosseum & Roman Forum", "Vatican Museums & Sistine Chapel", "Trastevere food crawl", "Sunset from Pincian Hill"],
    tips: ["Book the Vatican online to skip lines", "Pizza al taglio is the best lunch deal", "Carry a refillable water bottle for the nasoni fountains"],
    bestTime: "April–May and September–October",
    featured: true,
    image: "https://upload.wikimedia.org/wikipedia/commons/d/de/Colosseo_2020.jpg",
  },
  {
    slug: "cinque-terre",
    name: "Cinque Terre",
    country: "Italy",
    countrySlug: "italy",
    tagline: "Pastel villages above the sea",
    description:
      "Five cliffside fishing villages strung along the Ligurian coast, linked by hiking trails and a single train line. Swim in turquoise coves, eat fresh pesto, and watch the sea turn gold at sunset.",
    hero: g("#f9a8a8", "#ee5a70"),
    highlights: ["Sentiero Azzurro coastal trail", "Vernazza harbor at sunset", "Fresh trofie al pesto", "Boat tour of all five villages"],
    tips: ["Get the Cinque Terre train + trail card", "Stay overnight to enjoy after day-trippers leave", "Pack proper hiking shoes for the trails"],
    bestTime: "May–June and September",
    image: "https://en.wikipedia.org/wiki/File:Cinque_Terre_(Italy,_October_2020)_-_24_(50543603956).jpg",
  },
  {
    slug: "bali-ubud",
    name: "Ubud",
    country: "Indonesia",
    countrySlug: "indonesia",
    tagline: "Rice terraces & temple incense",
    description:
      "The lush, spiritual heart of Bali, where emerald rice paddies meet yoga shalas and warung kitchens. Wake to gamelan music, hike to hidden waterfalls, and dine by candlelight among the trees.",
    hero: g("#87a878", "#4a6741"),
    highlights: ["Tegallalang rice terraces", "Tirta Empul water temple", "Sacred Monkey Forest", "Sunrise hike up Mt. Batur"],
    tips: ["Hire a driver for the day — cheap and easy", "Bring a sarong for temple visits", "Avoid the monkeys' eye contact"],
    bestTime: "April–October (dry season)",
    featured: true,
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f8/Rice_terraces%2C_Ubud%2C_Bali.jpg",
  },
  {
    slug: "bali-uluwatu",
    name: "Uluwatu",
    country: "Indonesia",
    countrySlug: "indonesia",
    tagline: "Cliffside surf & fiery sunsets",
    description:
      "Dramatic limestone cliffs, world-class surf breaks and beach clubs perched above the Indian Ocean. End your day at the clifftop Kecak fire dance as the sun sinks into the sea.",
    hero: g("#fecaca", "#e85d3a"),
    highlights: ["Uluwatu Temple Kecak dance", "Padang Padang beach", "Single Fin Sunday sessions", "Cliffside seafood at Jimbaran"],
    tips: ["Surf lessons are best at Padang Padang", "Scooters rule — wear a helmet", "Bring cash for warungs"],
    bestTime: "May–September",
    image: "https://en.wikipedia.org/wiki/File:Uluwatu_-_panoramio.jpg",
  },
];

export const featuredLocations = locations.filter((l) => l.featured).slice(0, 6);
// Ensure exactly 6 for the homepage
export const homepageBlog = featuredLocations.length === 6
  ? featuredLocations
  : [...featuredLocations, ...locations.filter((l) => !l.featured)].slice(0, 6);

export const countries = Array.from(
  new Map(locations.map((l) => [l.countrySlug, l.country])).entries()
).map(([slug, name]) => ({ slug, name }));

export function findLocations(query: string): Location[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return locations.filter(
    (l) =>
      l.country.toLowerCase().includes(q) ||
      l.countrySlug.toLowerCase().includes(q) ||
      l.name.toLowerCase().includes(q)
  );
}

export function getLocationBySlug(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug);
}
