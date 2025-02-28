
import React from 'react';
import { motion } from 'framer-motion';
import { GooeyText } from './ui/gooey-text-morphing';

const Motto = () => {
  // Split the motto into parts for the animation
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
          <GooeyText
            texts={mottoText}
            morphTime={2}
            cooldownTime={3}
            className="font-bold text-[#b7ab98]"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Motto;
