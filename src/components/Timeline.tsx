
import { motion } from 'framer-motion';

const timelineItems = [
  {
    year: '2024',
    title: 'Senior Marketing Strategist',
    description: 'Leading digital transformation initiatives and brand campaigns.',
  },
  {
    year: '2022',
    title: 'Marketing Team Lead',
    description: 'Managed successful product launches and marketing campaigns.',
  },
  {
    year: '2020',
    title: 'Digital Marketing Specialist',
    description: 'Developed and executed comprehensive digital marketing strategies.',
  },
];

const Timeline = () => {
  return (
    <section className="section" id="experience">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-serif font-bold mb-12 text-center"
        >
          My Journey
        </motion.h2>
        <div className="relative pl-8">
          <div className="timeline-line"></div>
          {timelineItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="mb-12 relative"
            >
              <div className="timeline-dot"></div>
              <span className="text-primary font-medium">{item.year}</span>
              <h3 className="text-xl font-bold mt-2">{item.title}</h3>
              <p className="text-gray-400 mt-2">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
