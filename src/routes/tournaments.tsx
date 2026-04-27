import { createFileRoute } from "@tanstack/react-router";
import { Trophy, Radio, Calendar, ChevronRight, Crosshair } from "lucide-react";
import { getTournaments } from "@/server/api";
import { Reveal } from "@/components/reveal";
import tournamentBgImg from "@/assets/tournaments-bg.png";

export const Route = createFileRoute("/tournaments")({
  loader: () => getTournaments(),
  head: () => ({
    meta: [
      { title: "Tournaments — TEAM ZOD ESPORTS" },
      { name: "description", content: "Past, ongoing, and upcoming BGMI tournaments featuring TEAM ZOD ESPORTS." },
      { property: "og:title", content: "TEAM ZOD Tournaments" },
      { property: "og:description", content: "Tracking every cup, league, and showmatch on the ZOD calendar." },
    ],
  }),
  component: TournamentsPage,
});

const StatusBadge = ({ s }: { s: string }) => {
  if (s === "live") return (
    <span className="inline-flex items-center gap-1.5 rounded-sm bg-destructive text-destructive-foreground px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(var(--color-destructive),0.5)]">
      <Radio className="h-3 w-3 animate-pulse" /> Live Now
    </span>
  );
  if (s === "upcoming") return (
    <span className="inline-flex items-center gap-1.5 rounded-sm bg-background/80 text-accent px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-widest border border-accent/40 backdrop-blur-sm">
      <Calendar className="h-3 w-3" /> Upcoming
    </span>
  );
  return (
    <span className="inline-flex items-center gap-1.5 rounded-sm bg-primary/20 text-primary px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-widest border border-primary/40 backdrop-blur-sm shadow-[0_0_10px_rgba(var(--color-primary),0.2)]">
      <Trophy className="h-3 w-3" /> Conquered
    </span>
  );
};

function TournamentsPage() {
  const tournaments = Route.useLoaderData();

  return (
    <div className="pb-24">
      <section className="relative overflow-hidden pt-32 pb-20 min-h-[60vh] flex flex-col justify-center border-b border-primary/20 shadow-[0_4px_30px_rgba(var(--color-primary),0.1)]">
        <div className="absolute inset-0">
          <img src={tournamentBgImg} alt="Tournaments Arena" className="w-full h-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-grid opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute right-0 top-0 w-full h-full bg-gradient-to-l from-primary/10 to-transparent -z-10" />
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-primary/20 blur-[100px] rounded-full mix-blend-screen" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded bg-primary/10 border border-primary/30 px-4 py-1.5 text-[10px] font-mono text-primary font-bold uppercase tracking-[0.4em] mb-6 backdrop-blur-sm shadow-neon-soft">
              <Crosshair className="h-3.5 w-3.5" /> COMPETITIVE CALENDAR
            </div>
            <h1 className="font-display text-7xl sm:text-8xl lg:text-[10rem] font-black tracking-tighter leading-none mb-6 drop-shadow-lg text-white">
              WAR <span className="text-gradient glow-text">LOGS</span>
            </h1>
            <p className="mt-4 text-lg sm:text-2xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
              Every drop, every rotation, every clutch victory documented. 
              The history of TEAM ZOD is written in championships.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Bracket / Live Visualization */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-16">
        <Reveal>
          <div className="rounded-3xl border border-primary/30 bg-card p-1 relative overflow-hidden shadow-neon">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-accent/20 opacity-50 mix-blend-overlay pointer-events-none" />
            <div className="rounded-[22px] bg-background p-8 sm:p-12 border border-white/5 relative z-10">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                  <h2 className="font-display text-3xl font-black uppercase text-white mb-2">Championship Bracket</h2>
                  <p className="text-muted-foreground font-mono text-xs uppercase tracking-widest">Global Finals 2026 - Path to Victory</p>
                </div>
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div className="h-1 flex-1 md:w-32 bg-primary/20 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-full animate-[pulse_2s_ease-in-out_infinite]" />
                  </div>
                  <Trophy className="h-8 w-8 text-primary drop-shadow-[0_0_10px_rgba(var(--color-primary),1)]" />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 mt-16">
        {tournaments.map((t: any, i: number) => (
          <Reveal key={t.id} delay={i * 80} y={20}>
            <article className="group bg-card/40 backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-white/10 hover:border-primary/60 transition-all duration-500 relative overflow-hidden h-full flex flex-col justify-between shadow-card hover:shadow-neon">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[50px] group-hover:bg-primary/20 transition-colors pointer-events-none" />
              
              <div className="flex items-start justify-between mb-10 relative z-10">
                <div>
                  <div className="inline-flex items-center gap-2 text-[10px] font-mono text-gray-400 font-bold tracking-[0.3em] uppercase mb-3">
                    <Calendar className="h-3 w-3" /> {t.date}
                  </div>
                  <h2 className="font-display text-4xl sm:text-5xl font-black leading-tight text-white group-hover:text-primary transition-colors tracking-tight">{t.name}</h2>
                </div>
                <StatusBadge s={t.status} />
              </div>

              <div className="flex items-end justify-between mt-auto relative z-10 bg-background/50 p-6 rounded-2xl border border-white/5">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.4em] text-primary font-bold mb-2">Final Rank</div>
                  <div className="font-display text-6xl font-black text-white drop-shadow-md leading-none">{t.placement}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] uppercase tracking-[0.4em] text-accent font-bold mb-2">Prize Pool</div>
                  <div className="font-display text-3xl font-black text-white">{t.prize}</div>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-32">
        <Reveal>
          <div className="flex items-center gap-6 mb-12">
            <h2 className="font-display text-4xl sm:text-5xl font-black uppercase tracking-tight text-white">Trophy Cabinet</h2>
            <div className="h-0.5 flex-1 bg-gradient-to-r from-primary via-primary/50 to-transparent" />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {["Masters '26", "BGIS '26", "Skyesports '26", "PMGC '23"].map((n, i) => (
              <Reveal key={n} delay={i * 100} y={20}>
                <div className="aspect-square rounded-3xl bg-gradient-to-br from-card/80 to-background border border-white/5 grid place-items-center text-center p-8 group hover:border-primary/60 shadow-card hover:shadow-neon transition-all duration-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="transform group-hover:-translate-y-3 transition-transform duration-500 relative z-10">
                    <Trophy className="h-16 w-16 mx-auto text-primary mb-6 opacity-70 group-hover:opacity-100 group-hover:drop-shadow-[0_0_15px_rgba(var(--color-primary),1)] transition-all duration-500" />
                    <div className="font-display font-black text-2xl text-white leading-tight mb-2 uppercase">{n}</div>
                    <div className="text-[10px] font-mono font-bold text-accent tracking-[0.3em] uppercase bg-accent/10 px-3 py-1 rounded">Champion</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </section>
    </div>
  );
}