
import { motion } from 'framer-motion';
import { Mail, Linkedin, Twitter, Instagram, Youtube, Menu, X } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

export const SocialIcons = () => {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isToggleVisible, setIsToggleVisible] = useState(true);
  const socialIconsRef = useRef<{ [key: string]: HTMLAnchorElement | null }>({});
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 768) {
        // Hide social icons when scrolling
        if (isVisible) {
          setIsVisible(false);
        }
        
        // Hide toggle button immediately when scrolling starts
        setIsToggleVisible(false);
        
        // Clear existing timeout
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
        
        // Show toggle button after scrolling stops
        scrollTimeoutRef.current = setTimeout(() => {
          setIsToggleVisible(true);
        }, 150);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [isVisible]);

  const handleIconMouseMove = (e: React.MouseEvent<HTMLAnchorElement>, iconId: string) => {
    if (!socialIconsRef.current[iconId]) return;
    
    const icon = socialIconsRef.current[iconId];
    const rect = icon?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const distance = Math.sqrt(x * x + y * y);
    
    // Increased maxDistance to detect cursor from further away
    const maxDistance = 200;
    // Increased multiplier for stronger magnetic pull
    const multiplier = Math.max(0, 1 - distance / maxDistance) * 1.5;
    
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
    <>
      {/* Mobile Toggle Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ 
          opacity: isToggleVisible ? 1 : 0,
          x: isToggleVisible ? 0 : -20,
          pointerEvents: isToggleVisible ? 'auto' : 'none'
        }}
        transition={{ duration: 0.3 }}
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-8 left-8 md:hidden p-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-gray-400 hover:text-primary hover:border-primary transition-all duration-300 shadow-lg hover:shadow-primary/20 z-50"
      >
        {isVisible ? <X size={20} /> : <Menu size={20} />}
      </motion.button>

      {/* Desktop Social Icons */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed bottom-8 left-8 hidden md:flex flex-col gap-8 z-50"
      >
        <a
          ref={el => socialIconsRef.current['linkedin'] = el}
          href="https://www.linkedin.com/in/feby-antwin-joseph-934253201"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-gray-400 hover:text-primary hover:border-primary transition-all duration-300 will-change-transform shadow-lg hover:shadow-primary/20"
          onMouseMove={(e) => handleIconMouseMove(e, 'linkedin')}
          onMouseEnter={() => setHoveredIcon('linkedin')}
          onMouseLeave={() => handleIconMouseLeave('linkedin')}
        >
          <Linkedin size={20} />
        </a>
        <a
          ref={el => socialIconsRef.current['twitter'] = el}
          href="https://x.com/feby_joseph01"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-gray-400 hover:text-primary hover:border-primary transition-all duration-300 will-change-transform shadow-lg hover:shadow-primary/20"
          onMouseMove={(e) => handleIconMouseMove(e, 'twitter')}
          onMouseEnter={() => setHoveredIcon('twitter')}
          onMouseLeave={() => handleIconMouseLeave('twitter')}
        >
          <Twitter size={20} />
        </a>
        <a
          ref={el => socialIconsRef.current['instagram'] = el}
          href="https://www.instagram.com/r3dbeatz_music/"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-gray-400 hover:text-primary hover:border-primary transition-all duration-300 will-change-transform shadow-lg hover:shadow-primary/20"
          onMouseMove={(e) => handleIconMouseMove(e, 'instagram')}
          onMouseEnter={() => setHoveredIcon('instagram')}
          onMouseLeave={() => handleIconMouseLeave('instagram')}
        >
          <Instagram size={20} />
        </a>
        <a
          ref={el => socialIconsRef.current['youtube'] = el}
          href="https://www.youtube.com/@moodfusiontherapy/videos"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-gray-400 hover:text-primary hover:border-primary transition-all duration-300 will-change-transform shadow-lg hover:shadow-primary/20"
          onMouseMove={(e) => handleIconMouseMove(e, 'youtube')}
          onMouseEnter={() => setHoveredIcon('youtube')}
          onMouseLeave={() => handleIconMouseLeave('youtube')}
        >
          <Youtube size={20} />
        </a>
        <a
          ref={el => socialIconsRef.current['mail'] = el}
          href="mailto:febyantwinjoseph@gmail.com"
          className="p-2.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-gray-400 hover:text-primary hover:border-primary transition-all duration-300 will-change-transform shadow-lg hover:shadow-primary/20"
          onMouseMove={(e) => handleIconMouseMove(e, 'mail')}
          onMouseEnter={() => setHoveredIcon('mail')}
          onMouseLeave={() => handleIconMouseLeave('mail')}
        >
          <Mail size={20} />
        </a>
      </motion.div>

      {/* Mobile Social Icons */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: isVisible ? 1 : 0,
          y: isVisible ? 0 : 20,
          pointerEvents: isVisible ? 'auto' : 'none'
        }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-24 left-8 md:hidden flex flex-col gap-4 z-40"
      >
        <a
          href="https://www.linkedin.com/in/feby-antwin-joseph-934253201"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-gray-400 hover:text-primary hover:border-primary transition-all duration-300 shadow-lg hover:shadow-primary/20"
        >
          <Linkedin size={18} />
        </a>
        <a
          href="https://x.com/feby_joseph01"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-gray-400 hover:text-primary hover:border-primary transition-all duration-300 shadow-lg hover:shadow-primary/20"
        >
          <Twitter size={18} />
        </a>
        <a
          href="https://www.instagram.com/r3dbeatz_music/"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-gray-400 hover:text-primary hover:border-primary transition-all duration-300 shadow-lg hover:shadow-primary/20"
        >
          <Instagram size={18} />
        </a>
        <a
          href="https://www.youtube.com/@moodfusiontherapy/videos"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-gray-400 hover:text-primary hover:border-primary transition-all duration-300 shadow-lg hover:shadow-primary/20"
        >
          <Youtube size={18} />
        </a>
        <a
          href="mailto:febyantwinjoseph@gmail.com"
          className="p-2.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-gray-400 hover:text-primary hover:border-primary transition-all duration-300 shadow-lg hover:shadow-primary/20"
        >
          <Mail size={18} />
        </a>
      </motion.div>
    </>
  );
};
