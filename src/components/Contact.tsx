
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DecryptedText from './DecryptedText';

interface SocialLink {
  name: string;
  hoverText: string;
  url: string;
}

const Contact = () => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const leftSocialLinks: SocialLink[] = [
    { name: 'LinkedIn', hoverText: 'Professional profile', url: 'https://linkedin.com/' },
    { name: 'Instagram', hoverText: 'Visual stories', url: 'https://instagram.com/' },
  ];

  const rightSocialLinks: SocialLink[] = [
    { name: 'Twitter', hoverText: 'Latest updates', url: 'https://twitter.com/' },
    { name: 'YouTube', hoverText: 'Video content', url: 'https://youtube.com/' },
  ];

  return (
    <section className="section py-20 bg-dark" id="contact">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-[#b7ab98] tracking-widest uppercase mb-16 font-light text-3xl">
            C O N N E C T
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Left column - First set of social links */}
            <div className="space-y-10">
              {leftSocialLinks.map((link) => (
                <div key={link.name} className="relative overflow-hidden" style={{ position: 'relative' }}>
                  <div className="flex items-center">
                    <span className="text-[#b7ab98] mr-3 text-3xl">▸</span>
                    <a 
                      href={link.url}
                      className="text-[#b7ab98] hover:text-white text-4xl font-medium transition-colors duration-300 py-2"
                      onMouseEnter={() => setHoveredLink(link.name)}
                      onMouseLeave={() => setHoveredLink(null)}
                    >
                      {link.name}
                    </a>
                  </div>
                  <AnimatePresence>
                    {hoveredLink === link.name && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 top-0 w-full h-full bg-[#eb5939] flex items-center pl-10"
                      >
                        <span className="text-black text-2xl font-medium">{link.hoverText}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
            
            {/* Middle column - Second set of social links */}
            <div className="space-y-10">
              {rightSocialLinks.map((link) => (
                <div key={link.name} className="relative overflow-hidden" style={{ position: 'relative' }}>
                  <div className="flex items-center">
                    <span className="text-[#b7ab98] mr-3 text-3xl">▸</span>
                    <a 
                      href={link.url}
                      className="text-[#b7ab98] hover:text-white text-4xl font-medium transition-colors duration-300 py-2"
                      onMouseEnter={() => setHoveredLink(link.name)}
                      onMouseLeave={() => setHoveredLink(null)}
                    >
                      {link.name}
                    </a>
                  </div>
                  <AnimatePresence>
                    {hoveredLink === link.name && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 top-0 w-full h-full bg-[#eb5939] flex items-center pl-10"
                      >
                        <span className="text-black text-2xl font-medium">{link.hoverText}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
            
            {/* Right column - Contact information */}
            <div className="space-y-12">
              <div className="space-y-3">
                <h3 className="text-[#b7ab98] text-2xl">Email</h3>
                <a href="mailto:febyantwinjoseph@gmail.com" className="text-[#8E9196] hover:text-white transition-colors text-xl block">
                  febyantwinjoseph@gmail.com
                </a>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-[#b7ab98] text-2xl">Phone</h3>
                <a href="tel:+12038642473" className="text-[#8E9196] hover:text-white transition-colors text-xl block">
                  +1 (203) 864-2473
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
