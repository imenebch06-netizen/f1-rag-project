const ITEMS = [
  "Q3 COUNTDOWN — 02:14:33",
  "VERSTAPPEN S1 PURPLE — 27.412",
  "FASTEST LAP: NORRIS 1:29.841 (SOFT)",
  "TRACK TEMP 41°C — WIND 12 KM/H",
  "DRS ENABLED — ZONE T1 + T3",
  "PIT WINDOW LAP 14–19 (MEDIUM → HARD)",
  "HAMILTON GAP +0.382 — PUSHING",
  "TELEMETRY: ERS DEPLOY 98% — T4 EXIT",
];

export function Ticker() {
  const loop = [...ITEMS, ...ITEMS];
  return (
    <div className="ticker-mask overflow-hidden border-b border-f1-red/30 bg-black">
      <div className="flex w-max animate-ticker items-center gap-8 whitespace-nowrap px-4 py-2">
        {loop.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-8 text-[11px] font-bold tracking-[0.2em] text-silver"
          >
            <span className="text-f1-red">///</span>
            {item}
          </span>
        ))}
      </div>
      <div className="carbon-stripe h-[3px] w-full opacity-70" />
    </div>
  );
}
