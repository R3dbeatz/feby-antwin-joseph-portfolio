
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import LoadingScreen from './LoadingScreen';
import Navigation from './Navigation';
import { useSmoothScrolling } from '../hooks/useSmoothScrolling';
import SEO from './SEO';
import { useActiveSection } from '../hooks/useActiveSection';

interface LayoutProps {
  children: React.ReactNode;
  isLoading: boolean;
  onLoadingComplete: () => void;
}

const Layout = ({ children, isLoading, onLoadingComplete }: LayoutProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const activeSection = useActiveSection();
  const prevSection = useRef<string | null>(null);
  
  // Initialize smooth scrolling and animations
  useSmoothScrolling(mainRef);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Track page views when section changes
  useEffect(() => {
    if (activeSection && activeSection !== prevSection.current) {
      // Only track if window.gtag exists and sections are different
      if (window.gtag && typeof window.gtag === 'function') {
        window.gtag('event', 'page_view', {
          page_title: activeSection.charAt(0).toUpperCase() + activeSection.slice(1),
          page_location: `${window.location.origin}/#${activeSection}`,
          page_path: `/#${activeSection}`
        });
        console.log(`Tracked view for section: ${activeSection}`);
      }
      prevSection.current = activeSection;
    }
  }, [activeSection]);

  return (
    <>
      {/* SEO Component */}
      <SEO />
      
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
