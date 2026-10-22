"use client";

import { useLang } from "@/lib/i18n/LanguageContext";

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="border-t border-white/10 px-6 py-6 text-center text-xs tracking-widest text-muted">
      {t.footer}
    </footer>
  );
}
