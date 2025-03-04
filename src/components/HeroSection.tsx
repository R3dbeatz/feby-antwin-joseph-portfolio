
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Squares } from './ui/squares-background';

const HeroSection = () => {
  return <section className="section relative overflow-hidden">
      <div className="absolute inset-0">
        <Squares direction="diagonal" speed={0.5} squareSize={40} borderColor="#ffffff20" hoverFillColor="#eb593920" className="-z-10" />
      </div>
      <div className="container relative z-10">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8
      }} className="text-center">
          <span className="text-primary font-medium mb-6 block text-2xl">Welcome to my world</span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 lg:text-8xl">
            <TypeAnimation sequence={['Marketing Visionary', 2000, 'Digital Storyteller', 2000, 'Brand Strategist', 2000]} wrapper="span" speed={50} repeat={Infinity} className="gradient-text" />
          </h1>
          <p className="text-lg text-[#aa9e8b] max-w-2xl mx-auto mb-8 md:text-2xl font-normal">
            Creating impactful digital experiences through strategic marketing and creative storytelling.
          </p>
          <div className="flex gap-4 justify-center">
            <motion.a 
              href="https://www.linkedin.com/in/feby-antwin-joseph-934253201" 
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{
                scale: 1.05
              }} 
              whileTap={{
                scale: 0.95
              }} 
              className="bg-primary text-white px-8 py-3 rounded-full font-medium"
            >
              Connect With Me
            </motion.a>
            <motion.a 
              href="#projects" 
              whileHover={{
                scale: 1.05
              }} 
              whileTap={{
                scale: 0.95
              }} 
              className="border border-primary text-primary px-8 py-3 rounded-full font-medium hover:bg-primary/10 transition-colors"
            >
              Explore My Work
            </motion.a>
          </div>
        </motion.div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-dark-lighter to-dark opacity-50"></div>
    </section>;
};

export default HeroSection;
