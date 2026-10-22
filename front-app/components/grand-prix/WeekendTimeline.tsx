"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Wrench, Timer, Trophy, ChevronRight } from "lucide-react";
import { carImageUrl } from "@/lib/media/cloudinary";
import { useLang } from "@/lib/i18n/LanguageContext";

const STEP_ICONS = [Wrench, Timer, Trophy];

const SIDE_IMAGE = {
  remote:
    "https://commons.wikimedia.org/wiki/Special:FilePath/Williams%20FW14B%20(35029084126).jpg?width=1600",
  creditUrl:
    "https://commons.wikimedia.org/wiki/File:Williams_FW14B_(35029084126).jpg",
};

export function WeekendTimeline() {
  const { lang, t } = useLang();
  const steps = t.pages.grandPrixSteps;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
      {/* Steps — numbered vertical timeline */}
      <div className="carbon-texture rounded-2xl border border-white/10 p-6 sm:p-8">
        <p className="text-[11px] font-bold tracking-[0.3em] text-f1-red">
          {t.pages.grandPrixWeekendTitle.toUpperCase()}
        </p>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
          {t.pages.grandPrixWeekendSub}
        </p>

        <ol className="mt-8 space-y-0">
          {steps.map((step, i) => {
            const Icon = STEP_ICONS[i] ?? Wrench;
            const last = i === steps.length - 1;
            return (
              <motion.li
                key={step.day}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
                className="relative flex gap-4 pb-8 last:pb-0 sm:gap-5"
              >
                {/* Rail + node */}
                <div className="flex flex-col items-center">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-f1-red/60 bg-f1-red/10 text-sm font-black text-white">
                    {i + 1}
                  </span>
                  {!last && <span className="mt-2 w-px flex-1 bg-white/10" />}
                </div>

                <div className="min-w-0 flex-1 pb-1">
                  <p className="flex items-center gap-2 text-[11px] font-black tracking-[0.25em] text-f1-red">
                    <Icon className="h-4 w-4" />
                    {step.day.toUpperCase()}
                  </p>
                  <h3 className="mt-1 text-xl font-black text-white">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted">
                    {step.body}
                  </p>
                  <ul className="mt-3 space-y-1.5">
                    {step.sessions.map((s) => (
                      <li
                        key={s}
                        className="flex items-start gap-2 text-sm text-silver"
                      >
                        <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-f1-red" />
                        <span className="leading-relaxed">{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.li>
            );
          })}
        </ol>

        <p className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4 text-xs leading-relaxed text-muted">
          {t.pages.grandPrixSprintNote}
        </p>

        <Link
          href="/#feed"
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-f1-red px-5 py-2.5 text-sm font-black text-white transition-transform hover:scale-[1.03]"
        >
          {t.pages.grandPrixWeekendCta}
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Side image panel */}
      <motion.aside
        initial={{ opacity: 0, x: 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.45 }}
        className="relative min-h-72 overflow-hidden rounded-2xl border border-white/10 lg:sticky lg:top-24 lg:h-fit"
      >
        <div className="relative h-72 w-full lg:h-[560px]">
          <Image
            src={carImageUrl(SIDE_IMAGE.remote, 1200)}
            alt={
              lang === "fr"
                ? "Monoplace de F1 en action à Goodwood"
                : "F1 car in action at Goodwood"
            }
            fill
            sizes="(max-width: 1024px) 100vw, 380px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5">
            <p className="text-lg font-black leading-snug text-white">
              {t.pages.grandPrixImageCaption}
            </p>
            <a
              href={SIDE_IMAGE.creditUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-1 block text-[11px] font-semibold text-white/60 hover:text-f1-red"
            >
              {t.home.photoCredit}: Wikimedia Commons — CC BY-SA (Flickr)
            </a>
          </div>
        </div>
      </motion.aside>
    </div>
  );
}
