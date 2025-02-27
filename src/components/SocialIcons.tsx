
import { motion } from 'framer-motion';
import { Mail, Linkedin, Twitter, Instagram } from 'lucide-react';
import { useRef, useState } from 'react';

export const SocialIcons = () => {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const socialIconsRef = useRef<{ [key: string]: HTMLAnchorElement | null }>({});

  const handleIconMouseMove = (e: React.MouseEvent<HTMLAnchorElement>, iconId: string) => {
    if (!socialIconsRef.current[iconId]) return;
    
    const icon = socialIconsRef.current[iconId];
    const rect = icon?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const distance = Math.sqrt(x * x + y * y);
    
    const maxDistance = 100;
    const multiplier = Math.max(0, 1 - distance / maxDistance) * 0.8;
    
    if (icon) {
      icon.style.transition = 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)';
      icon.style.transform = `translate(${x * multiplier}px, ${y * multiplier}px) scale(1.15)`;
    }
  };

  const handleIconMouseLeave = (iconId: string) => {
    const icon = socialIconsRef.current[iconId];
    if (icon) {
      icon.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
      icon.style.transform = 'translate(0, 0) scale(1)';
    }
    setHoveredIcon(null);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-8 left-8 flex flex-col gap-8 z-50"
    >
      <a
        ref={el => socialIconsRef.current['linkedin'] = el}
        href="https://linkedin.com"
        target="_blank"
        rel="noopener noreferrer"
        className="p-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-gray-400 hover:text-[#eb5939] hover:border-[#eb5939] transition-all duration-300 will-change-transform shadow-lg hover:shadow-[#eb5939]/20"
        onMouseMove={(e) => handleIconMouseMove(e, 'linkedin')}
        onMouseEnter={() => setHoveredIcon('linkedin')}
        onMouseLeave={() => handleIconMouseLeave('linkedin')}
      >
        <Linkedin size={24} />
      </a>
      <a
        ref={el => socialIconsRef.current['twitter'] = el}
        href="https://twitter.com"
        target="_blank"
        rel="noopener noreferrer"
        className="p-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-gray-400 hover:text-[#eb5939] hover:border-[#eb5939] transition-all duration-300 will-change-transform shadow-lg hover:shadow-[#eb5939]/20"
        onMouseMove={(e) => handleIconMouseMove(e, 'twitter')}
        onMouseEnter={() => setHoveredIcon('twitter')}
        onMouseLeave={() => handleIconMouseLeave('twitter')}
      >
        <Twitter size={24} />
      </a>
      <a
        ref={el => socialIconsRef.current['instagram'] = el}
        href="https://instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        className="p-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-gray-400 hover:text-[#eb5939] hover:border-[#eb5939] transition-all duration-300 will-change-transform shadow-lg hover:shadow-[#eb5939]/20"
        onMouseMove={(e) => handleIconMouseMove(e, 'instagram')}
        onMouseEnter={() => setHoveredIcon('instagram')}
        onMouseLeave={() => handleIconMouseLeave('instagram')}
      >
        <Instagram size={24} />
      </a>
      <a
        ref={el => socialIconsRef.current['mail'] = el}
        href="mailto:contact@example.com"
        className="p-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-gray-400 hover:text-[#eb5939] hover:border-[#eb5939] transition-all duration-300 will-change-transform shadow-lg hover:shadow-[#eb5939]/20"
        onMouseMove={(e) => handleIconMouseMove(e, 'mail')}
        onMouseEnter={() => setHoveredIcon('mail')}
        onMouseLeave={() => handleIconMouseLeave('mail')}
      >
        <Mail size={24} />
      </a>
    </motion.div>
  );
};
