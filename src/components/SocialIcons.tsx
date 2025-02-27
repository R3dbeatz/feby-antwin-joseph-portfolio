
import { motion } from 'framer-motion';
import { Mail, Linkedin, Twitter, Instagram } from 'lucide-react';
import { useState } from 'react';
import Magnet from './Magnet';

export const SocialIcons = () => {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-8 left-8 flex flex-col gap-8 z-50"
    >
      <Magnet padding={50} magnetStrength={50}>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-[#eb5939] transition-colors will-change-transform"
          onMouseEnter={() => setHoveredIcon('linkedin')}
          onMouseLeave={() => setHoveredIcon(null)}
        >
          <Linkedin size={24} strokeWidth={1.5} />
        </a>
      </Magnet>

      <Magnet padding={50} magnetStrength={50}>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-[#eb5939] transition-colors will-change-transform"
          onMouseEnter={() => setHoveredIcon('twitter')}
          onMouseLeave={() => setHoveredIcon(null)}
        >
          <Twitter size={24} strokeWidth={1.5} />
        </a>
      </Magnet>

      <Magnet padding={50} magnetStrength={50}>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-[#eb5939] transition-colors will-change-transform"
          onMouseEnter={() => setHoveredIcon('instagram')}
          onMouseLeave={() => setHoveredIcon(null)}
        >
          <Instagram size={24} strokeWidth={1.5} />
        </a>
      </Magnet>

      <Magnet padding={50} magnetStrength={50}>
        <a
          href="mailto:contact@example.com"
          className="text-gray-400 hover:text-[#eb5939] transition-colors will-change-transform"
          onMouseEnter={() => setHoveredIcon('mail')}
          onMouseLeave={() => setHoveredIcon(null)}
        >
          <Mail size={24} strokeWidth={1.5} />
        </a>
      </Magnet>
    </motion.div>
  );
};
