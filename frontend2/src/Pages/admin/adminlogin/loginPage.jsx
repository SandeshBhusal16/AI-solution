import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5"; // Import eye icons

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const navigate = useNavigate();

  const ValidationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
    // Clear error for the field being updated
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: undefined,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ValidationSchema.validate(formData, { abortEarly: false });
      setErrors({});
      const response = await axios.post(
        "http://localhost:3005/auth/login",
        formData
      );

      toast.success("Login successful", {
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
      localStorage.setItem("token", response.data.data.AscessToken);
      localStorage.setItem("role", response.data.data.role);

      const role = response?.data?.data?.data?.role;
      if (role === "Admin") {
        navigate("/admin");
      }

      console.log(":", response.data.data.data.role);
    } catch (error) {
      if (error.name === "ValidationError") {
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });

        setErrors(validationErrors);
      } else {
        toast.error("Credential Doesnot Match", {
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
        console.error("Login failed:", error);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <>
      <div className="relative bg-blue-50 flex justify-center items-center h-[100vh] ">
        <div className="bg-[white] flex flex-col gap-5 rounded-lg p-10 shadow-2xl">
          <div className="flex justify-center font-bold text-[#4f46e5]">
            Welcome to AI Solution
          </div>

          <div>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-1">
                <label
                  className="w-[80px] text-[#4f46e5] font-bold"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="outline-none text-[14px] w-[344px] font-semibold rounded-sm border border-gray-400 p-1"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <div className="text-red-500 text-sm">{errors.email}</div>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label
                  className="w-[80px] text-[#4f46e5] font-bold"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative w-[344px]">
                  <input
                    className="outline-none text-[14px] w-full font-semibold rounded-sm border border-gray-400 p-1"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-2 top-2 text-gray-600"
                  >
                    {showPassword ? (
                      <IoEyeOutline size={20} />
                    ) : (
                      <IoEyeOffOutline size={20} />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <div className="text-red-500 text-sm">{errors.password}</div>
                )}
              </div>

              <button
                className="bg-[#4f46e5] text-[white] p-2 rounded-md"
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
