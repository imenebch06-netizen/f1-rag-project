"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Zap, Wind, Trophy, CalendarDays, ExternalLink } from "lucide-react";
import { getCarOfTheDay, getWeekCars, type SpecKey } from "@/lib/cars";
import { carImageUrl } from "@/lib/media/cloudinary";
import { useLang } from "@/lib/i18n/LanguageContext";
import { cn } from "@/lib/utils";

const SPEC_ICONS: Record<SpecKey, typeof Zap> = {
  power: Zap,
  grip: Wind,
  legacy: Trophy,
};

const SPEC_LABEL_KEYS = {
  power: "specPower",
  grip: "specGrip",
  legacy: "specLegacy",
} as const;

export function CarOfTheDay({ dateStr }: { dateStr: string }) {
  const { lang, t } = useLang();
  const date = new Date(dateStr);
  const { car } = getCarOfTheDay(date);
  const week = getWeekCars(date);

  const formatted = date.toLocaleDateString(lang === "fr" ? "fr-FR" : "en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <section className="space-y-4">
      {/* Split hero — dark editorial panel + light image panel */}
      <div className="grid overflow-hidden rounded-2xl border border-white/10 lg:grid-cols-2">
        {/* Left: dark */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="carbon-texture keep-dark flex flex-col justify-center p-6 sm:p-10"
        >
          <p className="text-[11px] font-bold tracking-[0.3em] text-f1-red">
            {t.home.carKicker}
          </p>
          <p className="mt-2 flex items-center gap-2 font-mono-num text-xs tracking-widest text-muted">
            <CalendarDays className="h-4 w-4" />
            {formatted}
          </p>
          <h2 className="mt-3 text-3xl font-black leading-tight text-white sm:text-5xl">
            {car.name}
          </h2>
          <p className="mt-2 text-sm font-bold tracking-widest text-silver">
            {car.team} — {car.year} · {car.driver}
          </p>
          <p className="mt-4 max-w-md leading-relaxed text-muted">
            {car.tagline[lang]}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-f1-red px-4 py-2 font-mono-num text-xs font-black tracking-widest text-white">
              {car.stat[lang]}
            </span>
            <Link
              href="/technique-data"
              className="rounded-full border border-white/20 px-4 py-2 text-sm font-bold text-white transition-colors hover:border-f1-red hover:text-f1-red"
            >
              {t.home.carCta}
            </Link>
          </div>
        </motion.div>

        {/* Right: light panel, car + spec sheet */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col bg-offwhite text-carbon"
        >
          <div className="relative h-64 w-full sm:h-80">
            <Image
              src={carImageUrl(car.image.remote, 1600)}
              alt={car.image.alt[lang]}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <span className="absolute left-4 top-4 rounded-full bg-carbon/85 px-3 py-1 text-[11px] font-black tracking-widest text-white">
              {car.year} — {car.team.toUpperCase()}
            </span>
          </div>
          <div className="grid flex-1 gap-px bg-black/10 sm:grid-cols-3">
            {car.specs.map((spec) => {
              const Icon = SPEC_ICONS[spec.key];
              return (
                <div key={spec.key} className="bg-offwhite p-4">
                  <p className="flex items-center gap-1.5 text-[11px] font-black tracking-[0.2em] text-f1-red">
                    <Icon className="h-4 w-4" />
                    {t.home[SPEC_LABEL_KEYS[spec.key]].toUpperCase()}
                  </p>
                  <p className="mt-1.5 text-sm font-extrabold">{spec.value}</p>
                  <p className="mt-1 text-xs leading-relaxed text-black/60">
                    {spec.text[lang]}
                  </p>
                </div>
              );
            })}
          </div>
          <a
            href={car.image.creditUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 border-t border-black/10 px-4 py-2 text-[11px] font-semibold text-black/50 hover:text-f1-red"
          >
            {t.home.photoCredit}: {car.image.credit}
            <ExternalLink className="h-3 w-3" />
          </a>
        </motion.div>
      </div>

      {/* Week strip */}
      <div className="rounded-2xl border border-white/10 bg-carbon-2 p-4">
        <p className="mb-3 text-[11px] font-bold tracking-[0.3em] text-silver">
          {t.home.weekTitle.toUpperCase()}
        </p>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
          {week.map(({ car: c, isToday }) => (
            <div
              key={c.id}
              className={cn(
                "relative overflow-hidden rounded-lg border",
                isToday
                  ? "border-f1-red shadow-[0_0_20px_-4px_rgba(225,6,0,0.7)]"
                  : "border-white/10 opacity-60"
              )}
            >
              <div className="relative h-16 w-full sm:h-20">
                <Image
                  src={carImageUrl(c.image.remote, 400)}
                  alt={c.image.alt[lang]}
                  fill
                  sizes="15vw"
                  className="object-cover"
                />
              </div>
              <p className="truncate bg-black/60 px-1.5 py-1 text-center text-[10px] font-bold text-white">
                {isToday ? `${t.home.today} · ` : ""}
                {c.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
