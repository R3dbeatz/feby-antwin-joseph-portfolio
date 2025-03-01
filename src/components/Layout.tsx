
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import LoadingScreen from './LoadingScreen';
import Navigation from './Navigation';
import { useSmoothScrolling } from '../hooks/useSmoothScrolling';

interface LayoutProps {
  children: React.ReactNode;
  isLoading: boolean;
  onLoadingComplete: () => void;
}

const Layout = ({ children, isLoading, onLoadingComplete }: LayoutProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  
  // Initialize smooth scrolling and animations
  useSmoothScrolling(mainRef);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      {isLoading && <LoadingScreen onComplete={onLoadingComplete} />}
      <motion.div
        ref={mainRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gradient-to-b from-dark-lighter to-dark relative"
      >
        {/* Main Content */}
        <div className="relative z-10">
          <Navigation />
          {children}
        </div>
      </motion.div>
    </>
  );
};

export default Layout;
