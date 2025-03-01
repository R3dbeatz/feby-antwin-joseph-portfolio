
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import Timeline from '../components/Timeline';
import AboutMe from '../components/AboutMe';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import WhatTheySaid from '../components/WhatTheySaid';
import Motto from '../components/Motto';
import Contact from '../components/Contact';
import Resume from '../components/Resume';
import LoadingScreen from '../components/LoadingScreen';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

declare global {
  interface Window {
    Lenis: any;
  }
}

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoaded(true);
    
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
    }, mainRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      lenis.destroy();
    };
  }, []);

  return (
    <>
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      <motion.div
        ref={mainRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gradient-to-b from-dark-lighter to-dark relative"
      >
        {/* Main Content */}
        <div className="relative z-10">
          <Navigation />
          <section id="hero" className="pt-0">
            <HeroSection />
          </section>
          <section id="about">
            <AboutMe />
          </section>
          <section id="expertise">
            <Experience />
          </section>
          <section id="experience">
            <Timeline />
          </section>
          <section id="projects">
            <Projects />
          </section>
          <section id="testimonials">
            <WhatTheySaid />
          </section>
          <section id="motto">
            <Motto />
          </section>
          <section id="resume">
            <Resume />
          </section>
          <section id="contact">
            <Contact />
          </section>
        </div>
      </motion.div>
    </>
  );
};

export default Index;
