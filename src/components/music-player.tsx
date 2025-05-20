
// src/components/music-player.tsx
"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, Music2 } from 'lucide-react';

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true); // Component has mounted on the client
  }, []);

  const togglePlayPause = () => {
    if (!hasHydrated || !audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(error => {
        console.warn("Audio play failed (user interaction might be needed, or an error occurred):", error);
      });
    }
  };

  useEffect(() => {
    if (!hasHydrated) return; // Wait for hydration

    const audioElement = audioRef.current;
    if (audioElement) {
      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);

      audioElement.addEventListener('play', handlePlay);
      audioElement.addEventListener('pause', handlePause);
      
      // Sync isPlaying state with the audio element's current state
      // and attempt autoplay if specified and initially paused.
      if (!audioElement.paused) {
        setIsPlaying(true);
      } else {
        setIsPlaying(false); // Ensure state is false if paused
        if (audioElement.autoplay) { // If autoplay is true and it's paused, attempt to play
           audioElement.play().catch(err => {
              console.warn("Autoplay attempt in useEffect failed:", err);
           });
        }
      }

      return () => {
        audioElement.removeEventListener('play', handlePlay);
        audioElement.removeEventListener('pause', handlePause);
      };
    }
  }, [hasHydrated]); // Effect depends on hasHydrated

  if (!hasHydrated) {
    return null; // Don't render UI on server or before hydration
  }

  return (
    <>
      <audio 
        ref={audioRef} 
        src="/audio/happy-birthday.mp3" // Ensure this path matches your file in public/audio/
        loop 
        autoPlay 
        preload="auto" 
      />
      <div className="fixed bottom-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={togglePlayPause}
          className="rounded-full w-12 h-12 bg-card/80 hover:bg-card border-primary/50 hover:border-primary text-primary shadow-lg"
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          <Music2 className="w-5 h-5 absolute opacity-20 group-hover:opacity-40 transition-opacity" style={{pointerEvents: 'none'}} />
        </Button>
      </div>
    </>
  );
}
