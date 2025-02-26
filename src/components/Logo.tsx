
import { motion } from 'framer-motion';
import { useState } from 'react';

export const Logo = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogoMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      onMouseMove={handleLogoMouseMove}
      className="relative"
    >
      <a 
        href="#" 
        onClick={(e) => {
          e.preventDefault();
          handleLogoClick();
        }}
        className="block relative"
      >
        <img 
          src="/lovable-uploads/a8f376bd-0ca8-4b5b-b2a8-1243e44df411.png" 
          alt="Signature"
          className="h-12 w-auto object-contain brightness-0 invert hover:[filter:brightness(0)_invert(0.5)_sepia(1)_saturate(10)_hue-rotate(5deg)] relative"
          style={{
            mask: `radial-gradient(circle 50px at ${mousePosition.x}px ${mousePosition.y}px, black, transparent 100%)`,
            WebkitMask: `radial-gradient(circle 50px at ${mousePosition.x}px ${mousePosition.y}px, black, transparent 100%)`,
          }}
        />
        <img 
          src="/lovable-uploads/a8f376bd-0ca8-4b5b-b2a8-1243e44df411.png" 
          alt="Signature"
          className="h-12 w-auto object-contain brightness-0 invert absolute top-0 left-0 z-[-1]"
        />
      </a>
    </motion.div>
  );
};
