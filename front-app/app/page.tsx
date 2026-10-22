"use client";

import newsRaw from "@/data/news.json";
import type { NewsItem } from "@/lib/news";
import { HeroFeed } from "@/components/feed/HeroFeed";
import { F1HeroIntro } from "@/components/home/F1HeroIntro";
import { CarOfTheDay } from "@/components/home/CarOfTheDay";
import { StatsBand } from "@/components/home/StatsBand";
import { useLang } from "@/lib/i18n/LanguageContext";
import { useEffect, useState } from "react";

const items = newsRaw as NewsItem[];

export default function Home() {
  const { t } = useLang();
  // Computed after mount: daily rotation follows the visitor's local date,
  // and stays prerender-safe under `cacheComponents`.
  const [today, setToday] = useState<string | null>(null);
  useEffect(() => {
    setToday(new Date().toISOString());
  }, []);

  return (
    <main className="w-full flex-1">
      {/* Band 0 — animated intro */}
      <F1HeroIntro />

      {/* Band 1 — Car of the Day */}
      <section id="car-of-day" className="scroll-mt-24 border-b border-white/10 bg-black/30">
        <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
          {today ? (
            <CarOfTheDay dateStr={today} />
          ) : (
            <div className="h-96 animate-pulse rounded-2xl border border-white/10 bg-carbon-2" />
          )}
        </div>
      </section>

      {/* Band 2 — F1 in numbers */}
      <section className="border-b border-f1-red/20 bg-f1-red/[0.06]">
        <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
          <StatsBand />
        </div>
        <div className="carbon-stripe h-[3px] w-full opacity-70" />
      </section>

      {/* Band 3 — News feed */}
      <section id="feed" className="scroll-mt-24">
        <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-[11px] font-bold tracking-[0.3em] text-f1-red">
                {t.home.feedKicker}
              </p>
              <h1 className="mt-1 text-3xl font-black tracking-tight text-white sm:text-4xl">
                {t.home.feedTitleA}{" "}
                <span className="text-f1-red">{t.home.feedTitleB}</span>
              </h1>
            </div>
            <p className="font-mono-num text-xs tracking-widest text-muted">
              {items.length} {t.home.feedCount}
            </p>
          </div>
          <HeroFeed items={items} />
        </div>
      </section>
    </main>
  );
}
