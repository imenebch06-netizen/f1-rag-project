"use client";

import { useCallback, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { useLang } from "@/lib/i18n/LanguageContext";

const TOTAL = 6400; // ms, keep in sync with --f1h-total

const rand = (a: number, b: number) => a + Math.random() * (b - a);

function CarSvg() {
  return (
    <svg
      className="f1h-car-svg"
      viewBox="0 0 640 230"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="f1h-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ff4d78" />
          <stop offset=".35" stopColor="#e00038" />
          <stop offset=".75" stopColor="#9a0026" />
          <stop offset="1" stopColor="#4a0012" />
        </linearGradient>
        <linearGradient id="f1h-sheen" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset=".5" stopColor="#fff" stopOpacity=".55" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="f1h-carbon" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2b2e3b" />
          <stop offset="1" stopColor="#0a0b10" />
        </linearGradient>
        <radialGradient id="f1h-tire" cx=".5" cy=".5" r=".5">
          <stop offset=".62" stopColor="#14151c" />
          <stop offset="1" stopColor="#050508" />
        </radialGradient>
        <filter id="f1h-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <g id="f1h-wheel">
          <circle r="1" fill="url(#f1h-tire)" />
          <g className="f1h-spin">
            <circle r=".62" fill="#1b1d27" />
            <g stroke="#c9ccd8" strokeWidth=".07" strokeLinecap="round">
              <line x1="0" y1="-.55" x2="0" y2=".55" />
              <line x1="-.55" y1="0" x2=".55" y2="0" />
              <line x1="-.39" y1="-.39" x2=".39" y2=".39" />
              <line x1="-.39" y1=".39" x2=".39" y2="-.39" />
            </g>
            <circle r=".16" fill="var(--f1h-red)" />
          </g>
          <circle r=".62" fill="none" stroke="var(--f1h-red)" strokeWidth=".05" opacity=".8" />
          <circle r=".96" fill="none" stroke="#2a2d3b" strokeWidth=".04" />
        </g>
      </defs>

      <g opacity=".8" filter="brightness(.55)">
        <use href="#f1h-wheel" transform="translate(132 150) scale(30)" />
        <use href="#f1h-wheel" transform="translate(520 142) scale(36)" />
      </g>

      <g className="f1h-body-idle">
        <polygon points="548,60 604,52 606,70 552,80" fill="#5a0014" />
        <rect x="598" y="50" width="10" height="92" rx="2" fill="url(#f1h-carbon)" />
        <polygon points="534,92 600,82 600,92 536,102" fill="url(#f1h-body)" />
        <polygon points="540,106 600,98 600,105 541,113" fill="#8c0026" />
        <rect x="560" y="112" width="8" height="38" fill="#0a0b10" />
        <path d="M60 176 L560 168 L575 180 L48 188 Z" fill="#07080c" />
        <path d="M70 186 L560 178 L568 182 L66 190 Z" fill="var(--f1h-red)" filter="url(#f1h-glow)" opacity=".9" />
        <path d="M22 168 L130 158 C175 154 205 138 245 116 C275 100 305 96 345 96 L425 100 C475 102 525 114 562 132 L590 140 L590 168 L520 178 L90 180 Z" fill="url(#f1h-body)" />
        <path d="M130 158 C175 154 205 138 245 116 C275 100 305 96 345 96 L425 100 C470 102 510 110 540 122 C500 114 450 112 405 114 C350 116 320 122 285 138 C240 158 190 164 130 160 Z" fill="url(#f1h-sheen)" opacity=".7" />
        <path d="M300 150 C360 130 440 128 520 142 L520 172 C440 176 360 172 300 168 Z" fill="#6b001c" opacity=".75" />
        <path d="M120 160 L520 146 L520 152 L120 166 Z" fill="#fff" opacity=".9" />
        <path d="M120 168 L520 154 L520 157 L120 171 Z" fill="#111" />
        <path d="M400 100 L520 120 L540 126 L430 112 Z" fill="#5a0014" />
        <path d="M385 98 C395 70 420 66 445 70 C442 82 440 92 436 100 Z" fill="#1a0007" />
        <ellipse cx="418" cy="82" rx="9" ry="11" fill="#000" />
        <ellipse cx="320" cy="104" rx="40" ry="11" fill="#07080c" />
        <circle cx="318" cy="98" r="11" fill="#ffd400" />
        <path d="M309 97 L325 97 L324 102 L309 102 Z" fill="#06070b" />
        <path d="M288 112 C298 82 322 74 356 82" fill="none" stroke="#2a2d3b" strokeWidth="6" strokeLinecap="round" />
        <path d="M356 82 L372 104" stroke="#2a2d3b" strokeWidth="5" strokeLinecap="round" />
        <path d="M288 112 C298 82 322 74 356 82" fill="none" stroke="#9aa0b8" strokeWidth="1.5" strokeLinecap="round" opacity=".6" />
        <path d="M22 168 L40 162 L130 158 L130 170 L30 176 Z" fill="#b0002d" />
        <path d="M6 178 L140 168 L146 176 L12 188 Z" fill="url(#f1h-carbon)" />
        <path d="M14 172 L132 163 L134 168 L16 177 Z" fill="var(--f1h-red)" />
        <rect x="2" y="150" width="12" height="44" rx="3" fill="url(#f1h-body)" stroke="#2a0008" strokeWidth="1" />
        <g stroke="#3a3d4d" strokeWidth="3" strokeLinecap="round">
          <line x1="132" y1="152" x2="190" y2="164" />
          <line x1="132" y1="160" x2="190" y2="172" />
          <line x1="500" y1="146" x2="462" y2="162" />
          <line x1="500" y1="154" x2="462" y2="170" />
        </g>
        <circle className="f1h-brake" cx="590" cy="136" r="5" fill="#ff1d1d" filter="url(#f1h-glow)" />
      </g>

      <use href="#f1h-wheel" transform="translate(120 158) scale(33)" />
      <use href="#f1h-wheel" transform="translate(508 150) scale(40)" />
    </svg>
  );
}

export function F1HeroIntro() {
  const { t } = useLang();
  const stageRef = useRef<HTMLDivElement>(null);
  const fxRef = useRef<HTMLDivElement>(null);
  const streaksRef = useRef<HTMLDivElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const play = useCallback(() => {
    const stage = stageRef.current;
    const fx = fxRef.current;
    const streaks = streaksRef.current;
    if (!stage || !fx || !streaks) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    timers.current.forEach(clearTimeout);
    timers.current = [];
    fx.innerHTML = "";
    streaks.innerHTML = "";

    stage.querySelectorAll("*").forEach((el) => {
      const h = el as HTMLElement;
      h.style.animation = "none";
      void h.offsetWidth;
      h.style.animation = "";
    });

    const puff = () => {
      const s = document.createElement("div");
      s.className = "f1h-smoke";
      s.style.setProperty("--dx", rand(60, 220) + "px");
      s.style.setProperty("--dy", rand(-120, -40) + "px");
      s.style.setProperty("--dz", rand(-200, 80) + "px");
      fx.appendChild(s);
      timers.current.push(setTimeout(() => s.remove(), 2300));
    };
    const spark = () => {
      const s = document.createElement("div");
      s.className = "f1h-spark";
      s.style.setProperty("--sx", rand(40, 200) + "px");
      s.style.setProperty("--sy", rand(-90, 10) + "px");
      fx.appendChild(s);
      timers.current.push(setTimeout(() => s.remove(), 800));
    };
    const streak = () => {
      const s = document.createElement("div");
      s.className = "f1h-streak";
      s.style.top = rand(30, 80) + "%";
      s.style.width = rand(25, 55) + "vw";
      s.style.animationDuration = rand(0.3, 0.6) + "s";
      streaks.appendChild(s);
      timers.current.push(setTimeout(() => s.remove(), 700));
    };

    for (let ms = 200; ms < TOTAL * 0.4; ms += 120)
      timers.current.push(setTimeout(streak, ms));
    for (let ms = TOTAL * 0.42; ms < TOTAL * 0.76; ms += 90) {
      timers.current.push(setTimeout(puff, ms));
      if (Math.random() > 0.4)
        timers.current.push(setTimeout(spark, ms + rand(0, 60)));
    }
    for (let ms = TOTAL * 0.76; ms < TOTAL * 0.9; ms += 220)
      timers.current.push(setTimeout(puff, ms));
  }, []);

  useEffect(() => {
    play();
    return () => timers.current.forEach(clearTimeout);
  }, [play]);

  const scrollToCar = () => {
    document.getElementById("car-of-day")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      ref={stageRef}
      className="f1h-stage"
      title="Click to replay"
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("[data-scroll]")) return;
        play();
      }}
    >
      <div className="f1h-horizon" />
      <div className="f1h-floor-wrap">
        <div className="f1h-floor" />
        <svg className="f1h-marks" viewBox="0 0 1000 600" preserveAspectRatio="none">
          <path className="f1h-mark" d="M 760 20 C 650 120, 560 150, 470 330 S 380 520, 330 590" />
          <path className="f1h-mark f1h-mark-b" d="M 800 20 C 690 125, 600 160, 515 335 S 430 525, 375 590" />
        </svg>
      </div>
      <div ref={streaksRef} className="f1h-streaks" />

      <div className="f1h-car-rig">
        <div className="f1h-shadow" />
        <CarSvg />
        <div ref={fxRef} className="f1h-fx" />
      </div>

      {/* Left title panel — click scrolls to Car of the Day */}
      <button
        type="button"
        data-scroll
        onClick={scrollToCar}
        className="group absolute left-4 right-4 top-8 max-w-xl cursor-pointer text-left sm:left-10 sm:right-auto sm:top-1/2 sm:-translate-y-1/2"
      >
        <span className="absolute -inset-4 -z-10 rounded-2xl bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <span className="block text-[11px] font-bold tracking-[0.3em] text-f1-red">
          {t.home.heroKicker}
        </span>
        <span className="mt-2 block text-4xl font-black italic leading-none tracking-tight text-white sm:text-6xl">
          {t.home.heroTitleA}{" "}
          <span className="text-f1-red">{t.home.heroTitleB}</span>
        </span>
        <span className="mt-3 block max-w-md text-sm leading-relaxed text-white/70">
          {t.home.heroSub}
        </span>
        <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-f1-red px-6 py-3 text-sm font-black tracking-wide text-white shadow-[0_8px_40px_-8px_rgba(255,10,69,0.8)] transition-transform group-hover:scale-105">
          {t.home.heroCta}
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </span>
      </button>

      <div className="f1h-hint">{t.home.heroHint}</div>
    </div>
  );
}
