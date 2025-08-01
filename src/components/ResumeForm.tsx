
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { toast } from './ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { supabase } from '@/integrations/supabase/client';

// Country codes data - sorted alphabetically by country name
const countryCodes = [
  { code: '+61', country: 'Australia' },
  { code: '+55', country: 'Brazil' },
  { code: '+1', country: 'Canada' },
  { code: '+86', country: 'China' },
  { code: '+33', country: 'France' },
  { code: '+49', country: 'Germany' },
  { code: '+91', country: 'India' },
  { code: '+39', country: 'Italy' },
  { code: '+81', country: 'Japan' },
  { code: '+52', country: 'Mexico' },
  { code: '+7', country: 'Russia' },
  { code: '+966', country: 'Saudi Arabia' },
  { code: '+65', country: 'Singapore' },
  { code: '+82', country: 'South Korea' },
  { code: '+27', country: 'South Africa' },
  { code: '+34', country: 'Spain' },
  { code: '+971', country: 'UAE' },
  { code: '+44', country: 'UK' },
  { code: '+1', country: 'USA' },
];

const ResumeForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    countryCode: '+1'
  });
  
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for the field being edited
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCountryCodeChange = (value: string) => {
    setFormData(prev => ({ ...prev, countryCode: value }));
  };

  const validateForm = () => {
    const newErrors = {
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    };
    let isValid = true;
    
    // Validate first name
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
      isValid = false;
    }
    
    // Validate last name
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
      isValid = false;
    }
    
    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
        isValid = false;
      }
    }
    
    // Validate phone (optional but must be valid if provided)
    if (formData.phone.trim()) {
      // Phone number regex (without country code, since we're handling that separately)
      const phoneRegex = /^[0-9\s\-\(\)]+$/;
      if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = 'Please enter a valid phone number';
        isValid = false;
      }
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate form
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please correct the errors in the form.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }
    
    // Prepare data with full phone number including country code
    const submissionData = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      country_code: formData.countryCode
    };
    
    try {
      // Store data in Supabase
      const { error } = await supabase
        .from('resume_submissions')
        .insert([submissionData]);
      
      if (error) {
        console.error('Error submitting resume data:', error);
        toast({
          title: "Submission Error",
          description: "There was a problem saving your information. Please try again.",
          variant: "destructive"
        });
        setIsSubmitting(false);
        return;
      }
      
      // Simulate a slight delay before download starts
      setTimeout(() => {
        downloadResume();
        setIsSubmitting(false);
        
        toast({
          title: "Success!",
          description: "Resume download started. Thank you for your information.",
        });
        
        // Reset form after successful submission
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          countryCode: '+1'
        });
      }, 1000);
    } catch (err) {
      console.error('Exception during resume submission:', err);
      toast({
        title: "Submission Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive"
      });
      setIsSubmitting(false);
    }
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
      className="max-w-md mx-auto p-4 md:p-6 bg-dark-lighter/20 backdrop-blur-sm rounded-lg shadow-lg"
    >
      <h3 className="text-xl md:text-2xl font-semibold text-white mb-4 md:mb-6">Download Resume</h3>
      <p className="text-gray-300 mb-6 md:mb-8 text-sm md:text-base">
        Please fill in the form below to download my resume.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-gray-300 mb-1">First Name*</label>
            <Input
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              className={`bg-dark-lighter text-white border-gray-700 ${errors.firstName ? 'border-red-500' : ''}`}
              required
            />
            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
          </div>
          <div>
            <label htmlFor="lastName" className="block text-gray-300 mb-1">Last Name*</label>
            <Input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              className={`bg-dark-lighter text-white border-gray-700 ${errors.lastName ? 'border-red-500' : ''}`}
              required
            />
            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
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
            className={`bg-dark-lighter text-white border-gray-700 ${errors.email ? 'border-red-500' : ''}`}
            required
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-gray-300 mb-1">Phone Number</label>
          <div className="flex gap-2">
            <div className="w-1/3">
              <Select value={formData.countryCode} onValueChange={handleCountryCodeChange}>
                <SelectTrigger className="bg-dark-lighter text-white border-gray-700">
                  <SelectValue placeholder="Code" />
                </SelectTrigger>
                <SelectContent className="bg-dark-lighter text-white border-gray-700 max-h-[200px]">
                  {countryCodes.map((country) => (
                    <SelectItem key={`${country.code}-${country.country}`} value={country.code}>
                      {country.code} ({country.country})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-2/3">
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className={`bg-dark-lighter text-white border-gray-700 ${errors.phone ? 'border-red-500' : ''}`}
                placeholder="Phone number"
              />
            </div>
          </div>
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          <p className="text-gray-400 text-xs mt-1">Select your country code</p>
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
