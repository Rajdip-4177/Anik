// components/scroll-fade-in.tsx
"use client";
import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

type ScrollFadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: string; // e.g., 'delay-200' for tailwind delay utility
  threshold?: number;
  once?: boolean; // Trigger animation only once
};

export function ScrollFadeIn({ children, className, delay = '', threshold = 0.1, once = true }: ScrollFadeInProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(entry.target);
          }
        } else {
          if (!once) {
            setIsVisible(false);
          }
        }
      },
      { threshold }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, once]);

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-1000 ease-out',
        delay,
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
        className
      )}
    >
      {children}
    </div>
  );
}
