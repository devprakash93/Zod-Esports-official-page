import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Trophy, Target, Crosshair, Users, Zap, Circle, Sword, Flame, ShieldAlert } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import tournamentBg from "@/assets/tournaments-bg.png";
import scrimsBg from "@/assets/scrims-bg.png";
import { Button } from "@/components/ui/button";
import { teamStats, upcomingMatch } from "@/lib/team-data";
import { getPlayers, getTournaments } from "@/server/api";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/")({
  loader: async () => {
    const [players, tournaments] = await Promise.all([getPlayers(), getTournaments()]);
    return { players, tournaments };
  },
  head: () => ({
    meta: [
      { title: "TEAM ZOD ESPORTS — Dominating the Battlegrounds" },
      { name: "description", content: "Official home of TEAM ZOD ESPORTS, a tier-1 Indian BGMI organization. Roster, tournaments, scrims, and tryouts." },
      { property: "og:title", content: "TEAM ZOD ESPORTS — Dominating the Battlegrounds" },
      { property: "og:description", content: "Official home of TEAM ZOD ESPORTS, a tier-1 Indian BGMI organization." },
    ],
  }),
  component: Index,
});

function useCountdown(daysFromNow: number) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const target = useState(() => Date.now() + daysFromNow * 86_400_000)[0];
  const diff = Math.max(0, target - now);
  const d = Math.floor(diff / 86_400_000);
  const h = Math.floor((diff % 86_400_000) / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  const s = Math.floor((diff % 60_000) / 1000);
  return { d, h, m, s };
}

