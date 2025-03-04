
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DecryptedText from './DecryptedText';
import { Button } from './ui/button';

const Projects = () => {
  const projectsRef = useRef<HTMLDivElement>(null);
  
  const projectFeatures = [
    { 
      step: 'Brand Identity', 
      title: 'Bigelow Benefits',
      content: 'Leveraging the established Bigelow brand while emphasizing the wellness benefits of their tea products.'
    },
    { 
      step: 'Strategy Overview', 
      title: 'Digital Marketing Strategy Development',
      content: 'Conceptualized a comprehensive digital marketing strategy aimed at revitalizing Bigelow Tea\'s presence in the wellness market.'
    },
    { 
      step: 'Key Developments',
      title: 'Innovative Approaches',
      content: 'Designed an AI system for personalized tea recommendations, developed interactive QR-enabled packaging, and established strategic wellness influencer partnerships.'
    },
    { 
      step: 'Project Execution',
      title: 'Multi-Phase Campaign Strategy',
      content: 'Outlined a comprehensive campaign spanning from initial teasers to sustained engagement, with focused social media strategies for TikTok and Instagram.'
    },
    { 
      step: 'Budget & Outcomes',
      title: 'Strategic Resource Allocation',
      content: 'Developed a detailed $50k budget plan and provided Bigelow with a robust framework for future marketing efforts and market growth.'
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Animation for the feature section
      gsap.from('.feature-section', {
        scrollTrigger: {
          trigger: '.feature-section',
          start: "top bottom-=100",
          end: "top center",
          scrub: 1,
        },
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      });
    }, projectsRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section" id="projects" ref={projectsRef}>
      <div className="container">
        <h2 className="text-2xl font-medium text-primary mb-8 text-left">
          FEATURED PROJECT
        </h2>
        
        <div className="feature-section mb-16 bg-dark-lighter rounded-xl border border-gray-800 p-8 md:p-12">
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-10 text-center font-serif">
            Blend Well with Bigelow
          </h3>
          
          <div className="space-y-10">
            {projectFeatures.map((feature, index) => (
              <motion.div
                key={`feature-${index}`}
                className="border-b border-gray-800 pb-8 last:border-0 last:pb-0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex flex-col">
                  <span className="text-lg text-primary font-medium mb-2">{feature.step}</span>
                  <h4 className="text-xl md:text-2xl font-semibold text-primary font-serif mb-3">
                    {feature.title}
                  </h4>
                  <p className="text-sm md:text-lg text-[#b7ab98]">
                    {feature.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-10">
          {['Digital Marketing', 'AI Integration', 'Social Media Strategy', 'Budget Planning', 'Wellness Branding', 'Content Creation', 'Influencer Partnerships'].map((tech, techIndex) => (
            <span
              key={techIndex}
              className="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
