
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { toast } from './ui/use-toast';

const ResumeForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate form
    if (!formData.firstName || !formData.lastName || !formData.email) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }
    
    // Store information in localStorage or you could send to a backend
    localStorage.setItem('resumeUserInfo', JSON.stringify(formData));
    
    // Simulate a slight delay before download starts
    setTimeout(() => {
      downloadResume();
      setIsSubmitting(false);
      
      toast({
        title: "Success!",
        description: "Resume download started. Thank you for your information.",
      });
    }, 1000);
  };
  
  const downloadResume = () => {
    // Here you would normally link to your actual resume file
    const resumeUrl = '/path-to-your-resume.pdf';
    
    // Create an invisible link and trigger the download
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.setAttribute('download', 'resume.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="max-w-md mx-auto p-6 bg-dark-lighter/20 backdrop-blur-sm rounded-lg shadow-lg"
    >
      <h3 className="text-2xl font-semibold text-white mb-6">Download Resume</h3>
      <p className="text-gray-300 mb-8">
        Please fill in the form below to download my resume.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-gray-300 mb-1">First Name*</label>
            <Input
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              className="bg-dark-lighter text-white border-gray-700"
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-gray-300 mb-1">Last Name*</label>
            <Input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              className="bg-dark-lighter text-white border-gray-700"
              required
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="email" className="block text-gray-300 mb-1">Email*</label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="bg-dark-lighter text-white border-gray-700"
            required
          />
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-gray-300 mb-1">Phone Number</label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            className="bg-dark-lighter text-white border-gray-700"
          />
        </div>
        
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-[#eb5939] hover:bg-[#d24e30] text-white mt-6"
        >
          {isSubmitting ? 'Processing...' : 'Download Resume'}
        </Button>
      </form>
    </motion.div>
  );
};

export default ResumeForm;
