
import { motion } from 'framer-motion';
import { Mail, Linkedin, Twitter, Instagram } from 'lucide-react';

const Navigation = () => {
  return (
    <div className="fixed w-full top-0 p-8 flex justify-between items-start z-50">
      {/* Social Media Icons - Left Side */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-6"
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

      {/* Navigation Links - Right Side */}
      <motion.nav 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-end gap-4"
      >
        <a 
          href="#about" 
          className="text-gray-400 hover:text-white transition-colors"
        >
          ABOUT
        </a>
        <a 
          href="#projects" 
          className="text-gray-400 hover:text-white transition-colors"
        >
          WORK
        </a>
        <a 
          href="#contact" 
          className="text-gray-400 hover:text-white transition-colors"
        >
          CONTACT
        </a>
      </motion.nav>
    </div>
  );
};

export default Navigation;
