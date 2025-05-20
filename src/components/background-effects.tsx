"use client";

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const NUM_CONFETTI = 60; // Slightly increased for a fuller effect
const NUM_SPARKLES = 35;

interface EffectItem {
  id: number;
  style: React.CSSProperties;
  type: 'confetti' | 'sparkle';
}

export function BackgroundEffects() {
  const [effects, setEffects] = useState<EffectItem[]>([]);
  const [confettiColors, setConfettiColors] = useState<string[]>([]);

  useEffect(() => {
    // Get CSS variables for colors after component mounts (client-side)
    const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
    const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
    
    setConfettiColors([
      `hsl(${primaryColor})`,
      `hsl(${accentColor})`,
      'hsl(45, 90%, 70%)', // Warm Gold
      'hsl(330, 80%, 85%)', // Soft Pink/Magenta
      'hsl(25, 90%, 75%)' // Soft Orange
    ]);
  }, []);

  useEffect(() => {
    if (confettiColors.length === 0) return; // Don't generate effects until colors are ready

    const generatedEffects: EffectItem[] = [];

    // Generate Confetti
    for (let i = 0; i < NUM_CONFETTI; i++) {
      generatedEffects.push({
        id: i,
        type: 'confetti',
        style: {
          left: `${Math.random() * 100}vw`,
          animationDuration: `${Math.random() * 4 + 5}s`, // 5s to 9s for a slower, gentler fall
          animationDelay: `${Math.random() * 6}s`,
          width: `${Math.random() * 6 + 4}px`, // 4px to 10px
          height: `${Math.random() * 12 + 6}px`, // 6px to 18px
          backgroundColor: confettiColors[Math.floor(Math.random() * confettiColors.length)],
          transform: `rotate(${Math.random() * 360}deg)`,
          opacity: (Math.random() * 0.3 + 0.6).toString(), // 0.6 to 0.9 opacity
        },
      });
    }

    // Generate Sparkles
    const primarySparkleColor = confettiColors[0]; // Use the primary color for sparkles
    for (let i = NUM_CONFETTI; i < NUM_CONFETTI + NUM_SPARKLES; i++) {
      generatedEffects.push({
        id: i,
        type: 'sparkle',
        style: {
          left: `${Math.random() * 100}vw`,
          top: `${Math.random() * 100}vh`,
          width: `${Math.random() * 2.5 + 1}px`, // 1px to 3.5px, slightly finer
          height: `${Math.random() * 2.5 + 1}px`,
          animationDelay: `${Math.random() * 2.5}s`,
          backgroundColor: primarySparkleColor, // Use primary color from themed palette
          opacity: (Math.random() * 0.4 + 0.4).toString(), // 0.4 to 0.8 opacity
        },
      });
    }
    setEffects(generatedEffects);
  }, [confettiColors]); // Re-run when confettiColors are set

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {effects.map(item => (
        item.type === 'confetti' ? (
          <div
            key={item.id}
            className="absolute top-0 animate-fall rounded-sm"
            style={item.style}
            aria-hidden="true"
          />
        ) : (
          <div
            key={item.id}
            className="absolute animate-sparkle-glow rounded-full"
            style={item.style}
            aria-hidden="true"
          />
        )
      ))}
    </div>
  );
}
