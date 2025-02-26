
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const AboutMe = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "75vh center"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.75], [0.3, 1]);

  const text = "I'm a strategically focused digital marketer with a passion for crafting data-driven campaigns & delivering measurable business growth.";
  const mobileText = "I'm a selectively skilled product designer with strong focus on producing high quality & impactful digital experience.";
  
  const characters = text.split('');
  const mobileCharacters = mobileText.split('');

  // Pre-create all the color transforms
  const characterColors = characters.map((_, index) => {
    const start = index / characters.length * 0.75;
    const end = start + (0.1 / characters.length);
    return useTransform(
      scrollYProgress,
      [start, end],
      ['#333333', '#aa9e8b']
    );
  });

  const mobileCharacterColors = mobileCharacters.map((_, index) => {
    const start = index / mobileCharacters.length * 0.75;
    const end = start + (0.1 / mobileCharacters.length);
    return useTransform(
      scrollYProgress,
      [start, end],
      ['#333333', '#eb5939']
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
          {/* Desktop Version */}
          <div className="hidden md:block">
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
          </div>

          {/* Mobile Version */}
          <div className="md:hidden">
            <div className="flex flex-col items-start">
              <div className="mb-8">
                <div className="w-8 h-8 rounded-full bg-[#eb5939]"></div>
              </div>
              <motion.h2 
                style={{ opacity }}
                className="text-sm font-light tracking-[0.2em] uppercase text-[#666666] mb-6"
              >
                ABOUT ME
              </motion.h2>
              <div className="max-w-[100%]">
                <p className="text-[32px] leading-[1.2] tracking-tight font-medium">
                  {mobileCharacters.map((char, index) => (
                    <motion.span
                      key={index}
                      style={{ color: mobileCharacterColors[index] }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                  ))}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMe;
