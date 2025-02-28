
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SocialLink {
  name: string;
  hoverText: string;
  url: string;
}

interface HoverHighlightProps {
  text: string;
  hiddenText: string;
  url: string;
}

const HoverHighlight: React.FC<HoverHighlightProps> = ({ text, hiddenText, url }) => {
  return (
    <div className="relative text-3xl font-bold">
      <a href={url} className="block">
        <motion.div
          initial={{ width: "0%" }}
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-[#b7ab98] h-full origin-left z-0"
        />
        <span className="relative z-10 mix-blend-difference text-white">{hiddenText}</span>
        <span className="relative z-10 text-[#a48c76]"> {text}</span>
      </a>
    </div>
  );
};

const Contact = () => {
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
          <h2 className="text-[#a48c76] tracking-widest uppercase mb-16 font-light text-3xl">
            C O N N E C T
          </h2>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full">
            {/* Left Section */}
            <div className="flex flex-col space-y-8 mb-10 md:mb-0">
              {leftSocialLinks.map((link, index) => (
                <HoverHighlight 
                  key={index} 
                  text={link.name} 
                  hiddenText={link.hoverText} 
                  url={link.url} 
                />
              ))}
            </div>

            {/* Center Section */}
            <div className="flex flex-col space-y-8 mb-10 md:mb-0">
              {rightSocialLinks.map((link, index) => (
                <HoverHighlight 
                  key={index} 
                  text={link.name} 
                  hiddenText={link.hoverText} 
                  url={link.url} 
                />
              ))}
            </div>

            {/* Right Section: Email and Phone */}
            <div className="text-right">
              <p className="text-[#a48c76] text-2xl font-light">Email</p>
              <a href="mailto:febyantwinjoseph@gmail.com" className="text-[#8E9196] hover:text-white transition-colors text-xl block">
                febyantwinjoseph@gmail.com
              </a>
              <p className="text-[#a48c76] text-2xl font-light mt-8">Phone</p>
              <a href="tel:+12038642473" className="text-[#8E9196] hover:text-white transition-colors text-xl block">
                +1 (203) 864-2473
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
