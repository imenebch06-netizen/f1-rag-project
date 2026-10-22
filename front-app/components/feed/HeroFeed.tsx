"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { NewsItem } from "@/lib/news";
import { newsExcerpt, newsTitle } from "@/lib/news";
import { CategoryFilter, type FilterValue } from "./CategoryFilter";
import { NewsCard } from "./NewsCard";
import { useLang } from "@/lib/i18n/LanguageContext";

export function HeroFeed({ items }: { items: NewsItem[] }) {
  const { lang, t } = useLang();
  const [filter, setFilter] = useState<FilterValue>("all");

  const counts = useMemo(() => {
    return {
      all: items.length,
      technical: items.filter((i) => i.category === "technical").length,
      race: items.filter((i) => i.category === "race").length,
      rumor: items.filter((i) => i.category === "rumor").length,
    };
  }, [items]);

  const filtered =
    filter === "all" ? items : items.filter((i) => i.category === filter);
  const [hero, ...rest] = filtered;

  return (
    <div className="space-y-6">
      <CategoryFilter value={filter} onChange={setFilter} counts={counts} />

      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="space-y-6"
        >
          {hero && (
            <motion.article
              whileHover={{ scale: 1.005 }}
              className="card-glow carbon-texture overflow-hidden rounded-2xl border border-f1-red/30 p-6 sm:p-8"
            >
              <p className="text-[11px] font-bold tracking-[0.3em] text-f1-red">
                {t.feed.heroTag}
              </p>
              <h2 className="mt-2 max-w-3xl text-2xl font-black leading-tight text-white sm:text-4xl">
                {newsTitle(hero, lang)}
              </h2>
              <p className="mt-3 max-w-2xl text-muted">{newsExcerpt(hero, lang)}</p>
              <p className="mt-4 font-mono-num text-xs font-bold tracking-widest text-silver">
                {hero.telemetry} — {hero.author}
              </p>
            </motion.article>
          )}

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {rest.map((item, i) => (
              <NewsCard key={item.id} item={item} index={i} />
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="rounded-xl border border-white/10 p-8 text-center text-muted">
              {t.feed.empty}
            </p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
