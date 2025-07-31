
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Particles from './Particles';

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

  // Create line-by-line color transforms
  const lineColors = textParts.map((line, lineIndex) => {
    const chars = line.split('');
    const isFirstLine = lineIndex === 0;
    
    // Calculate different scroll ranges for each line
    const lineStart = lineIndex * 0.15; // Each line starts animating at different scroll points
    const lineEnd = lineStart + 0.15;
    
    return chars.map((_, charIndex) => {
      // Each character within the line animates slightly after the previous one
      const charStart = lineStart + (charIndex / chars.length) * 0.1;
      const charEnd = charStart + 0.02;
      
      // First line gets the highlight color, other lines get the regular color
      return useTransform(
        scrollYProgress, 
        [charStart, charEnd], 
        isFirstLine ? ['#333333', '#eb5939'] : ['#333333', '#aa9e8b']
      );
    });
  });
  
  return (
    <section ref={sectionRef} className="min-h-screen flex items-center justify-center bg-dark py-20 relative" id="expertise" aria-label="Experience Section">
      {/* Particle background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <Particles
          particleColors={['#eb5939', '#aa9e8b', '#ffffff']}
          particleCount={800}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={80}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>
      
      <div className="container px-4 mx-auto relative z-10">
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
  );
};

export default Experience;
