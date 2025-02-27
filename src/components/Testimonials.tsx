
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Testimonials = () => {
  const testimonialsRef = useRef<HTMLDivElement>(null);
  
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO, TechStart',
      content: 'An exceptional marketing strategist who delivered outstanding results for our company.',
    },
    {
      name: 'Michael Chen',
      role: 'Marketing Director, InnovateCorp',
      content: 'Transformed our digital presence with innovative strategies and clear vision.',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Founder, GrowthLabs',
      content: 'Highly recommend working with such a talented and dedicated marketing professional.',
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.testimonial-card', {
        scrollTrigger: {
          trigger: testimonialsRef.current,
          start: "top center+=100",
          end: "bottom center",
          scrub: 1,
        },
        stagger: 0.2,
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      });
    }, testimonialsRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section" id="testimonials" ref={testimonialsRef}>
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-serif font-bold mb-12 text-center"
        >
          Client Testimonials
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="testimonial-card bg-dark-lighter p-6 rounded-lg"
            >
              <p className="text-gray-400 mb-4">"{testimonial.content}"</p>
              <div>
                <p className="font-bold">{testimonial.name}</p>
                <p className="text-primary text-sm">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
