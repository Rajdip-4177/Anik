"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { generateHeartfeltMessage, type GenerateHeartfeltMessageInput } from "@/ai/flows/generate-heartfelt-message";
import { ScrollFadeIn } from "@/components/scroll-fade-in";
import { Loader2, Wand2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function HeartfeltMessageSection() {
  const [aiMessage, setAiMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerateMessage = async () => {
    setIsLoading(true);
    setAiMessage(null);
    try {
      const input: GenerateHeartfeltMessageInput = {
        friendName: "Anik",
        senderName: "Rajdip",
        yearsOfFriendship: 5, // Class 6, 7, 8, 9, 10
        sharedMemories: "We've been best friends since Class 6, navigating school life together, sharing countless laughs, supporting each other through ups and downs, and dreaming about our futures side-by-side. He's more than a friend, he's a brother.",
      };
      const result = await generateHeartfeltMessage(input);
      setAiMessage(result.message);
    } catch (error) {
      console.error("Failed to generate message:", error);
      toast({
        title: "Oops!",
        description: "Couldn't generate the special message right now. Please try again in a bit.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 px-4 md:px-8 bg-background/70 backdrop-blur-sm">
      <ScrollFadeIn>
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 text-primary">A Message From My Heart</h2>
      </ScrollFadeIn>
      <ScrollFadeIn delay="delay-100">
        <Card className="max-w-2xl mx-auto shadow-xl bg-card/80 border-border">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl text-center text-primary-foreground bg-primary p-3 rounded-md">
              To My Dearest Anik
            </CardTitle>
          </CardHeader>
          <CardContent className="text-lg text-center space-y-6">
            <p className="text-foreground/90">
              "This may be our last birthday together before Class 11 might set us on different paths... 
              but nothing, absolutely nothing, can ever break the bond we've built. 
              The memories we've made are etched in my heart forever."
            </p>
            
            {!aiMessage && !isLoading && (
              <Button onClick={handleGenerateMessage} size="lg" className="mt-4">
                <Wand2 className="mr-2 h-5 w-5" />
                Want to read something more from me? Click here!
              </Button>
            )}
            
            {isLoading && (
              <div className="flex items-center justify-center mt-6 p-4 text-muted-foreground">
                <Loader2 className="mr-2 h-6 w-6 animate-spin text-primary" />
                Crafting a special message for you...
              </div>
            )}

            {aiMessage && (
              <ScrollFadeIn>
                <div className="mt-6 p-6 border border-primary rounded-lg bg-accent/30 shadow-inner">
                  <h3 className="text-xl font-semibold mb-3 text-primary font-heading">A Little Extra...</h3>
                  <p className="text-foreground whitespace-pre-line text-left">{aiMessage}</p>
                </div>
              </ScrollFadeIn>
            )}
          </CardContent>
        </Card>
      </ScrollFadeIn>
    </section>
  );
}
