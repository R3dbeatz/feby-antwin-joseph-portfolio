
import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import DecryptedText from './DecryptedText';

interface EducationItem {
  year: string;
  degree: string;
  institution: string;
  description: string;
}

const Education = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "75vh center"]
  });
  const opacity = useTransform(scrollYProgress, [0, 0.75], [0.3, 1]);

  const [activeItem, setActiveItem] = useState<number | null>(null);

  // Education data
  const educationItems: EducationItem[] = [
    {
      year: "2022",
      degree: "Master of Science in Digital Marketing",
      institution: "Stanford University",
      description: "Specialized in cutting-edge digital marketing strategies and analytics. Completed thesis on measuring ROI of multi-channel marketing campaigns in emerging markets. Graduated with honors and recognition for innovative application of machine learning in consumer behavior analysis."
    },
    {
      year: "2018",
      degree: "Bachelor of Arts in Mass Communication",
      institution: "University of California, Berkeley",
      description: "Focused on media studies and communication theory with a minor in digital design. Actively participated in the student media organization, producing award-winning digital content campaigns. Completed internships with leading media companies including NBC Universal and ViacomCBS."
    }
  ];

  return (
    <div ref={sectionRef} className="py-16 bg-dark border-b border-[#1a1a1a]">
      <div className="container px-4 mx-auto">
        <motion.h2 
          style={{ opacity }}
          className="text-2xl font-medium text-[#eb5939] mb-12 tracking-wider"
        >
          EDUCATION
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-5">
            {educationItems.map((item, idx) => (
              <EducationListItem 
                key={idx}
                year={item.year} 
                degree={item.degree}
                onMouseEnter={() => setActiveItem(idx)}
                onMouseLeave={() => setActiveItem(null)}
                isActive={activeItem === idx}
              />
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
                <div>
                  <h3 className="text-white text-xl mb-2">{educationItems[activeItem].institution}</h3>
                  <div className="text-lg">
                    <DecryptedText text={educationItems[activeItem].description} />
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface EducationListItemProps {
  year: string;
  degree: string;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  isActive: boolean;
}

const EducationListItem = ({
  year,
  degree,
  onMouseEnter,
  onMouseLeave,
  isActive
}: EducationListItemProps) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const animationDefaults = {
    duration: 0.6,
    ease: "expo"
  };

  const handleMouseEnter = (ev: React.MouseEvent<HTMLDivElement>) => {
    if (!itemRef.current || !overlayRef.current || !textRef.current) return;
    
    // Clear any existing tweens on these elements
    gsap.killTweensOf([overlayRef.current, textRef.current]);
    
    const tl = gsap.timeline({
      defaults: animationDefaults
    });
    
    tl.set(overlayRef.current, {
      y: "-101%"
    }).to(overlayRef.current, {
      y: "0%"
    }, 0).to(textRef.current, {
      opacity: 0,
      duration: 0.3
    }, 0);
  };

  const handleMouseLeave = (ev: React.MouseEvent<HTMLDivElement>) => {
    if (!itemRef.current || !overlayRef.current || !textRef.current) return;
    
    // Clear any existing tweens on these elements
    gsap.killTweensOf([overlayRef.current, textRef.current]);
    
    const tl = gsap.timeline({
      defaults: animationDefaults
    });
    
    tl.to(overlayRef.current, {
      y: "-101%"
    }, 0).to(textRef.current, {
      opacity: 1,
      duration: 0.3,
      delay: 0.2
    });
  };

  return (
    <div 
      ref={itemRef} 
      className="border-b border-[#1a1a1a] py-6 relative overflow-hidden cursor-pointer"
      onMouseEnter={(e) => {
        onMouseEnter();
        handleMouseEnter(e);
      }}
      onMouseLeave={(e) => {
        onMouseLeave();
        handleMouseLeave(e);
      }}
    >
      <div ref={textRef} className="flex items-start justify-between">
        <h3 className="text-[#b7ab98] text-5xl font-bold leading-none">{year}</h3>
        <div className="flex-1 pl-8">
          <p className="text-[#b7ab98] text-2xl font-medium leading-tight">
            {degree}
          </p>
        </div>
      </div>
      
      <div 
        ref={overlayRef} 
        className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none bg-[#eb5939] translate-y-[-101%] flex items-center"
      >
        <div className="px-8 py-6 flex items-start justify-between w-full">
          <h3 className="text-black text-5xl font-bold leading-none">{year}</h3>
          <div className="flex-1 pl-8">
            <p className="text-black text-2xl font-medium leading-tight">
              {degree}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;
