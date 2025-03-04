
import { useState, useEffect, useRef } from 'react';
import { scrambleText, getNextRevealIndex } from '../utils/textEffects';

interface TextScrambleOptions {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  revealDirection?: 'start' | 'end' | 'center';
  useOriginalCharsOnly?: boolean;
  characters?: string;
  animateOn?: 'view' | 'hover';
}

interface TextScrambleState {
  displayText: string;
  isScrambling: boolean;
  revealedIndices: Set<number>;
  hasAnimated: boolean;
}

export function useTextScramble({
  text,
  speed = 50,
  maxIterations = 10,
  sequential = false,
  revealDirection = 'start',
  useOriginalCharsOnly = false,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+',
  animateOn = 'view'
}: TextScrambleOptions) {
  const [state, setState] = useState<TextScrambleState>({
    displayText: text,
    isScrambling: false,
    revealedIndices: new Set<number>(),
    hasAnimated: false
  });
  
  const [isActive, setIsActive] = useState<boolean>(animateOn === 'view');
  const intervalRef = useRef<number | null>(null);
  const iterationRef = useRef<number>(0);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Handle animation state changes
  useEffect(() => {
    if (isActive) {
      startAnimation();
    } else {
      stopAnimation();
    }
    
    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isActive, text]);

  const startAnimation = () => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
    }
    
    iterationRef.current = 0;
    
    setState(prev => ({
      ...prev,
      isScrambling: true
    }));
    
    intervalRef.current = window.setInterval(() => {
      setState(prev => {
        if (sequential) {
          if (prev.revealedIndices.size < text.length) {
            const nextIndex = getNextRevealIndex(text, prev.revealedIndices, revealDirection);
            const newRevealed = new Set(prev.revealedIndices);
            newRevealed.add(nextIndex);
            
            return {
              ...prev,
              displayText: scrambleText(text, newRevealed, characters, useOriginalCharsOnly),
              revealedIndices: newRevealed
            };
          } else {
            if (intervalRef.current) {
              window.clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
            
            return {
              ...prev,
              isScrambling: false,
              hasAnimated: true
            };
          }
        } else {
          iterationRef.current++;
          
          if (iterationRef.current >= maxIterations) {
            if (intervalRef.current) {
              window.clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
            
            return {
              ...prev,
              displayText: text,
              isScrambling: false,
              hasAnimated: true
            };
          }
          
          return {
            ...prev,
            displayText: scrambleText(text, prev.revealedIndices, characters, useOriginalCharsOnly)
          };
        }
      });
    }, speed);
  };

  const stopAnimation = () => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    setState({
      displayText: text,
      isScrambling: false,
      revealedIndices: new Set(),
      hasAnimated: state.hasAnimated
    });
  };

  // For intersection observer (view-triggered animation)
  const observeElement = (element: HTMLElement | null) => {
    if (!element || state.hasAnimated || animateOn !== 'view') return;
    
    observerRef.current?.disconnect();
    
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !state.hasAnimated) {
            setIsActive(true);
            setState(prev => ({ ...prev, hasAnimated: true }));
          }
        });
      },
      { threshold: 0.1 }
    );
    
    observerRef.current.observe(element);
  };

  const toggleAnimation = (active: boolean) => {
    if (animateOn === 'hover') {
      setIsActive(active);
    }
  };

  return {
    displayText: state.displayText,
    isScrambling: state.isScrambling,
    revealedIndices: state.revealedIndices,
    isActive,
    observeElement,
    toggleAnimation
  };
}
