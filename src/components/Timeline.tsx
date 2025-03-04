import React from 'react';
import { Timeline as TimelineComponent } from './ui/timeline';
import { motion } from 'framer-motion';
const timelineData = [{
  title: '2024',
  content: <motion.div initial={{
    opacity: 0
  }} whileInView={{
    opacity: 1
  }} transition={{
    duration: 0.5
  }} viewport={{
    once: true
  }}>
        <p className="text-white text-sm font-normal mb-8 md:text-lg">
          Driving digital marketing excellence and brand growth as a Digital Marketing Intern at Arcadia Chemicals.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-dark-lighter p-6 shadow-lg border border-[#1a1a1a] hover:border-primary/20 transition-all duration-300 rounded-lg">
            <h4 className="text-primary text-lg font-bold mb-3">Campaign Strategy</h4>
            <p className="text-neutral-300 text-sm">
              Conceptualized and executed digital campaigns, increasing website traffic by 20%. Conducted keyword research and implemented SEO strategies, boosting online inquiries by 28%.
            </p>
          </div>
          <div className="bg-dark-lighter rounded-lg p-6 shadow-lg border border-[#1a1a1a] hover:border-primary/20 transition-all duration-300">
            <h4 className="text-primary text-lg font-bold mb-3">Digital Transformation</h4>
            <p className="text-neutral-300 text-sm">
              Designed and developed the parent website, refining brand messaging to align with business objectives. Utilized data analytics to optimize digital ad campaigns, leading to a 15% increase in click-through rates.
            </p>
          </div>
        </div>
      </motion.div>
}, {
  title: '2023',
  content: <motion.div initial={{
    opacity: 0
  }} whileInView={{
    opacity: 1
  }} transition={{
    duration: 0.5
  }} viewport={{
    once: true
  }}>
        <p className="text-white text-sm font-normal mb-8 md:text-lg">
          Elevating content marketing and audience engagement as a Content Writer at Fav Media House.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-dark-lighter rounded-lg p-6 shadow-lg border border-[#1a1a1a] hover:border-primary/20 transition-all duration-300">
            <h4 className="text-primary text-lg font-bold mb-3">Content Strategy</h4>
            <p className="text-neutral-300 text-sm">
              Developed compelling and SEO-optimized content, increasing organic traffic by 25%. Researched and wrote industry-relevant articles that improved brand authority and audience retention.
            </p>
          </div>
          <div className="bg-dark-lighter rounded-lg p-6 shadow-lg border border-[#1a1a1a] hover:border-primary/20 transition-all duration-300">
            <h4 className="text-primary text-lg font-bold mb-3">Social Media Growth</h4>
            <p className="text-neutral-300 text-sm">
              Curated and managed social media content, leading to a 30% boost in follower engagement. Collaborated with graphic designers and marketing teams to create high-impact campaigns.
            </p>
          </div>
        </div>
      </motion.div>
}, {
  title: '2022',
  content: <motion.div initial={{
    opacity: 0
  }} whileInView={{
    opacity: 1
  }} transition={{
    duration: 0.5
  }} viewport={{
    once: true
  }}>
        <p className="text-white text-sm font-normal mb-8 md:text-lg">
          Led impactful social media marketing initiatives and strategic branding as a Social Media Marketing Specialist at KoopBox.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-dark-lighter rounded-lg p-6 shadow-lg border border-[#1a1a1a] hover:border-primary/20 transition-all duration-300">
            <h4 className="text-primary text-lg font-bold mb-3">Team Management</h4>
            <p className="text-neutral-300 text-sm">
              Spearheaded social media strategies, growing engagement metrics by 20% across platforms. Collaborated with cross-functional teams to ensure cohesive branding and messaging.
            </p>
          </div>
          <div className="bg-dark-lighter rounded-lg p-6 shadow-lg border border-[#1a1a1a] hover:border-primary/20 transition-all duration-300">
            <h4 className="text-primary text-lg font-bold mb-3">Product Launch</h4>
            <p className="text-neutral-300 text-sm">
              Partnered with marketing and design teams to implement brand positioning strategies. Optimized campaigns using performance data, resulting in improved engagement and conversions.
            </p>
          </div>
        </div>
      </motion.div>
}];
const Timeline = () => {
  return <section id="experience" className="min-h-screen relative">
      <div className="w-full h-full absolute top-0 left-0 bg-dark z-0"></div>
      <TimelineComponent data={timelineData} />
    </section>;
};
export default Timeline;