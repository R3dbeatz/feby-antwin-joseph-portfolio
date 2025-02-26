
import { useState, useEffect, useLayoutEffect } from 'react';
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
import { ScrollSmoother } from 'gsap/ScrollSmoother';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useLayoutEffect(() => {
    // Create a wrapper for smooth scrolling
    ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 2, // Adjust this value to control smoothness (higher = smoother)
      smoothTouch: true, // Enable smooth scrolling on touch devices
      effects: true, // Enable inertia/momentum effects
      normalizeScroll: true, // Normalize scroll behavior across devices
      ignoreMobileResize: true, // Prevent issues with mobile browser chrome
    });
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
