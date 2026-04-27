import { createFileRoute } from "@tanstack/react-router";
import { ChevronRight, Radio } from "lucide-react";
import { getNews } from "@/server/api";
import newsFeatureImg from "@/assets/news-feature.png";
import newsThumbImg from "@/assets/news-thumb.png";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/news")({
  loader: () => getNews(),
  head: () => ({
    meta: [
      { title: "News — TEAM ZOD ESPORTS" },
      { name: "description", content: "Match recaps, player spotlights, and announcements from TEAM ZOD ESPORTS." },
      { property: "og:title", content: "TEAM ZOD News" },
      { property: "og:description", content: "Match recaps, player spotlights, and clan announcements." },
    ],
  }),
  component: NewsPage,
});

function NewsPage() {
  const news = Route.useLoaderData();
  const [feature, ...rest] = news as any[];

  return (
    <div className="pb-24 bg-bg-deep relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-accent/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />

      <section className="relative pt-32 pb-16 min-h-[40vh] flex flex-col justify-center border-b border-white/5 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background">
        <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded bg-primary/10 border border-primary/30 px-4 py-1.5 text-[10px] font-mono text-primary font-bold uppercase tracking-[0.4em] mb-6 backdrop-blur-sm shadow-neon-soft">
              <Radio className="h-3.5 w-3.5 animate-pulse" /> BROADCAST CHANNEL
            </div>
            <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl font-black tracking-tighter leading-none mb-6 drop-shadow-lg text-white uppercase">
              FRONT <span className="text-gradient glow-text">LINE</span>
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
              Dispatches, intel drops, and match debriefs straight from the command center.
            </p>
          </Reveal>
        </div>
      </section>

      {feature && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-16">
          <Reveal y={40}>
            <div className="inline-flex items-center gap-4 mb-8">
              <h2 className="font-display text-2xl font-bold uppercase tracking-widest text-white">Latest Intel</h2>
              <div className="h-px w-32 bg-gradient-to-r from-primary to-transparent" />
            </div>
            
            <article className="group relative rounded-3xl border border-white/10 overflow-hidden mb-16 min-h-[500px] flex flex-col justify-end shadow-card hover:shadow-neon hover:border-primary/40 transition-all duration-700 cursor-pointer">
              <div className="absolute inset-0">
                <img src={newsFeatureImg} alt="Featured Article Background" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.03] opacity-60 mix-blend-lighten" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent" />
              </div>
              <div className="relative z-10 p-8 sm:p-12 md:p-16 w-full md:w-2/3 lg:w-1/2">
                <div className="flex items-center gap-3 text-xs font-mono mb-4">
                  <span className="inline-flex items-center justify-center rounded-sm bg-primary/20 text-primary border border-primary/30 px-3 py-1 font-bold uppercase tracking-[0.3em] shadow-[0_0_10px_rgba(var(--color-primary),0.3)]">
                    {feature.category}
                  </span>
                  <span className="text-gray-400 font-bold tracking-widest">{feature.date}</span>
                </div>
                <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black leading-tight text-white mb-6 drop-shadow-md group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all duration-300">
                  {feature.title}
                </h2>
                <p className="text-lg text-gray-400 font-light leading-relaxed mb-8 line-clamp-3">
                  {feature.excerpt}
                </p>
                <div className="inline-flex items-center gap-2 text-primary text-sm font-mono uppercase tracking-[0.2em] font-bold group-hover:text-white transition-colors">
                  READ DEBRIEF <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
                </div>
              </div>
            </article>
          </Reveal>

          <Reveal y={40} delay={100}>
            <div className="inline-flex items-center gap-4 mb-8">
              <h2 className="font-display text-2xl font-bold uppercase tracking-widest text-white">Archive</h2>
              <div className="h-px w-32 bg-gradient-to-r from-accent to-transparent" />
            </div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {rest.map((n: any, i: number) => (
                <Reveal key={n.id} delay={i * 100}>
                  <article className="group relative rounded-3xl border border-white/10 glass-darker overflow-hidden hover:border-accent/40 hover:shadow-[0_0_30px_rgba(var(--color-accent),0.15)] transition-all duration-500 flex flex-col h-full cursor-pointer">
                    <div className="h-56 overflow-hidden relative border-b border-white/10">
                      <img src={newsThumbImg} alt={n.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70" />
                      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-90" />
                    </div>
                    <div className="p-8 flex-1 flex flex-col relative">
                      <div className="absolute -top-4 left-8 inline-flex items-center justify-center rounded-sm bg-accent text-accent-foreground px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-[0.3em] shadow-[0_0_15px_rgba(var(--color-accent),0.6)]">
                        {n.category}
                      </div>
                      <div className="text-[10px] font-mono text-gray-500 font-bold tracking-widest mt-2 mb-4 uppercase">
                        {n.date}
                      </div>
                      <h3 className="font-display text-2xl font-bold text-white leading-snug mb-3 group-hover:text-accent transition-colors">
                        {n.title}
                      </h3>
                      <p className="text-sm text-gray-400 leading-relaxed line-clamp-3 mb-6 flex-1">
                        {n.excerpt}
                      </p>
                      <div className="inline-flex items-center gap-2 text-gray-300 text-xs font-mono uppercase tracking-[0.2em] font-bold group-hover:text-accent transition-colors mt-auto">
                        VIEW FILE <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </section>
      )}
    </div>
  );
}