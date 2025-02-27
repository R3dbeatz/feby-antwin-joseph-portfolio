
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
  const contentRef = useRef<HTMLDivElement>(null);
  const letterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (sectionRef.current && titleRef.current && contentRef.current && letterRef.current) {
      // Initial title animation
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "top 20%",
          scrub: 1,
        },
        scale: 0.5,
        opacity: 0,
        ease: "power2.out"
      });

      // Letter U zoom animation
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 20%",
          end: "center center",
          scrub: 1,
          pin: true,
        }
      })
      .to(letterRef.current, {
        scale: 15,
        opacity: 1,
        duration: 2,
      })
      .to(letterRef.current, {
        scale: 1,
        opacity: 0,
        duration: 1,
      })
      .from(contentRef.current, {
        opacity: 0,
        y: 100,
        duration: 1,
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="section min-h-screen bg-dark" id="experience">
      <div className="container relative">
        <motion.h2
          ref={titleRef}
          className="text-6xl md:text-8xl font-serif font-bold mb-12 text-center pt-20"
        >
          My Jo<span ref={letterRef} className="inline-block opacity-0">u</span>rney
        </motion.h2>
        
        <div ref={contentRef} className="relative pl-8">
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
              <p className="text-gray-400 mt-2">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
