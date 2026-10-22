"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Theme = "dark" | "light";

interface ThemeCtx {
  theme: Theme;
  toggleTheme: () => void;
}

const Ctx = createContext<ThemeCtx>({ theme: "dark", toggleTheme: () => {} });

const KEY = "pitwall-theme";

function initial(): Theme {
  if (typeof window === "undefined") return "dark";
  const saved = window.localStorage.getItem(KEY);
  if (saved === "dark" || saved === "light") return saved;
  return window.matchMedia?.("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(initial);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("light", theme === "light");
    root.style.colorScheme = theme;
    window.localStorage.setItem(KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((p) => (p === "dark" ? "light" : "dark"));
  }, []);

  return <Ctx.Provider value={{ theme, toggleTheme }}>{children}</Ctx.Provider>;
}

export function useTheme() {
  return useContext(Ctx);
}

/** Inline in <head> to set the theme before first paint (no flash). */
export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem('pitwall-theme');if(t!=='dark'&&t!=='light'){t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}if(t==='light'){document.documentElement.classList.add('light');}document.documentElement.style.colorScheme=t;}catch(e){}})();`;
