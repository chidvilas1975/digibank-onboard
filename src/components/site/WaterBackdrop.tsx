/** Layered liquid-glass backdrop: drifting blobs, bubbles and a wave line. */
export function WaterBackdrop({ bubbles = 7 }: { bubbles?: number }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="animate-water-drift absolute -left-24 top-[-10%] size-[520px] rounded-full bg-azure/25 blur-3xl" />
      <div
        className="animate-water-drift absolute -right-32 bottom-[-20%] size-[560px] rounded-full bg-mint/20 blur-3xl"
        style={{ animationDelay: "-8s" }}
      />
      <div
        className="animate-water-drift absolute left-1/3 top-1/4 size-[380px] rounded-full bg-primary/20 blur-3xl"
        style={{ animationDelay: "-14s" }}
      />

      {Array.from({ length: bubbles }).map((_, index) => (
        <span
          key={index}
          className="animate-bubble-up absolute bottom-0 rounded-full border border-primary-foreground/30 bg-primary-foreground/10 backdrop-blur-sm"
          style={{
            left: `${8 + index * 12}%`,
            width: `${10 + (index % 4) * 9}px`,
            height: `${10 + (index % 4) * 9}px`,
            animationDelay: `${index * 0.9}s`,
            animationDuration: `${6 + (index % 3) * 2}s`,
          }}
        />
      ))}

      <div className="absolute inset-x-0 bottom-0 h-24 overflow-hidden opacity-40">
        <svg
          className="animate-wave-x h-full w-[200%]"
          viewBox="0 0 1200 100"
          preserveAspectRatio="none"
        >
          <path
            d="M0 60 Q 75 20 150 60 T 300 60 T 450 60 T 600 60 T 750 60 T 900 60 T 1050 60 T 1200 60 V100 H0 Z"
            fill="currentColor"
            className="text-azure/40"
          />
        </svg>
      </div>
    </div>
  );
}
