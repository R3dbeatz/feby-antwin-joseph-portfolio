
import { useState, useEffect, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import Timeline from '../components/Timeline';
import AboutMe from '../components/AboutMe';
import Projects from '../components/Projects';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { CustomEase } from "gsap/CustomEase";
import { RoughEase, ExpoScaleEase, SlowMo } from "gsap/EasePack";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Draggable } from "gsap/Draggable";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { EaselPlugin } from "gsap/EaselPlugin";
import { PixiPlugin } from "gsap/PixiPlugin";
import { TextPlugin } from "gsap/TextPlugin";
import { ScrollSmoother } from "gsap/dist/ScrollSmoother";

// Register all GSAP plugins
gsap.registerPlugin(
  useGSAP,
  Flip,
  ScrollTrigger,
  Observer,
  ScrollToPlugin,
  Draggable,
  MotionPathPlugin,
  EaselPlugin,
  PixiPlugin,
  TextPlugin,
  RoughEase,
  ExpoScaleEase,
  SlowMo,
  CustomEase,
  ScrollSmoother
);

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useLayoutEffect(() => {
    // Create a wrapper for smooth scrolling with enhanced configuration
    if (typeof window !== 'undefined') {
      try {
        ScrollSmoother.create({
          wrapper: "#smooth-wrapper",
          content: "#smooth-content",
          smooth: 1.5,
          effects: true,
          normalizeScroll: true,
          ignoreMobileResize: true,
          smoothTouch: 0.1,
          ease: "power2.out"
        });

        // Initialize ScrollTrigger to work with ScrollSmoother
        ScrollTrigger.defaults({
          scroller: "#smooth-wrapper"
        });

      } catch (error) {
        console.error('Error creating ScrollSmoother:', error);
      }
    }
  }, []);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen bg-dark"
        >
          <Navigation />
          <HeroSection />
          <AboutMe />
          <Timeline />
          <Projects />
          <Testimonials />
          <Contact />
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
