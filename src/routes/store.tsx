import { createFileRoute } from "@tanstack/react-router";
import { getMerch } from "@/server/api";
import { ShoppingBag, Star, Zap } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/store")({
  loader: () => getMerch(),
  head: () => ({
    meta: [
      { title: "Store | TEAM ZOD ESPORTS" },
      { name: "description", content: "Official TEAM ZOD merchandise and apparel." },
    ],
  }),
  component: StorePage,
});

function StorePage() {
  const merch = Route.useLoaderData();

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      <Reveal className="text-center mb-16">
        <div className="font-mono text-xs text-primary uppercase tracking-[0.4em] font-bold mb-4 drop-shadow-md flex items-center justify-center gap-2">
          <ShoppingBag className="h-4 w-4" /> Official Gear
        </div>
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-display font-black text-white uppercase tracking-tighter drop-shadow-lg mb-8">
          ZOD <span className="text-gradient glow-text">ARMORY</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">Wear the colors of dominance. Premium quality esports apparel designed for gamers.</p>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {merch.map((item: any, i: number) => (
          <Reveal key={item.id} delay={i * 100} y={20}>
            <div className="glass rounded-3xl overflow-hidden border border-white/10 group shadow-card hover:shadow-neon hover:border-primary/40 transition-all duration-500 flex flex-col h-full">
              <div className="relative aspect-[4/5] overflow-hidden bg-black/50">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
                <div className="absolute top-4 left-4">
                  {item.status === 'AVAILABLE' ? (
                    <div className="inline-flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 font-bold bg-background/80 backdrop-blur-md px-2.5 py-1 rounded-sm border border-emerald-400/30">
                      <Zap className="h-3 w-3" /> IN STOCK
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-1.5 text-[10px] font-mono text-rose-400 font-bold bg-background/80 backdrop-blur-md px-2.5 py-1 rounded-sm border border-rose-400/30">
                      OUT OF STOCK
                    </div>
                  )}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1 bg-background/60">
                <h3 className="font-display text-2xl font-bold text-white mb-2">{item.name}</h3>
                <p className="text-sm text-gray-400 mb-6 flex-1">{item.description}</p>
                <div className="flex items-center justify-between">
                  <div className="font-display text-3xl font-black text-primary">₹{item.price}</div>
                  <Button disabled={item.status !== 'AVAILABLE'} className="bg-white text-black hover:bg-primary hover:text-primary-foreground font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                    {item.status === 'AVAILABLE' ? 'Add to Cart' : 'Sold Out'}
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
