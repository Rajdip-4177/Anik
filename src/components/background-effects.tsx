"use client";

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const NUM_CONFETTI = 50;
const NUM_SPARKLES = 30;

interface EffectItem {
  id: number;
  style: React.CSSProperties;
  type: 'confetti' | 'sparkle';
}

export function BackgroundEffects() {
  const [effects, setEffects] = useState<EffectItem[]>([]);

  useEffect(() => {
    const generatedEffects: EffectItem[] = [];

    // Generate Confetti
    for (let i = 0; i < NUM_CONFETTI; i++) {
      generatedEffects.push({
        id: i,
        type: 'confetti',
        style: {
          left: `${Math.random() * 100}vw`,
          animationDuration: `${Math.random() * 3 + 4}s`, // 4s to 7s
          animationDelay: `${Math.random() * 5}s`,
          width: `${Math.random() * 8 + 4}px`, // 4px to 12px
          height: `${Math.random() * 15 + 5}px`, // 5px to 20px
          backgroundColor: `hsl(${Math.random() * 360}, 70%, 70%)`,
          transform: `rotate(${Math.random() * 360}deg)`,
        },
      });
    }

    // Generate Sparkles
    for (let i = NUM_CONFETTI; i < NUM_CONFETTI + NUM_SPARKLES; i++) {
      generatedEffects.push({
        id: i,
        type: 'sparkle',
        style: {
          left: `${Math.random() * 100}vw`,
          top: `${Math.random() * 100}vh`,
          width: `${Math.random() * 3 + 1}px`, // 1px to 4px
          height: `${Math.random() * 3 + 1}px`,
          animationDelay: `${Math.random() * 2}s`,
          backgroundColor: 'hsl(var(--primary))',
        },
      });
    }
    setEffects(generatedEffects);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {effects.map(item => (
        item.type === 'confetti' ? (
          <div
            key={item.id}
            className="absolute top-0 animate-fall opacity-70 rounded-sm"
            style={item.style}
            aria-hidden="true"
          />
        ) : (
          <div
            key={item.id}
            className="absolute animate-sparkle-glow opacity-50 rounded-full"
            style={item.style}
            aria-hidden="true"
          />
        )
      ))}
    </div>
  );
}