function Index() {
  const { d, h, m, s } = useCountdown(upcomingMatch.daysFromNow);
  const { players, tournaments } = Route.useLoaderData();
  const featured = players.filter((p: any) => p.status === 'active').slice(0, 4);

  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden min-h-screen flex items-center">
        <img
          src={heroBg}
          alt=""
          width={1920}
          height={1088}
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-50 motion-safe:animate-[heroIn_1.4s_cubic-bezier(0.22,1,0.36,1)_both]"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/10 via-background/60 to-background" />
        <div className="absolute inset-0 -z-10 bg-grid opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-primary/20 blur-[150px] rounded-full -z-10" />
        
        {/* Scrolling Ticker */}
        <div className="absolute top-20 left-0 w-full overflow-hidden whitespace-nowrap bg-primary/10 border-y border-primary/30 py-2.5 -z-10 backdrop-blur-sm shadow-[0_0_15px_rgba(var(--color-primary),0.2)]">
          <div className="flex animate-marquee gap-12 text-[11px] font-mono font-bold text-primary uppercase tracking-[0.5em] w-max drop-shadow-md">
            <span>• TEAM ZOD vs ORANGUTAN — WIN (+15 PTS)</span>
            <span>• BMPS 2024 FINALS — QUALIFIED</span>
            <span>• ROSTER UPDATE: ZOD CLUTCHGOD JOINS</span>
            <span>• NEW SCRIM PARTNER: GODLIKE ESPORTS</span>
            {/* Duplicate for seamless loop */}
            <span>• TEAM ZOD vs ORANGUTAN — WIN (+15 PTS)</span>
            <span>• BMPS 2024 FINALS — QUALIFIED</span>
            <span>• ROSTER UPDATE: ZOD CLUTCHGOD JOINS</span>
            <span>• NEW SCRIM PARTNER: GODLIKE ESPORTS</span>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl">
            <Reveal y={12} className="inline-flex items-center gap-2 rounded-full border border-primary/50 bg-background/50 backdrop-blur-md px-5 py-2 text-xs font-mono text-primary font-bold mb-8 shadow-neon">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
              </span>
              ACTIVE SYSTEM — BGMI · TIER 1 DIVISION
            </Reveal>
            <Reveal delay={80}>
              <h1 className="font-display text-7xl sm:text-8xl lg:text-[10rem] font-black leading-[0.8] tracking-tighter mb-4 uppercase drop-shadow-[0_0_30px_rgba(var(--color-primary),0.3)]">
                DOMINATING<br />
                <span className="text-gradient glow-text">THE ARENA</span>
              </h1>
            </Reveal>
            <Reveal delay={200} className="mt-8 text-xl sm:text-3xl text-gray-300 max-w-3xl font-light">
              We don't just play; we engineer victories. Precision, grit, and 
              unmatched coordination define <span className="text-white font-bold tracking-widest uppercase text-shadow">TEAM ZOD</span>.
            </Reveal>
            <Reveal delay={320} className="mt-12 flex flex-wrap gap-6">
              <Button asChild size="lg" className="bg-gradient-to-r from-primary to-accent text-primary-foreground h-16 px-10 text-xl font-black uppercase tracking-widest glow-soft shadow-neon hover:scale-105 transition-transform">
                <Link to="/join">
                  START TRYOUTS <ArrowRight className="ml-3 h-6 w-6" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="glass border-primary/40 hover:bg-primary/20 hover:border-primary text-white h-16 px-10 text-xl font-bold uppercase tracking-widest transition-all shadow-card">
                <Link to="/team">MEET THE SQUAD</Link>
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Stats Section with Glassmorphism */}
      <section className="relative z-20 -mt-24 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { v: `${teamStats.wins}`, l: "Championship Wins", I: Trophy },
              { v: `${teamStats.tournaments}`, l: "Tier-1 Events", I: Target },
              { v: teamStats.prize, l: "Net Earnings", I: Zap },
              { v: teamStats.fans, l: "Global Community", I: Users },
            ].map((s, i) => (
              <Reveal key={s.l} delay={i * 100} y={20}>
                <div className="glass group p-6 rounded-2xl hover:border-primary/50 transition-all cursor-default shadow-[0_0_20px_rgba(var(--color-primary),0.1)] hover:shadow-neon">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-12 w-12 grid place-items-center rounded-xl bg-primary/20 text-primary group-hover:scale-110 transition-transform">
                      <s.I className="h-6 w-6" />
                    </div>
                    <div className="h-1.5 w-1.5 rounded-full bg-primary/60 shadow-[0_0_5px_rgba(var(--color-primary),1)]" />
                  </div>
                  <div className="font-display text-4xl font-bold mb-1 text-white">{s.v}</div>
                  <div className="text-[10px] text-primary uppercase tracking-widest font-mono font-bold">{s.l}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ORG PROMO BLOCKS (Replaces blank slides) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10 mb-32">
        <Reveal>
          <div className="font-mono text-xs text-primary uppercase tracking-[0.4em] mb-2 font-bold drop-shadow-md">The Hub</div>
          <h2 className="font-display text-4xl sm:text-5xl font-black mb-10 text-white drop-shadow-lg">COMMAND DIRECTIVES</h2>
        </Reveal>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <Reveal delay={100} y={20}>
            <Link to="/tournaments" className="block group relative rounded-3xl overflow-hidden min-h-[350px] border border-primary/20 hover:border-primary/60 transition-all duration-500 shadow-card hover:shadow-neon">
              <img src={tournamentBg} alt="Tournaments" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700 group-hover:opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/0 transition-colors" />
              <div className="relative z-10 h-full flex flex-col justify-end p-10">
                <Trophy className="h-12 w-12 text-primary mb-4 glow-text" />
                <h3 className="font-display text-4xl font-black text-white uppercase tracking-tight mb-2 group-hover:text-primary transition-colors">War Logs</h3>
                <p className="text-gray-300 font-light max-w-md mb-6">Track our major tournament victories, MVP performances, and overall tier-1 domination.</p>
                <div className="inline-flex items-center font-mono text-xs text-primary font-bold uppercase tracking-widest">
                  View Tournaments <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>
          </Reveal>

          <Reveal delay={200} y={20}>
            <Link to="/scrims" className="block group relative rounded-3xl overflow-hidden min-h-[350px] border border-accent/20 hover:border-accent/60 transition-all duration-500 shadow-card hover:shadow-[0_0_30px_rgba(var(--color-accent),0.3)]">
              <img src={scrimsBg} alt="Scrims" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700 group-hover:opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <div className="absolute inset-0 bg-accent/10 group-hover:bg-accent/0 transition-colors" />
              <div className="relative z-10 h-full flex flex-col justify-end p-10">
                <Sword className="h-12 w-12 text-accent mb-4 drop-shadow-[0_0_10px_rgba(var(--color-accent),0.8)]" />
                <h3 className="font-display text-4xl font-black text-white uppercase tracking-tight mb-2 group-hover:text-accent transition-colors">Daily Grind</h3>
                <p className="text-gray-300 font-light max-w-md mb-6">Dive into the daily scrim statistics. We believe in transparency and raw metrics.</p>
                <div className="inline-flex items-center font-mono text-xs text-accent font-bold uppercase tracking-widest">
                  View Scrims <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* UPCOMING MATCH */}
      <Reveal as="section" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 mb-24">
        <div className="rounded-3xl border-2 border-primary/40 bg-background p-8 sm:p-12 shadow-neon relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 blur-[100px] -z-10 rounded-full" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/20 blur-[100px] -z-10 rounded-full" />
          <div className="absolute inset-0 bg-grid opacity-30" aria-hidden />
          <div className="relative grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-xs text-primary font-bold uppercase tracking-[0.4em] mb-4 bg-primary/10 px-3 py-1 rounded border border-primary/30">
                <Flame className="h-4 w-4 text-primary" /> NEXT TARGET
              </div>
              <h2 className="font-display text-4xl sm:text-6xl font-black uppercase text-white drop-shadow-md leading-none mb-3">{upcomingMatch.event}</h2>
              <p className="text-xl text-primary font-mono tracking-widest">VS {upcomingMatch.opponent}</p>
            </div>
            <div className="grid grid-cols-4 gap-3 sm:gap-4">
              {[
                { v: d, l: "DAYS" },
                { v: h, l: "HRS" },
                { v: m, l: "MIN" },
                { v: s, l: "SEC" },
              ].map((u) => (
                <div key={u.l} className="rounded-xl border-2 border-border/50 bg-background/80 backdrop-blur-md p-4 sm:p-6 text-center shadow-card">
                  <div className="font-display text-4xl sm:text-5xl font-black tabular-nums text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                    {String(u.v).padStart(2, "0")}
                  </div>
                  <div className="text-[10px] sm:text-xs font-mono text-primary font-bold tracking-[0.2em] mt-2">
                    {u.l}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      {/* FEATURED PLAYERS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-32">
        <Reveal className="flex items-end justify-between mb-12">
          <div>
            <div className="font-mono text-xs text-primary uppercase tracking-[0.4em] mb-2 font-bold">Active Roster</div>
            <h2 className="font-display text-4xl sm:text-6xl font-black text-white">THE VANGUARD</h2>
          </div>
          <Link to="/team" className="hidden sm:flex items-center text-sm font-bold text-primary uppercase tracking-widest hover:text-white transition-colors">
            View full roster <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Reveal>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {featured.map((p: any, i: number) => (
            <Reveal key={p.id} delay={i * 100} y={28}>
            <article
              className="group relative rounded-2xl overflow-hidden border-2 border-border bg-card aspect-[3/4] shadow-card hover:border-primary/50 transition-all duration-500"
            >
              <img
                src={p.image}
                alt={p.ign}
                width={768}
                height={1024}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-90 group-hover:opacity-70" />
              <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_10px_rgba(var(--color-primary),1)]" />
              <div className="absolute bottom-0 inset-x-0 p-5 transform transition-transform group-hover:-translate-y-1">
                <div className="font-mono text-[10px] font-bold tracking-[0.3em] text-primary mb-1">{p.role.toUpperCase()}</div>
                <div className="font-display text-2xl sm:text-3xl font-black text-white">{p.ign}</div>
                <div className="text-xs text-gray-400 font-mono tracking-widest mt-1">KD <span className="text-primary">{p.kd}</span></div>
              </div>
            </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <Reveal as="section" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-32 mb-20">
        <div className="rounded-3xl border border-primary/40 bg-gradient-to-br from-primary/20 via-background to-accent/10 p-10 sm:p-20 text-center relative overflow-hidden shadow-neon">
          <div className="absolute inset-0 bg-grid opacity-30" aria-hidden />
          <div className="relative z-10 flex flex-col items-center">
            <ShieldAlert className="h-16 w-16 text-primary mb-6 drop-shadow-[0_0_15px_rgba(var(--color-primary),0.8)]" />
            <h2 className="font-display text-4xl sm:text-6xl font-black text-white uppercase tracking-tight">Got what it takes?</h2>
            <p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto font-light">
              Tryouts are strictly performance-based. Submit your stats, get reviewed by our coaching staff, and join the elite.
            </p>
            <Button asChild size="lg" className="mt-10 bg-white text-background hover:bg-primary hover:text-primary-foreground h-16 px-12 text-lg font-black uppercase tracking-widest transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)]">
              <Link to="/join">Submit Application</Link>
            </Button>
          </div>
        </div>
      </Reveal>
    </>
  );
}
