
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
  CustomEase
);

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useLayoutEffect(() => {
    // Set up smooth scrolling with ScrollTrigger
    if (typeof window !== 'undefined') {
      gsap.config({
        autoSleep: 60,
        force3D: true
      });

      // Smooth scroll setup
      const content = document.querySelector("#smooth-content");
      if (content) {
        gsap.to(content, {
          y: () => -(content.scrollHeight - window.innerHeight),
          ease: "none",
          scrollTrigger: {
            trigger: content,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.5,
            invalidateOnRefresh: true
          }
        });
      }
    }
  }, []);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-dark overflow-hidden">
      <div id="smooth-content">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
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
