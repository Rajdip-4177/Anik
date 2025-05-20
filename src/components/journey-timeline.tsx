
"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollFadeIn } from "@/components/scroll-fade-in";
import { BookOpenText, Rocket, Users, Gem, Link as LinkIcon } from "lucide-react";

const journeyMemories = [
  {
    class: "Class 6",
    title: "New Beginnings",
    description: "Stepping into a new world, and found a friend for life. Our story began here.",
    emoji: "🤝",
    icon: Users,
    color: "text-green-500",
  },
  {
    class: "Class 7",
    title: "Adventures & Laughter",
    description: "Our first big adventures, endless conversations, and laughter that echoed.",
    emoji: "🚀",
    icon: Rocket,
    color: "text-blue-500",
  },
  {
    class: "Class 8",
    title: "Challenges & Support",
    description: "Facing challenges, navigating tough times, but always having each other's back.",
    emoji: "💪",
    icon: BookOpenText, // Represents studies/challenges
    color: "text-yellow-500",
  },
  {
    class: "Class 9",
    title: "Shared Dreams",
    description: "Dreaming big, side by side, planning our futures and imagining what's next.",
    emoji: "✨",
    icon: Gem, // Represents precious dreams
    color: "text-purple-500",
  },
  {
    class: "Class 10",
    title: "Stronger Than Ever",
    description: "Years down, a bond forged in trust and shared experiences. Our journey continues...",
    emoji: "🔗",
    icon: LinkIcon,
    color: "text-red-500",
  },
];

export function JourneyTimeline() {
  return (
    <section className="py-16 px-4 md:px-8 bg-background/70 backdrop-blur-sm">
      <ScrollFadeIn>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 text-primary">Our Journey</h2>
      </ScrollFadeIn>
      <div className="max-w-3xl mx-auto space-y-8">
        {journeyMemories.map((memory, index) => (
          <ScrollFadeIn key={memory.class} delay={`delay-${index * 100}`}>
            <Card className="shadow-xl overflow-hidden bg-card/80 border-border hover:shadow-2xl transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center gap-4 p-6 bg-muted/50">
                <memory.icon className={`w-10 h-10 ${memory.color} hidden sm:block`} />
                <div>
                  <CardTitle className="text-xl sm:text-2xl md:text-3xl text-primary-foreground bg-primary px-3 py-1 rounded-md inline-block mb-1">
                    {memory.class}
                  </CardTitle>
                  <h3 className="text-xl font-semibold text-foreground">{memory.title} <span className="ml-2 sm:hidden">{memory.emoji}</span></h3>
                </div>
              </CardHeader>
              <CardContent className="p-6 text-base sm:text-lg text-foreground/90">
                <p>{memory.description}</p>
              </CardContent>
            </Card>
          </ScrollFadeIn>
        ))}
      </div>
    </section>
  );
}
