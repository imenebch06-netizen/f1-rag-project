"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Info, X } from "lucide-react";
import { useLang } from "@/lib/i18n/LanguageContext";
import { cn } from "@/lib/utils";

export function StatsBand() {
  const { t } = useLang();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div>
      <div className="mb-2 flex flex-wrap items-end justify-between gap-2">
        <div>
          <p className="text-[11px] font-bold tracking-[0.3em] text-f1-red">
            {t.home.statsKicker}
          </p>
          <h2 className="mt-1 text-2xl font-black tracking-tight text-white sm:text-3xl">
            {t.home.statsTitle}
          </h2>
        </div>
        <p className="flex items-center gap-1.5 text-xs text-muted">
          <Info className="h-3.5 w-3.5 text-f1-red" />
          {t.home.statsHint}
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {t.stats.map((s, i) => {
          const isOpen = open === i;
          return (
            <div key={s.label}>
              <motion.button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                whileHover={{ y: -3 }}
                className={cn(
                  "card-glow w-full rounded-2xl border bg-carbon-2 p-6 text-left",
                  isOpen ? "border-f1-red/70" : "border-white/10"
                )}
              >
                <p className="font-mono-num text-4xl font-black text-white">
                  {s.value}
                  <span className="text-f1-red">+</span>
                </p>
                <p className="mt-1 flex items-center justify-between text-sm font-bold text-silver">
                  {s.label}
                  {isOpen ? (
                    <X className="h-4 w-4 text-f1-red" />
                  ) : (
                    <Info className="h-4 w-4 text-muted" />
                  )}
                </p>
              </motion.button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="mt-2 rounded-xl border border-f1-red/40 bg-f1-red/10 p-4 text-sm leading-relaxed text-white">
                      {s.detail}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
