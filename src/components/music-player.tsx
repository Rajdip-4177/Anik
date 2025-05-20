
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
    setHasHydrated(true);
  }, []);

  const togglePlayPause = () => {
    if (!hasHydrated || !audioRef.current) {
      console.warn("MusicPlayer: Attempted to toggle play/pause before component hydrated or audio element is ready.");
      return;
    }

    const audioElement = audioRef.current;
    if (audioElement.paused) {
      audioElement.play().catch(error => {
        console.error("MusicPlayer: Error encountered while trying to play audio:", error);
        // isPlaying state will be updated by 'error' or remain false if 'play' event doesn't fire
      });
    } else {
      audioElement.pause();
    }
    // The isPlaying state is primarily managed by the 'play', 'pause', and 'error' event listeners
  };

  useEffect(() => {
    if (!hasHydrated || !audioRef.current) {
      return;
    }

    const audioElement = audioRef.current;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleAudioError = (event: Event) => {
      console.error("MusicPlayer: Audio element reported an error during operation:", event);
      setIsPlaying(false); // Ensure UI reflects that audio is not playing
    };
    const handleCanPlayThrough = () => {
      // Attempt to autoplay only if it's still paused and intended
      // This check avoids re-playing if user paused it before canplaythrough
      if (audioElement.paused) {
        // Autoplay attempt. Modern browsers are very restrictive.
        // This might log a warning/error if blocked, which is expected.
        audioElement.play().catch(error => {
          console.info("MusicPlayer: Programmatic autoplay attempt failed or was interrupted (this is common). User interaction will be required.", error.name, error.message);
        });
      }
    };

    audioElement.addEventListener('play', handlePlay);
    audioElement.addEventListener('pause', handlePause);
    audioElement.addEventListener('error', handleAudioError); // Important for runtime errors
    
    // Check if audio is ready enough to attempt play, otherwise wait for 'canplaythrough'
    if (audioElement.readyState >= HTMLMediaElement.HAVE_ENOUGH_DATA) {
      handleCanPlayThrough();
    } else {
      audioElement.addEventListener('canplaythrough', handleCanPlayThrough, { once: true });
    }

    // Initial sync of isPlaying state
    setIsPlaying(!audioElement.paused);

    return () => {
      audioElement.removeEventListener('play', handlePlay);
      audioElement.removeEventListener('pause', handlePause);
      audioElement.removeEventListener('error', handleAudioError);
      audioElement.removeEventListener('canplaythrough', handleCanPlayThrough);
    };
  }, [hasHydrated]); // Re-run when hasHydrated changes

  if (!hasHydrated) {
    return null; // Don't render UI on server or before hydration
  }

  // This handler is specifically for the <audio> element's onError prop
  const handleAudioElementSourceError = (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
    const error = e.currentTarget.error;
    console.error("MusicPlayer: HTMLAudioElement onError (source loading/decoding issue):", error);
    if (error) {
        switch (error.code) {
            case MediaError.MEDIA_ERR_ABORTED:
                console.error('Fetching process aborted by user.');
                break;
            case MediaError.MEDIA_ERR_NETWORK:
                console.error('A network error caused the audio download to fail.');
                break;
            case MediaError.MEDIA_ERR_DECODE:
                console.error('Audio decoding error. The file might be corrupted or in an unsupported format.');
                break;
            case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
                console.error('The audio source is not supported or the file could not be found at the specified path.');
                break;
            default:
                console.error('An unknown error occurred with the audio element.');
                break;
        }
    }
    setIsPlaying(false); // Reflect error in UI state
  };

  return (
    <>
      <audio 
        ref={audioRef} 
        src="/audio/Khaamoshi mein bhi tera awaaz sunta hoon.mp3" 
        loop 
        preload="auto"
        onError={handleAudioElementSourceError} // Catch errors related to loading/decoding the audio source
      />
      <div className="fixed bottom-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={togglePlayPause}
          className="rounded-full w-12 h-12 bg-card/80 hover:bg-card border-primary/50 hover:border-primary text-primary shadow-lg"
          aria-label={isPlaying ? "Pause music" : "Play music"}
          title={isPlaying ? "Pause music" : "Play music"} 
        >
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          <Music2 className="w-5 h-5 absolute opacity-20 group-hover:opacity-40 transition-opacity" style={{pointerEvents: 'none'}} />
        </Button>
      </div>
    </>
  );
}
