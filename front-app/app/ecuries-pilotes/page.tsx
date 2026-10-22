"use client";

import { useLang } from "@/lib/i18n/LanguageContext";

export default function Page() {
  const { t } = useLang();
  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-12 sm:px-6">
      <p className="text-[11px] font-bold tracking-[0.3em] text-f1-red">
        {t.pages.teamsKicker}
      </p>
      <h1 className="mt-1 text-3xl font-black text-white">
        {t.pages.teamsTitle}
      </h1>
      <p className="mt-3 max-w-xl text-muted">{t.pages.teamsBody}</p>
    </main>
  );
}
