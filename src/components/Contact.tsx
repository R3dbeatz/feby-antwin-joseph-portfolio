
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import DecryptedText from './DecryptedText';

interface SocialLink {
  name: string;
  hoverText: string;
  url: string;
}

interface ContactInfo {
  type: string;
  value: string;
  url: string;
}

const Contact = () => {
  const leftSocialLinks: SocialLink[] = [
    { name: 'LinkedIn', hoverText: 'Serious Me', url: 'https://linkedin.com/' },
    { name: 'Instagram', hoverText: 'Just For Reels', url: 'https://instagram.com/' },
  ];

  const rightSocialLinks: SocialLink[] = [
    { name: 'Twitter', hoverText: 'Elon Musk Fun', url: 'https://twitter.com/' },
    { name: 'YouTube', hoverText: 'Lofi Music', url: 'https://youtube.com/' },
  ];

  const contactInfo: ContactInfo[] = [
    { 
      type: 'Email', 
      value: 'febyantwinjoseph@gmail.com', 
      url: 'mailto:febyantwinjoseph@gmail.com' 
    },
    { 
      type: 'Phone', 
      value: '+1 (203) 864-2473', 
      url: 'tel:+12038642473' 
    },
  ];

  return (
    <footer className="bg-dark py-20 relative" id="contact" style={{ isolation: 'isolate', backgroundColor: '#0d0d0d' }}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <h2 className="text-[#eb5939] text-2xl font-medium mb-8">
            CONNECT
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Left column - First set of social links */}
            <div className="space-y-10">
              {leftSocialLinks.map((link) => (
                <FlowingMenuItem 
                  key={link.name} 
                  text={link.name} 
                  hoverText={link.hoverText} 
                  url={link.url} 
                />
              ))}
            </div>
            
            {/* Middle column - Second set of social links */}
            <div className="space-y-10">
              {rightSocialLinks.map((link) => (
                <FlowingMenuItem 
                  key={link.name} 
                  text={link.name} 
                  hoverText={link.hoverText} 
                  url={link.url} 
                />
              ))}
            </div>
            
            {/* Right column - Contact information */}
            <div className="space-y-12">
              {contactInfo.map((info) => (
                <div key={info.type} className="space-y-3">
                  <h3 className="text-[#a48c76] text-2xl font-bold">{info.type}</h3>
                  <a href={info.url} className="text-[#d4d6d9] hover:text-white transition-colors text-xl font-bold block">
                    {info.value}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

interface FlowingMenuItemProps {
  text: string;
  hoverText: string;
  url: string;
}

const FlowingMenuItem = ({ text, hoverText, url }: FlowingMenuItemProps) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLAnchorElement>(null);

  const animationDefaults = { duration: 0.6, ease: "expo" };

  const findClosestEdge = (
    mouseX: number,
    mouseY: number,
    width: number,
    height: number
  ): "top" | "bottom" => {
    const topEdgeDist = Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY, 2);
    const bottomEdgeDist =
      Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY - height, 2);
    return topEdgeDist < bottomEdgeDist ? "top" : "bottom";
  };

  const handleMouseEnter = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    if (!itemRef.current || !overlayRef.current || !textRef.current)
      return;
    
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(
      ev.clientX - rect.left,
      ev.clientY - rect.top,
      rect.width,
      rect.height
    );

    const tl = gsap.timeline({ defaults: animationDefaults });
    tl.set(overlayRef.current, { y: edge === "top" ? "-101%" : "101%" })
      .to(overlayRef.current, { y: "0%" }, 0)
      .to(textRef.current, { opacity: 0, duration: 0.3 }, 0);
  };

  const handleMouseLeave = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    if (!itemRef.current || !overlayRef.current || !textRef.current)
      return;
    
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(
      ev.clientX - rect.left,
      ev.clientY - rect.top,
      rect.width,
      rect.height
    );

    const tl = gsap.timeline({ defaults: animationDefaults });
    tl.to(overlayRef.current, { y: edge === "top" ? "-101%" : "101%" }, 0)
      .to(textRef.current, { opacity: 1, duration: 0.3, delay: 0.2 });
  };

  return (
    <div
      ref={itemRef}
      className="relative overflow-hidden h-16 text-left"
    >
      <div className="flex items-center justify-start">
        <span className="text-[#eb5939] mr-4 text-3xl">▸</span>
        <a
          ref={textRef}
          className="text-[#d4d6d9] text-4xl font-serif font-bold uppercase tracking-wider relative z-10 cursor-pointer transition-opacity duration-300"
          href={url}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {text}
        </a>
      </div>
      <div
        ref={overlayRef}
        className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none bg-[#eb5939] translate-y-[101%] flex items-center justify-start pl-12"
      >
        <span className="text-black font-serif font-bold text-4xl uppercase tracking-wider">{hoverText}</span>
      </div>
    </div>
  );
};

export default Contact;
