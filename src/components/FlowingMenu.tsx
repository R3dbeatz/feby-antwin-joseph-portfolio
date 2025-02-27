
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const FlowingMenu = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "75vh center"]
  });
  const opacity = useTransform(scrollYProgress, [0, 0.75], [0.3, 1]);

  // Menu items - now as separate words
  const menuItems = [
    "DIGITAL",
    "STRATEGY",
    "CONTENT",
    "ANALYTICS",
    "GROWTH"
  ];

  // Function to create color transforms for each character
  const createCharacterColors = (text: string, index: number) => {
    const chars = text.split('');
    // Calculate the total number of characters across all words for proper scaling
    const totalItems = menuItems.length;
    
    return chars.map((_, charIndex) => {
      // Adjust the start and end points based on the word's position
      // This ensures all animations complete by 3/4 of the section
      const wordPosition = index / totalItems;
      const start = wordPosition * 0.75;
      const end = start + (0.75 / totalItems);
      
      return {
        char: chars[charIndex],
        color: useTransform(
          scrollYProgress, 
          [start, end], 
          ['#403E43', '#b7ab98']
        )
      };
    });
  };

  // Process each menu item
  const processedItems = menuItems.map((item, index) => {
    return createCharacterColors(item, index);
  });

  return (
    <div ref={sectionRef} className="py-16 bg-dark">
      <div className="container px-4 mx-auto">
        <motion.h2 
          style={{ opacity }}
          className="text-2xl font-medium text-[#b7ab98] mb-12 tracking-wider"
        >
          WHAT I DO
        </motion.h2>
        
        <div className="space-y-6">
          {processedItems.map((item, idx) => (
            <div key={idx} className="border-b border-[#1a1a1a]">
              <p className="text-[5rem] font-bold leading-none tracking-tighter py-4">
                {item.map((char, charIdx) => (
                  <motion.span 
                    key={`char-${idx}-${charIdx}`} 
                    style={{ color: char.color }}
                  >
                    {char.char === ' ' ? '\u00A0' : char.char}
                  </motion.span>
                ))}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlowingMenu;
