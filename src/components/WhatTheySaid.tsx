
import React, { useState, useRef, useEffect } from 'react';
import { AnimatedTooltip } from './ui/animated-tooltip';
import { motion, useScroll, useTransform } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    designation: "Marketing Director",
    image: "/lovable-uploads/a8f376bd-0ca8-4b5b-b2a8-1243e44df411.png",
    content: "Working with this developer was an incredible experience. Their attention to detail and ability to translate our vision into reality exceeded our expectations."
  },
  {
    id: 2,
    name: "Michael Chen",
    designation: "Tech Startup Founder",
    image: "/lovable-uploads/e61b52bb-6221-41bf-addf-b14309feb0d1.png",
    content: "I was blown away by the level of creativity and technical expertise. They delivered a product that not only met but exceeded our requirements, all within our tight deadline."
  },
  {
    id: 3,
    name: "Alex Morgan",
    designation: "Product Manager",
    image: "/lovable-uploads/ee8d853c-98fe-4d13-a329-e938b8965756.png",
    content: "Their problem-solving skills are exceptional. When we hit roadblocks, they found innovative solutions that kept our project on track and within budget."
  },
  {
    id: 4,
    name: "David Rodriguez",
    designation: "UX Director",
    image: "/lovable-uploads/d64b160e-b800-427c-bee1-1a30cc038512.png",
    content: "The attention to user experience was remarkable. They created an intuitive interface that our customers love, resulting in a significant increase in user engagement."
  },
];

const WhatTheySaid = () => {
  const [activeTestimonialId, setActiveTestimonialId] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "center center"]
  });
  
  // Transform the size of the images based on scroll position
  const imageSize = useTransform(scrollYProgress, [0, 0.5], [100, 56]); // From 100px to 56px
  const opacity = useTransform(scrollYProgress, [0, 0.75], [0.3, 1]);
  
  const handleImageClick = (id: number) => {
    // Toggle between the clicked testimonial and showing none
    setActiveTestimonialId(id === activeTestimonialId ? null : id);
  };
  
  const activeTestimonial = testimonials.find(t => t.id === activeTestimonialId);

  return (
    <div ref={sectionRef} className="container mx-auto py-20">
      <div className="max-w-4xl mx-auto">
        <motion.h2 
          style={{ opacity }}
          className="text-2xl font-medium text-[#eb5939] mb-8 text-left"
        >
          WHAT THEY SAID
        </motion.h2>
      </div>
      
      <div className="flex flex-col items-center">
        {/* Testimonial people display with dynamic size based on scroll */}
        <div className="mb-16 flex justify-center">
          <div className="flex justify-center">
            {testimonials.map((item) => (
              <div
                className="-mr-4 relative group cursor-pointer z-10"
                key={item.id}
                onClick={() => handleImageClick(item.id)}
              >
                <motion.img
                  style={{ 
                    width: imageSize, 
                    height: imageSize 
                  }}
                  src={item.image}
                  alt={item.name}
                  className="object-cover !m-0 !p-0 object-top rounded-full border-2 group-hover:scale-105 group-hover:z-30 border-dark relative transition duration-500"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Active testimonial display */}
        {activeTestimonial && (
          <div 
            className="max-w-2xl mx-auto mb-16 bg-dark-lighter border border-primary/20 p-6 rounded-lg shadow-lg hover:shadow-primary/10 transition-all duration-300 animate-fade-in"
          >
            <p className="text-foreground/80 mb-4 italic text-center">{activeTestimonial.content}</p>
            <div className="flex items-center justify-center">
              <img 
                src={activeTestimonial.image} 
                alt={activeTestimonial.name}
                className="w-10 h-10 rounded-full mr-3 object-cover border border-primary/30"
              />
              <div>
                <h4 className="font-medium text-primary">{activeTestimonial.name}</h4>
                <p className="text-sm text-foreground/60">{activeTestimonial.designation}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WhatTheySaid;
