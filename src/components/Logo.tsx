
import { motion } from 'framer-motion';
import { useState, useRef } from 'react';

export const Logo = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const logoRef = useRef<HTMLDivElement>(null);

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogoMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const distance = Math.sqrt(x * x + y * y);
    
    // Use the same maxDistance and multiplier as social icons
    const maxDistance = 400;
    const multiplier = Math.max(0, 1 - distance / maxDistance) * 1.2;
    
    if (logoRef.current) {
      logoRef.current.style.transition = 'transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)';
      logoRef.current.style.transform = `translate(${x * multiplier}px, ${y * multiplier}px)`;
    }

    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleLogoMouseLeave = () => {
    if (logoRef.current) {
      logoRef.current.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
      logoRef.current.style.transform = 'translate(0, 0)';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      onMouseMove={handleLogoMouseMove}
      onMouseLeave={handleLogoMouseLeave}
      ref={logoRef}
      className="relative will-change-transform"
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
