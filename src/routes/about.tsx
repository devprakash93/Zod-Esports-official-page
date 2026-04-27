import { createFileRoute } from "@tanstack/react-router";
import { Target, Eye, Crown, Award, ChevronDown } from "lucide-react";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — TEAM ZOD ESPORTS" },
      { name: "description", content: "The story, mission, and timeline behind TEAM ZOD ESPORTS — a tier-1 Indian BGMI organization." },
      { property: "og:title", content: "About TEAM ZOD ESPORTS" },
      { property: "og:description", content: "The story behind one of India's most feared BGMI rosters." },
    ],
  }),
  component: AboutPage,
});

const timeline = [
  { year: "2021", title: "Formation", text: "Five friends from across India unite under the ZOD banner with one goal — domination." },
  { year: "2022", title: "First Tier-1 Title", text: "Captured our first major championship, finishing top of the table by a 14-point margin." },
  { year: "2023", title: "International Debut", text: "Represented India on the global stage at PMGC, finishing inside the top 8." },
  { year: "2024", title: "Bootcamp Era", text: "Opened a state-of-the-art training facility in Mumbai. 14-hour days, every day." },
  { year: "2026", title: "Masters Champions", text: "Lifted the BGMI Masters Series 2026 trophy with a record-breaking finals run." },
];

function AboutPage() {
  return (
    <div className="pb-24 bg-bg-deep relative overflow-hidden">
      {/* Cinematic Background Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-primary/20 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[40vw] h-[40vw] bg-accent/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />

      <section className="relative overflow-hidden pt-32 pb-24 min-h-[60vh] flex flex-col justify-center border-b border-white/5">
        <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
          <Reveal>
            <div className="inline-flex items-center justify-center gap-2 rounded bg-primary/10 border border-primary/30 px-4 py-1.5 text-[10px] font-mono text-primary font-bold uppercase tracking-[0.4em] mb-6 backdrop-blur-sm shadow-neon-soft">
              <Crown className="h-3.5 w-3.5" /> ORIGIN STORY
            </div>
            <h1 className="font-display text-6xl sm:text-7xl lg:text-[9rem] font-black tracking-tighter leading-none mb-6 drop-shadow-lg text-white uppercase">
              FORGED IN <span className="text-gradient glow-text">FIRE</span>
            </h1>
            <p className="mt-6 text-lg sm:text-2xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
              TEAM ZOD ESPORTS is an Indian BGMI organization competing at the highest tier of mobile esports. We blend disciplined comms, deep analytics, and raw mechanical skill into a roster that wins when the lights are brightest.
            </p>
            <div className="mt-12 animate-bounce flex justify-center text-primary/50">
              <ChevronDown className="h-8 w-8" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-24 relative z-10">
        <Reveal y={40}>
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {[
              { Icon: Target, h: "Mission", t: "Build India's most consistent BGMI lineup — and prove it across every major league." },
              { Icon: Eye, h: "Vision", t: "Be a tier-1 international esports brand that the next generation grows up dreaming about." },
              { Icon: Crown, h: "Founder", t: "Founded by Karan 'ZOD' Malhotra in 2021 — a former pro turned coach turned organization builder." },
            ].map(({ Icon, h, t }, i) => (
              <Reveal key={h} delay={i * 150} className="rounded-3xl border border-white/10 glass-darker p-10 hover:border-primary/40 hover:shadow-neon transition-all duration-500 group relative overflow-hidden">
                <div className="absolute -top-10 -right-10 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-500 text-primary">
                  <Icon className="h-40 w-40" />
                </div>
                <div className="relative z-10">
                  <div className="h-14 w-14 rounded-2xl bg-primary/20 flex items-center justify-center mb-6 border border-primary/30 group-hover:bg-primary group-hover:shadow-[0_0_20px_rgba(var(--color-primary),0.5)] transition-all duration-500">
                    <Icon className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <h3 className="font-display text-3xl font-bold text-white mb-4 group-hover:text-primary transition-colors">{h}</h3>
                  <p className="text-gray-400 font-light leading-relaxed">{t}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-32 relative z-10">
        <Reveal>
          <div className="flex flex-col items-center text-center mb-16">
            <div className="font-mono text-[10px] text-accent uppercase tracking-[0.4em] font-bold mb-4">Legacy</div>
            <h2 className="font-display text-5xl sm:text-6xl font-black uppercase tracking-tight text-white">
              Timeline of <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary glow-text">Achievements</span>
            </h2>
          </div>
        </Reveal>

        <div className="max-w-4xl mx-auto">
          <ol className="relative border-l-2 border-white/10 ml-3 md:ml-0 md:border-l-0 md:border-t-2 md:flex md:justify-between pt-8">
            {timeline.map((t, i) => (
              <li key={t.year} className="mb-12 ml-8 md:ml-0 md:mb-0 md:w-1/5 relative group">
                <Reveal delay={i * 100} y={20}>
                  <span className="absolute -left-[41px] top-1 md:-top-[41px] md:left-1/2 md:-translate-x-1/2 grid h-6 w-6 place-items-center rounded-full bg-background border-2 border-primary group-hover:bg-primary group-hover:shadow-[0_0_20px_rgba(var(--color-primary),1)] transition-all duration-500 z-10">
                    <Award className="h-3 w-3 text-primary group-hover:text-primary-foreground transition-colors" />
                  </span>
                  <div className="font-mono text-sm text-primary font-bold tracking-[0.2em] mb-2 md:text-center mt-2 md:mt-6">{t.year}</div>
                  <h3 className="font-display text-2xl font-bold text-white mb-2 md:text-center group-hover:text-primary transition-colors">{t.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed md:text-center md:mx-auto md:max-w-[200px] font-light">{t.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}