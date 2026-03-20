import { useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Nav() {
  const location = useLocation();
  const { t, i18n } = useTranslation();

  // Read current theme from <html> class
  const [isDark, setIsDark] = useState(
    () => document.documentElement.classList.contains("dark")
  );

  const toggleTheme = useCallback(() => {
    const next = !isDark;
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setIsDark(next);
  }, [isDark]);

  const toggleLang = useCallback(() => {
    const next = i18n.language.startsWith("en") ? "ua" : "en";
    i18n.changeLanguage(next);
  }, [i18n]);

  const isUk = i18n.language.startsWith("ua");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <div className="max-w-[65ch] mx-auto px-6 h-14 flex items-center justify-between">
        {/* Site name */}
        <Link
          to="/"
          className="text-sm font-medium tracking-tight text-foreground hover:text-muted-foreground transition-colors"
        >
          {t("nav.home")}
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-5">
          <Link
            to="/about"
            className={`text-sm transition-colors ${
              location.pathname === "/about"
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t("nav.about")}
          </Link>

          <button
            onClick={toggleLang}
            aria-label="Toggle language"
            className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors tracking-wide"
          >
            {isUk ? "EN" : "UA"}
          </button>

          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {isDark ? <Sun size={15} strokeWidth={1.5} /> : <Moon size={15} strokeWidth={1.5} />}
          </button>
        </div>
      </div>
    </header>
  );
}
