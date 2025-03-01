
import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Typewriter } from './ui/typewriter';
import gsap from 'gsap';

const Motto = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Enhanced transform values for more noticeable parallax effect
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 200]); // Increased from 100 to 200
  const textY = useTransform(scrollYProgress, [0, 1], [0, -100]); // Increased from -50 to -100

  // Same motto text as before for the animation
  const mottoText = [
    "Don't be afraid to get creative",
    "and experiment with your marketing."
  ];

  useEffect(() => {
    // Additional animation for elements when they come into view
    if (ref.current) {
      gsap.fromTo(
        '.motto-author', 
        { opacity: 0, y: 20 }, 
        { 
          opacity: 1, 
          y: 0, 
          scrollTrigger: {
            trigger: '.motto-author',
            start: 'top bottom-=100',
            end: 'bottom center',
            scrub: true
          }
        }
      );
    }
  }, []);

  return (
    <div ref={ref} className="relative h-screen w-full overflow-hidden">
      {/* Parallax Background Image with Blur */}
      <motion.div 
        className="absolute inset-0 w-full h-full bg-cover bg-center z-0 backdrop-blur-sm"
        style={{ 
          backgroundImage: 'url("/lovable-uploads/f447afe7-96ea-4c3c-824b-e75e950278ce.png")',
          y: backgroundY,
          filter: 'blur(3px)' // Added blur effect via inline style
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60"></div> {/* Increased opacity slightly */}
      </motion.div>
      
      {/* Content with enhanced parallax effect */}
      <div className="container mx-auto relative z-10 h-full flex flex-col items-center justify-center">
        <motion.div
          style={{ y: textY }}
          className="flex flex-col items-center justify-center h-full"
        >
          <h2 className="text-xl font-medium text-primary uppercase tracking-widest mb-10 text-center">
            MY MOTTO
          </h2>
          
          <div className="w-full h-[250px] flex items-center justify-center mb-8">
            <Typewriter
              text={mottoText}
              speed={50}
              waitTime={1000}
              deleteSpeed={30}
              className="font-bold text-[#b7ab98] text-7xl text-center max-w-4xl"
              cursorChar="_"
            />
          </div>

          <motion.p
            className="text-[#b7ab98] text-xl mt-6 motto-author"
          >
            Mike Volpe
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default Motto;
