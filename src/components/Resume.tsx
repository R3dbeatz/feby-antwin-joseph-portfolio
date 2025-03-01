
import { motion } from 'framer-motion';
import ResumeForm from './ResumeForm';

const Resume = () => {
  return (
    <div className="container mx-auto px-4 py-16 min-h-screen flex flex-col justify-center items-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto text-center mb-16"
      >
        <h2 className="text-4xl font-bold text-white mb-4">My Resume</h2>
        <div className="w-20 h-1 bg-[#eb5939] mx-auto mb-8"></div>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Interested in my professional background? Fill out the form below to download my resume 
          and see my complete work history, skills, and qualifications.
        </p>
      </motion.div>
      
      <ResumeForm />
    </div>
  );
};

export default Resume;
