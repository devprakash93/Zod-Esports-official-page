import { createFileRoute } from "@tanstack/react-router";
import { Mail, MessageCircle, MapPin, Instagram, Youtube, Twitch, ShieldAlert, Zap, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | TEAM ZOD ESPORTS" },
      { name: "description", content: "Get in touch with TEAM ZOD for business, sponsorships, and community." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="pb-24">
      <section className="relative overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/20 blur-[120px] rounded-full -z-10" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded bg-primary/10 border border-primary/30 px-4 py-1.5 text-[10px] font-mono text-primary font-bold uppercase tracking-[0.4em] mb-6 backdrop-blur-sm shadow-[0_0_15px_rgba(var(--color-primary),0.3)]">
              <ShieldAlert className="h-3.5 w-3.5" /> COMMS OPEN
            </div>
            <h1 className="font-display text-6xl sm:text-7xl lg:text-9xl font-black tracking-tighter leading-none mb-6 drop-shadow-lg text-white">
              CONNECT WITH <span className="text-gradient glow-text">ZOD</span>
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
              Business inquiries, sponsorship opportunities, or just dropping by the community. 
              We are always looking for the next big play.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8">
          <Reveal y={30} className="rounded-3xl border border-white/10 glass-darker p-8 sm:p-12 shadow-card hover:border-primary/40 transition-colors duration-500">
            <h2 className="font-display text-4xl font-black text-white uppercase tracking-tight mb-8">Business Inquiries</h2>
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-primary uppercase tracking-[0.2em] font-bold">Name</label>
                  <input type="text" className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors font-mono" placeholder="JOHN DOE" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-primary uppercase tracking-[0.2em] font-bold">Company</label>
                  <input type="text" className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors font-mono" placeholder="ORGANIZATION" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-primary uppercase tracking-[0.2em] font-bold">Email</label>
                <input type="email" className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors font-mono" placeholder="CONTACT@DOMAIN.COM" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-primary uppercase tracking-[0.2em] font-bold">Message</label>
                <textarea rows={4} className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors font-mono resize-none" placeholder="SECURE COMMS..."></textarea>
              </div>
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-14 text-lg font-bold uppercase tracking-widest shadow-neon">
                Transmit Message
              </Button>
            </form>
          </Reveal>

          <Reveal y={30} delay={100} className="flex flex-col justify-between gap-8">
            <div className="rounded-3xl border border-white/10 glass-darker p-8 sm:p-12 shadow-card hover:border-accent/40 transition-colors duration-500">
              <h2 className="font-display text-3xl font-black text-white uppercase tracking-tight mb-8">Direct Comms</h2>
              <div className="space-y-6">
                <a href="mailto:business@teamzod.com" className="flex items-center gap-4 group">
                  <div className="h-12 w-12 rounded-xl bg-background/50 border border-white/10 grid place-items-center group-hover:border-primary/50 group-hover:text-primary transition-all">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">General & Press</div>
                    <div className="font-mono text-sm text-white group-hover:text-primary transition-colors">business@teamzod.com</div>
                  </div>
                </a>
                <div className="flex items-center gap-4 group">
                  <div className="h-12 w-12 rounded-xl bg-background/50 border border-white/10 grid place-items-center group-hover:border-accent/50 group-hover:text-accent transition-all">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Headquarters</div>
                    <div className="font-mono text-sm text-white group-hover:text-accent transition-colors">Mumbai, India</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Official Partners */}
            <div className="rounded-3xl border border-white/10 bg-background/50 p-8 sm:p-12 shadow-card grow flex flex-col justify-center">
              <div className="font-mono text-xs text-gray-500 uppercase tracking-[0.4em] font-bold text-center mb-6">Official Partners</div>
              <div className="flex justify-center items-center gap-8 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                <div className="font-display text-2xl font-black tracking-widest text-white">RED BULL</div>
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                <div className="font-display text-2xl font-black tracking-widest text-white">INTEL</div>
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                <div className="font-display text-2xl font-black tracking-widest text-white">LOGITECH G</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Central Command - Discord Integration */}
      <Reveal delay={100} y={30} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12 mb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-stretch h-[500px]">
          <div className="rounded-3xl border border-[#5865F2]/30 bg-gradient-to-br from-[#5865F2]/10 via-background to-background p-8 sm:p-16 relative overflow-hidden shadow-[0_0_50px_rgba(88,101,242,0.15)] group h-full flex flex-col justify-center">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#5865F2]/20 blur-[120px] rounded-full pointer-events-none group-hover:bg-[#5865F2]/30 transition-colors duration-1000" />
            <MessageSquare className="h-16 w-16 text-[#5865F2] mb-8 drop-shadow-[0_0_15px_rgba(88,101,242,0.8)]" />
            <h2 className="font-display text-4xl sm:text-6xl font-black text-white uppercase tracking-tight mb-6">
              Join the <br/><span className="text-[#5865F2]">Inner Circle</span>
            </h2>
            <p className="text-gray-400 text-lg sm:text-xl font-light mb-10 max-w-lg">
              The ZOD community hub is where we scout talent, host community customs, and drop major announcements before anywhere else.
            </p>
            <Button asChild size="lg" className="w-fit bg-[#5865F2] hover:bg-[#4752C4] text-white h-16 px-10 text-lg font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(88,101,242,0.4)] hover:shadow-[0_0_30px_rgba(88,101,242,0.6)] transition-all">
              <a href="https://discord.com" target="_blank" rel="noreferrer">Enter Server</a>
            </Button>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/50 overflow-hidden h-full flex items-center justify-center p-4 relative shadow-card">
            <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
            <iframe 
              src="https://discord.com/widget?id=81384788765712384&theme=dark" 
              width="100%" 
              height="100%" 
              allowTransparency={true} 
              frameBorder="0" 
              sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
              className="relative z-10 rounded-xl h-full w-full"
            ></iframe>
          </div>
        </div>
      </Reveal>
    </div>
  );
}