
import { motion } from 'framer-motion';
import { useActiveSection } from '../hooks/useActiveSection';

export const NavLinks = () => {
  const activeSection = useActiveSection();

  return (
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
            ? 'text-[#eb5939] font-medium' 
            : 'text-[#aa9e8b] hover:text-white'
        }`}
      >
        ABOUT
      </a>
      <a 
        href="#projects" 
        className={`transition-colors ${
          activeSection === 'projects' 
            ? 'text-[#eb5939] font-medium' 
            : 'text-[#aa9e8b] hover:text-white'
        }`}
      >
        WORK
      </a>
      <a 
        href="#contact" 
        className={`transition-colors ${
          activeSection === 'contact' 
            ? 'text-[#eb5939] font-medium' 
            : 'text-[#aa9e8b] hover:text-white'
        }`}
      >
        CONTACT
      </a>
    </motion.nav>
  );
};
