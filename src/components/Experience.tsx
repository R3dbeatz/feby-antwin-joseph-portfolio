
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const {
    scrollYProgress
  } = useScroll({
    target: sectionRef,
    offset: ["start center", "75vh center"]
  });
  const opacity = useTransform(scrollYProgress, [0, 0.75], [0.3, 1]);

  // Split text into parts to handle different colors
  const textParts = ["Four years", " mastering both corporate and freelance digital marketing. Blending creative vision with technical expertise to deliver compelling campaigns across all channels. Driving growth through data-informed strategies and in-depth market analysis."];

  // Create character arrays for each part
  const highlightedText = textParts[0].split('');
  const afterText = textParts[1].split('');

  // Create color transforms for all text parts
  const createCharacterColors = (chars: string[], startOffset: number = 0, isHighlighted: boolean = false) => {
    return chars.map((_, index) => {
      const start = (index + startOffset) / (highlightedText.length + afterText.length) * 0.75;
      const end = start + 0.1 / (highlightedText.length + afterText.length);
      return useTransform(scrollYProgress, [start, end], isHighlighted ? ['#333333', '#eb5939'] : ['#333333', '#aa9e8b']);
    });
  };
  
  const highlightedColors = createCharacterColors(highlightedText, 0, true);
  const afterColors = createCharacterColors(afterText, highlightedText.length);
  
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
          <div className="max-w-[90vw] mx-auto">
            <p className="leading-[1.1] tracking-tight break-words font-semibold text-7xl my-0 text-left mx-[4px] px-0 py-[15px]">
              {highlightedText.map((char, index) => (
                <motion.span 
                  key={`highlight-${index}`} 
                  style={{
                    color: highlightedColors[index]
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
              {afterText.map((char, index) => (
                <motion.span 
                  key={`after-${index}`} 
                  style={{
                    color: afterColors[index]
                  }}
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

export default Experience;
