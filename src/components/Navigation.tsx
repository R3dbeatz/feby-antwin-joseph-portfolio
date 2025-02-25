
import { motion } from 'framer-motion';
import { Mail, Linkedin, Twitter, Instagram } from 'lucide-react';
import { useState, useEffect } from 'react';

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('about');

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

  return (
    <>
      {/* Main Navigation - Top */}
      <div className="fixed w-full top-0 p-8 flex justify-between items-start z-50">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img 
            src="/lovable-uploads/e61b52bb-6221-41bf-addf-b14309feb0d1.png" 
            alt="Logo"
            className="h-12 w-auto object-contain"
          />
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
