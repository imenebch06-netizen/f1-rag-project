import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Ticker } from "@/components/layout/Ticker";
import { Footer } from "@/components/layout/Footer";
import { PitWallPanel } from "@/components/ai/PitWallPanel";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { ThemeProvider, THEME_INIT_SCRIPT } from "@/lib/theme/ThemeContext";

export const metadata: Metadata = {
  title: "Pit Wall OS — F1 News & History AI",
  description:
    "Futuristic Formula 1 platform: live feed, telemetry ticker, and Pit Wall AI history assistant.",
};

export default function RootLayout(props: LayoutProps<"/">) {
  return (
    <html lang="fr" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="flex min-h-full flex-col bg-carbon text-offwhite">
        <ThemeProvider>
          <LanguageProvider>
            <Ticker />
            <Header />
            <div className="flex flex-1 flex-col">{props.children}</div>
            <PitWallPanel />
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
