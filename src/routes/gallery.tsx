import { createFileRoute } from "@tanstack/react-router";
import { Play, Camera, Film, ArrowRight } from "lucide-react";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — TEAM ZOD ESPORTS" },
      { name: "description", content: "Photos and highlight videos from TEAM ZOD ESPORTS — scrims, tournaments, and behind the scenes." },
      { property: "og:title", content: "TEAM ZOD Gallery" },
      { property: "og:description", content: "Photos and highlights from the ZOD journey." },
      { property: "og:image", content: g1 },
    ],
  }),
  component: GalleryPage,
});

const photos = [
  { src: g1, span: "lg:col-span-2 lg:row-span-2", alt: "Esports arena", tag: "MAIN STAGE" },
  { src: g2, span: "", alt: "Trophy on stage", tag: "VICTORY" },
  { src: g3, span: "lg:col-span-2", alt: "Team celebrating", tag: "BOOTCAMP" },
  { src: g4, span: "", alt: "Gaming setup", tag: "GEAR" },
];

function GalleryPage() {
  return (
    <div className="pb-24 bg-bg-deep relative overflow-hidden">
      <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] bg-primary/20 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />
      <div className="absolute top-[30%] left-[-10%] w-[500px] h-[500px] bg-accent/20 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />

      <section className="relative overflow-hidden pt-32 pb-20 min-h-[50vh] flex flex-col justify-center border-b border-white/5">
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded bg-primary/10 border border-primary/30 px-4 py-1.5 text-[10px] font-mono text-primary font-bold uppercase tracking-[0.4em] mb-6 backdrop-blur-sm shadow-neon-soft">
              <Camera className="h-3.5 w-3.5" /> VISUAL ARCHIVE
            </div>
            <h1 className="font-display text-7xl sm:text-8xl lg:text-[10rem] font-black tracking-tighter leading-none mb-6 drop-shadow-lg text-white uppercase">
              THE <span className="text-gradient glow-text">VAULT</span>
            </h1>
            <p className="mt-4 text-lg sm:text-2xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
              Inside the bootcamp, on the main stage, and everywhere in between.
            </p>
          </Reveal>
        </div>
      </section>

      {/* YouTube Highlights API Mock */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12 relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="font-mono text-xs text-rose-500 uppercase tracking-[0.4em] font-bold mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" /> Latest Drops
            </div>
            <h2 className="font-display text-4xl font-black text-white uppercase tracking-tight">Recent Highlights</h2>
          </div>
          <Button variant="outline" className="hidden sm:flex border-rose-500/30 text-rose-400 hover:bg-rose-500 hover:text-white uppercase tracking-widest font-bold">
            Subscribe <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {[
            { id: "v1", title: "ZOD REAPER INSANE 1v4 CLUTCH - BMPS FINALS", views: "142K", time: "2 days ago", thumb: g2 },
            { id: "v2", title: "ZODIACOMMS: Ep 4 - Inside the Bootcamp", views: "89K", time: "1 week ago", thumb: g1 },
            { id: "v3", title: "HOW TO ROTATE LIKE A PRO | ZOD SENSEI", views: "210K", time: "2 weeks ago", thumb: g3 },
          ].map((v, i) => (
            <Reveal key={v.id} delay={i * 100} className="group cursor-pointer">
              <div className="relative aspect-video rounded-2xl overflow-hidden mb-4 border border-white/10 shadow-card group-hover:border-rose-500/50 transition-colors duration-500">
                <img src={v.thumb} alt={v.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-rose-500/90 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 shadow-[0_0_20px_rgba(244,63,94,0.5)]">
                    <Play className="h-5 w-5 text-white fill-current ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-[10px] font-mono text-white">10:24</div>
              </div>
              <h3 className="font-display font-bold text-white text-lg leading-tight mb-2 group-hover:text-rose-400 transition-colors">{v.title}</h3>
              <div className="text-xs font-mono text-gray-500">{v.views} views • {v.time}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Main Media Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="font-mono text-xs text-primary uppercase tracking-[0.4em] font-bold mb-8">Raw Vault Archive</div>
        <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[250px] gap-4 sm:gap-6">
          {photos.map((p, i) => (
            <Reveal key={i} delay={i * 100} y={20} className={p.span}>
              <div className={`relative rounded-3xl overflow-hidden border border-white/10 bg-card group h-full shadow-card hover:shadow-neon hover:border-primary/50 transition-all duration-500`}>
                <img src={p.src} alt={p.alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />
                <div className="absolute bottom-0 inset-x-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="inline-flex items-center justify-center rounded-sm bg-primary text-primary-foreground px-2 py-1 text-[9px] font-mono font-bold uppercase tracking-[0.3em] shadow-[0_0_10px_rgba(var(--color-primary),0.8)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {p.tag}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-32">
        <Reveal className="flex items-center gap-4 mb-10">
          <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-white">Match Highlights</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-accent/50 to-transparent" />
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((n, i) => (
            <Reveal key={n} delay={i * 100} y={20}>
              <a href="#" className="group block aspect-video rounded-3xl overflow-hidden border border-white/10 bg-card relative shadow-card hover:shadow-[0_0_30px_rgba(var(--color-accent),0.3)] hover:border-accent/50 transition-all duration-500">
                <img src={[g1, g3, g2][n - 1]} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-90" />
                <div className="absolute inset-0 grid place-items-center">
                  <div className="h-16 w-16 rounded-full bg-accent text-accent-foreground grid place-items-center shadow-[0_0_20px_rgba(var(--color-accent),0.6)] group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(var(--color-accent),1)] transition-all duration-300 relative">
                    <div className="absolute inset-0 rounded-full border border-accent animate-ping opacity-50" />
                    <Play className="h-7 w-7 fill-current ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-0 inset-x-0 p-6">
                  <div className="flex items-center gap-2 text-[10px] font-mono text-accent uppercase tracking-[0.3em] font-bold mb-2">
                    <Film className="h-3 w-3" /> YouTube
                  </div>
                  <div className="font-display font-black text-xl text-white group-hover:text-accent transition-colors">Vlog: Bootcamp Day {n}</div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}