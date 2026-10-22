"use client";

import { motion } from "framer-motion";
import { Clock, Gauge } from "lucide-react";
import type { NewsItem } from "@/lib/news";
import { newsExcerpt, newsTitle, isFallbackLang } from "@/lib/news";
import { cn } from "@/lib/utils";
import { useLang } from "@/lib/i18n/LanguageContext";
import { CategoryIcon } from "./CategoryFilter";

export function NewsCard({ item, index }: { item: NewsItem; index: number }) {
  const { lang, t } = useLang();
  const fallback = isFallbackLang(item, lang);
  const label =
    item.category === "technical"
      ? t.feed.technical
      : item.category === "race"
        ? t.feed.race
        : t.feed.rumor;
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: (index % 3) * 0.07 }}
      whileHover={{ y: -4, rotateX: 1.5 }}
      className="card-glow group flex flex-col overflow-hidden rounded-xl border border-white/10 bg-carbon-2"
    >
      <div className="carbon-texture flex items-center justify-between border-b border-white/5 px-4 py-2">
        <span className="flex items-center gap-1.5 text-[11px] font-bold tracking-[0.2em] text-silver">
          <CategoryIcon category={item.category} />
          {label.toUpperCase()}
        </span>
        <span className="flex items-center gap-1 font-mono-num text-[11px] font-bold text-f1-red">
          <Gauge className="h-3.5 w-3.5" />
          {item.telemetry}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-extrabold leading-snug text-white transition-colors group-hover:text-f1-red">
          {newsTitle(item, lang)}
        </h3>
        {fallback && (
          <p className="mt-1 text-[11px] font-semibold italic text-muted">
            {t.feed.originalIn}
          </p>
        )}
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
          {newsExcerpt(item, lang)}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {item.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] font-semibold text-silver"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3 text-xs text-muted">
          <span>{item.author}</span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {item.readMinutes} {t.feed.minRead} —{" "}
            {new Date(item.publishedAt).toLocaleDateString(
              lang === "fr" ? "fr-FR" : "en-US",
              {
                day: "numeric",
                month: "short",
              }
            )}
          </span>
        </div>
      </div>
      <div
        className={cn(
          "h-[3px] w-full origin-left scale-x-0 bg-f1-red transition-transform duration-300",
          "group-hover:scale-x-100"
        )}
      />
    </motion.article>
  );
}
