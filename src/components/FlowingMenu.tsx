import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import DecryptedText from './DecryptedText';

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
  
  // Background parallax effect - reduced movement amount to keep content in frame
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -50]);

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
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Function to handle video loading
  useEffect(() => {
    // Video might take time to load, we'll simulate this with a timeout
    const timer = setTimeout(() => {
      setVideoLoaded(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

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
    <div ref={sectionRef} className="py-16 bg-dark relative overflow-hidden min-h-screen">
      {/* Video Background with Parallax Effect */}
      <motion.div 
        className="absolute inset-0 w-full h-full z-0"
        style={{ y: backgroundY }}
      >
        {/* YouTube iframe */}
        <div className="relative w-full h-full overflow-hidden">
          <iframe 
            src="https://www.youtube.com/embed/gWQlB9_zyaI?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&playlist=gWQlB9_zyaI"
            className="absolute w-[400%] h-[400%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            title="Background Video"
            frameBorder="0"
            style={{ 
              filter: 'blur(3px)',
              opacity: videoLoaded ? 1 : 0,
              transition: 'opacity 1s ease'
            }}
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/70"></div>
        </div>
      </motion.div>
      
      <div className="container px-4 mx-auto relative z-10">
        <motion.h2 
          style={{ opacity }}
          className="text-2xl font-medium text-[#eb5939] mb-12 tracking-wider"
        >
          WHAT I DO
        </motion.h2>
        
        <motion.div
          style={{ y: textY }}
          className="grid grid-cols-1 md:grid-cols-12 gap-8"
        >
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
                <div className="text-xl">
                  <DecryptedText text={menuItems[activeItem].content} />
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FlowingMenu;
