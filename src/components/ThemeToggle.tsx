import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { applyTheme, getPreferredTheme, setTheme, type Theme } from "@/lib/theme";

export function ThemeToggle() {
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    const preferred = getPreferredTheme();
    setThemeState(preferred);
    applyTheme(preferred);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    setThemeState(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="grid h-9 w-9 place-items-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
