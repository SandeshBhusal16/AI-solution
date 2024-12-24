import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div>
      <div className=" min-h-screen flex flex-col justify-center items-center px-4 py-10">
        <motion.div
          className="text-center mb-10 bg-blue-50 p-10 w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl font-bold mb-4 text-[#4f46e5]">
            Revolutionizing Workplaces with AI-Powered Innovation
          </h1>
          <p className="text-lg text-gray-400 max-w-[700px] mx-auto">
            At AI-Solutions, we believe in empowering industries to achieve more
            through cutting-edge artificial intelligence.
          </p>
        </motion.div>

        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, type: "spring", stiffness: 120 }}
        >
          <h2 className="font-semibold text-2xl text-[#4f46e5]">Who We Are</h2>
          <p className="text-lg text-gray-400 max-w-[600px] mx-auto mt-2">
            AI-Solutions is a Sunderland-based start-up committed to
            transforming the digital employee experience. By integrating AI into
            workplace solutions, we help businesses proactively address
            challenges, speed up innovation, and unlock their true potential.
            Our unique blend of advanced technology and affordability makes us
            the preferred choice for organizations worldwide.
          </p>
        </motion.div>
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, type: "spring", stiffness: 120 }}
        >
          <h2 className="font-semibold text-2xl text-[#4f46e5]">Our Mission</h2>
          <p className="text-lg text-gray-400 max-w-[700px] mx-auto mt-2">
            To innovate, promote, and deliver state-of-the-art AI solutions that
            redefine productivity and support people in their professional
            journey.
          </p>
        </motion.div>
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, type: "spring", stiffness: 120 }}
        >
          <h2 className="font-semibold text-2xl text-[#4f46e5]">
            Why Choose Us?
          </h2>
          <div className="text-lg text-gray-400 max-w-[700px] mx-auto mt-2">
            <ul>
              <li>
                Expertise in AI Solutions: Leverage our deep knowledge to solve
                complex challenges.
              </li>
              <li>
                Affordable Innovation: High-quality services designed to be
                accessible for all businesses.
              </li>
              <li>
                Client-Centric Approach: Tailored solutions to meet each
                client's specific needs.
              </li>
            </ul>
          </div>
        </motion.div>

        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, type: "spring", stiffness: 120 }}
        >
          <h2 className="font-semibold text-2xl text-[#4f46e5]">Our Vision</h2>
          <p className="text-lg text-gray-400 max-w-[700px] mx-auto mt-2">
            To lead the global transformation of workplaces with AI-powered
            tools, creating a future where businesses thrive, and employees
            excel. journey.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
