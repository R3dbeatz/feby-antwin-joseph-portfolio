
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
  const [showProgress, setShowProgress] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setShowOptimize(true);
          setShowProgress(false);
          return 100;
        }
        return prev + 1;
      });
    }, 50); // 50ms * 100 steps = 5000ms total duration for smoother animation

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
      <div className="relative flex flex-col items-center">
        <AnimatePresence>
          {showProgress && (
            <motion.div 
              className="mb-8 text-foreground"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <span className="text-3xl font-medium">{progress}%</span>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="relative">
          <div className="w-96 h-96 flex items-center justify-center">
            <Logo />
          </div>
          <AnimatePresence>
            {showProgress && (
              <motion.div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <svg className="w-[500px] h-[500px]" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#1a1a1a"
                    strokeWidth="1"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#b7ab98"
                    strokeWidth="1"
                    strokeDasharray={283}
                    strokeDashoffset={283 - (283 * progress) / 100}
                    className="transform -rotate-90 origin-center"
                  />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
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
            className="mt-2" // Changed from mt-8 to mt-2 to bring the button closer to the logo
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
