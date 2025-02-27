
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';

interface MenuContent {
  title: string;
  content: string;
}

const FlowingMenu = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "75vh center"]
  });
  const opacity = useTransform(scrollYProgress, [0, 0.75], [0.3, 1]);

  // Menu items with their content
  const menuItems: MenuContent[] = [
    {
      title: "DIGITAL",
      content: "I navigate the ever-evolving digital landscape with expertise across multiple platforms and channels. From social media management to email marketing, SEO optimization to PPC campaigns, I create cohesive digital experiences that connect with your target audience wherever they are online."
    },
    {
      title: "STRATEGY",
      content: "I develop comprehensive, data-informed marketing strategies that align with your business objectives. By conducting thorough market research, competitive analysis, and audience segmentation, I craft actionable roadmaps that position your brand for maximum impact and sustainable growth."
    },
    {
      title: "CONTENT",
      content: "I create compelling, purpose-driven content that tells your brand story across formats and platforms. From engaging social posts to long-form articles, captivating videos to interactive experiences—I produce content that educates, entertains, and inspires your audience to take action."
    },
    {
      title: "ANALYTICS",
      content: "I transform raw data into actionable insights through meticulous tracking, analysis, and reporting. By establishing meaningful KPIs and leveraging analytics tools, I measure campaign performance, identify optimization opportunities, and demonstrate clear ROI for marketing initiatives."
    },
    {
      title: "GROWTH",
      content: "I implement proven growth marketing techniques to expand your customer base and increase revenue. Through continuous testing, optimization, and innovation, I develop scalable systems that drive acquisition, improve retention, and maximize customer lifetime value."
    }
  ];

  const [activeItem, setActiveItem] = useState<number | null>(null);

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
    return {
      title: createCharacterColors(item.title, index),
      content: item.content
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
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-5 space-y-4">
            {processedItems.map((item, idx) => (
              <div 
                key={idx} 
                className="border-b border-[#1a1a1a] cursor-pointer"
                onMouseEnter={() => setActiveItem(idx)}
                onMouseLeave={() => setActiveItem(null)}
              >
                <p className="text-[5rem] font-bold leading-tight tracking-tighter py-2">
                  {item.title.map((char, charIdx) => (
                    <motion.span 
                      key={`char-${idx}-${charIdx}`} 
                      style={{ 
                        color: activeItem === idx ? '#eb5939' : char.color 
                      }}
                      whileHover={{ color: '#eb5939' }}
                    >
                      {char.char === ' ' ? '\u00A0' : char.char}
                    </motion.span>
                  ))}
                </p>
              </div>
            ))}
          </div>
          
          <div className="md:col-span-7 p-6 flex items-center">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: activeItem !== null ? 1 : 0,
                y: activeItem !== null ? 0 : 20
              }}
              transition={{ duration: 0.3 }}
              className="text-[#b7ab98] leading-relaxed"
            >
              {activeItem !== null && (
                <p className="text-lg">{menuItems[activeItem].content}</p>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlowingMenu;
