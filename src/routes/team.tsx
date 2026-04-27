import { createFileRoute, Link } from "@tanstack/react-router";
import { getPlayers } from "@/server/api";
import { Reveal } from "@/components/reveal";
import { Crosshair, Target, Trophy, Swords, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/team")({
  loader: async () => {
    const players = await getPlayers();
    return { players };
  },
  head: () => ({
    meta: [
      { title: "Roster | TEAM ZOD ESPORTS" },
      { name: "description", content: "Meet the elite active roster of TEAM ZOD." },
    ],
  }),
  component: TeamPage,
});

function PlayerCard({ p, index }: { p: any; index: number }) {
  const shortId = p.id.split("-")[0];

  return (
    <Reveal delay={index * 100} y={20}>
      <article className="group relative rounded-xl overflow-hidden bg-card aspect-[3/4] shadow-card hover:shadow-neon transition-all duration-500">
        <img
          src={p.image}
          alt={p.ign}
          width={768}
          height={1024}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[50%] group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-90 group-hover:opacity-70 transition-opacity" />
        <div className="absolute inset-0 ring-1 ring-inset ring-white/10 group-hover:ring-primary/80 transition-all rounded-xl" />
        
        {/* Top Badges */}
        <div className="absolute top-3 inset-x-3 flex items-start justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary bg-background/80 backdrop-blur-md px-2.5 py-1 rounded-sm border border-primary/40 shadow-[0_0_10px_rgba(var(--color-primary),0.3)]">
            {p.role}
          </span>
          <span className="font-mono text-[9px] text-muted-foreground/80 tracking-widest bg-background/50 px-2 py-1 rounded-sm backdrop-blur-sm">
            #{shortId}
          </span>
        </div>

        {/* Content Box */}
        <div className="absolute bottom-0 inset-x-0 p-5 transform transition-transform duration-500">
          {/* Social Links appearing on hover */}
          <div className="flex gap-2 mb-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
            {p.insta && (
              <a href={p.insta} target="_blank" rel="noreferrer" className="bg-background/80 hover:bg-primary/20 text-foreground hover:text-primary p-1.5 rounded-md backdrop-blur-md border border-white/10 hover:border-primary/50 transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
            )}
            {p.yt && (
              <a href={p.yt} target="_blank" rel="noreferrer" className="bg-background/80 hover:bg-destructive/20 text-foreground hover:text-destructive p-1.5 rounded-md backdrop-blur-md border border-white/10 hover:border-destructive/50 transition-colors">
                <Youtube className="h-4 w-4" />
              </a>
            )}
          </div>

          <div className="font-display text-3xl font-black leading-none mb-1 tracking-tight text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] group-hover:text-primary transition-colors">{p.ign}</div>
          <div className="text-[11px] text-gray-300 uppercase tracking-widest font-mono mb-4">{p.name}</div>
          
          {p.kd > 0 && (
            <div className="grid grid-cols-3 gap-2 text-center pt-4 border-t border-primary/20 bg-background/40 backdrop-blur-md -mx-5 -mb-5 px-5 pb-5">
              <div>
                <div className="font-display text-lg font-bold text-gradient glow-text">{p.kd}</div>
                <div className="text-[8px] font-mono text-muted-foreground tracking-tighter uppercase">KD Ratio</div>
              </div>
              <div>
                <div className="font-display text-lg font-bold text-white/90">{p.finishes}</div>
                <div className="text-[8px] font-mono text-muted-foreground tracking-tighter uppercase">Total Kills</div>
              </div>
              <div>
                <div className="font-display text-lg font-bold text-accent">{p.mvp}</div>
                <div className="text-[8px] font-mono text-muted-foreground tracking-tighter uppercase">MVPs</div>
              </div>
            </div>
          )}
        </div>
      </article>
    </Reveal>
  );
}

function TeamPage() {
  const { players } = Route.useLoaderData();
  const roster = Array.isArray(players) ? players.filter((p: any) => p.status === 'active') : [];
  const pastMembers = Array.isArray(players) ? players.filter((p: any) => p.status === 'past') : [];

  return (
    <div className="pb-24">
      <section className="relative overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/20 blur-[120px] rounded-full -z-10" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 glass px-4 py-1.5 text-xs font-mono text-primary mb-6 shadow-neon-soft">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              TIER 1 DIVISION
            </div>
            <h1 className="font-display text-6xl sm:text-7xl lg:text-9xl font-black tracking-tighter leading-none mb-6 drop-shadow-lg">
              THE <span className="text-gradient glow-text">ZODIAC</span>
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto font-light">
              Architects of dominance. Every player is a specialist, every move is calculated.
              Witness the squad that redefines Indian esports.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="font-display text-4xl font-black italic tracking-tight text-white drop-shadow-md">ACTIVE SQUAD</h2>
          <div className="h-0.5 flex-1 bg-gradient-to-r from-primary to-transparent" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {roster.map((p, i) => <PlayerCard key={p.id} p={p} index={i} />)}
        </div>
      </section>

      {pastMembers.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-32">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="font-display text-3xl font-bold text-muted-foreground/60">Legacy Players</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-border/40 to-transparent" />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 opacity-60 hover:opacity-100 transition-opacity duration-700">
            {pastMembers.map((p, i) => <PlayerCard key={p.id} p={p} index={i} />)}
          </div>
        </section>
      )}

      {/* Advanced Analytics Table */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-32">
        <div className="glass p-8 sm:p-12 rounded-3xl relative overflow-hidden border-primary/20 shadow-neon-soft">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] -z-10" />
          <Reveal>
            <div className="font-mono text-xs text-primary uppercase tracking-[0.4em] mb-4">Internal Metrics</div>
            <h2 className="font-display text-4xl font-bold mb-8">Performance Analytics</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm font-mono">
                <thead>
                  <tr className="text-muted-foreground border-b border-border/40 bg-background/50">
                    <th className="text-left py-4 px-4 uppercase tracking-widest text-[10px]">Operator</th>
                    <th className="text-left py-4 px-4 uppercase tracking-widest text-[10px]">Spec</th>
                    <th className="text-right py-4 px-4 uppercase tracking-widest text-[10px]">K/D</th>
                    <th className="text-right py-4 px-4 uppercase tracking-widest text-[10px]">Combat Score</th>
                    <th className="text-right py-4 px-4 uppercase tracking-widest text-[10px]">Acc%</th>
                    <th className="text-right py-4 px-4 uppercase tracking-widest text-[10px]">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[...roster].filter(p => p.kd > 0).sort((a,b) => b.kd - a.kd).map((p) => (
                    <tr key={p.id} className="border-b border-border/20 group hover:bg-primary/10 transition-colors">
                      <td className="py-5 px-4 font-display font-bold text-base text-white">{p.ign}</td>
                      <td className="py-5 px-4 text-xs text-muted-foreground">{p.role}</td>
                      <td className="py-5 px-4 text-right text-primary font-bold text-lg">{p.kd}</td>
                      <td className="py-5 px-4 text-right font-bold text-white/90">{p.finishes * 124}</td>
                      <td className="py-5 px-4 text-right font-bold text-white/90">{p.accuracy}%</td>
                      <td className="py-5 px-4 text-right">
                        <span className="inline-flex items-center gap-1.5 text-[10px] text-emerald-400 font-bold bg-emerald-400/10 px-2 py-1 rounded">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          READY
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}