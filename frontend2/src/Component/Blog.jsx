import React from "react";
import { motion } from "framer-motion";
import mercedes from "../assets/homepage1.png";
import blog1 from "../assets/Blog1.jpg";
import blog2 from "../assets/Blog2.png";
import blog3 from "../assets/Blog3.png";
import blog4 from "../assets/blog4.png";
import blogBackground from "../assets/blog.png";
const Blog = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const noteVariants = {
    hidden: { scale: 0, rotate: 10, opacity: 0 },
    visible: { scale: 1, rotate: 0, opacity: 1, transition: { duration: 0.6 } },
  };

  return (
    <div
      className="min-h-screen  text-gray-800 p-5"
      style={{
        background: `url(${blogBackground}) no-repeat center/cover `,
        // background: "linear-gradient(98deg, #86F7C1 0%, #F57FD6 100%)",
        overflow: "auto",
        // height: "120vh",
        // filter: "blur(105px)",
        scrollbarWidth: "none",
      }}
    >
      {/* Header */}
      <header className="text-center py-8 bg-blue-50 mb-10">
        <h1 className="text-4xl font-bold text-[#4f46e5]">
          How AI is Transforming Marketing and Sales
        </h1>
        <p className="text-lg text-gray-600 mt-3">
          Discover how AI integrates with analytics to revolutionize industries.
        </p>
      </header>

      {/* Content Container */}
      <motion.div
        className="container mx-auto max-w-5xl space-y-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Introduction */}
        <motion.section
          className="  flex items-center gap-14 "
          variants={itemVariants}
        >
          <div>
            <img className="w-[600px] rounded-lg" src={blog1} alt="" />
          </div>
          <div className="">
            <h2 className="text-2xl font-semibold text-green-800">
              Revolutionizing the Workplace with AI-Powered Solutions
            </h2>
            <p className="mt-3 leading-7 text-gray-700">
              AI Solutions transforms workplaces by automating tasks, offering
              virtual assistant support, and enhancing employee productivity.
              Our cutting-edge AI tools empower businesses to innovate and excel
              in the modern digital age.
            </p>
          </div>
        </motion.section>

        {/* AI in Marketing */}
        <motion.section
          className="  flex items-center gap-14 "
          variants={itemVariants}
        >
          <div className="">
            <h2 className="text-2xl font-semibold text-green-800">
              The Power of AI in Prototyping and Innovation
            </h2>
            <p className="mt-3 leading-7 text-gray-700">
              Artificial Intelligence (AI) is no longer a futuristic concept. It
              is actively transforming industries, especially marketing and
              sales. By leveraging data analytics.
            </p>
          </div>
          <div>
            <img className="w-[600px] rounded-lg" src={blog2} alt="" />
          </div>
        </motion.section>

        <motion.section
          className="  flex items-center gap-14 "
          variants={itemVariants}
        >
          <div>
            <img className="w-[600px] rounded-lg" src={blog3} alt="" />
          </div>
          <div className="">
            <h2 className="text-2xl font-semibold text-green-800">
              Accelerating Prototyping with AI
            </h2>
            <p className="mt-3 leading-7 text-gray-700">
              Our AI-driven prototyping tools enable businesses to quickly
              visualize and test ideas, saving time and resources. From
              conceptual models to functional prototypes, we make innovation
              faster and smarter.
            </p>
          </div>
        </motion.section>

        <motion.section
          className="  flex items-center gap-14 "
          variants={itemVariants}
        >
          <div className="">
            <h2 className="text-2xl font-semibold text-green-800">
              Enhancing Employee Experience
            </h2>
            <p className="mt-3 leading-7 text-gray-700">
              AI Solutions redefines the employee experience by providing
              personalized virtual assistants and predictive analytics, ensuring
              seamless collaboration and improved satisfaction at work. Image
              Idea: Employees collaborating with digital dashboards in the
              background.
            </p>
          </div>
          <div>
            <img className="w-[600px] rounded-lg" src={blog4} alt="" />
          </div>
        </motion.section>
        {/* Notes Board */}
        <motion.div
          className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg shadow-md"
          variants={noteVariants}
        >
          <h3 className="text-lg font-bold text-yellow-700">
            Success Stories with AI
          </h3>
          <ul className="mt-2 space-y-2 text-gray-700">
            <li>Healthcare: Reduced wait times by 30% with AI scheduling.</li>
            <li>Retail: Increased sales by 20% using customer insights.</li>
            <li>
              Education: Boosted student engagement by 40% through AI learning
              systems.
            </li>
          </ul>
        </motion.div>

        {/* Conclusion */}
        <motion.section
          className="bg-white p-6 shadow-lg rounded-lg"
          variants={itemVariants}
        >
          <h2 className="text-2xl font-semibold text-green-800">
            The Future of AI Solutions
          </h2>
          <p className="mt-3 leading-7 text-gray-700">
            We’re exploring exciting innovations like AI with augmented reality
            and intuitive voice-based assistants. Stay tuned as we redefine
            industries and shape the future of work. Image Idea: A glowing
            neural network symbolizing AI advancement.
          </p>
        </motion.section>
      </motion.div>
    </div>
  );
};

export default Blog;
