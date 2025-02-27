
import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface TestimonialData {
  id: number;
  quote: string;
  name: string;
  title: string;
  company: string;
  image: string;
}

const testimonials: TestimonialData[] = [
  {
    id: 1,
    quote: "Minh is seriously the best and he never complains",
    name: "Michael Glass",
    title: "Group Design Director",
    company: "Fantasy Interactive",
    image: "/lovable-uploads/a2196fb9-df08-4c4f-adca-f3ed67aace52.png"
  },
  {
    id: 2,
    quote: "He's a beast. His skills are insane!",
    name: "Linh Le",
    title: "Project Manager",
    company: "Interactive Labs",
    image: "/lovable-uploads/ee8d853c-98fe-4d13-a329-e938b8965756.png"
  },
  {
    id: 3,
    quote: "This looks amazing. Great work!",
    name: "Peter Smart",
    title: "Head of Product",
    company: "Fantasy Interactive",
    image: "/lovable-uploads/d64b160e-b800-427c-bee1-1a30cc038512.png"
  }
];

const WhatTheySaid = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const testimonialSections = document.querySelectorAll('.testimonial-section');
    
    testimonialSections.forEach((section, index) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActiveIndex(index),
        onEnterBack: () => setActiveIndex(index),
        toggleClass: { targets: section, className: 'active' }
      });
    });

    // Create a timeline for each testimonial that will play when its section is active
    testimonialSections.forEach((section, index) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top center',
          end: 'bottom center',
          toggleActions: 'play none none reverse'
        }
      });

      // Animate the text and image
      tl.fromTo(
        `.testimonial-${index} .quote-text`,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.7 }
      ).fromTo(
        `.testimonial-${index} .author-info`,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.3"
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div 
      ref={sectionRef} 
      className="min-h-screen bg-[#222222] py-20 overflow-hidden"
    >
      <div className="container mx-auto px-4" ref={containerRef}>
        <div className="flex flex-col mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-[#F97316] mb-2">
            WHAT THEY SAID
          </h2>
          <div className="w-full h-px bg-neutral-800 mt-4"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 relative min-h-[500px]">
          {/* Testimonials Column */}
          <div className="space-y-32">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id} 
                className={`testimonial-section testimonial-${index} ${index === activeIndex ? 'opacity-100' : 'opacity-30'} transition-opacity duration-500`}
              >
                <div className="mb-6">
                  <div className="text-[#F97316] text-6xl font-serif">"</div>
                  <h3 className="quote-text text-4xl md:text-5xl lg:text-6xl font-serif text-[#b7ab98] leading-tight">
                    {testimonial.quote}
                  </h3>
                </div>
                <div className="author-info">
                  <p className="text-xl text-white font-medium">{testimonial.name}</p>
                  <p className="text-[#8E9196]">{testimonial.title}</p>
                  <p className="text-[#8E9196]">{testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Images Column */}
          <div className="hidden lg:flex flex-col items-end justify-center relative">
            <div className="sticky top-1/3 space-y-10">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={testimonial.id} 
                  className={`testimonial-image w-20 h-20 rounded-full overflow-hidden transition-all duration-500 relative
                  ${index === activeIndex ? 'scale-150 border-2 border-[#F97316] z-10' : 'grayscale'}
                  `}
                >
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 transition-opacity duration-500 ${index === activeIndex ? 'opacity-0' : 'opacity-50 bg-black'}`}></div>
                  {index === activeIndex && (
                    <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-[#F97316]"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatTheySaid;
