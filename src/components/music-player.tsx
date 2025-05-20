// src/components/music-player.tsx
"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, Music2 } from 'lucide-react';

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          // Autoplay was prevented or another error occurred
          console.warn("Audio play failed:", error);
          setIsPlaying(false); // Ensure state is correct if play fails
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      // Update isPlaying state if audio ends on its own (though it loops)
      const handleEnded = () => setIsPlaying(false);
      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);

      audioElement.addEventListener('ended', handleEnded);
      audioElement.addEventListener('play', handlePlay);
      audioElement.addEventListener('pause', handlePause);

      return () => {
        audioElement.removeEventListener('ended', handleEnded);
        audioElement.removeEventListener('play', handlePlay);
        audioElement.removeEventListener('pause', handlePause);
      };
    }
  }, []);

  return (
    <>
      {/* 
        IMPORTANT: You need to add an audio file to your project.
        1. Create a folder named 'audio' inside the 'public' folder.
        2. Place your 'happy-birthday.mp3' (or similar) file in 'public/audio/'.
        3. The 'src' below should then correctly point to '/audio/happy-birthday.mp3'.
      */}
      <audio ref={audioRef} src="/audio/happy-birthday.mp3" loop preload="metadata" />
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
