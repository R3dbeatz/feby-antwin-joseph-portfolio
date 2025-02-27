
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

const timelineItems = [
  {
    year: '2024',
    title: 'Senior Marketing Strategist',
    description: 'Leading digital transformation initiatives and brand campaigns.',
  },
  {
    year: '2022',
    title: 'Marketing Team Lead',
    description: 'Managed successful product launches and marketing campaigns.',
  },
  {
    year: '2020',
    title: 'Digital Marketing Specialist',
    description: 'Developed and executed comprehensive digital marketing strategies.',
  },
];

const Timeline = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const titleTextRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, TextPlugin);
    
    // Create our main timeline
    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=1000",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      }
    });

    if (sectionRef.current && titleRef.current && contentRef.current && bgRef.current && maskRef.current) {
      // Initial animation to reveal the title
      masterTl.from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 1
      });
      
      // Scale up the mask effect
      masterTl.to(maskRef.current, {
        scale: 20,
        duration: 4,
        ease: "power2.inOut",
      }, ">");
      
      // Change the background color to #b7ab98
      masterTl.to(bgRef.current, {
        backgroundColor: "#b7ab98",
        duration: 0.5,
      }, "-=0.5");
      
      // Fade in content
      masterTl.from(contentRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
      }, "-=0.2");
      
      // Make sure timeline is visible after animation
      masterTl.to(titleRef.current, {
        opacity: 1,
        color: "#0d0d0d", // Dark color for contrast with the new bg
        duration: 0.3,
      }, "-=0.5");
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="section min-h-screen overflow-hidden" id="experience">
      {/* Background div that will change color */}
      <div 
        ref={bgRef} 
        className="absolute inset-0 w-full h-full bg-dark transition-colors duration-500"
      ></div>
      
      <div className="container relative z-10">
        <div className="flex flex-col items-center justify-center pt-20">
          {/* Title container */}
          <div className="relative">
            <motion.h2
              ref={titleRef}
              className="text-6xl md:text-8xl font-serif font-bold mb-12 text-center relative z-10"
            >
              My Journey
            </motion.h2>
            
            {/* Mask element that scales up */}
            <div 
              ref={maskRef} 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-[#b7ab98] origin-center"
              style={{ clipPath: "circle(50%)" }}
            ></div>
          </div>
          
          {/* Timeline content */}
          <div ref={contentRef} className="relative pl-8 w-full max-w-2xl">
            <div className="timeline-line"></div>
            {timelineItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="mb-12 relative"
              >
                <div className="timeline-dot"></div>
                <span className="text-primary font-medium">{item.year}</span>
                <h3 className="text-xl font-bold mt-2">{item.title}</h3>
                <p className="mt-2">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
