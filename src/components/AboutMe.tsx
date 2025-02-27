
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const AboutMe = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "75vh center"]
  });
  const opacity = useTransform(scrollYProgress, [0, 0.75], [0.3, 1]);

  // Split text into parts for 5 lines
  const textParts = [
    "I'm a",
    "strategically",
    "focused digital",
    "marketer with a passion",
    "for crafting data-driven campaigns & delivering measurable business growth."
  ];

  // Create character arrays for each line
  const lines = textParts.map(part => part.split(''));

  // Create color transforms for text
  const createLineColors = (chars: string[], startOffset: number = 0, isHighlighted: boolean = false) => {
    return chars.map((_, index) => {
      const start = (index + startOffset) / (textParts.join('').length) * 0.75;
      const end = start + 0.1 / (textParts.join('').length);
      return useTransform(scrollYProgress, [start, end], isHighlighted ? ['#333333', '#eb5939'] : ['#333333', '#aa9e8b']);
    });
  };

  // Generate colors for each line
  const lineColors = lines.map((line, lineIndex) => 
    createLineColors(line, lines.slice(0, lineIndex).reduce((acc, curr) => acc + curr.length, 0))
  );

  return (
    <section ref={sectionRef} className="min-h-screen flex items-center justify-center bg-dark py-20 relative">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.8
          }}
          viewport={{
            once: true
          }}
          className="max-w-4xl mx-auto"
        >
          <motion.h2
            style={{
              opacity
            }}
            className="text-2xl font-medium text-[#eb5939] mb-8"
          >
            ABOUT ME
          </motion.h2>
          <div className="max-w-[90vw] mx-auto">
            <div className="leading-[1.3] tracking-tight font-semibold text-6xl my-0 text-left mx-[4px] px-0 py-[15px] flex flex-col gap-2">
              {lines.map((line, lineIndex) => (
                <div key={`line-${lineIndex}`} className="flex flex-wrap">
                  {line.map((char, charIndex) => (
                    <motion.span
                      key={`char-${lineIndex}-${charIndex}`}
                      style={{
                        color: lineColors[lineIndex][charIndex]
                      }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMe;
