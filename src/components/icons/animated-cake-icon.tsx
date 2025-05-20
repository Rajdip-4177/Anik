import { cn } from '@/lib/utils';

interface AnimatedCakeIconProps {
  className?: string;
}

export function AnimatedCakeIcon({ className }: AnimatedCakeIconProps) {
  return (
    <svg
      viewBox="0 0 100 120"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-24 h-30", className)}
      aria-label="Animated Birthday Cake"
      data-ai-hint="birthday cake"
    >
      {/* Cake Layers */}
      <rect x="10" y="70" width="80" height="20" rx="5" ry="5" className="fill-primary" />
      <rect x="15" y="90" width="70" height="20" rx="5" ry="5" className="fill-accent opacity-80" />
      
      {/* Icing */}
      <path d="M10 70 Q15 60, 20 70 T30 70 T40 70 T50 70 T60 70 T70 70 T80 70 T90 70" className="fill-secondary opacity-70" stroke="hsl(var(--card-foreground))" strokeWidth="1" />

      {/* Candles (5 candles) */}
      {[30, 40, 50, 60, 70].map((cx, index) => (
        <g key={`candle-${index}`}>
          <rect x={cx - 2.5} y="45" width="5" height="20" className="fill-background" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" />
          <ellipse cx={cx} cy="45" rx="3.5" ry="2.5" className="fill-yellow-400 animate-flicker" style={{ animationDelay: `${index * 0.1}s` }} />
        </g>
      ))}
      
      {/* Base Plate (Optional) */}
      <ellipse cx="50" cy="112" rx="45" ry="5" className="fill-muted" />
    </svg>
  );
}
