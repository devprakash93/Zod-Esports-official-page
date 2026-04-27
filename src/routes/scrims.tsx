import { createFileRoute } from "@tanstack/react-router";
import { Star, Trophy, Target, Crosshair, Zap } from "lucide-react";
import { getScrims } from "@/server/api";
import scrimsBgImg from "@/assets/scrims-bg.png";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/scrims")({
  loader: () => getScrims(),
  head: () => ({
    meta: [
      { title: "Scrims | TEAM ZOD ESPORTS" },
      { name: "description", content: "Daily and weekly scrim results from TEAM ZOD." },
    ],
  }),
  component: ScrimsPage,
});

function ScrimsPage() {
  const scrims = Route.useLoaderData();

  const totalMatches = scrims.length;
  const wins = scrims.filter((s: any) => s.placement === 1).length;
  const winRate = totalMatches > 0 ? ((wins / totalMatches) * 100).toFixed(1) : 0;
  const avgPoints = totalMatches > 0 ? (scrims.reduce((acc: any, curr: any) => acc + curr.points, 0) / totalMatches).toFixed(1) : 0;
  const avgPlacement = totalMatches > 0 ? (scrims.reduce((acc: any, curr: any) => acc + curr.placement, 0) / totalMatches).toFixed(1) : 0;
  const totalKills = scrims.reduce((acc: any, curr: any) => acc + (curr.kills || 0), 0);

  return (
    <div className="pb-24 bg-bg-deep relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-accent/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[40vw] h-[40vw] bg-primary/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />

      <section className="relative overflow-hidden pt-32 pb-20 min-h-[50vh] flex flex-col justify-center border-b border-white/5">
        <div className="absolute inset-0">
          <img src={scrimsBgImg} alt="Scrims Tactical Map" className="w-full h-full object-cover opacity-20 mix-blend-screen" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          <div className="absolute inset-0 bg-grid opacity-10" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded bg-accent/10 border border-accent/30 px-4 py-1.5 text-[10px] font-mono text-accent font-bold uppercase tracking-[0.4em] mb-6 backdrop-blur-sm shadow-[0_0_15px_rgba(var(--color-accent),0.3)]">
              <Crosshair className="h-3.5 w-3.5" /> LIVE TRAINING LOGS
            </div>
            <h1 className="font-display text-7xl sm:text-8xl lg:text-[10rem] font-black tracking-tighter leading-none mb-6 drop-shadow-lg text-white uppercase">
              THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary glow-text">GRIND</span>
            </h1>
            <p className="mt-4 text-lg sm:text-2xl text-gray-400 max-w-3xl font-light leading-relaxed">
              Every drop, every rotation, every gunfight. This is where champions are built.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12 relative z-10">
        <Reveal y={30}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { label: "Win Rate", value: `${winRate}%`, I: Trophy, c: "text-amber-400" },
              { label: "Avg Points", value: avgPoints, I: Target, c: "text-primary" },
              { label: "Avg Placement", value: avgPlacement, I: Crosshair, c: "text-emerald-400" },
              { label: "Total Kills", value: totalKills, I: Zap, c: "text-rose-400" },
            ].map((s, i) => (
              <div key={s.label} className="glass group p-6 rounded-2xl hover:border-white/20 transition-all cursor-default relative overflow-hidden shadow-card hover:shadow-neon">
                <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity"><s.I className={`h-8 w-8 ${s.c}`} /></div>
                <div className={`h-1.5 w-1.5 rounded-full ${s.c} mb-4 shadow-[0_0_10px_currentColor]`} />
                <div className="font-display text-4xl font-bold mb-1 text-white drop-shadow-md">{s.value}</div>
                <div className="text-[10px] text-gray-400 uppercase tracking-widest font-mono font-bold group-hover:text-white transition-colors">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>

        {scrims.length > 0 && (
          <Reveal delay={300} className="mb-16">
            <div className="glass p-8 rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent relative overflow-hidden shadow-neon-soft">
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/10 blur-[100px] rounded-full -z-10" />
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="font-mono text-xs text-primary uppercase tracking-[0.4em] mb-2 font-bold">Top Performance</div>
                  <h3 className="font-display text-3xl font-bold text-white">Best Daily Scrim</h3>
                </div>
                <Trophy className="h-10 w-10 text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]" />
              </div>
              <div className="grid sm:grid-cols-3 gap-6">
                <div className="bg-background/40 backdrop-blur-md border border-white/5 p-4 rounded-xl">
                  <div className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-1">Most Points</div>
                  <div className="text-3xl font-display font-black text-primary">{Math.max(...scrims.map((s:any) => s.points))}</div>
                </div>
                <div className="bg-background/40 backdrop-blur-md border border-white/5 p-4 rounded-xl">
                  <div className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-1">Highest Kills</div>
                  <div className="text-3xl font-display font-black text-rose-400">{Math.max(...scrims.map((s:any) => s.kills || 0))}</div>
                </div>
                <div className="bg-background/40 backdrop-blur-md border border-white/5 p-4 rounded-xl">
                  <div className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-1">Top MVP</div>
                  <div className="text-xl font-display font-black text-amber-400">{scrims.reduce((acc:any, curr:any) => (scrims.filter((s:any)=>s.mvp===curr.mvp).length > scrims.filter((s:any)=>s.mvp===acc).length) ? curr.mvp : acc, scrims[0]?.mvp)}</div>
                </div>
              </div>
            </div>
          </Reveal>
        )}

        <Reveal y={40} delay={100}>
          <div className="rounded-3xl border border-white/10 glass-darker overflow-hidden shadow-2xl relative">
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
            
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-black/40 border-b border-white/10">
                  <tr>
                    <th className="text-left p-6 font-mono text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold">Date</th>
                    <th className="text-left p-6 font-mono text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold">Lobby</th>
                    <th className="text-center p-6 font-mono text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold">Placement</th>
                    <th className="text-center p-6 font-mono text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold">Points</th>
                    <th className="text-center p-6 font-mono text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold">Kills</th>
                    <th className="text-right p-6 font-mono text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold">MVP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {scrims.map((s: any) => (
                    <tr key={s.id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="p-6 font-mono text-gray-400 group-hover:text-white transition-colors">{s.date}</td>
                      <td className="p-6 font-semibold text-gray-300">{s.lobby}</td>
                      <td className="p-6 text-center">
                        <div className={`inline-flex items-center justify-center min-w-[3rem] py-1 rounded-sm font-display text-lg font-black ${s.placement === 1 ? 'bg-accent/20 text-accent border border-accent/50 shadow-[0_0_15px_rgba(var(--color-accent),0.4)]' : 'text-gray-300'}`}>
                          #{s.placement}
                        </div>
                      </td>
                      <td className="p-6 text-center font-mono text-lg font-bold text-gray-300">{s.points}</td>
                      <td className="p-6 text-center font-mono text-lg font-bold text-rose-400">{s.kills || 0}</td>
                      <td className="p-6 text-right">
                        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-full text-primary font-mono text-xs font-bold uppercase tracking-wider group-hover:border-primary/50 group-hover:shadow-[0_0_10px_rgba(var(--color-primary),0.3)] transition-all">
                          <Star className="h-3 w-3 fill-current" /> {s.mvp}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}