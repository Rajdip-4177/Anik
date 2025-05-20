"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react"; // Using Sparkles icon

export function EasterEgg() {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full w-10 h-10 text-yellow-400 hover:text-yellow-300 hover:bg-transparent animate-pulse">
            <Sparkles className="w-6 h-6" />
            <span className="sr-only">A little secret</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto max-w-xs p-4 shadow-xl bg-popover border-primary" side="top" align="end">
          <div className="text-center">
            <p className="font-heading text-lg text-primary mb-2">Psst... Anik!</p>
            <p className="text-sm text-popover-foreground">
              You still owe me that game of Ludo where you *totally* didn't cheat last time! 😉
            </p>
            <p className="text-xs text-muted-foreground mt-2">- Your Bro, Rajdip</p>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
