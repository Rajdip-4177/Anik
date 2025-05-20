import { HeroBanner } from '@/components/hero-banner';
import { JourneyTimeline } from '@/components/journey-timeline';
import { QuoteShowcase } from '@/components/quote-showcase';
import { HeartfeltMessageSection } from '@/components/heartfelt-message-section';
import { CelebrationFinale } from '@/components/celebration-finale';
import { EasterEgg } from '@/components/easter-egg';
import { Separator } from '@/components/ui/separator';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center w-full">
      <HeroBanner />
      
      <SectionSeparator />
      <JourneyTimeline />
      
      <SectionSeparator />
      <QuoteShowcase />
      
      <SectionSeparator />
      <HeartfeltMessageSection />
      
      <SectionSeparator />
      <CelebrationFinale />
      
      <EasterEgg />

      <footer className="w-full py-8 text-center bg-background/50 backdrop-blur-sm mt-10">
        <p className="text-foreground/70 text-sm">
          Crafted with ❤️ by Rajdip for his best friend Anik.
        </p>
        <p className="text-muted-foreground text-xs mt-1">
          Happy Birthday, Brother!
        </p>
      </footer>
    </div>
  );
}

function SectionSeparator() {
  return (
    <div className="w-full max-w-4xl mx-auto my-8 md:my-12">
      <Separator className="bg-primary/30 h-[2px]" />
    </div>
  );
}
