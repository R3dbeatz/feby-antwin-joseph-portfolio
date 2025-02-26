
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';

const HeroSection = () => {
  return (
    <section className="section relative overflow-hidden">
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="text-primary font-medium mb-6 block">Welcome to my world</span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6">
            <TypeAnimation
              sequence={[
                'Marketing Visionary',
                2000,
                'Digital Storyteller',
                2000,
                'Brand Strategist',
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="gradient-text"
            />
          </h1>
          <p className="text-lg md:text-xl text-[#aa9e8b] max-w-2xl mx-auto mb-8">
            Creating impactful digital experiences through strategic marketing and creative storytelling.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary text-white px-8 py-3 rounded-full font-medium"
          >
            Explore My Work
          </motion.button>
        </motion.div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-dark-lighter to-dark opacity-50"></div>
    </section>
  );
};

export default HeroSection;
