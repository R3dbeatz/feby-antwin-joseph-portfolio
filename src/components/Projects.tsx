
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { StickyScroll } from './ui/sticky-scroll-reveal';
import DecryptedText from './DecryptedText';

const Projects = () => {
  const projectsRef = useRef<HTMLDivElement>(null);
  
  const projectContent = [
    {
      title: 'Digital Marketing Strategy Development',
      description: 'Conceptualized a comprehensive digital marketing strategy aimed at revitalizing Bigelow Tea\'s presence in the wellness market.',
      content: (
        <div className="h-full w-full bg-gradient-to-br from-primary to-accent flex items-center justify-center p-4 text-white font-serif text-center text-lg">
          Blend Well with Bigelow
        </div>
      ),
    },
    {
      title: 'Key Strategy Developments',
      description: 'Implemented innovative approaches like AI-powered recommendations, interactive packaging, and influential partnerships.',
      content: (
        <div className="h-full w-full bg-gradient-to-br from-primary to-secondary flex flex-col items-center justify-center p-4 text-white text-sm">
          <ul className="list-disc pl-5 space-y-2">
            <li>AI-Powered Tea Recommendations</li>
            <li>Interactive QR-Enabled Packaging</li>
            <li>Influencer Collaborations</li>
          </ul>
        </div>
      ),
    },
    {
      title: 'Project Execution Plan',
      description: 'Outlined a multi-phase campaign strategy spanning from initial teasers to sustained engagement and feedback iteration.',
      content: (
        <div className="h-full w-full bg-gradient-to-br from-secondary to-accent flex flex-col items-center justify-center p-4 text-white text-sm">
          <ul className="list-disc pl-5 space-y-2">
            <li>Phased Campaign Launch</li>
            <li>Social Media Strategies</li>
            <li>Virtual Tea Blending Events</li>
          </ul>
        </div>
      ),
    },
    {
      title: 'Budget & Outcomes',
      description: 'Developed a detailed $50k budget plan and provided Bigelow with a robust framework for future marketing efforts.',
      content: (
        <div className="h-full w-full bg-gradient-to-br from-primary to-accent flex items-center justify-center p-4 text-white text-center">
          <DecryptedText 
            text="Actionable Insights for Market Growth" 
            speed={30}
            maxIterations={5}
            sequential={true}
            className="text-white font-serif font-bold"
            encryptedClassName="text-accent/70"
            animateOn="view"
          />
        </div>
      ),
    },
  ];

  const projects = [
    {
      title: 'Digital Marketing Strategy Development: Blend Well with Bigelow',
      description: 'Conceptualized a comprehensive digital marketing strategy aimed at revitalizing Bigelow Tea\'s presence in the wellness market.',
      content: `As part of my Digital Marketing Capstone Project, I collaborated with Bigelow Tea to develop an innovative marketing strategy, "Blend Well with Bigelow," designed to enhance customer engagement and brand differentiation in the competitive wellness market.
      
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
      • The initiative offered actionable insights and a clear direction for addressing market challenges and establishing a strong foundation for long-term growth.`,
      tech: ['Digital Marketing', 'AI Integration', 'Social Media Strategy', 'Budget Planning']
    }
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Explicitly type the elements as HTMLElement[]
      const projectCards = gsap.utils.toArray<HTMLElement>('.project-card');
      
      projectCards.forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
            end: "top center",
            scrub: 1,
          },
          y: 100,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
          delay: index * 0.2,
        });
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
        
        {/* New Sticky Scroll Component */}
        <div className="mb-16">
          <StickyScroll 
            content={projectContent} 
            contentClassName="shadow-xl"
          />
        </div>
        
        {/* Legacy/Mobile Project View */}
        <div className="grid grid-cols-1 gap-8 lg:hidden">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card bg-dark-lighter p-8 rounded-lg shadow-xl"
            >
              <h3 className="text-2xl font-bold mb-4 text-primary">{project.title}</h3>
              <p className="text-white text-lg mb-6">{project.description}</p>
              
              <div className="mb-6">
                <pre className="whitespace-pre-wrap text-gray-300 font-sans text-sm leading-relaxed">
                  {project.content}
                </pre>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
