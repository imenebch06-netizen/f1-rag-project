import { getKnowledgeBase, type KnowledgeChunk } from "./knowledge";

export interface ScoredChunk extends KnowledgeChunk {
  score: number;
}

const STOP = new Set([
  "le", "la", "les", "de", "des", "du", "un", "une", "et", "en", "dans",
  "qui", "que", "quoi", "est", "sont", "the", "a", "an", "of", "to", "in",
  "what", "who", "won", "explain", "comment", "pourquoi", "avec", "sur",
]);

function tokens(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/[^a-zàâäéèêëîïôöùûüç0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 2 && !STOP.has(t));
}

/** Lightweight local retriever: token-overlap scoring, no external vector DB. */
export function retrieve(query: string, k = 5): ScoredChunk[] {
  const base = getKnowledgeBase();
  const q = new Set(tokens(query));
  if (q.size === 0 || base.length === 0) return base.slice(0, k).map((c) => ({ ...c, score: 0 }));

  const scored = base.map((c) => {
    const ct = tokens(c.text);
    const hits = ct.filter((t) => q.has(t)).length;
    return { ...c, score: hits / Math.sqrt(ct.length || 1) };
  });

  scored.sort((a, b) => b.score - a.score);
  // Keep at least top-k even when scores are 0 (honest fallback handled by prompt).
  return scored.slice(0, k);
}

export function formatContext(chunks: ScoredChunk[]): string {
  return chunks
    .map((c) => `[source: ${c.source}#${c.index}]\n${c.text}`)
    .join("\n\n");
}
