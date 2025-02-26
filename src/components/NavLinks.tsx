
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
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
      <Link 
        to="about"
        spy={true}
        smooth={true}
        duration={800}
        className={`transition-colors cursor-pointer ${
          activeSection === 'about' 
            ? 'text-[#eb5939] font-medium' 
            : 'text-gray-400 hover:text-white'
        }`}
      >
        ABOUT
      </Link>
      <Link 
        to="projects"
        spy={true}
        smooth={true}
        duration={800}
        className={`transition-colors cursor-pointer ${
          activeSection === 'projects' 
            ? 'text-[#eb5939] font-medium' 
            : 'text-gray-400 hover:text-white'
        }`}
      >
        WORK
      </Link>
      <Link 
        to="contact"
        spy={true}
        smooth={true}
        duration={800}
        className={`transition-colors cursor-pointer ${
          activeSection === 'contact' 
            ? 'text-[#eb5939] font-medium' 
            : 'text-gray-400 hover:text-white'
        }`}
      >
        CONTACT
      </Link>
    </motion.nav>
  );
};
