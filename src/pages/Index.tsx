
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import Timeline from '../components/Timeline';
import AboutMe from '../components/AboutMe';
import Projects from '../components/Projects';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Spline from '@splinetool/react-spline';

declare global {
  interface Window {
    Lenis: any;
  }
}

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [splineLoaded, setSplineLoaded] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

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
      // Hero Section Animation
      gsap.from("#hero", {
        scrollTrigger: {
          trigger: "#hero",
          start: "top center",
          end: "bottom center",
          scrub: 1,
        },
        y: 50,
        opacity: 0,
        duration: 1
      });

      // About Section Animation
      gsap.from("#about", {
        scrollTrigger: {
          trigger: "#about",
          start: "top center+=100",
          end: "center center",
          scrub: 1,
        },
        y: 50,
        opacity: 0,
        duration: 1
      });

      // Timeline Section Animation
      gsap.from("#experience", {
        scrollTrigger: {
          trigger: "#experience",
          start: "top center+=100",
          end: "center center",
          scrub: 1,
        },
        y: 50,
        opacity: 0,
        duration: 1
      });

      // Projects Section Animation
      gsap.from("#projects", {
        scrollTrigger: {
          trigger: "#projects",
          start: "top center+=100",
          end: "center center",
          scrub: 1,
        },
        y: 50,
        opacity: 0,
        duration: 1
      });

      // Testimonials Section Animation
      gsap.from("#testimonials", {
        scrollTrigger: {
          trigger: "#testimonials",
          start: "top center+=100",
          end: "center center",
          scrub: 1,
        },
        y: 50,
        opacity: 0,
        duration: 1
      });

      // Contact Section Animation
      gsap.from("#contact", {
        scrollTrigger: {
          trigger: "#contact",
          start: "top center+=100",
          end: "center center",
          scrub: 1,
        },
        y: 50,
        opacity: 0,
        duration: 1
      });
    }, mainRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      lenis.destroy();
    };
  }, []);

  const onSplineLoad = () => {
    console.log('Spline scene loaded');
    setSplineLoaded(true);
  };

  return (
    <motion.div
      ref={mainRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-dark-lighter relative"
    >
      {/* Spline Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Spline 
          scene="https://prod.spline.design/83fLANec8PGfTbg7/scene.splinecode"
          onLoad={onSplineLoad}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <Navigation />
        <section id="hero" className="pt-0">
          <HeroSection />
        </section>
        <section id="about">
          <AboutMe />
        </section>
        <section id="experience">
          <Timeline />
        </section>
        <section id="projects">
          <Projects />
        </section>
        <section id="testimonials">
          <Testimonials />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </div>
    </motion.div>
  );
};

export default Index;
