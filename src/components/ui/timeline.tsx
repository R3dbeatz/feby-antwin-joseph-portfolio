"use client";

import { useMotionValueEvent, useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}
export const Timeline = ({
  data
}: {
  data: TimelineEntry[];
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);
  const {
    scrollYProgress
  } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"]
  });
  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  return <div className="w-full bg-dark font-sans py-20 md:px-10 relative" ref={containerRef}>
      <div className="max-w-7xl mx-auto py-10 px-4 md:px-8 lg:px-10">
        <motion.h2 initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6
      }} viewport={{
        once: true
      }} className="text-4xl md:text-5xl font-bold text-[#eb5939] mb-10 relative z-20 lg:text-2xl">
          MY JOURNEY
        </motion.h2>
        <motion.p initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6,
        delay: 0.2
      }} viewport={{
        once: true
      }} className="text-neutral-400 text-base md:text-lg lg:text-xl max-w-lg">
          A timeline of my professional career and accomplishments
        </motion.p>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => <motion.div initial={{
        opacity: 0,
        x: -20
      }} whileInView={{
        opacity: 1,
        x: 0
      }} transition={{
        duration: 0.8,
        delay: index * 0.2
      }} viewport={{
        once: true,
        margin: "-100px"
      }} key={index} className="flex justify-start pt-16 md:pt-40 md:gap-10">
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-14 absolute left-3 md:left-3 w-14 rounded-full bg-dark-lighter flex items-center justify-center">
                <div className="h-6 w-6 rounded-full bg-[#b7ab98] border-2 border-primary p-2" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-24 md:text-6xl font-bold text-[#b7ab98]">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 md:pr-10 w-full">
              <h3 className="md:hidden block text-3xl mb-4 text-left font-bold text-[#b7ab98]">
                {item.title}
              </h3>
              <div className="transform transition-all duration-500 hover:scale-[1.02]">
                {item.content}
              </div>
            </div>
          </motion.div>)}
        <div style={{
        height: height + "px"
      }} className="absolute md:left-8 left-8 top-0 overflow-hidden w-[3px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-600 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] ">
          <motion.div style={{
          height: heightTransform,
          opacity: opacityTransform
        }} className="absolute inset-x-0 top-0 w-[3px] bg-gradient-to-t from-primary via-accent to-transparent from-[0%] via-[10%] rounded-full" />
        </div>
      </div>
    </div>;
};