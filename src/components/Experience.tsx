
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const {
    scrollYProgress
  } = useScroll({
    target: sectionRef,
    offset: ["start center", "center center"]
  });
  const opacity = useTransform(scrollYProgress, [0, 0.75], [0.3, 1]);

  // Define the text with line breaks to control layout
  const textParts = [
    "Four years",
    "of combined corporate and freelance",
    "experience delivering creative and",
    "technical marketing solutions across", 
    "all digital channels."
  ];

  return (
    <section ref={sectionRef} className="min-h-screen flex items-center justify-center bg-dark py-20 relative">
      <div className="container px-4 mx-auto">
        <motion.div 
          initial={{
            opacity: 0,
            y: 20
          }} 
          whileInView={{
            opacity: 1,
            y: 0
          }} 
          transition={{
            duration: 0.8
          }} 
          viewport={{
            once: true
          }} 
          className="max-w-4xl mx-auto"
        >
          <motion.h2 
            style={{
              opacity
            }} 
            className="text-2xl font-medium text-[#eb5939] mb-8"
          >
            EXPERIENCE
          </motion.h2>
          <div className="experience-text-container">
            {textParts.map((line, lineIndex) => (
              <motion.div 
                key={`line-${lineIndex}`} 
                className="experience-line"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ 
                  y: 0, 
                  opacity: 1,
                  transition: {
                    duration: 0.5,
                    delay: lineIndex * 0.2
                  }
                }}
                viewport={{ once: true }}
              >
                <motion.span 
                  className={lineIndex === 0 ? "text-highlight" : "text-regular"}
                  initial={lineIndex === 0 ? { color: "#333333" } : {}}
                  whileInView={lineIndex === 0 ? { color: "#eb5939" } : {}}
                  transition={lineIndex === 0 ? { duration: 0.8, delay: 0.3 } : {}}
                  viewport={{ once: true }}
                >
                  {line}
                </motion.span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
