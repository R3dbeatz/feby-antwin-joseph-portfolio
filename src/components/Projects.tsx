
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Projects = () => {
  const projectsRef = useRef<HTMLDivElement>(null);
  
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
        <div className="grid grid-cols-1 gap-8">
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
