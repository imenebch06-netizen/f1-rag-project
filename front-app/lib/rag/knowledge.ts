import fs from "node:fs";
import path from "node:path";

export interface KnowledgeChunk {
  source: string;
  index: number;
  text: string;
}

const KNOWLEDGE_DIR = path.join(process.cwd(), "data", "f1_knowledge");

export function loadKnowledgeFiles(): { source: string; content: string }[] {
  if (!fs.existsSync(KNOWLEDGE_DIR)) return [];
  return fs
    .readdirSync(KNOWLEDGE_DIR)
    .filter((f) => f.endsWith(".md") || f.endsWith(".txt"))
    .sort()
    .map((file) => ({
      source: `f1_knowledge/${file}`,
      content: fs.readFileSync(path.join(KNOWLEDGE_DIR, file), "utf8"),
    }));
}

/** 800 chars / 150 overlap — parity with legacy load_data.py chunking. */
export function chunkText(
  content: string,
  chunkSize = 800,
  overlap = 150
): string[] {
  const clean = content.replace(/\s+/g, " ").trim();
  if (clean.length <= chunkSize) return [clean];
  const chunks: string[] = [];
  let start = 0;
  while (start < clean.length) {
    const end = Math.min(start + chunkSize, clean.length);
    chunks.push(clean.slice(start, end));
    if (end >= clean.length) break;
    start = end - overlap;
  }
  return chunks;
}

let cache: KnowledgeChunk[] | null = null;

export function getKnowledgeBase(): KnowledgeChunk[] {
  if (cache) return cache;
  const files = loadKnowledgeFiles();
  cache = files.flatMap((f) =>
    chunkText(f.content).map((text, index) => ({
      source: f.source,
      index,
      text,
    }))
  );
  return cache;
}
