
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const FlowingMenu = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "75vh center"]
  });
  const opacity = useTransform(scrollYProgress, [0, 0.75], [0.3, 1]);

  // Menu items
  const menuItems = [
    "DIGITAL STRATEGY",
    "CONTENT ANALYTICS",
    "GROWTH"
  ];

  // Function to create color transforms for each character
  const createCharacterColors = (text: string, isRevealed: boolean = false) => {
    const chars = text.split('');
    return chars.map((_, index) => {
      const start = index / chars.length * 0.75;
      const end = start + 0.1 / chars.length;
      return {
        char: chars[index],
        color: useTransform(
          scrollYProgress, 
          [start, end], 
          isRevealed ? ['#403E43', '#b7ab98'] : ['#403E43', '#403E43']
        )
      };
    });
  };

  // Process each menu item
  const processedItems = menuItems.map(item => {
    // For each item, we'll split it to have a revealed part (first half) and an unrevealed part (second half)
    const midPoint = Math.ceil(item.length / 2);
    const firstHalf = item.substring(0, midPoint);
    const secondHalf = item.substring(midPoint);
    
    return {
      revealed: createCharacterColors(firstHalf, true),
      unrevealed: createCharacterColors(secondHalf, false)
    };
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
              <p className="text-[7rem] font-bold leading-none tracking-tighter py-4">
                {item.revealed.map((char, charIdx) => (
                  <motion.span 
                    key={`revealed-${idx}-${charIdx}`} 
                    style={{ color: char.color }}
                  >
                    {char.char === ' ' ? '\u00A0' : char.char}
                  </motion.span>
                ))}
                {item.unrevealed.map((char, charIdx) => (
                  <motion.span 
                    key={`unrevealed-${charIdx}`} 
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
