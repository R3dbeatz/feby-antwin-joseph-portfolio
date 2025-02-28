
import React from 'react';
import { motion } from 'framer-motion';
import { Typewriter } from './ui/typewriter';
import Threads from './ui/Threads';

const Motto = () => {
  // Same motto text as before for the animation
  const mottoText = [
    "Don't be afraid to get creative",
    "and experiment with your marketing."
  ];

  return (
    <div className="container mx-auto py-20 relative">
      {/* Threads Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Threads 
          color={[0.92, 0.35, 0.22]} // Primary orange color in RGB format (converted from #eb5939)
          amplitude={1}
          distance={0.5}
          enableMouseInteraction={true}
        />
      </div>
      
      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center relative z-10"
      >
        <h2 className="text-xl font-medium text-primary uppercase tracking-widest mb-10 text-center">
          MY MOTTO
        </h2>
        
        <div className="w-full h-[250px] flex items-center justify-center mb-8">
          <Typewriter
            text={mottoText}
            speed={50}
            waitTime={1000} // Reduced from 3000 to 1000 for faster line switching
            deleteSpeed={30}
            className="font-bold text-[#b7ab98] text-7xl" // Increased from text-6xl to text-7xl
            cursorChar="_"
          />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-[#b7ab98] text-xl mt-6" // Increased from text-lg to text-xl
        >
          Mike Volpe
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Motto;
