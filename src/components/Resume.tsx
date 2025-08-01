
import { motion } from 'framer-motion';
import ResumeForm from './ResumeForm';

const Resume = () => {
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col justify-center items-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto text-center mb-8 md:mb-12"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 px-2">My Resume</h2>
        <div className="w-20 h-1 bg-[#eb5939] mx-auto mb-6 md:mb-8"></div>
        <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto px-4">
          Interested in my professional background? Fill out the form below to download my resume 
          and see my complete work history, skills, and qualifications.
        </p>
      </motion.div>
      
      <ResumeForm />
    </div>
  );
};

export default Resume;
