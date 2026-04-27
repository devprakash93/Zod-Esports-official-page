export function ZodLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        <div className="absolute inset-0 rounded-md blur-md bg-primary/60" aria-hidden />
        <div className="relative h-8 w-8 rounded-md bg-gradient-to-br from-primary to-accent grid place-items-center font-display font-bold text-primary-foreground text-sm">
          Z
        </div>
      </div>
      <div className="leading-none">
        <div className="font-display font-bold tracking-widest text-sm">TEAM ZOD</div>
        <div className="font-mono text-[10px] text-muted-foreground tracking-[0.3em]">ESPORTS</div>
      </div>
    </div>
  );
}