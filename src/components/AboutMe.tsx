
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

  // Split text into parts to handle different colors
  const textParts = ["I'm a ", "strategically focused", " digital marketer with a passion for crafting data-driven campaigns & delivering measurable business growth."];

  // Create character arrays for each part
  const beforeText = textParts[0].split('');
  const highlightedText = textParts[1].split('');
  const afterText = textParts[2].split('');

  // Create color transforms for all text parts
  const createCharacterColors = (chars: string[], startOffset: number = 0, isHighlighted: boolean = false) => {
    return chars.map((_, index) => {
      const start = (index + startOffset) / (beforeText.length + highlightedText.length + afterText.length) * 0.75;
      const end = start + 0.1 / (beforeText.length + highlightedText.length + afterText.length);
      return useTransform(scrollYProgress, [start, end], isHighlighted ? ['#333333', '#eb5939'] : ['#333333', '#aa9e8b']);
    });
  };
  const beforeColors = createCharacterColors(beforeText);
  const highlightedColors = createCharacterColors(highlightedText, beforeText.length, true);
  const afterColors = createCharacterColors(afterText, beforeText.length + highlightedText.length);
  
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
            <div className="max-w-[90vw] mx-auto">
              <p className="leading-[1.1] tracking-tight break-words font-semibold text-7xl my-0 text-left mx-[4px] px-0 py-[15px]">
                {beforeText.map((char, index) => <motion.span key={`before-${index}`} style={{
                  color: beforeColors[index]
                }}>
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>)}
                {highlightedText.map((char, index) => <motion.span key={`highlight-${index}`} style={{
                  color: highlightedColors[index]
                }}>
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>)}
                {afterText.map((char, index) => <motion.span key={`after-${index}`} style={{
                  color: afterColors[index]
                }}>
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>)}
              </p>
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
