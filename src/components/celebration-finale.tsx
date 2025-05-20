
"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ScrollFadeIn } from "@/components/scroll-fade-in";
import { PartyPopper } from "lucide-react";

const NUM_FIREWORKS = 10;

interface Firework {
  id: number;
  style: React.CSSProperties;
  delay: number;
}

export function CelebrationFinale() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [fireworks, setFireworks] = useState<Firework[]>([]);
  const [showFireworks, setShowFireworks] = useState(false);

  const triggerFireworks = () => {
    setShowFireworks(true);
    const newFireworks: Firework[] = [];
    for (let i = 0; i < NUM_FIREWORKS; i++) {
      newFireworks.push({
        id: i,
        delay: Math.random() * 2, // delay up to 2s
        style: {
          left: `${Math.random() * 80 + 10}%`, // 10% to 90%
          top: `${Math.random() * 40 + 20}%`,   // 20% to 60%
          width: `${Math.random() * 50 + 50}px`, // 50px to 100px
          height: `${Math.random() * 50 + 50}px`,
          backgroundColor: `hsl(${Math.random() * 360}, 100%, 70%)`,
        },
      });
    }
    setFireworks(newFireworks);

    // Show popup after fireworks animation starts
    setTimeout(() => setIsPopupOpen(true), 1500); 
  };

  return (
    <section className="py-20 px-4 md:px-8 text-center relative min-h-[70vh] flex flex-col items-center justify-center bg-gradient-to-b from-accent/30 to-background/70 backdrop-blur-sm overflow-hidden">
      <ScrollFadeIn className="w-full">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-primary">Here's to You, Anik!</h2>
        <p className="text-lg sm:text-xl text-foreground/80 mb-10 max-w-xl mx-auto">
          May your day be as bright as your smile, and your future even brighter.
        </p>
        
        {!showFireworks && (
          <Button onClick={triggerFireworks} size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6 rounded-full shadow-lg transform hover:scale-105 transition-transform">
            <PartyPopper className="mr-3 h-7 w-7" />
            Light up the Celebration!
          </Button>
        )}
      </ScrollFadeIn>

      {showFireworks && (
        <div className="absolute inset-0 pointer-events-none z-0">
          {fireworks.map((fw) => (
            <div
              key={fw.id}
              className="absolute rounded-full animate-fireworks-burst"
              style={{ ...fw.style, animationDelay: `${fw.delay}s` }}
              aria-hidden="true"
            />
          ))}
        </div>
      )}

      <AlertDialog open={isPopupOpen} onOpenChange={setIsPopupOpen}>
        <AlertDialogContent className="bg-card border-primary shadow-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl sm:text-3xl text-primary font-heading text-center">
              Forever Brothers! 🎉
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base sm:text-lg text-foreground/90 text-center py-4">
              No matter where life takes us, no matter how far apart we may be,
              the bond we forged, the memories we made, and the brotherhood we share
              will always tie us together. Happy Birthday, Anik!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:justify-center">
            <AlertDialogAction
              onClick={() => setIsPopupOpen(false)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 text-md"
            >
              Always! ❤️
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}
