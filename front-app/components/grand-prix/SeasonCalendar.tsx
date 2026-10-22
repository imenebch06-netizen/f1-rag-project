"use client";

import { motion } from "framer-motion";
import { MapPin, Flag } from "lucide-react";
import { GRANDS_PRIX, gpStatus } from "@/lib/grands-prix";
import { useLang } from "@/lib/i18n/LanguageContext";
import { cn } from "@/lib/utils";

export function SeasonCalendar({ todayStr }: { todayStr: string }) {
  const { lang, t } = useLang();
  const now = new Date(todayStr);

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10">
      {GRANDS_PRIX.map((gp, i) => {
        const status = gpStatus(gp.date, now);
        const date = new Date(`${gp.date}T12:00:00`).toLocaleDateString(
          lang === "fr" ? "fr-FR" : "en-US",
          { day: "numeric", month: "short" }
        );
        return (
          <motion.div
            key={gp.id}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.3, delay: Math.min(i * 0.03, 0.3) }}
            className={cn(
              "flex items-center gap-3 border-b border-white/5 bg-carbon-2 px-4 py-3.5 last:border-b-0 sm:gap-4 sm:px-5",
              status === "next" && "bg-f1-red/[0.08]"
            )}
          >
            <span
              className={cn(
                "flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-lg font-mono-num",
                status === "next"
                  ? "bg-f1-red text-white"
                  : "bg-white/5 text-silver"
              )}
            >
              <span className="text-[9px] font-bold tracking-widest opacity-80">
                R{gp.round}
              </span>
              <span className="text-sm font-black">{gp.round}</span>
            </span>

            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-1.5 truncate text-sm font-extrabold text-white sm:text-base">
                {status === "next" && (
                  <Flag className="h-4 w-4 shrink-0 text-f1-red" />
                )}
                {gp.name}
              </p>
              <p className="flex items-center gap-1 truncate text-xs text-muted">
                <MapPin className="h-3 w-3 shrink-0" />
                {gp.circuit} — {gp.country[lang]}
              </p>
            </div>

            <span className="hidden font-mono-num text-xs font-bold tracking-widest text-silver sm:block">
              {date.toUpperCase()}
            </span>

            {status === "next" ? (
              <span className="shrink-0 rounded-full bg-f1-red px-3 py-1 text-[11px] font-black tracking-widest text-white">
                {t.pages.grandPrixNext.toUpperCase()}
              </span>
            ) : status === "done" ? (
              <span className="shrink-0 rounded-full border border-white/10 px-3 py-1 text-[11px] font-bold tracking-widest text-muted">
                {t.pages.grandPrixDone.toUpperCase()}
              </span>
            ) : (
              <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono-num text-[11px] font-bold tracking-widest text-silver sm:hidden">
                {date.toUpperCase()}
              </span>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
