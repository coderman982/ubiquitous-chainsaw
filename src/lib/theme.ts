export type Theme = "light" | "dark";

const STORAGE_KEY = "travel-list-theme";

export function getSystemTheme(): Theme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function getStoredTheme(): Theme | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === "light" || stored === "dark" ? stored : null;
}

export function getPreferredTheme(): Theme {
  return getStoredTheme() ?? getSystemTheme();
}

export function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

export function setTheme(theme: Theme) {
  localStorage.setItem(STORAGE_KEY, theme);
  applyTheme(theme);
}

export const themeInitScript = `(function(){try{var s=localStorage.getItem("${STORAGE_KEY}");var d=s==="dark"||(s!=="light"&&matchMedia("(prefers-color-scheme:dark)").matches);document.documentElement.classList.toggle("dark",d)}catch(e){}})();`;
