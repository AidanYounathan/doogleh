"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const VERDICTS = [
  "Doogleh. Straight up.",
  "That's doogleh and everyone at the table knew it.",
  "Doogleh detected in under 4 milliseconds.",
  "Big doogleh. Historic doogleh.",
  "Doogleh. Your own mother wouldn't cosign this.",
  "This is doogleh wearing a nice jacket.",
  "Doogleh. Not even a creative one.",
  "Certified doogleh. Frame it.",
  "Doogleh with a side of doogleh.",
  "The doogleh is coming from inside the house.",
  "Doogleh. We ran it twice to be polite.",
  "That's the most confident doogleh we've processed today.",
];

const NOTES = [
  "Cross-referenced against 0 databases.",
  "Peer reviewed by three uncles.",
  "Confidence interval: vibes.",
  "Sample size: everyone who has ever met you.",
  "Verified by the Doogleh Institute, which we made up.",
  "Second opinion requested. Second opinion: also doogleh.",
  "Our lawyers advised us not to elaborate.",
  "Reviewed at a family gathering. Unanimous.",
];

const TRUE_VERDICTS = [
  "…huh. This one checks out. Suspicious.",
  "Not doogleh. We're as shocked as you are.",
  "Truth detected. Please don't make a habit of it.",
];

// Same input always gives the same verdict — a detector that changes its mind
// under retesting is not a serious scientific instrument.
function hash(input: string) {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

type Result = {
  percent: number;
  verdict: string;
  note: string;
  isDoogleh: boolean;
  claim: string;
};

function analyze(claim: string): Result {
  const h = hash(claim.trim().toLowerCase());
  // ~1 in 14 claims survive, purely so the meter can't be accused of bias
  const isDoogleh = h % 14 !== 0;
  return {
    percent: isDoogleh ? 84 + (h % 17) : 4 + (h % 9),
    verdict: isDoogleh
      ? VERDICTS[h % VERDICTS.length]
      : TRUE_VERDICTS[h % TRUE_VERDICTS.length],
    note: NOTES[(h >> 3) % NOTES.length],
    isDoogleh,
    claim: claim.trim(),
  };
}

// Synthesized so the site ships with no audio files: a descending "wrong answer"
// buzzer for doogleh, a rising two-note chime for the rare truth.
function playSound(isDoogleh: boolean) {
  try {
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctor) return;
    const ctx = new Ctor();
    const now = ctx.currentTime;
    const gain = ctx.createGain();
    gain.connect(ctx.destination);

    if (isDoogleh) {
      const osc = ctx.createOscillator();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(70, now + 0.55);
      gain.gain.setValueAtTime(0.16, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
      osc.connect(gain);
      osc.start(now);
      osc.stop(now + 0.62);
      osc.onended = () => void ctx.close();
    } else {
      const osc = ctx.createOscillator();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(660, now);
      osc.frequency.setValueAtTime(880, now + 0.11);
      gain.gain.setValueAtTime(0.14, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc.connect(gain);
      osc.start(now);
      osc.stop(now + 0.42);
      osc.onended = () => void ctx.close();
    }
  } catch {
    // A silent detector is still a detector.
  }
}

// The lifetime doogleh count lives in localStorage, which the server can't see.
// Reading it through a store keeps the server snapshot (null) distinct from the
// client value, so the first paint matches and the number fills in after hydration.
const COUNT_KEY = "doogleh-count";
let countListeners: Array<() => void> = [];

const countStore = {
  subscribe(onChange: () => void) {
    countListeners.push(onChange);
    // Fires only for other tabs — call doogleh in two windows, both stay in sync.
    window.addEventListener("storage", onChange);
    return () => {
      countListeners = countListeners.filter((l) => l !== onChange);
      window.removeEventListener("storage", onChange);
    };
  },
  // Returns a primitive, so React can compare snapshots by value directly.
  getSnapshot: () => Number(localStorage.getItem(COUNT_KEY)) || 0,
  getServerSnapshot: () => null,
  increment() {
    const next = (Number(localStorage.getItem(COUNT_KEY)) || 0) + 1;
    localStorage.setItem(COUNT_KEY, String(next));
    countListeners.forEach((l) => l());
  },
};

export function Detector() {
  const [claim, setClaim] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [stamping, setStamping] = useState(false);
  const [copied, setCopied] = useState(false);
  const [muted, setMuted] = useState(false);
  const stampTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const count = useSyncExternalStore(
    countStore.subscribe,
    countStore.getSnapshot,
    countStore.getServerSnapshot,
  );

  useEffect(() => {
    return () => {
      if (stampTimer.current) clearTimeout(stampTimer.current);
    };
  }, []);

  function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!claim.trim()) return;

    const next = analyze(claim);
    setResult(next);
    setCopied(false);
    setStamping(true);
    if (!muted) playSound(next.isDoogleh);

    countStore.increment();

    if (stampTimer.current) clearTimeout(stampTimer.current);
    stampTimer.current = setTimeout(() => setStamping(false), 1500);
  }

  async function copyReceipt() {
    if (!result) return;
    const receipt = [
      `"${result.claim}"`,
      "",
      `${result.percent}% DOOGLEH — ${result.verdict}`,
      "",
      "Officially assessed at doogleh.net",
    ].join("\n");
    try {
      await navigator.clipboard.writeText(receipt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="relative w-full">
      {stamping && result?.isDoogleh && (
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center"
        >
          <span className="stamp select-none rounded-xl border-[6px] border-doogleh px-6 py-2 text-[13vw] font-black leading-none tracking-tighter text-doogleh sm:text-[9rem]">
            DOOGLEH
          </span>
        </div>
      )}

      <form onSubmit={submit} className="flex flex-col gap-3">
        <label
          htmlFor="claim"
          className="font-mono text-xs uppercase tracking-[0.2em] text-foreground/40"
        >
          Step 1 — what did they tell you?
        </label>
        <input
          id="claim"
          value={claim}
          onChange={(e) => setClaim(e.target.value)}
          placeholder="I was 5 minutes away an hour ago"
          autoComplete="off"
          className="w-full rounded-xl border border-foreground/15 bg-foreground/4 px-5 py-4 text-lg text-foreground outline-none transition-colors placeholder:text-foreground/25 focus:border-doogleh focus:bg-foreground/6"
        />
        <button
          type="submit"
          disabled={!claim.trim()}
          className={`${stamping ? "shake " : ""}group relative w-full cursor-pointer rounded-xl bg-doogleh px-6 py-5 text-xl font-black uppercase tracking-widest text-white transition-[transform,background-color,opacity] hover:bg-[#f3372e] active:translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-30`}
        >
          Run the test
        </button>
      </form>

      {result && (
        <div
          key={`${result.claim}-${result.percent}`}
          className="rise mt-6 rounded-2xl border border-foreground/15 bg-foreground/3 p-6 sm:p-8"
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-foreground/40">
            Official finding
          </p>
          <p className="mt-4 text-2xl font-medium leading-snug text-foreground/80">
            &ldquo;{result.claim}&rdquo;
          </p>

          <div className="mt-7 flex items-baseline gap-3">
            <span
              className={`text-6xl font-black tabular-nums tracking-tighter sm:text-7xl ${
                result.isDoogleh ? "text-doogleh" : "text-emerald-400"
              }`}
            >
              {result.percent}%
            </span>
            <span className="font-mono text-sm uppercase tracking-[0.2em] text-foreground/50">
              doogleh
            </span>
          </div>

          <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-foreground/10">
            <div
              className={`fill-bar h-full rounded-full ${
                result.isDoogleh ? "bg-doogleh" : "bg-emerald-400"
              }`}
              style={{ width: `${result.percent}%` }}
            />
          </div>

          <p className="mt-6 text-xl font-semibold">{result.verdict}</p>
          <p className="mt-2 font-mono text-sm text-foreground/40">
            {result.note}
          </p>

          <button
            onClick={copyReceipt}
            className="mt-7 cursor-pointer rounded-lg border border-foreground/20 px-4 py-2.5 font-mono text-xs uppercase tracking-[0.15em] text-foreground/70 transition-colors hover:border-foreground/50 hover:text-foreground"
          >
            {copied ? "Copied — go ruin their day" : "Copy the receipt"}
          </button>
        </div>
      )}

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-foreground/35">
        <span>
          {count === null
            ? " "
            : count === 0
              ? "You have not called doogleh yet. Suspicious."
              : `You have called doogleh ${count} time${count === 1 ? "" : "s"}.`}
        </span>
        <button
          onClick={() => setMuted((m) => !m)}
          className="cursor-pointer uppercase tracking-[0.15em] underline-offset-4 transition-colors hover:text-foreground/70 hover:underline"
        >
          {muted ? "Sound off" : "Sound on"}
        </button>
      </div>
    </div>
  );
}
