
import React, { useState, useEffect } from 'react';
import { AnimatedTooltip } from './ui/animated-tooltip';

const testimonials = [
  {
    id: 1,
    name: "Sujanan TP",
    designation: "Marketing Director",
    image: "/lovable-uploads/0a80a399-d183-4640-8325-c1b98b3eeeef.png",
    content: "Working with this developer was an incredible experience. Their attention to detail and ability to translate our vision into reality exceeded our expectations."
  },
  {
    id: 2,
    name: "Abhinav Piratla",
    designation: "Tech Startup Founder",
    image: "/lovable-uploads/db1c299e-2535-4de2-a105-b15f3d07df18.png",
    content: "I was blown away by the level of creativity and technical expertise. They delivered a product that not only met but exceeded our requirements, all within our tight deadline."
  },
  {
    id: 3,
    name: "Clive A. Senior",
    designation: "Product Manager",
    image: "/lovable-uploads/348a1be6-2b3d-4445-9ccd-dc75c1e0d569.png",
    content: "Their problem-solving skills are exceptional. When we hit roadblocks, they found innovative solutions that kept our project on track and within budget."
  },
  {
    id: 4,
    name: "Vishal Anivilla",
    designation: "UX Director",
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
    <div className="container mx-auto py-20">
      <div className="flex justify-start mb-12">
        <h2 className="text-2xl font-medium text-[#eb5939] uppercase mb-8">
          WHAT THEY SAID
        </h2>
      </div>
      
      <div className="flex flex-col items-center">
        {/* Testimonial people display - increased spacing here */}
        <div className="mb-20 flex justify-center">
          <AnimatedTooltip 
            items={testimonials} 
            className="flex justify-center" 
            onImageClick={handleImageClick}
          />
        </div>
        
        {/* Active testimonial display */}
        {activeTestimonial && (
          <div 
            className="max-w-2xl mx-auto mb-16 bg-dark-lighter border border-primary/20 p-6 rounded-lg shadow-lg hover:shadow-primary/10 transition-all duration-300 animate-fade-in"
          >
            <p className="text-foreground/80 mb-4 italic text-center text-xl">{activeTestimonial.content}</p>
            <div className="flex items-center justify-center">
              <img 
                src={activeTestimonial.image} 
                alt={activeTestimonial.name}
                className="w-12 h-12 rounded-full mr-3 object-cover border border-primary/30"
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
