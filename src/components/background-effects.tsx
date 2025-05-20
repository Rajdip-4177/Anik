
"use client";

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const NUM_CONFETTI = 60; 
const NUM_SPARKLES = 35;

interface EffectItem {
  id: number;
  style: React.CSSProperties;
  type: 'confetti' | 'sparkle';
}

export function BackgroundEffects() {
  const [effects, setEffects] = useState<EffectItem[]>([]);
  const [confettiColors, setConfettiColors] = useState<string[]>([]);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true); // Component has mounted on the client
  }, []);

  useEffect(() => {
    if (!hasHydrated) return; // Only run after client-side hydration

    const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
    const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
    
    setConfettiColors([
      `hsl(${primaryColor})`,
      `hsl(${accentColor})`,
      'hsl(45, 90%, 70%)', 
      'hsl(330, 80%, 85%)', 
      'hsl(25, 90%, 75%)' 
    ]);
  }, [hasHydrated]);

  useEffect(() => {
    if (!hasHydrated || confettiColors.length === 0) return; // Wait for hydration and colors

    const generatedEffects: EffectItem[] = [];

    // Generate Confetti
    for (let i = 0; i < NUM_CONFETTI; i++) {
      generatedEffects.push({
        id: i,
        type: 'confetti',
        style: {
          left: `${Math.random() * 100}vw`,
          animationDuration: `${Math.random() * 4 + 5}s`, 
          animationDelay: `${Math.random() * 6}s`,
          width: `${Math.random() * 6 + 4}px`, 
          height: `${Math.random() * 12 + 6}px`, 
          backgroundColor: confettiColors[Math.floor(Math.random() * confettiColors.length)],
          transform: `rotate(${Math.random() * 360}deg)`,
          opacity: (Math.random() * 0.3 + 0.6).toString(), 
        },
      });
    }

    // Generate Sparkles
    const primarySparkleColor = confettiColors[0]; 
    for (let i = NUM_CONFETTI; i < NUM_CONFETTI + NUM_SPARKLES; i++) {
      generatedEffects.push({
        id: i,
        type: 'sparkle',
        style: {
          left: `${Math.random() * 100}vw`,
          top: `${Math.random() * 100}vh`,
          width: `${Math.random() * 2.5 + 1}px`, 
          height: `${Math.random() * 2.5 + 1}px`,
          animationDelay: `${Math.random() * 2.5}s`,
          backgroundColor: primarySparkleColor, 
          opacity: (Math.random() * 0.4 + 0.4).toString(), 
        },
      });
    }
    setEffects(generatedEffects);
  }, [hasHydrated, confettiColors]); 

  if (!hasHydrated) {
    return null; // Render nothing on the server or before client-side hydration is complete
  }

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
