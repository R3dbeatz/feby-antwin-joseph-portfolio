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
  const leftSocialLinks: SocialLink[] = [{
    name: 'LinkedIn',
    hoverText: 'Serious Me',
    url: 'https://www.linkedin.com/in/feby-antwin-joseph-934253201'
  }, {
    name: 'Instagram',
    hoverText: 'AI Reels',
    url: 'https://www.instagram.com/r3dbeatz_music/'
  }];

  const rightSocialLinks: SocialLink[] = [{
    name: 'Twitter',
    hoverText: 'Musk Tweets',
    url: 'https://x.com/feby_joseph01'
  }, {
    name: 'YouTube',
    hoverText: 'Lofi Music',
    url: 'https://www.youtube.com/@moodfusiontherapy/videos'
  }];

  const contactInfo: ContactInfo[] = [{
    type: 'Email',
    value: 'febyantwinjoseph@gmail.com',
    url: 'mailto:febyantwinjoseph@gmail.com'
  }, {
    type: 'Phone',
    value: '+1 (203) 864-2473',
    url: 'tel:+12038642473'
  }];

  return <footer className="bg-dark py-10 relative" id="contact" style={{
    isolation: 'isolate'
  }}>
      <div className="container mx-auto px-4">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5
      }} className="relative text-center" style={{
        position: 'relative'
      }}>
          <h2 className="text-xl font-medium text-[#eb5939] uppercase mb-8">
            CONNECT
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-4xl mx-auto">
            {/* Left column - First set of social links */}
            <div className="space-y-10">
              {leftSocialLinks.map(link => <FlowingMenuItem key={link.name} text={link.name} hoverText={link.hoverText} url={link.url} />)}
            </div>
            
            {/* Middle column - Second set of social links */}
            <div className="space-y-10">
              {rightSocialLinks.map(link => <FlowingMenuItem key={link.name} text={link.name} hoverText={link.hoverText} url={link.url} />)}
            </div>
            
            {/* Right column - Contact information */}
            <div className="space-y-12 text-left">
              {contactInfo.map(info => <div key={info.type} className="space-y-3">
                  <h3 className="text-[#a48c76] font-medium text-sm">{info.type}</h3>
                  <a href={info.url} className="text-[#8E9196] hover:text-white transition-colors text-sm font-medium block">
                    {info.value}
                  </a>
                </div>)}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>;
};

interface FlowingMenuItemProps {
  text: string;
  hoverText: string;
  url: string;
}

const FlowingMenuItem = ({
  text,
  hoverText,
  url
}: FlowingMenuItemProps) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLAnchorElement>(null);

  const animationDefaults = {
    duration: 0.6,
    ease: "expo"
  };

  const handleMouseEnter = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    if (!itemRef.current || !overlayRef.current || !textRef.current) return;
    
    // Clear any existing tweens on these elements
    gsap.killTweensOf([overlayRef.current, textRef.current]);
    
    const tl = gsap.timeline({
      defaults: animationDefaults
    });
    
    tl.set(overlayRef.current, {
      y: "-101%"
    }).to(overlayRef.current, {
      y: "0%"
    }, 0).to(textRef.current, {
      opacity: 0,
      duration: 0.3
    }, 0);
  };

  const handleMouseLeave = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    if (!itemRef.current || !overlayRef.current || !textRef.current) return;
    
    // Clear any existing tweens on these elements
    gsap.killTweensOf([overlayRef.current, textRef.current]);
    
    const tl = gsap.timeline({
      defaults: animationDefaults
    });
    
    tl.to(overlayRef.current, {
      y: "-101%"
    }, 0).to(textRef.current, {
      opacity: 1,
      duration: 0.3,
      delay: 0.2
    });
  };

  return <div ref={itemRef} className="relative overflow-hidden h-16 text-left">
      <div className="flex items-center justify-start">
        <span className="text-[#eb5939] mr-4 text-3xl">▸</span>
        <a ref={textRef} href={url} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="text-[#a48c76] text-xl sm:text-2xl md:text-3xl font-serif font-bold uppercase tracking-wider relative z-10 cursor-pointer transition-opacity duration-300">
          {text}
        </a>
      </div>
      <div ref={overlayRef} className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none bg-[#eb5939] translate-y-[-101%] flex items-center justify-start pl-8 md:pl-12">
        <span className="text-white font-serif font-bold text-lg sm:text-xl md:text-2xl uppercase tracking-wider">{hoverText}</span>
      </div>
    </div>;
};

export default Contact;
