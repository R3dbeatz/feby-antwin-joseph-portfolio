
import React, { useEffect } from 'react';
import { useActiveSection } from '../hooks/useActiveSection';

interface SeoProps {
  defaultTitle?: string;
  defaultDescription?: string;
}

const SEO: React.FC<SeoProps> = ({ 
  defaultTitle = "Marketing Visionary | Digital Strategist & Brand Consultant",
  defaultDescription = "Strategic digital marketer specializing in brand development, data-driven campaigns, and measurable business growth."
}) => {
  const activeSection = useActiveSection();
  
  useEffect(() => {
    // Update meta tags based on active section
    const title = document.querySelector('title');
    const metaDescription = document.querySelector('meta[name="description"]');
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    
    let newTitle = defaultTitle;
    let newDescription = defaultDescription;
    
    // Set section-specific meta data
    switch(activeSection) {
      case 'about':
        newTitle = "About Me | Marketing Visionary & Strategist";
        newDescription = "Four years of combined corporate and freelance experience delivering creative and technical marketing solutions across all digital channels.";
        break;
      case 'projects':
        newTitle = "Marketing Projects | Brand Strategy & Campaign Portfolio";
        newDescription = "Explore my portfolio of marketing projects, including the 'Blend Well with Bigelow' campaign and other strategic marketing initiatives.";
        break;
      case 'resume':
        newTitle = "Marketing Professional Resume | Experience & Skills";
        newDescription = "View my professional experience, skills, and background in digital marketing, brand strategy, and campaign management.";
        break;
      case 'contact':
        newTitle = "Contact | Marketing Consultant & Strategist";
        newDescription = "Get in touch to discuss your marketing needs and how I can help grow your brand with data-driven strategies.";
        break;
      default:
        // Use default values
        break;
    }
    
    // Update document meta tags
    if (title) title.textContent = newTitle;
    if (metaDescription) metaDescription.setAttribute('content', newDescription);
    if (ogTitle) ogTitle.setAttribute('content', newTitle);
    if (ogDescription) ogDescription.setAttribute('content', newDescription);
    if (twitterTitle) twitterTitle.setAttribute('content', newTitle);
    if (twitterDescription) twitterDescription.setAttribute('content', newDescription);
    
  }, [activeSection, defaultTitle, defaultDescription]);
  
  return null; // This component doesn't render anything
};

export default SEO;
