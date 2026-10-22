import type { Lang } from "./i18n/dictionaries";

export type NewsCategory = "technical" | "race" | "rumor";

export interface NewsItem {
  id: string;
  slug: string;
  /** Canonical text, in `sourceLang`. */
  title: string;
  excerpt: string;
  /** English variants — filled from the EN wiki/article when importing. */
  titleEn?: string;
  excerptEn?: string;
  /** Language the item was originally written/imported in. */
  sourceLang?: "fr" | "en";
  category: NewsCategory;
  tags: string[];
  telemetry: string;
  publishedAt: string;
  author: string;
  readMinutes: number;
}

/** Icon keys resolved to lucide components in the UI layer. */
export const CATEGORY_META: Record<NewsCategory, { icon: string }> = {
  technical: { icon: "cog" },
  race: { icon: "flag" },
  rumor: { icon: "zap" },
};

/**
 * Localized accessors for imported content (e.g. wiki articles).
 * Convention: `title`/`excerpt` hold the source-language text, `titleEn`/
 * `excerptEn` the English version. Missing variant → graceful fallback.
 */
export function newsTitle(item: NewsItem, lang: Lang): string {
  if (lang === "en" && item.titleEn) return item.titleEn;
  return item.title;
}

export function newsExcerpt(item: NewsItem, lang: Lang): string {
  if (lang === "en" && item.excerptEn) return item.excerptEn;
  return item.excerpt;
}

/** True when we show the source-language text (no translation available). */
export function isFallbackLang(item: NewsItem, lang: Lang): boolean {
  if (lang === "en") return !item.titleEn && (item.sourceLang ?? "fr") === "fr";
  return false;
}
