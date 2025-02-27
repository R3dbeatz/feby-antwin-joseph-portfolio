
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Logo } from './Logo';
import { Progress } from './ui/progress';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [showOptimize, setShowOptimize] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setShowOptimize(true);
          return 100;
        }
        return prev + 5;
      });
    }, 5); // Reduced to 5ms for faster progress (100ms total)

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        scale: 1.1,
        transition: {
          duration: 0.8,
          ease: [0.43, 0.13, 0.23, 0.96]
        }
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-dark"
    >
      <div className="relative">
        <div className="w-64 h-64 flex items-center justify-center">
          <Logo />
        </div>
        <div className="absolute -inset-12">
          <svg className="w-[400px] h-[400px]" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#1a1a1a"
              strokeWidth="2"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#b7ab98"
              strokeWidth="2"
              strokeDasharray={283}
              strokeDashoffset={283 - (283 * progress) / 100}
              className="transform -rotate-90 origin-center"
            />
          </svg>
        </div>
      </div>
      <div className="mt-8 text-foreground">
        <span className="text-xl font-medium">{progress}%</span>
      </div>
      <AnimatePresence>
        {showOptimize && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              transition: {
                duration: 0.5,
                type: "spring",
                stiffness: 200,
                damping: 15
              }
            }}
            whileHover={{ 
              scale: 1.05,
              rotate: [0, -1, 1, -1, 0],
              transition: {
                duration: 0.3,
                rotate: {
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 0.3
                }
              }
            }}
            className="mt-8"
          >
            <Button
              onClick={onComplete}
              className="px-8 py-2 text-lg border-2 border-[#b7ab98] text-[#b7ab98] bg-transparent hover:bg-[#b7ab98] hover:text-white transition-all duration-300"
            >
              Optimize
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default LoadingScreen;

