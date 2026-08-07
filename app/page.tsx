import { Detector } from "./detector";

const EXAMPLES = [
  {
    quote: "Bro I'm literally pulling up right now.",
    reply: "Doogleh. He's in the shower.",
  },
  {
    quote: "I only had two.",
    reply: "Doogleh. There are seven cans behind you.",
  },
  {
    quote: "Yeah no I read the whole thing.",
    reply: "Doogleh. You read the title.",
  },
  {
    quote: "I don't even care that much.",
    reply: "Doogleh. You've brought it up four times.",
  },
  {
    quote: "The traffic was insane.",
    reply: "Doogleh. You left late. You always leave late.",
  },
  {
    quote: "I was gonna text you.",
    reply: "Doogleh. Of the highest order.",
  },
];

const SIGNS = [
  "The story gets 15% better every time it's told.",
  "They said \"long story short\" and then spoke for nine minutes.",
  "Specific numbers. Nobody real remembers specific numbers.",
  "They're answering a question you didn't ask.",
  "\"My cousin works there\" is doing all the load-bearing work.",
  "They started with \"I'm not gonna lie.\"",
];

export default function Home() {
  return (
    <div className="relative z-10 flex flex-1 flex-col items-center px-6">
      <header className="flex w-full max-w-2xl items-center justify-between py-7">
        <span className="font-mono text-sm font-bold uppercase tracking-[0.25em] text-doogleh">
          Doogleh
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-foreground/35">
          Est. whenever
        </span>
      </header>

      <main className="w-full max-w-2xl pb-24">
        <section className="pt-10 sm:pt-16">
          <h1 className="text-[19vw] font-black leading-[0.82] tracking-tighter text-doogleh sm:text-[8.5rem]">
            DOOGLEH
          </h1>

          <div className="mt-8 border-l-2 border-doogleh/40 pl-5">
            <p className="font-mono text-sm text-foreground/45">
              <span className="text-foreground/70">/ˈduɡ·leh/</span> &nbsp;·&nbsp;
              Assyrian &nbsp;·&nbsp; noun, interjection, entire personality
            </p>
            <p className="mt-3 text-2xl leading-snug sm:text-3xl">
              Lies. Nonsense. That thing your friend just said with a
              completely straight face.
            </p>
          </div>

          <p className="mt-8 max-w-lg text-lg leading-relaxed text-foreground/55">
            For generations, calling doogleh required being in the same room as
            the liar. Today, that changes. Below is the world&rsquo;s first
            forensic doogleh detector. It is not accurate. It has never been
            wrong.
          </p>
        </section>

        <section className="mt-14 rounded-2xl border border-foreground/10 bg-foreground/2 p-5 sm:p-8">
          <Detector />
        </section>

        <section className="mt-20">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-foreground/40">
            Using it in a sentence
          </h2>
          <ul className="mt-6 flex flex-col divide-y divide-foreground/10">
            {EXAMPLES.map((example) => (
              <li key={example.quote} className="py-5">
                <p className="text-lg text-foreground/80">
                  &ldquo;{example.quote}&rdquo;
                </p>
                <p className="mt-1.5 text-lg font-semibold text-doogleh">
                  {example.reply}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-20">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-foreground/40">
            Warning signs you are being doogleh&rsquo;d
          </h2>
          <ul className="mt-6 flex flex-col gap-4">
            {SIGNS.map((sign, index) => (
              <li key={sign} className="flex gap-4">
                <span className="font-mono text-sm tabular-nums text-doogleh/60">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-lg leading-snug text-foreground/75">
                  {sign}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-20 rounded-2xl border border-doogleh/25 bg-doogleh/6 p-6 sm:p-8">
          <h2 className="text-2xl font-black tracking-tight">
            Frequently Doubted Questions
          </h2>
          <dl className="mt-6 flex flex-col gap-5">
            <div>
              <dt className="font-semibold">Is this scientifically valid?</dt>
              <dd className="mt-1 text-foreground/60">Doogleh.</dd>
            </div>
            <div>
              <dt className="font-semibold">Do you store what I type?</dt>
              <dd className="mt-1 text-foreground/60">
                No. There&rsquo;s no server, no database, no analytics. It all
                happens in your browser and then it&rsquo;s gone. We know that
                sounds like doogleh. It isn&rsquo;t.
              </dd>
            </div>
            <div>
              <dt className="font-semibold">
                Am I saying it right?
              </dt>
              <dd className="mt-1 text-foreground/60">
                Probably not, but say it loud enough and confident enough and
                nobody will challenge you. That&rsquo;s the whole trick,
                honestly.
              </dd>
            </div>
            <div>
              <dt className="font-semibold">What if I&rsquo;m the liar?</dt>
              <dd className="mt-1 text-foreground/60">
                Then you already know your result and you don&rsquo;t need us.
              </dd>
            </div>
          </dl>
        </section>
      </main>

      <footer className="w-full max-w-2xl border-t border-foreground/10 py-8 font-mono text-xs leading-relaxed text-foreground/30">
        <p>
          Doogleh.com — a joke website. No claims, findings, percentages, or
          institutes referenced on this page are real. Do not present results as
          evidence in court, in an argument with your mother, or anywhere else
          that matters.
        </p>
        <p className="mt-3">
          Built with love - Aidan Younathan.
        </p>
      </footer>
    </div>
  );
}
