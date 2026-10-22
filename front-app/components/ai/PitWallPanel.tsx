"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Send, Square, X, Wrench } from "lucide-react";
import { useLang } from "@/lib/i18n/LanguageContext";

interface Msg {
  role: "user" | "assistant";
  content: string;
  sources?: string[];
}

async function streamChat(
  history: Msg[],
  onToken: (t: string) => void
): Promise<string[]> {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: history.map((m) => ({ role: m.role, content: m.content })),
    }),
  });
  if (!res.ok || !res.body) throw new Error(`Chat API ${res.status}`);
  const sourcesHeader = res.headers.get("x-pitwall-sources");
  const sources: string[] = sourcesHeader ? JSON.parse(sourcesHeader) : [];
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    onToken(decoder.decode(value, { stream: true }));
  }
  return sources;
}

export function PitWallPanel() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const abortRef = useRef(false);

  const send = async (text: string) => {
    const q = text.trim();
    if (!q || loading) return;
    abortRef.current = false;
    const history: Msg[] = [...messages, { role: "user", content: q }];
    setMessages(history);
    setInput("");
    setLoading(true);
    setMessages([...history, { role: "assistant", content: "" }]);

    try {
      const sources = await streamChat(history, (token) => {
        if (abortRef.current) return;
        setMessages((prev) => {
          const next = [...prev];
          next[next.length - 1] = {
            role: "assistant",
            content: next[next.length - 1].content + token,
          };
          return next;
        });
      });
      setMessages((prev) => {
        const next = [...prev];
        next[next.length - 1] = { ...next[next.length - 1], sources };
        return next;
      });
    } catch {
      setMessages((prev) => {
        const next = [...prev];
        next[next.length - 1] = {
          role: "assistant",
          content: t.ai.error,
        };
        return next;
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-f1-red px-5 py-3 text-sm font-black tracking-wide text-white shadow-[0_8px_40px_-8px_rgba(225,6,0,0.8)] transition-transform hover:scale-105"
      >
        <Bot className="h-5 w-5" />
        PIT WALL AI
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-f1-red/30 bg-carbon"
            >
              <div className="flex items-center justify-between border-b border-white/10 p-4">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-md bg-f1-red text-white">
                    <Wrench className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-black text-white">{t.ai.title}</p>
                    <p className="text-[11px] tracking-widest text-muted">
                      {t.ai.subtitle}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-md border border-white/10 p-1.5 text-muted hover:text-white"
                  aria-label={t.ai.close}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="thin-scroll flex-1 space-y-3 overflow-y-auto p-4">
                {messages.length === 0 && (
                  <div className="space-y-3">
                    <p className="rounded-xl border border-white/10 bg-carbon-2 p-4 text-sm text-muted">
                      {t.ai.welcome}{" "}
                      <code className="text-silver">data/f1_knowledge</code>.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {t.ai.prompts.map((p) => (
                        <button
                          key={p}
                          onClick={() => send(p)}
                          className="rounded-full border border-f1-red/40 bg-f1-red/10 px-3 py-1.5 text-xs font-semibold text-white hover:bg-f1-red/20"
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={
                      m.role === "user"
                        ? "ml-8 rounded-xl rounded-br-sm bg-f1-red p-3 text-sm font-semibold text-white"
                        : "mr-4 rounded-xl rounded-bl-sm border border-white/10 bg-carbon-2 p-3 text-sm leading-relaxed text-offwhite"
                    }
                  >
                    <p className="whitespace-pre-wrap">{m.content || "…"}</p>
                    {m.sources && m.sources.length > 0 && (
                      <p className="mt-2 border-t border-white/10 pt-1.5 font-mono-num text-[10px] tracking-wide text-muted">
                        {t.ai.sources}: {m.sources.join(" · ")}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send(input);
                }}
                className="flex gap-2 border-t border-white/10 p-3"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t.ai.placeholder}
                  className="flex-1 rounded-lg border border-white/10 bg-carbon-2 px-3 py-2.5 text-sm text-white outline-none placeholder:text-muted focus:border-f1-red"
                />
                {loading ? (
                  <button
                    type="button"
                    onClick={() => (abortRef.current = true)}
                    className="rounded-lg border border-white/10 p-2.5 text-white"
                    aria-label={t.ai.stop}
                  >
                    <Square className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="rounded-lg bg-f1-red p-2.5 text-white hover:bg-f1-red-dark"
                    aria-label={t.ai.send}
                  >
                    <Send className="h-4 w-4" />
                  </button>
                )}
              </form>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
