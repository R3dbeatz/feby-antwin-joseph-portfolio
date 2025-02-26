
import { useState, useEffect } from 'react';
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

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Initialize smooth scrolling
    gsap.to("body", {
      scrollBehavior: "smooth",
      ease: "power2.inOut",
    });

    return () => {
      // Cleanup ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
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
  );
};

export default Index;
