"use client";
import { AnimatedCakeIcon } from '@/components/icons/animated-cake-icon';
import { ScrollFadeIn } from '@/components/scroll-fade-in';

export function HeroBanner() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center p-8 relative overflow-hidden">
      <ScrollFadeIn delay="delay-100">
        <AnimatedCakeIcon className="w-32 h-40 md:w-40 md:h-52 mb-8" />
      </ScrollFadeIn>
      <ScrollFadeIn delay="delay-300">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 text-primary">
          Happy Birthday, Anik!
        </h1>
      </ScrollFadeIn>
      <ScrollFadeIn delay="delay-500">
        <p className="text-xl md:text-2xl text-foreground/80">
          From your brother, Rajdip
        </p>
      </ScrollFadeIn>
    </section>
  );
}
