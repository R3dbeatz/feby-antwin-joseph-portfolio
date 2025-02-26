
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const AboutMe = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 1]);

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
          <motion.p 
            style={{ opacity }}
            className="text-[56px] leading-[1.2] tracking-tight font-medium text-[#aa9e8b]"
          >
            I'm a <span className="text-[#eb5939]">strategically focused</span> digital marketer with a passion for crafting data-driven campaigns & delivering measurable business growth.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMe;
