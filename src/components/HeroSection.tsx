
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Squares } from './ui/squares-background';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0,
    y: 20,
    scale: 0.8
  },
  visible: { 
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15
    }
  }
};

const HeroSection = () => {
  return (
    <section className="section relative overflow-hidden">
      <div className="absolute inset-0">
        <Squares 
          direction="diagonal" 
          speed={0.5} 
          squareSize={40} 
          borderColor="#ffffff20" 
          hoverFillColor="#eb593920" 
          className="-z-10" 
        />
      </div>
      <div className="container relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          <motion.span 
            variants={itemVariants}
            className="text-primary font-medium mb-6 block text-2xl"
          >
            Welcome to my world
          </motion.span>

          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-6xl font-serif font-bold mb-6 lg:text-8xl"
          >
            <TypeAnimation
              sequence={[
                'Marketing Visionary',
                2000,
                'Digital Storyteller',
                2000,
                'Brand Strategist',
                2000
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="gradient-text"
            />
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-lg text-[#aa9e8b] max-w-2xl mx-auto mb-8 md:text-2xl font-normal"
          >
            Creating impactful digital experiences through strategic marketing and creative storytelling.
          </motion.p>

          <motion.button 
            variants={itemVariants}
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
