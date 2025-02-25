
import { motion } from 'framer-motion';
import { Button } from './ui/button';

const Contact = () => {
  return (
    <section className="section" id="contact">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Let's Connect</h2>
          <p className="text-gray-400 mb-8">
            Ready to transform your digital presence? Let's discuss how we can work together to achieve your marketing goals.
          </p>
          <div className="space-y-4">
            <Button
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full"
              onClick={() => window.location.href = 'mailto:contact@example.com'}
            >
              Send Email
            </Button>
            <div className="flex justify-center gap-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-primary">
                LinkedIn
              </a>
              <a href="#" className="text-gray-400 hover:text-primary">
                Twitter
              </a>
              <a href="#" className="text-gray-400 hover:text-primary">
                Instagram
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
