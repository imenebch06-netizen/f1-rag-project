import { streamText } from "ai";
import { ollama } from "ollama-ai-provider-v2";
import { retrieve, formatContext } from "@/lib/rag/retriever";
import { PIT_WALL_SYSTEM, buildUserPrompt } from "@/lib/rag/prompt";

interface IncomingMessage {
  role: string;
  content?: string;
  parts?: { type: string; text?: string }[];
}

function lastQuestion(messages: IncomingMessage[]): string {
  for (let i = messages.length - 1; i >= 0; i--) {
    const m = messages[i];
    if (m.role !== "user") continue;
    if (m.content) return m.content;
    const text = (m.parts ?? [])
      .filter((p) => p.type === "text")
      .map((p) => p.text ?? "")
      .join(" ");
    if (text.trim()) return text;
  }
  return "";
}

function extractiveFallback(question: string): string {
  const chunks = retrieve(question, 3);
  if (chunks.length === 0 || chunks[0].score === 0) {
    return `Je ne trouve pas d'information pertinente dans data/f1_knowledge pour : « ${question} ».\n\nAjoutez un fichier .md couvrant le sujet, ou essayez : "Who won the 1988 Monaco GP?" / "Explain ground effect aerodynamics".`;
  }
  const body = chunks
    .map((c) => `${c.text}\n[source: ${c.source}#${c.index}]`)
    .join("\n\n---\n\n");
  return `Réponse extraite du knowledge base (mode local, Ollama indisponible) :\n\n${body}`;
}

function plainStream(text: string, sources: string[]): Response {
  const stream = new ReadableStream({
    start(c) {
      c.enqueue(new TextEncoder().encode(text));
      c.close();
    },
  });
  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "x-pitwall-sources": JSON.stringify(sources),
    },
  });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const messages: IncomingMessage[] = body.messages ?? [];
  const question =
    body.question ?? lastQuestion(messages) ?? "Who won the 1988 Monaco GP?";

  const chunks = retrieve(question, 5);
  const context = formatContext(chunks);
  const sources = chunks.map((c) => `${c.source}#${c.index}`);

  // If Ollama isn't reachable, serve the extractive answer directly so the
  // UI works without a local model server.
  try {
    const probe = await fetch("http://localhost:11434/api/tags", {
      signal: AbortSignal.timeout(1500),
    });
    if (!probe.ok) return plainStream(extractiveFallback(question), sources);
  } catch {
    return plainStream(extractiveFallback(question), sources);
  }

  try {
    const result = streamText({
      model: ollama("llama3.2"),
      system: PIT_WALL_SYSTEM,
      prompt: buildUserPrompt(question, context),
      temperature: 0,
    });
    const res = result.toTextStreamResponse();
    res.headers.set("x-pitwall-sources", JSON.stringify(sources));
    return res;
  } catch {
    return plainStream(extractiveFallback(question), sources);
  }
}
