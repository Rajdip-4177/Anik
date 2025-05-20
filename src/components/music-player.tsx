
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
        console.warn("Audio play failed on toggle. User interaction might be needed, or an error occurred:", error);
      });
    }
    // The actual isPlaying state will be updated by the 'play' and 'pause' event listeners.
  };

  useEffect(() => {
    if (!hasHydrated) return; // Wait for hydration

    const audioElement = audioRef.current;
    if (audioElement) {
      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);

      // Function to attempt playing the audio
      const tryAutoplay = () => {
        // Only try to play if it's still paused.
        // This check is important because the 'canplaythrough' event might fire
        // after the user has already manually started/paused the audio.
        if (audioElement.paused) {
          audioElement.play().catch(error => {
            console.warn("Programmatic autoplay attempt failed. This is often due to browser autoplay policies. User interaction (e.g., clicking play) might be required.", error);
          });
        }
      };

      audioElement.addEventListener('play', handlePlay);
      audioElement.addEventListener('pause', handlePause);

      // Check if the audio is ready to play.
      // readyState HAVE_ENOUGH_DATA (4) means enough data is available to start playing.
      if (audioElement.readyState >= HTMLMediaElement.HAVE_ENOUGH_DATA) {
        tryAutoplay();
      } else {
        // If not ready, wait for the 'canplaythrough' event.
        audioElement.addEventListener('canplaythrough', tryAutoplay, { once: true });
      }
      
      // Initial state sync: If audio is already playing (e.g. from a previous successful autoplay or state restoration)
      // or if it's paused.
      if (!audioElement.paused) {
        setIsPlaying(true);
      } else {
        setIsPlaying(false);
      }

      return () => {
        audioElement.removeEventListener('play', handlePlay);
        audioElement.removeEventListener('pause', handlePause);
        audioElement.removeEventListener('canplaythrough', tryAutoplay);
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
        preload="auto" 
        // autoPlay attribute removed in favor of programmatic attempt in useEffect
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
