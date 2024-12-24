import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../Component/Navbar';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (you can send it to your backend)
    console.log(formData);
  };

  return (
    <div> 
      <Navbar/>
    <div className="bg-[#111] text-white min-h-screen flex flex-col justify-center items-center px-4 py-10">
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg text-gray-400 max-w-[700px] mx-auto">
          Have any questions or need support? Reach out to us, and we'll get back to you as soon as possible.
        </p>
      </motion.div>

      <motion.form
        className="w-full max-w-md flex flex-col space-y-6"
        onSubmit={handleSubmit}
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 120 }}
      >
        <input
          className="p-4 bg-transparent border-b-2 border-[#00df9a] text-white outline-none"
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          className="p-4 bg-transparent border-b-2 border-[#00df9a] text-white outline-none"
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
        />
        <textarea
          className="p-4 bg-transparent border-b-2 border-[#00df9a] text-white outline-none"
          name="message"
          placeholder="Your Message"
          rows="4"
          value={formData.message}
          onChange={handleChange}
        ></textarea>
        <button
          className="bg-[#00df9a] text-black font-medium py-3 px-6 rounded-md text-lg"
          type="submit"
        >
          Send Message
        </button>
      </motion.form>
    </div>
    </div>
  );
};

export default Contact;
