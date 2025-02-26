
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Projects = () => {
  const projectsRef = useRef<HTMLDivElement>(null);
  
  const projects = [
    {
      title: 'Digital Marketing Campaign',
      description: 'Led a successful digital marketing campaign increasing engagement by 150%.',
      tech: ['Social Media', 'Analytics', 'Content Strategy']
    },
    {
      title: 'Brand Redesign',
      description: 'Complete brand overhaul resulting in 200% increase in brand recognition.',
      tech: ['Branding', 'Design', 'Strategy']
    },
    {
      title: 'Marketing Automation',
      description: 'Implemented marketing automation increasing leads by 80%.',
      tech: ['Automation', 'Email Marketing', 'CRM']
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const projectCards = gsap.utils.toArray('.project-card');
      
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card bg-dark-lighter p-6 rounded-lg"
            >
              <h3 className="text-xl font-bold mb-4">{project.title}</h3>
              <p className="text-gray-400 mb-4">{project.description}</p>
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
