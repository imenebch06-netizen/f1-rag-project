"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { dictionaries, type Dict, type Lang } from "./dictionaries";

interface LangCtx {
  lang: Lang;
  t: Dict;
  setLang: (l: Lang) => void;
  toggleLang: () => void;
}

const Ctx = createContext<LangCtx>({
  lang: "fr",
  t: dictionaries.fr,
  setLang: () => {},
  toggleLang: () => {},
});

const KEY = "pitwall-lang";

function initial(): Lang {
  if (typeof window === "undefined") return "fr";
  const saved = window.localStorage.getItem(KEY);
  return saved === "en" || saved === "fr" ? saved : "fr";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initial);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    window.localStorage.setItem(KEY, l);
    document.documentElement.lang = l;
  }, []);

  const toggleLang = useCallback(() => {
    setLangState((prev) => {
      const next: Lang = prev === "fr" ? "en" : "fr";
      window.localStorage.setItem(KEY, next);
      document.documentElement.lang = next;
      return next;
    });
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <Ctx.Provider value={{ lang, t: dictionaries[lang], setLang, toggleLang }}>
      {children}
    </Ctx.Provider>
  );
}

export function useLang() {
  return useContext(Ctx);
}
