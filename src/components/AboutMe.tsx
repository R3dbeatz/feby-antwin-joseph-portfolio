
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const AboutMe = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "75vh center"] // Changed to complete at 75% of viewport height
  });

  const opacity = useTransform(scrollYProgress, [0, 0.75], [0.3, 1]);

  const text = "I'm a strategically focused digital marketer with a passion for crafting data-driven campaigns & delivering measurable business growth.";
  const characters = text.split('');

  // Pre-create all the color transforms with adjusted timing
  const characterColors = characters.map((_, index) => {
    const start = index / characters.length * 0.75; // Compress animation to complete at 75%
    const end = start + (0.1 / characters.length);
    return useTransform(
      scrollYProgress,
      [start, end],
      ['#333333', '#aa9e8b']
    );
  });

  return (
    <section ref={sectionRef} className="min-h-screen flex items-center justify-center bg-dark py-20 relative">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <motion.h2 
            style={{ opacity }}
            className="text-2xl font-medium text-[#eb5939] mb-8"
          >
            ABOUT ME
          </motion.h2>
          <div className="max-w-[90vw] mx-auto">
            <p className="text-[72px] leading-[1.1] tracking-tight font-semibold break-words">
              {characters.map((char, index) => (
                <motion.span
                  key={index}
                  style={{ color: characterColors[index] }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMe;
