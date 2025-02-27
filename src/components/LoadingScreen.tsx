
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
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-dark"
    >
      <div className="relative">
        <div className="w-32 h-32 flex items-center justify-center">
          <Logo />
        </div>
        <div className="absolute -inset-4">
          <svg className="w-40 h-40" viewBox="0 0 100 100">
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
              stroke="#eb5939"
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8"
          >
            <Button
              onClick={onComplete}
              className="px-8 py-2 text-lg bg-primary hover:bg-primary/90"
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
