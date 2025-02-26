
import { motion } from 'framer-motion';

const Testimonials = () => {
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

  return (
    <section className="section" id="testimonials">
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
            <motion.div
              key={index}
              className="testimonial-card bg-dark-lighter p-6 rounded-lg"
            >
              <p className="text-gray-400 mb-4">"{testimonial.content}"</p>
              <div>
                <p className="font-bold">{testimonial.name}</p>
                <p className="text-primary text-sm">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
