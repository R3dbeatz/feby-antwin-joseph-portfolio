
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import Timeline from '../components/Timeline';
import AboutMe from '../components/AboutMe';
import Projects from '../components/Projects';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);

    // Hero Section parallax effect
    gsap.from('.hero-content', {
      scrollTrigger: {
        trigger: '.hero-content',
        start: 'top center',
        end: 'bottom top',
        scrub: 1,
      },
      y: 0,
      opacity: 1,
      scale: 1,
    });

    // About Me section animation
    gsap.from('.about-content', {
      scrollTrigger: {
        trigger: '.about-content',
        start: 'top 80%',
        end: 'top 20%',
        scrub: 1,
        toggleActions: 'play none none reverse',
      },
      y: 50,
      opacity: 0,
    });

    // Timeline items stagger animation
    gsap.from('.timeline-item', {
      scrollTrigger: {
        trigger: '.timeline-container',
        start: 'top 70%',
        end: 'bottom 20%',
        scrub: 1,
      },
      y: 100,
      opacity: 0,
      stagger: 0.2,
    });

    // Projects grid animation
    gsap.from('.project-card', {
      scrollTrigger: {
        trigger: '.projects-grid',
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 1,
      },
      y: 50,
      opacity: 0,
      stagger: 0.1,
    });

    // Testimonials fade in
    gsap.from('.testimonial-card', {
      scrollTrigger: {
        trigger: '.testimonials-container',
        start: 'top 70%',
        end: 'bottom 20%',
        scrub: 1,
      },
      y: 30,
      opacity: 0,
      stagger: 0.15,
    });

    // Contact section slide up
    gsap.from('.contact-content', {
      scrollTrigger: {
        trigger: '.contact-content',
        start: 'top 80%',
        end: 'top 30%',
        scrub: 1,
      },
      y: 50,
      opacity: 0,
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-dark"
    >
      <Navigation />
      <div className="hero-content">
        <HeroSection />
      </div>
      <div className="about-content">
        <AboutMe />
      </div>
      <div className="timeline-container">
        <Timeline />
      </div>
      <div className="projects-grid">
        <Projects />
      </div>
      <div className="testimonials-container">
        <Testimonials />
      </div>
      <div className="contact-content">
        <Contact />
      </div>
    </motion.div>
  );
};

export default Index;
