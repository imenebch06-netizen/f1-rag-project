"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, X, Sun, Moon, Languages } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useLang } from "@/lib/i18n/LanguageContext";
import { useTheme } from "@/lib/theme/ThemeContext";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { lang, t, toggleLang } = useLang();
  const { theme, toggleTheme } = useTheme();

  const TABS = [
    { label: t.nav.feed, href: "/" },
    { label: t.nav.grandPrix, href: "/grand-prix" },
    { label: t.nav.teams, href: "/ecuries-pilotes" },
    { label: t.nav.tech, href: "/technique-data" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-carbon/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.svg"
            alt="F1 Blog logo"
            width={80}
            height={50}
            priority
            className="h-10 w-auto rounded-md"
          />
          <span className="leading-tight">
            <span className="block text-lg font-black tracking-tight text-white">
              {t.brand.nameA} <span className="text-f1-red">{t.brand.nameB}</span>
            </span>
            <span className="block max-w-[230px] text-[10px] font-semibold leading-snug text-muted">
              {t.brand.tagline}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {TABS.map((tab) => {
            const active =
              tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  "relative rounded-md px-4 py-2 text-sm font-semibold tracking-wide transition-colors",
                  active ? "text-white" : "text-muted hover:text-white"
                )}
              >
                {tab.label}
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-2 -bottom-[13px] h-[3px] rounded-full bg-f1-red"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <span className="hidden items-center gap-2 rounded-full border border-f1-red/40 bg-f1-red/10 px-3 py-1 text-xs font-bold tracking-widest text-white sm:flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-f1-red opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-f1-red" />
            </span>
            {t.header.liveSeason}
          </span>

          {/* Language toggle */}
          <button
            onClick={toggleLang}
            title={t.header.langLabel}
            aria-label={t.header.langLabel}
            className="flex items-center gap-1.5 rounded-md border border-white/10 px-2.5 py-1.5 text-xs font-black tracking-wider text-white transition-colors hover:border-f1-red/60"
          >
            <Languages className="h-4 w-4 text-f1-red" />
            {lang.toUpperCase()}
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            title={theme === "dark" ? t.header.themeDark : t.header.themeLight}
            aria-label={
              theme === "dark" ? t.header.themeDark : t.header.themeLight
            }
            className="rounded-md border border-white/10 p-2 text-white transition-colors hover:border-f1-red/60"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>

          <button
            onClick={() => setOpen((v) => !v)}
            className="rounded-md border border-white/10 p-2 text-white lg:hidden"
            aria-label={open ? t.header.closeMenu : t.header.menu}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-white/10 px-4 py-2 lg:hidden">
          {TABS.map((tab) => (
            <Link
              key={tab.href}
              href={tab.href}
              onClick={() => setOpen(false)}
              className={cn(
                "block rounded-md px-3 py-2.5 text-sm font-semibold",
                pathname === tab.href ? "bg-f1-red/15 text-white" : "text-muted"
              )}
            >
              {tab.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
