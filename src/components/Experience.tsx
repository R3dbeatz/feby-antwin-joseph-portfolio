
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

  // Define the text with line breaks to control layout
  const textParts = [
    "Four years",
    "of combined corporate and freelance",
    "experience delivering creative and",
    "technical marketing solutions across", 
    "all digital channels."
  ];

  // The first part will be highlighted
  const highlightedText = textParts[0].split('');
  
  // The rest will be in beige/tan color
  const remainingText = textParts.slice(1);

  // Create color transforms for highlighted text
  const createHighlightedColors = (chars: string[]) => {
    return chars.map((_, index) => {
      const start = index / chars.length * 0.5;
      const end = start + 0.1 / chars.length;
      return useTransform(scrollYProgress, [start, end], ['#333333', '#eb5939']);
    });
  };
  
  const highlightedColors = createHighlightedColors(highlightedText);
  
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
            <div className="experience-line">
              {/* First line with highlight color */}
              {highlightedText.map((char, index) => (
                <motion.span 
                  key={`highlight-${index}`} 
                  style={{
                    color: highlightedColors[index]
                  }}
                  className="text-highlight"
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </div>
            
            {/* Remaining lines */}
            {remainingText.map((line, lineIndex) => (
              <div key={`line-${lineIndex}`} className="experience-line">
                {line.split('').map((char, charIndex) => (
                  <motion.span 
                    key={`line-${lineIndex}-char-${charIndex}`}
                    style={{
                      color: '#aa9e8b'
                    }}
                    className="text-regular"
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
