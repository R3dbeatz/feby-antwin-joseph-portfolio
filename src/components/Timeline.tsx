
import React from 'react';
import { Timeline as TimelineComponent } from './ui/timeline';

const timelineData = [
  {
    title: '2024',
    content: (
      <div>
        <p className="text-white text-sm md:text-base font-normal mb-8">
          Leading digital transformation initiatives and brand campaigns as a Senior Marketing Strategist.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-dark-lighter rounded-lg p-6 shadow-lg">
            <h4 className="text-primary text-lg font-bold mb-2">Campaign Strategy</h4>
            <p className="text-neutral-300 text-sm">
              Developed and executed comprehensive marketing campaigns that increased brand visibility by 45%.
            </p>
          </div>
          <div className="bg-dark-lighter rounded-lg p-6 shadow-lg">
            <h4 className="text-primary text-lg font-bold mb-2">Digital Transformation</h4>
            <p className="text-neutral-300 text-sm">
              Led initiatives that modernized marketing operations and improved efficiency across departments.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: '2022',
    content: (
      <div>
        <p className="text-white text-sm md:text-base font-normal mb-8">
          Managed successful product launches and marketing campaigns as a Marketing Team Lead.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-dark-lighter rounded-lg p-6 shadow-lg">
            <h4 className="text-primary text-lg font-bold mb-2">Team Management</h4>
            <p className="text-neutral-300 text-sm">
              Led a cross-functional team of 8 marketers, designers, and content creators to achieve quarterly targets.
            </p>
          </div>
          <div className="bg-dark-lighter rounded-lg p-6 shadow-lg">
            <h4 className="text-primary text-lg font-bold mb-2">Product Launch</h4>
            <p className="text-neutral-300 text-sm">
              Orchestrated the successful launch of 3 major products, exceeding sales projections by 30%.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: '2020',
    content: (
      <div>
        <p className="text-white text-sm md:text-base font-normal mb-8">
          Developed and executed comprehensive digital marketing strategies as a Digital Marketing Specialist.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-dark-lighter rounded-lg p-6 shadow-lg">
            <h4 className="text-primary text-lg font-bold mb-2">SEO Optimization</h4>
            <p className="text-neutral-300 text-sm">
              Improved organic search rankings by 60% through strategic SEO initiatives and content optimization.
            </p>
          </div>
          <div className="bg-dark-lighter rounded-lg p-6 shadow-lg">
            <h4 className="text-primary text-lg font-bold mb-2">Social Media Growth</h4>
            <p className="text-neutral-300 text-sm">
              Expanded social media presence with strategies that increased engagement by 78% and followers by 10k.
            </p>
          </div>
        </div>
      </div>
    ),
  },
];

const Timeline = () => {
  return (
    <section id="experience" className="min-h-screen relative">
      <div className="w-full h-full absolute top-0 left-0 bg-dark z-0"></div>
      <TimelineComponent data={timelineData} />
    </section>
  );
};

export default Timeline;
