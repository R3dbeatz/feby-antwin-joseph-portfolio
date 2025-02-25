
import { motion } from 'framer-motion';
import { Mail, Linkedin, Twitter, Instagram } from 'lucide-react';
import { useState, useEffect } from 'react';

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'projects', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <>
      {/* Main Navigation - Top */}
      <div className="fixed w-full top-0 p-8 flex justify-between items-start z-50">
        {/* Logo */}
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
              className="h-12 w-auto object-contain brightness-0 invert hover:[filter:brightness(0)_invert(0.5)_sepia(1)_saturate(10)_hue-rotate(345deg)] relative"
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

        <motion.nav 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-end gap-4"
        >
          <a 
            href="#about" 
            className={`transition-colors ${
              activeSection === 'about' 
                ? 'text-primary font-medium' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            ABOUT
          </a>
          <a 
            href="#projects" 
            className={`transition-colors ${
              activeSection === 'projects' 
                ? 'text-primary font-medium' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            WORK
          </a>
          <a 
            href="#contact" 
            className={`transition-colors ${
              activeSection === 'contact' 
                ? 'text-primary font-medium' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            CONTACT
          </a>
        </motion.nav>
      </div>

      {/* Social Media Icons - Bottom Left */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed bottom-8 left-8 flex flex-col gap-6 z-50"
      >
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-primary transition-colors"
        >
          <Linkedin size={20} />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-primary transition-colors"
        >
          <Twitter size={20} />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-primary transition-colors"
        >
          <Instagram size={20} />
        </a>
        <a
          href="mailto:contact@example.com"
          className="text-gray-400 hover:text-primary transition-colors"
        >
          <Mail size={20} />
        </a>
      </motion.div>
    </>
  );
};

export default Navigation;
