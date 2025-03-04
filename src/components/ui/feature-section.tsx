
"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { Button } from "./button"

interface Feature {
  step: string
  title?: string
  content: string
  image: string
}

interface FeatureStepsProps {
  features: Feature[]
  className?: string
  title?: string
  autoPlayInterval?: number
  imageHeight?: string
}

export function FeatureSteps({
  features,
  className,
  title = "How to get Started",
  autoPlayInterval = 3000,
  imageHeight = "h-[400px]",
}: FeatureStepsProps) {
  const [currentFeature, setCurrentFeature] = useState(0)
  const [progress, setProgress] = useState(0)
  const [imagesLoaded, setImagesLoaded] = useState<Record<number, boolean>>({})
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({})
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Preload images
  useEffect(() => {
    const preloadedImages: Record<number, HTMLImageElement> = {};
    
    features.forEach((feature, index) => {
      preloadedImages[index] = new Image();
      preloadedImages[index].src = feature.image;
      preloadedImages[index].onload = () => {
        setImagesLoaded(prev => ({ ...prev, [index]: true }));
        setImageErrors(prev => ({ ...prev, [index]: false }));
      };
      preloadedImages[index].onerror = () => {
        console.log(`Failed to preload image: ${feature.image}, using placeholder`);
        setImagesLoaded(prev => ({ ...prev, [index]: false }));
        setImageErrors(prev => ({ ...prev, [index]: true }));
      };
    });
    
    return () => {
      // Clean up preloaded images
      Object.values(preloadedImages).forEach(img => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, [features]);

  // Autoplay timer effect
  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    timerRef.current = setInterval(() => {
      setProgress(prev => {
        if (prev < 100) {
          return prev + 100 / (autoPlayInterval / 100);
        } else {
          setCurrentFeature(prev => (prev + 1) % features.length);
          return 0;
        }
      });
    }, 100);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [features.length, autoPlayInterval]);

  // Manual navigation
  const handleFeatureClick = (index: number) => {
    setCurrentFeature(index);
    setProgress(0);
  };

  // Get fallback image when there's an error
  const getFallbackImage = () => {
    return "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?q=80&w=1000&auto=format&fit=crop";
  };

  return (
    <div className={cn("p-8 md:p-12", className)}>
      <div className="max-w-7xl mx-auto w-full">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-10 text-center font-serif">
          {title}
        </h2>

        <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-10">
          <div className="order-2 md:order-1 space-y-8">
            {features.map((feature, index) => (
              <motion.div
                key={`feature-${index}-${feature.step}`}
                className={cn(
                  "flex items-center gap-6 md:gap-8 cursor-pointer",
                  index === currentFeature ? "opacity-100" : "opacity-50 hover:opacity-75"
                )}
                initial={{ opacity: 0.3 }}
                animate={{ opacity: index === currentFeature ? 1 : 0.3 }}
                transition={{ duration: 0.5 }}
                onClick={() => handleFeatureClick(index)}
              >
                <motion.div
                  className={cn(
                    "w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border-2",
                    index === currentFeature
                      ? "bg-primary border-primary text-primary-foreground scale-110"
                      : "bg-dark border-gray-600",
                  )}
                >
                  {index <= currentFeature ? (
                    <span className="text-lg font-bold">✓</span>
                  ) : (
                    <span className="text-lg font-semibold">{index + 1}</span>
                  )}
                </motion.div>

                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-semibold text-primary font-serif">
                    {feature.title || feature.step}
                  </h3>
                  <p className="text-sm md:text-lg text-gray-300">
                    {feature.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div
            className={cn(
              "order-1 md:order-2 relative h-[200px] md:h-[300px] lg:h-[400px] overflow-hidden rounded-lg bg-gray-900"
            )}
          >
            <AnimatePresence mode="wait">
              {features.map(
                (feature, index) =>
                  index === currentFeature && (
                    <motion.div
                      key={`image-${index}-${feature.step}`}
                      className="absolute inset-0 rounded-lg overflow-hidden"
                      initial={{ y: 100, opacity: 0, rotateX: -20 }}
                      animate={{ y: 0, opacity: 1, rotateX: 0 }}
                      exit={{ y: -100, opacity: 0, rotateX: 20 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                      <img
                        src={imageErrors[index] ? getFallbackImage() : feature.image}
                        alt={feature.title || feature.step}
                        className="w-full h-full object-contain transition-transform transform"
                        onError={(e) => {
                          console.log(`Failed to load image at runtime: ${feature.image}`);
                          e.currentTarget.src = getFallbackImage();
                          setImageErrors(prev => ({ ...prev, [index]: true }));
                        }}
                      />
                      <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-dark via-dark/50 to-transparent" />
                    </motion.div>
                  ),
              )}
            </AnimatePresence>

            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800">
              <motion.div 
                className="h-full bg-primary"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
