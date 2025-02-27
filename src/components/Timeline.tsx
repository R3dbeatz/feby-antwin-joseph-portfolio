
import { motion, useAnimation } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
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
  const [isZoomed, setIsZoomed] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center",
        onEnter: () => {
          setIsZoomed(true);
          // Lock scroll
          document.body.style.overflow = 'hidden';
          
          // Unlock scroll after 3 seconds
          setTimeout(() => {
            document.body.style.overflow = 'auto';
          }, 3000);
          
          // Animate background and zoom
          controls.start({
            scale: [1, 1.5],
            transition: { 
              duration: 1.5,
              ease: "easeInOut"
            }
          });
        }
      }
    });

    return () => {
      timeline.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [controls]);

  return (
    <section 
      ref={sectionRef} 
      className="section min-h-screen overflow-hidden relative"
      id="experience"
    >
      <motion.div
        animate={controls}
        className={`absolute inset-0 w-full h-full transition-colors duration-1000 ${
          isZoomed ? 'bg-[#b7ab98]' : 'bg-dark'
        }`}
      />
      
      <div className="container relative z-10">
        <div className="flex flex-col items-center justify-center pt-20">
          <motion.div
            animate={controls}
            className="relative mb-20"
          >
            <h2
              ref={titleRef}
              className={`text-6xl md:text-8xl font-serif font-bold text-center transition-colors duration-1000 ${
                isZoomed ? 'text-dark' : 'text-white'
              }`}
            >
              My Journey
            </h2>
          </motion.div>
          
          <div 
            ref={contentRef} 
            className="relative pl-8 w-full max-w-2xl"
          >
            <div className="timeline-line"></div>
            {timelineItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={{ 
                  opacity: isZoomed ? 1 : 0, 
                  x: isZoomed ? 0 : -50 
                }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.2 + 1.5 
                }}
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
