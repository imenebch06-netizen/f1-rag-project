"use client";

import { motion } from "framer-motion";
import { Cog, Flag, Zap } from "lucide-react";
import { CATEGORY_META, type NewsCategory } from "@/lib/news";
import { cn } from "@/lib/utils";
import { useLang } from "@/lib/i18n/LanguageContext";

export type FilterValue = "all" | NewsCategory;

const ICONS = { cog: Cog, flag: Flag, zap: Zap } as const;

export function CategoryIcon({
  category,
  className,
}: {
  category: keyof typeof CATEGORY_META;
  className?: string;
}) {
  const Icon = ICONS[CATEGORY_META[category].icon as keyof typeof ICONS];
  return <Icon className={className ?? "h-3.5 w-3.5"} />;
}

export function CategoryFilter({
  value,
  onChange,
  counts,
}: {
  value: FilterValue;
  onChange: (v: FilterValue) => void;
  counts: Record<FilterValue, number>;
}) {
  const { t } = useLang();
  const FILTERS: { value: FilterValue; label: string }[] = [
    { value: "all", label: t.feed.all },
    { value: "technical", label: t.feed.technical },
    { value: "race", label: t.feed.race },
    { value: "rumor", label: t.feed.rumor },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {FILTERS.map((f) => {
        const active = value === f.value;
        return (
          <button
            key={f.value}
            onClick={() => onChange(f.value)}
            className={cn(
              "relative rounded-full border px-4 py-2 text-sm font-bold transition-colors",
              active
                ? "border-f1-red bg-f1-red/15 text-white"
                : "border-white/10 bg-white/5 text-muted hover:text-white"
            )}
          >
            {active && (
              <motion.span
                layoutId="filter-pill"
                className="absolute inset-0 rounded-full border border-f1-red/60"
              />
            )}
            <span className="relative flex items-center gap-1.5">
              {f.value !== "all" && (
                <CategoryIcon
                  category={f.value}
                  className="h-3.5 w-3.5 text-f1-red"
                />
              )}
              {f.label} · {counts[f.value]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
