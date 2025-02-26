
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const AboutMe = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 1]);

  // Split text into an array of characters with their indices
  const text = "I'm a strategically focused digital marketer with a passion for crafting data-driven campaigns & delivering measurable business growth.";
  const characters = text.split('');

  return (
    <section ref={sectionRef} className="min-h-screen flex items-center justify-center bg-dark py-20">
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
          <p className="text-[72px] leading-[1.1] tracking-tight font-semibold">
            {characters.map((char, index) => {
              // Calculate the reveal progress for each character
              const start = index / characters.length;
              const end = start + (1 / characters.length);
              const charColor = useTransform(
                scrollYProgress,
                [start, end],
                ['#333333', '#aa9e8b']
              );

              return (
                <motion.span
                  key={index}
                  style={{ color: charColor }}
                  className={char === 'strategically' ? 'text-[#eb5939]' : ''}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              );
            })}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMe;
