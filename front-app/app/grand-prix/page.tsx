"use client";

import { SeasonCalendar } from "@/components/grand-prix/SeasonCalendar";
import { WeekendTimeline } from "@/components/grand-prix/WeekendTimeline";
import { useLang } from "@/lib/i18n/LanguageContext";
import { useEffect, useState } from "react";

export default function Page() {
  const { t } = useLang();
  const [today, setToday] = useState<string | null>(null);
  useEffect(() => {
    setToday(new Date().toISOString());
  }, []);

  return (
    <main className="w-full flex-1">
      {/* Header */}
      <section className="border-b border-white/10">
        <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
          <p className="text-[11px] font-bold tracking-[0.3em] text-f1-red">
            {t.pages.grandPrixKicker}
          </p>
          <h1 className="mt-1 text-3xl font-black tracking-tight text-white sm:text-4xl">
            {t.pages.grandPrixTitle}
          </h1>
          <p className="mt-3 max-w-2xl leading-relaxed text-muted">
            {t.pages.grandPrixBody}
          </p>
        </div>
      </section>

      {/* Calendar band */}
      <section className="border-b border-white/10 bg-black/30">
        <div className="mx-auto w-full max-w-7xl space-y-4 px-4 py-10 sm:px-6 sm:py-14">
          <div>
            <h2 className="text-2xl font-black text-white">
              {t.pages.grandPrixCalendarTitle}
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-muted">
              {t.pages.grandPrixCalendarSub}
            </p>
          </div>
          {today ? (
            <SeasonCalendar todayStr={today} />
          ) : (
            <div className="h-64 animate-pulse rounded-2xl border border-white/10 bg-carbon-2" />
          )}
        </div>
      </section>

      {/* Weekend format band */}
      <section>
        <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
          <WeekendTimeline />
        </div>
      </section>
    </main>
  );
}
