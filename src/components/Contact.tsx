
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import DecryptedText from './DecryptedText';

interface SocialLink {
  name: string;
  hoverText: string;
  url: string;
}

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
    <section className="section py-20 bg-dark relative" id="contact">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
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
              <div className="space-y-3">
                <h3 className="text-[#a48c76] text-2xl">Email</h3>
                <a href="mailto:febyantwinjoseph@gmail.com" className="text-[#8E9196] hover:text-white transition-colors text-xl block">
                  febyantwinjoseph@gmail.com
                </a>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-[#a48c76] text-2xl">Phone</h3>
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

interface FlowingMenuItemProps {
  text: string;
  hoverText: string;
  url: string;
}

const FlowingMenuItem = ({ text, hoverText, url }: FlowingMenuItemProps) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const marqueeInnerRef = useRef<HTMLDivElement>(null);

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
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current)
      return;
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(
      ev.clientX - rect.left,
      ev.clientY - rect.top,
      rect.width,
      rect.height
    );

    const tl = gsap.timeline({ defaults: animationDefaults });
    tl.set(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" })
      .set(marqueeInnerRef.current, { y: edge === "top" ? "101%" : "-101%" })
      .to([marqueeRef.current, marqueeInnerRef.current], { y: "0%" });
  };

  const handleMouseLeave = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current)
      return;
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(
      ev.clientX - rect.left,
      ev.clientY - rect.top,
      rect.width,
      rect.height
    );

    const tl = gsap.timeline({ defaults: animationDefaults });
    tl.to(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" })
      .to(marqueeInnerRef.current, { y: edge === "top" ? "101%" : "-101%" });
  };

  const repeatedMarqueeContent = Array.from({ length: 8 }).map((_, idx) => (
    <span key={idx} className="text-black font-bold text-xl mx-4">{hoverText}</span>
  ));

  return (
    <div
      ref={itemRef}
      className="relative overflow-hidden h-16 text-center"
    >
      <div className="flex items-center">
        <span className="text-[#eb5939] mr-4 text-3xl">▸</span>
        <a
          className="text-[#a48c76] text-4xl font-bold relative z-10 cursor-pointer"
          href={url}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {text}
        </a>
      </div>
      <div
        ref={marqueeRef}
        className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none bg-[#eb5939] translate-y-[101%]"
      >
        <div 
          ref={marqueeInnerRef}
          className="h-full w-full flex items-center"
        >
          <div className="flex items-center h-full w-[200%] animate-marquee">
            {repeatedMarqueeContent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
