
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
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-serif font-bold mb-12 text-center"
        >
          Featured Projects
        </motion.h2>
        
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
                  <p className="text-sm md:text-lg text-gray-300">
                    {feature.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Detailed project description for mobile/accessibility - visible on all screens now */}
        <div className="mt-16">
          <div className="bg-dark-lighter p-8 rounded-lg shadow-xl">
            <h3 className="text-2xl font-bold mb-4 text-primary font-serif">Digital Marketing Strategy Development: Blend Well with Bigelow</h3>
            <p className="text-white text-lg mb-6">Conceptualized a comprehensive digital marketing strategy aimed at revitalizing Bigelow Tea's presence in the wellness market.</p>
            
            <div className="mb-6">
              <pre className="whitespace-pre-wrap text-gray-300 font-sans text-sm leading-relaxed">
                As part of my Digital Marketing Capstone Project, I collaborated with Bigelow Tea to develop an innovative marketing strategy, "Blend Well with Bigelow," designed to enhance customer engagement and brand differentiation in the competitive wellness market.
                
                Key Strategy Developments:
                • AI-Powered Tea Recommendations: Designed an AI system to provide personalized tea suggestions, enhancing the customer experience with technology.
                • Interactive QR-Enabled Packaging: Developed packaging with QR codes that offer exclusive content and access to the Teatime AI, increasing product interactivity.
                • Influencer Collaborations: Identified and proposed partnerships with wellness influencers to authentically promote Bigelow's products, leveraging their audience's trust.
                
                Project Execution Plan:
                • Phased Campaign Launch: Outlined a multi-phase campaign including teasers, official launch, sustained engagement, and feedback iteration.
                • Social Media Strategies: Focused on platforms like TikTok for challenges and Instagram for user-generated content, targeting a younger, tech-savvy audience.
                • Virtual Events: Planned virtual tea blending workshops and live sessions with tea experts to engage the community and showcase product knowledge.
                
                Budget Optimization:
                • Developed a detailed budget plan of $50k, allocating resources effectively across influencer partnerships, paid social media ads, content creation, tech and event integration, incentives, and feedback surveys.
                
                Outcomes:
                • Although the campaign was not implemented, the strategy provided Bigelow with a robust framework for future marketing efforts.
                • The initiative offered actionable insights and a clear direction for addressing market challenges and establishing a strong foundation for long-term growth.
              </pre>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {['Digital Marketing', 'AI Integration', 'Social Media Strategy', 'Budget Planning'].map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
