// src/components/music-player.tsx
"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, Music2 } from 'lucide-react';

export function MusicPlayer() {
  // isPlaying is true if audio is currently playing, false otherwise.
  // Initialized to false; 'play' event updates it if autoplay is successful.
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        // Attempt to play. The 'play' event will update isPlaying state if successful.
        audioRef.current.play().catch(error => {
          console.warn("Audio play failed (user interaction might be needed, or an error occurred):", error);
          // isPlaying will remain false or be set to false by the 'pause' event.
        });
      }
    }
  };

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);

      audioElement.addEventListener('play', handlePlay);
      audioElement.addEventListener('pause', handlePause);
      
      // Check initial state if autoPlay is present.
      // If it's already playing due to `autoPlay` attribute (before this effect runs), set state.
      // If it's paused but `autoPlay` is true, it means autoplay likely failed or hasn't started yet.
      if (!audioElement.paused) {
        setIsPlaying(true);
      } else if (audioElement.autoplay) {
        // A direct play attempt here can sometimes help, but still subject to browser policy
        audioElement.play().catch(err => {
          console.warn("Autoplay attempt in useEffect failed:", err);
        });
      }

      return () => {
        audioElement.removeEventListener('play', handlePlay);
        audioElement.removeEventListener('pause', handlePause);
      };
    }
  }, []); // Runs once on mount

  return (
    <>
      {/* 
        To add music:
        1. Create a folder named 'audio' inside your 'public' folder (e.g., your-project-root/public/audio).
        2. Place your MP3 file (e.g., 'happy-birthday.mp3') in that 'public/audio/' folder.
        3. The 'src' attribute below should correctly point to this file (e.g., '/audio/happy-birthday.mp3'). 
           If your filename is different, update the src attribute.

        Autoplay behavior:
        - The 'autoPlay' attribute attempts to start the music automatically when the page loads.
        - Modern browsers have strict autoplay policies and often block autoplay with sound 
          until the user interacts with the page (e.g., clicks a button). 
        - If autoplay is blocked, the music will not play until the user clicks the play button.
        - The music will loop if it successfully plays.
      */}
      <audio 
        ref={audioRef} 
        src="/audio/happy-birthday.mp3" // Ensure this path matches your file in public/audio/
        loop 
        autoPlay 
        preload="auto" // Hints to the browser to load audio data.
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
