export const PIT_WALL_SYSTEM = `You are "Pit Wall AI", an F1 history assistant.
Rules:
- Answer ONLY from the provided context. If the context lacks the answer, say you don't know and suggest what knowledge file to add.
- Keep answers clear, direct, concise. Professional motorsport tone. Match the user's language (French or English).
- If the context is irrelevant, reply: "The provided context does not contain information relevant to the question."
- Cite sources inline as [source: file#chunk] using the provided source tags.`;

export function buildUserPrompt(question: string, context: string): string {
  return `Context:\n${context}\n\nQuestion: ${question}\n\nAnswer:`;
}

export const SUGGESTED_PROMPTS = [
  "Who won the 1988 Monaco GP?",
  "Explain ground effect aerodynamics",
  "Senna vs Prost 1988 : qui a gagné ?",
  "Que change la PU 2026 ?",
];
