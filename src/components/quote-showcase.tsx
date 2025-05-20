"use client";
import { ScrollFadeIn } from "@/components/scroll-fade-in";
import { Heart, Users } from "lucide-react";

const quotes = [
  {
    text: "A true friend is the greatest of all blessings, a priceless treasure.",
    author: "Francois de La Rochefoucauld (adapted)",
    icon: Heart,
  },
  {
    text: "Friendship isn't about whom you have known the longest. It's about who walked into your life, said 'I'm here for you,' and PROVED IT.",
    author: "Unknown",
    icon: Users,
  },
  {
    text: "In the cookie of life, friends are the chocolate chips. You, Anik, are the biggest chip!",
    author: "Rajdip (inspired by Salman Rushdie)",
    icon: Heart,
  },
  {
    text: "A brother shares childhood memories and grown-up dreams. You're that brother to me.",
    author: "Rajdip",
    icon: Users,
  },
];

export function QuoteShowcase() {
  return (
    <section className="py-16 px-4 md:px-8 bg-accent/30 backdrop-blur-sm">
      <ScrollFadeIn>
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-primary">Words That Echo Our Bond</h2>
      </ScrollFadeIn>
      <div className="max-w-3xl mx-auto space-y-10">
        {quotes.map((quote, index) => (
          <ScrollFadeIn key={index} delay={`delay-${index * 100}`}>
            <blockquote className="text-center p-6 border-l-4 border-primary bg-card/80 shadow-lg rounded-r-lg">
              <quote.icon className="w-8 h-8 text-primary mx-auto mb-4" />
              <p className="text-xl md:text-2xl italic text-foreground mb-3">"{quote.text}"</p>
              <footer className="text-md text-muted-foreground">- {quote.author}</footer>
            </blockquote>
          </ScrollFadeIn>
        ))}
      </div>
    </section>
  );
}
