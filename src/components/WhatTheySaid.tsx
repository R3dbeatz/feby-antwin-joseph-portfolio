
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
  const testimonialRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imagesContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Make sure the section and images container exist
    if (!sectionRef.current || !imagesContainerRef.current) return;
    
    // Create a ScrollTrigger context
    const ctx = gsap.context(() => {
      // Create a main ScrollTrigger for the entire section
      const sectionTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        onEnter: () => {
          // Only apply fixed positioning on desktop
          if (window.innerWidth >= 1024) {
            gsap.to(imagesContainerRef.current, {
              position: "fixed",
              top: "50%",
              right: "10%",
              transform: "translateY(-50%)",
              duration: 0.3
            });
          }
        },
        onLeaveBack: () => {
          // Reset when scrolling back up out of the section
          gsap.to(imagesContainerRef.current, {
            position: "relative",
            top: "auto",
            right: "auto",
            transform: "none",
            duration: 0.3
          });
        },
        onLeave: () => {
          // Reset when scrolling past the section
          gsap.to(imagesContainerRef.current, {
            position: "relative",
            top: "auto",
            right: "auto",
            transform: "none",
            duration: 0.3
          });
        }
      });
      
      // Create individual triggers for each testimonial
      testimonialRefs.current.forEach((section, index) => {
        if (!section) return;
        
        ScrollTrigger.create({
          trigger: section,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveIndex(index),
          onEnterBack: () => setActiveIndex(index),
        });

        // Create animation timeline for each testimonial
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top center",
            end: "bottom center",
            toggleActions: "play none none reverse"
          }
        });

        // Animate the content
        tl.fromTo(
          `.testimonial-${index} .quote-text`,
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.7 }
        ).fromTo(
          `.testimonial-${index} .author-info`,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.3"
        ).fromTo(
          `.testimonial-${index} .testimonial-line`,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.7, transformOrigin: "left center" },
          "-=0.5"
        );
      });
    });

    return () => {
      // Clean up
      ctx.revert();
    };
  }, []);

  return (
    <div 
      ref={sectionRef} 
      className="min-h-screen bg-[#333333] py-20 overflow-hidden relative"
    >
      <div className="container mx-auto px-4" ref={containerRef}>
        <div className="flex flex-col mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-[#F97316] mb-2">
            WHAT THEY SAID
          </h2>
          <div className="w-full h-px bg-neutral-700 mt-4"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 relative min-h-[60vh]">
          {/* Testimonials Column - takes 2/3 of the grid on large screens */}
          <div className="col-span-1 lg:col-span-2 space-y-40">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id} 
                className={`testimonial-section testimonial-${index} ${index === activeIndex ? 'opacity-100' : 'opacity-30'} transition-opacity duration-500`}
                ref={el => testimonialRefs.current[index] = el}
              >
                <div className="mb-6">
                  <div className="text-[#F97316] text-6xl font-serif">"</div>
                  <h3 className="quote-text text-4xl md:text-5xl lg:text-6xl font-serif text-[#b7ab98] leading-tight">
                    {testimonial.quote}
                  </h3>
                </div>
                <div className="author-info mt-6">
                  <p className="text-xl text-white font-medium">{testimonial.name}</p>
                  <p className="text-[#8E9196]">{testimonial.title}</p>
                  <p className="text-[#8E9196] mb-4">{testimonial.company}</p>
                  <div className="testimonial-line w-16 h-0.5 bg-[#F97316] transform origin-left"></div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Images Column - takes 1/3 of the grid on large screens */}
          <div className="hidden lg:block col-span-1">
            <div 
              ref={imagesContainerRef}
              className="testimonial-images-container relative flex flex-col items-center justify-center space-y-6"
            >
              {testimonials.map((testimonial, index) => (
                <div 
                  key={testimonial.id} 
                  className={`testimonial-image relative transition-all duration-500 
                    ${index === activeIndex ? 
                      'w-24 h-24 border-2 border-[#F97316] z-10' : 
                      'w-16 h-16 grayscale opacity-50'}`}
                >
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-full h-full object-cover rounded-full"
                  />
                  {index === activeIndex && (
                    <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-[#F97316] rounded-full"></div>
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
