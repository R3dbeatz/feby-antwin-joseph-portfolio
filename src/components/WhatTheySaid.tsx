
import React, { useState, useEffect } from 'react';
import { AnimatedTooltip } from './ui/animated-tooltip';
import { motion } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: "Sujanan TP",
    designation: "CEO and President, Arcadia Chemicals",
    image: "/lovable-uploads/0a80a399-d183-4640-8325-c1b98b3eeeef.png",
    content: "Working with this developer was an incredible experience. Their attention to detail and ability to translate our vision into reality exceeded our expectations."
  },
  {
    id: 2,
    name: "Abhinav Piratla",
    designation: "Founder and CEO, Koopbox",
    image: "/lovable-uploads/db1c299e-2535-4de2-a105-b15f3d07df18.png",
    content: "I was blown away by the level of creativity and technical expertise. They delivered a product that not only met but exceeded our requirements, all within our tight deadline."
  },
  {
    id: 3,
    name: "Clive A. Senior",
    designation: "President and CEO, Qualikar",
    image: "/lovable-uploads/348a1be6-2b3d-4445-9ccd-dc75c1e0d569.png",
    content: "Their problem-solving skills are exceptional. When we hit roadblocks, they found innovative solutions that kept our project on track and within budget."
  },
  {
    id: 4,
    name: "Vishal Anivilla",
    designation: "Founder and CEO, FAV Media House",
    image: "/lovable-uploads/c68744bd-b339-4dab-bce2-593d682091a3.png",
    content: "The attention to user experience was remarkable. They created an intuitive interface that our customers love, resulting in a significant increase in user engagement."
  },
];

const WhatTheySaid = () => {
  const [activeTestimonialId, setActiveTestimonialId] = useState<number | null>(null);
  
  // Set the first testimonial as active when component mounts
  useEffect(() => {
    setActiveTestimonialId(1);
  }, []);
  
  const handleImageClick = (id: number) => {
    // Toggle between the clicked testimonial and showing none
    setActiveTestimonialId(id === activeTestimonialId ? null : id);
  };
  
  const activeTestimonial = testimonials.find(t => t.id === activeTestimonialId);

  return (
    <section className="container mx-auto py-20" id="testimonials" aria-label="Client Testimonials">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-start mb-12"
      >
        <h2 className="text-2xl font-medium text-[#eb5939] uppercase mb-8">
          WHAT THEY SAID
        </h2>
      </motion.div>
      
      <div className="flex flex-col items-center">
        {/* Testimonial people display */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-20 flex justify-center"
        >
          <AnimatedTooltip 
            items={testimonials} 
            className="flex justify-center" 
            onImageClick={handleImageClick}
          />
        </motion.div>
        
        {/* Active testimonial display */}
        {activeTestimonial && (
          <motion.blockquote 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-2xl mx-auto mb-16 bg-dark-lighter border border-primary/20 p-8 rounded-lg shadow-lg hover:shadow-primary/10 transition-all duration-300"
          >
            <p className="text-foreground/80 mb-6 italic text-center text-xl leading-relaxed">{activeTestimonial.content}</p>
            <footer className="flex items-center justify-center">
              <img 
                src={activeTestimonial.image} 
                alt={`Portrait of ${activeTestimonial.name}`}
                className="w-14 h-14 rounded-full mr-4 object-cover border-2 border-primary/30"
                width="56"
                height="56"
                loading="lazy"
              />
              <div>
                <cite className="font-medium text-primary text-lg not-italic">{activeTestimonial.name}</cite>
                <p className="text-sm text-foreground/60">{activeTestimonial.designation}</p>
              </div>
            </footer>
          </motion.blockquote>
        )}
      </div>
    </section>
  );
};

export default WhatTheySaid;
