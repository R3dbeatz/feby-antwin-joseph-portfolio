
import { motion } from 'framer-motion';

const AboutMe = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-dark py-20">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-2xl font-medium text-[#eb5939] mb-8">
            ABOUT ME
          </h2>
          <p className="text-[56px] leading-[1.2] tracking-tight font-medium text-neutral-200">
            I'm a <span className="text-[#eb5939]">strategically focused</span> digital marketer with a passion for crafting data-driven campaigns & delivering measurable business growth.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMe;
