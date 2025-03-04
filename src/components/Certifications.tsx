
"use client";

import React from 'react';
import AutoScroll from "embla-carousel-auto-scroll";
import { motion } from 'framer-motion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Award } from 'lucide-react';

interface Logo {
  id: string;
  description: string;
  image: string;
  className?: string;
}

const Certifications = () => {
  const certificationLogos: Logo[] = [
    {
      id: "google-ads",
      description: "Google Ads Certification",
      image: "/lovable-uploads/8be4b358-9447-4625-bcfb-e7f47457a1fe.png",
      className: "h-12 w-auto",
    },
    {
      id: "google-analytics",
      description: "Google Analytics Certification",
      image: "/lovable-uploads/d1b68137-d2c6-480c-9bb6-ef1a1a407232.png",
      className: "h-12 w-auto",
    },
    {
      id: "mbtn-academy",
      description: "MBTN Academy Certification",
      image: "/lovable-uploads/fd05d075-eaa4-4084-bca7-b37ce857b977.png",
      className: "h-16 w-auto",
    },
    {
      id: "hootsuite",
      description: "Hootsuite Certification",
      image: "/lovable-uploads/593be598-6ad9-4304-ba21-ac740dc1a106.png",
      className: "h-12 w-auto",
    },
    {
      id: "stukent",
      description: "Stukent Certification",
      image: "/lovable-uploads/4160b492-c764-4ebf-8a36-89c373da9eb3.png",
      className: "h-10 w-auto",
    },
  ];

  return (
    <section className="section py-20 bg-dark-lighter" id="certifications">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-8"
        >
          <Award className="text-primary h-8 w-8" />
          <h2 className="text-2xl font-medium text-primary">CERTIFICATIONS</h2>
        </motion.div>
        
        <motion.h3 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-[#b7ab98] mb-10 max-w-2xl"
        >
          Industry Recognized Credentials
        </motion.h3>

        <div className="pt-10">
          <div className="relative mx-auto flex items-center justify-center">
            <Carousel
              opts={{ loop: true }}
              plugins={[AutoScroll({ playOnInit: true, speed: 0.5 })]}
            >
              <CarouselContent className="ml-0">
                {certificationLogos.map((logo) => (
                  <CarouselItem
                    key={logo.id}
                    className="flex basis-1/2 justify-center pl-0 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
                  >
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      viewport={{ once: true }}
                      className="mx-10 flex shrink-0 items-center justify-center p-6 bg-dark rounded-lg border border-gray-800 hover:border-primary/40 transition-all duration-300 h-32"
                    >
                      <div>
                        <img
                          src={logo.image}
                          alt={logo.description}
                          className={logo.className}
                        />
                      </div>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-dark-lighter to-transparent"></div>
            <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-dark-lighter to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
