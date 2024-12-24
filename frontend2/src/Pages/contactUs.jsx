import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

const ContactUs = () => {
  const navigation = useNavigate();
  const [contactUs, setContactus] = useState({
    name: "",
    email: "",
    phone: Number,
    companyName: "",
    country: "",
    jobTitle: "",
    jobDetails: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post(
        "http://localhost:3005/contact/create",
        contactUs
      );
      toast.success("Your Inquiry Sent Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      clearallData();
      console.log("hello", response);
    } catch (error) {
      console.log(error);
    }
  };
  const clearallData = () => {
    setContactus({
      name: "",
      email: "",
      phone: Number,
      companyName: "",
      country: "",
      jobTitle: "",
      jobDetails: "",
    });
  };
  return (
    <>
      <motion.div
        className="text-center mb-10 bg-blue-50 p-10 w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl font-bold mb-4 text-[#4f46e5]">
          Get in Touch with Us!
        </h1>
        <p className="text-lg text-gray-400 max-w-[700px] mx-auto">
          We’d love to hear from you. Whether you have questions, feedback, or
          specific job requirements, our team is here to help.
        </p>
      </motion.div>
      <div className="flex items-center justify-center p-12 text-white">
        <div className="mx-auto w-full max-w-[550px] bg-[white] shadow-lg p-5 rounded-lg">
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label className="mb-3 block text-base font-medium text-[#6963d2]">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={contactUs.name}
                onChange={(e) =>
                  setContactus({ ...contactUs, name: e.target.value })
                }
                placeholder="Full Name"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="mb-3 block text-base font-medium text-[#6963d2]"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={contactUs.email}
                onChange={(e) =>
                  setContactus({ ...contactUs, email: e.target.value })
                }
                placeholder="example@domain.com"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="subject"
                className="mb-3 block text-base font-medium text-[#6963d2]"
              >
                Phone number
              </label>
              <input
                type="text"
                id="Phone number"
                value={contactUs.phone}
                onChange={(e) =>
                  setContactus({ ...contactUs, phone: e.target.value })
                }
                placeholder="Enter your Phone number"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="Company Name"
                className="mb-3 block text-base font-medium text-[#6963d2]"
              >
                Company Name
              </label>
              <input
                type="text"
                id="Company Name"
                value={contactUs.companyName}
                onChange={(e) =>
                  setContactus({ ...contactUs, companyName: e.target.value })
                }
                placeholder="Enter your Company Name"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>{" "}
            <div className="mb-5">
              <label
                htmlFor="Country"
                className="mb-3 block text-base font-medium text-[#6963d2]"
              >
                Country
              </label>
              <input
                type="text"
                id="Country"
                value={contactUs.country}
                onChange={(e) =>
                  setContactus({ ...contactUs, country: e.target.value })
                }
                placeholder="Enter your Country"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="subject"
                className="mb-3 block text-base font-medium text-[#6963d2]"
              >
                Job Title
              </label>
              <input
                type="text"
                id="Jobtitle"
                value={contactUs.jobTitle}
                onChange={(e) =>
                  setContactus({ ...contactUs, jobTitle: e.target.value })
                }
                placeholder="Enter your Jobtitle"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="subject"
                className="mb-3 block text-base font-medium text-[#6963d2]"
              >
                Job Details
              </label>
              <input
                type="text"
                id="Jobdetails"
                value={contactUs.jobDetails}
                onChange={(e) =>
                  setContactus({ ...contactUs, jobDetails: e.target.value })
                }
                placeholder="Enter your Job Details"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div>
              <button className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default ContactUs;
