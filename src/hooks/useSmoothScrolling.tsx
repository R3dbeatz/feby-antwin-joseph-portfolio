
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

declare global {
  interface Window {
    Lenis: any;
  }
}

export const useSmoothScrolling = (ref: React.RefObject<HTMLDivElement>) => {
  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis with slower duration
    const lenis = new window.Lenis({
      duration: 2.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    // Integrate GSAP with Lenis
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    
    requestAnimationFrame(raf);

    const ctx = gsap.context(() => {
      // Hero Section Animation - removed opacity transition
      gsap.from("#hero", {
        scrollTrigger: {
          trigger: "#hero",
          start: "top center",
          end: "bottom center",
          scrub: 1,
        },
        y: 50,
        duration: 1
      });

      // About Section Animation - removed opacity transition
      gsap.from("#about", {
        scrollTrigger: {
          trigger: "#about",
          start: "top center+=100",
          end: "center center",
          scrub: 1,
        },
        y: 50,
        duration: 1
      });

      // Experience Section Animation - removed opacity transition
      gsap.from("#expertise", {
        scrollTrigger: {
          trigger: "#expertise",
          start: "top center+=100",
          end: "center center",
          scrub: 1,
        },
        y: 50,
        duration: 1
      });

      // Education Section Animation
      gsap.from("#education", {
        scrollTrigger: {
          trigger: "#education",
          start: "top center+=100",
          end: "center center",
          scrub: 1,
        },
        y: 50,
        duration: 1
      });

      // Timeline Section Animation - removed opacity transition
      gsap.from("#experience", {
        scrollTrigger: {
          trigger: "#experience",
          start: "top center+=100",
          end: "center center",
          scrub: 1,
        },
        y: 50,
        duration: 1
      });

      // Projects Section Animation - removed opacity transition
      gsap.from("#projects", {
        scrollTrigger: {
          trigger: "#projects",
          start: "top center+=100",
          end: "center center",
          scrub: 1,
        },
        y: 50,
        duration: 1
      });

      // Resume Section Animation - removed opacity transition
      gsap.from("#resume", {
        scrollTrigger: {
          trigger: "#resume",
          start: "top center+=100",
          end: "center center",
          scrub: 1,
        },
        y: 50,
        duration: 1
      });

      // What They Said Section Animation - removed opacity transition
      gsap.from("#testimonials", {
        scrollTrigger: {
          trigger: "#testimonials",
          start: "top center+=100",
          end: "center center",
          scrub: 1,
        },
        y: 50,
        duration: 1
      });

      // Motto Section Animation - removed opacity transition
      gsap.from("#motto", {
        scrollTrigger: {
          trigger: "#motto",
          start: "top center+=100",
          end: "center center",
          scrub: 1,
        },
        y: 50,
        duration: 1
      });

      // Contact Section Animation - removed opacity transition
      gsap.from("#contact", {
        scrollTrigger: {
          trigger: "#contact",
          start: "top center+=100",
          end: "center center",
          scrub: 1,
        },
        y: 50,
        duration: 1
      });
    }, ref);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      lenis.destroy();
    };
  }, [ref]);
};
