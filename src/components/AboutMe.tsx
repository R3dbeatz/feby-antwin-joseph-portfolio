
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import FlowingMenu from './FlowingMenu';

const AboutMe = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const {
    scrollYProgress
  } = useScroll({
    target: sectionRef,
    offset: ["start center", "75vh center"]
  });
  const opacity = useTransform(scrollYProgress, [0, 0.75], [0.3, 1]);

  // Split text into four lines to control layout
  const textParts = [
    "I'm a", 
    "strategically focused", 
    "digital marketer with a passion for crafting", 
    "data-driven campaigns & delivering measurable business growth."
  ];

  // Create line-by-line color transforms
  const lineColors = textParts.map((line, lineIndex) => {
    const chars = line.split('');
    const isSecondLine = lineIndex === 1;

    // Calculate different scroll ranges for each line
    const lineStart = lineIndex * 0.15; // Each line starts animating at different scroll points
    const lineEnd = lineStart + 0.15;
    
    return chars.map((_, charIndex) => {
      // Each character within the line animates slightly after the previous one
      const charStart = lineStart + charIndex / chars.length * 0.1;
      const charEnd = charStart + 0.02;

      // Second line gets the highlight color, other lines get the regular color
      return useTransform(scrollYProgress, [charStart, charEnd], isSecondLine ? ['#333333', '#eb5939'] : ['#333333', '#aa9e8b']);
    });
  });
  
  return (
    <>
      <section ref={sectionRef} className="min-h-screen flex items-center justify-center bg-dark py-20 relative" id="about" aria-label="About Me Section">
        <div className="container px-4 mx-auto">
          <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8
          }} viewport={{
            once: true
          }} className="max-w-4xl mx-auto">
            <motion.h2 style={{
              opacity
            }} className="text-2xl font-medium text-[#eb5939] mb-8">
              ABOUT ME
            </motion.h2>
            <div className="max-w-[1440px] mx-auto px-4">
              <div className="leading-[1.1] tracking-tight font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-left">
                {textParts.map((line, lineIndex) => (
                  <div key={`line-${lineIndex}`} className="block mb-2">
                    {line.split('').map((char, charIndex) => (
                      <motion.span 
                        key={`line-${lineIndex}-char-${charIndex}`} 
                        style={{
                          color: lineColors[lineIndex][charIndex]
                        }}
                      >
                        {char === ' ' ? '\u00A0' : char}
                      </motion.span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Flowing Menu Section */}
      <FlowingMenu />
    </>
  );
};

export default AboutMe;
