import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import * as yup from "yup";

const ContactUs = () => {
  const navigation = useNavigate();
  const [contactUs, setContactus] = useState({
    name: "",
    email: "",
    phone: "",
    companyName: "",
    country: "",
    jobTitle: "",
    jobDetails: "",
  });

  const [errors, setErrors] = useState({});

  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: yup
      .string()
      .matches(/^\d+$/, "Phone number must be numeric")
      .required("Phone number is required"),
    companyName: yup.string().required("Company name is required"),
    country: yup.string().required("Country is required"),
    jobTitle: yup.string().required("Job title is required"),
    jobDetails: yup.string().required("Job details are required"),
  });

  const validateField = async (field, value) => {
    try {
      await schema.validateAt(field, { [field]: value });
      setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
    } catch (err) {
      setErrors((prevErrors) => ({ ...prevErrors, [field]: err.message }));
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setContactus((prev) => ({ ...prev, [id]: value }));
    validateField(id, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await schema.validate(contactUs, { abortEarly: false });
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
      if (error.inner) {
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      } else {
        console.log(error);
      }
    }
  };

  const clearallData = () => {
    setContactus({
      name: "",
      email: "",
      phone: "",
      companyName: "",
      country: "",
      jobTitle: "",
      jobDetails: "",
    });
    setErrors({});
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
            {Object.keys(contactUs).map((field) => (
              <div className="mb-5" key={field}>
                <label
                  htmlFor={field}
                  className="mb-3 block text-base font-medium text-[#6963d2]"
                >
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type="text"
                  id={field}
                  value={contactUs[field]}
                  onChange={handleChange}
                  placeholder={`Enter your ${field}`}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
                {errors[field] && (
                  <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
                )}
              </div>
            ))}
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
