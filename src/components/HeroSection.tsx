
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Squares } from './ui/squares-background';
import { useRef } from 'react';

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  
  // Create motion values for mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Apply spring physics with increased responsiveness
  const smoothX = useSpring(mouseX, { damping: 30, stiffness: 400 });
  const smoothY = useSpring(mouseY, { damping: 30, stiffness: 400 });
  
  // Transform smooth coordinates with increased sensitivity for more noticeable movement
  const parallaxX = useTransform(smoothX, (value) => value / 8);
  const parallaxY = useTransform(smoothY, (value) => value / 8);

  // Handle mouse movement
  const handleMouseMove = (e: React.MouseEvent) => {
    const { left, top, width, height } = ref.current?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 };
    const x = e.clientX - left - width / 2;
    const y = e.clientY - top - height / 2;
    
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <section 
      className="section relative overflow-hidden" 
      ref={ref}
      onMouseMove={handleMouseMove}
    >
      {/* The gradient overlay needs to be below the squares but above the background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-lighter to-dark opacity-50 z-0"></div>
      
      {/* Move the motion div above the gradient but below the content */}
      <motion.div 
        className="absolute inset-0 z-10"
        style={{ x: parallaxX, y: parallaxY }}
      >
        <Squares 
          direction="diagonal" 
          speed={0.5} 
          squareSize={40} 
          borderColor="#ffffff20" 
          hoverEnabled={false} 
          className="z-0" 
        />
      </motion.div>
      
      <div className="container relative z-20">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8
      }} className="text-center">
          <span className="text-primary font-medium mb-6 block text-2xl">Welcome to my world</span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 lg:text-8xl">
            <TypeAnimation sequence={['Marketing Visionary', 2000, 'Digital Storyteller', 2000, 'Brand Strategist', 2000]} wrapper="span" speed={50} repeat={Infinity} className="gradient-text" />
          </h1>
          <p className="text-lg text-[#aa9e8b] max-w-2xl mx-auto mb-8 md:text-2xl font-normal">
            Creating impactful digital experiences through strategic marketing and creative storytelling.
          </p>
          <motion.button whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.95
        }} className="bg-primary text-white px-8 py-3 rounded-full font-medium">
            Explore My Work
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
