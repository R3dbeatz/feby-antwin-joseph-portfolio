
import React from 'react';
import { motion } from 'framer-motion';
import { Typewriter } from './ui/typewriter';

const Motto = () => {
  // Same motto text as before for the animation
  const mottoText = [
    "Don't be afraid to get creative",
    "and experiment with your marketing."
  ];

  return (
    <div className="container mx-auto py-20 bg-dark">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <h2 className="text-2xl font-medium text-[#eb5939] uppercase mb-20 self-start">
          MY MOTTO
        </h2>
        
        <div className="w-full h-[200px] flex items-center justify-center mb-8">
          <Typewriter
            text={mottoText}
            speed={50}
            waitTime={3000}
            deleteSpeed={30}
            className="font-bold text-[#b7ab98] text-6xl"
            cursorChar="_"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Motto;
