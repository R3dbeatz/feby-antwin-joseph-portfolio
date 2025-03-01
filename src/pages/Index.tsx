
import { useState } from 'react';
import Layout from '../components/Layout';
import HeroSection from '../components/HeroSection';
import Timeline from '../components/Timeline';
import AboutMe from '../components/AboutMe';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import WhatTheySaid from '../components/WhatTheySaid';
import Motto from '../components/Motto';
import Contact from '../components/Contact';
import Resume from '../components/Resume';
import FlowingMenu from '../components/FlowingMenu';
import Education from '../components/Education';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <Layout isLoading={isLoading} onLoadingComplete={handleLoadingComplete}>
      <section id="hero" className="pt-0">
        <HeroSection />
      </section>
      <section id="about">
        <AboutMe />
      </section>
      <section id="education">
        <Education />
      </section>
      <section id="expertise">
        <Experience />
      </section>
      <section id="flowing-menu">
        <FlowingMenu />
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
    </Layout>
  );
};

export default Index;
