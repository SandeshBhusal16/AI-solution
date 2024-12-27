import React, { useState, useEffect } from "react";
import portfolio from "../../../assets/portfolio.png";
import axios from "axios";
import * as yup from "yup";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import closeicon from "../../../assets/close.svg";

const PastPortfolioManagement = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [Portfolio, setPortfolio] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    rating: "",
  });
  const [errors, setErrors] = useState({});
  const [selectedId, setSelectedId] = useState(null);
  const [deleteModel, setDeleteModel] = useState(false);

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      const response = await axios.get("http://localhost:3005/gallery/allpost");
      const portfolioData = response.data.data;
      setPortfolio(
        Array.isArray(portfolioData) ? portfolioData : [portfolioData]
      );
      console.log("image", response);
    } catch (error) {
      console.error("Error fetching portfolio:", error);
      setPortfolio([]);
    }
  };

  const validationSchema = yup.object({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    image: yup.string().required("Image is required"),
    rating: yup
      .string()
      .required("Rating is required")
      .min(1, "Rating must be at least 1")
      .max(5, "Rating must be at most 5"),
  });

  const validateField = async (name, value) => {
    try {
      await validationSchema.validateAt(name, { [name]: value });
      setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));
    } catch (error) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: error.message }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create a FormData object
      const formPayload = new FormData();
      formPayload.append("title", formData.title);
      formPayload.append("description", formData.description);
      formPayload.append("image", formData.image); // Append the file
      formPayload.append("rating", formData.rating);

      // Validation (excluding image file validation here for simplicity)
      await validationSchema.validate(
        { ...formData, image: "file-placeholder" },
        { abortEarly: false }
      );

      if (isUpdateMode) {
        await axios.patch(
          `http://localhost:3005/gallery/post/update/${selectedId}`,
          formPayload,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("Portfolio Updated Successfully", {
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
      } else {
        await axios.post("http://localhost:3005/gallery/image", formPayload, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Portfolio Created Successfully", {
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
      }

      fetchPortfolio();
      closeDrawer();
    } catch (validationError) {
      const newErrors = {};
      if (validationError.inner) {
        validationError.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });
      }
      setErrors(newErrors);
      console.error(
        "Error submitting portfolio:",
        validationError.response.data.msg === "Image not uploded"
      );

      if (validationError.response.data.msg === "Image not uploded") {
        toast.error("Image is Required", {
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
      }
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3005/gallery/delete/${selectedId}`);

      toast.success("Portfolio Delete Successfully", {
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
      fetchPortfolio();
      setDeleteModel(false);
    } catch (error) {
      console.error("Error deleting portfolio:", error);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      title: item.title,
      description: item.description,
      image: item.image,
      rating: item.rating,
    });
    setSelectedId(item._id);
    setIsUpdateMode(true);
    setIsDrawerOpen(true);
  };

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
    setErrors({});
    if (!isDrawerOpen) {
      setIsUpdateMode(false);
      setFormData({ title: "", description: "", image: "", rating: "" });
      setSelectedId(null);
    }
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setIsUpdateMode(false);
    setFormData({ title: "", description: "", image: "", rating: "" });
    setSelectedId(null);
    setErrors({});
  };
  const handleModel = (id) => {
    setDeleteModel(!deleteModel);
    setSelectedId(id);
  };
  return (
    <>
      <div className="font-bold text-3xl mb-8 ">Past Portfolio Management</div>
      <div className="border flex gap-4 max-w-[263px] rounded-[12px] p-4 mb-8 shadow-lg">
        <div>
          <div className="font-semibold text-md">
            Total number of Past-Portfolio
          </div>
          <div className="font-bold pl-2 text-4xl">{Portfolio.length}</div>
        </div>
        <div>
          <img src={portfolio} alt="Portfolio" />
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-lg drop-shadow-lg relative">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Past Portfolio</h2>
            <button
              onClick={handleDrawerToggle}
              className="bg-blue-600 flex items-center gap-1 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              <svg
                className="w-5 h-5 text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              Add Past Portfolio
            </button>
          </div>
        </div>

        <div className="overflow-x-auto ">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {Portfolio.map((item) => (
                <tr key={item._id}>
                  <td className="px-6 py-4">{item.title}</td>
                  <td className="px-6 py-4">{item.description}</td>
                  <td className="px-6 py-4">
                    <img
                      src={item.image}
                      alt="Portfolio"
                      className="w-16 h-16 object-cover"
                    />
                  </td>
                  <td className="px-6 py-4">{item.rating}</td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <svg
                          className="w-6 h-6 text-gray-800"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                          />
                        </svg>
                      </button>
                      <button
                        // onClick={() => handleDelete(item._id)}
                        onClick={() => handleModel(item._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <svg
                          className="w-6 h-6 text-gray-800"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {deleteModel && (
        <>
          <div className="w-full  absolute top-0 left-0 h-screen bg-black z-10 opacity-50">
            {" "}
          </div>
          <div className="fixed top-[50%] bg-[white] shadow-md rounded-md right-[40%] z-10">
            <div className="flex flex-col  justify-center gap-2 px-5 py-7">
              <div className="flex justify-center">
                Are you sure Do you want to delete this ?
              </div>
              <div className="flex justify-center gap-2 items-center">
                <button
                  onClick={() => setDeleteModel(false)}
                  className="border px-8 py-1 rounded-md"
                >
                  No
                </button>
                <button
                  onClick={handleDelete}
                  className="border px-8 py-1 rounded-md bg-[blue] text-white"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      {/* Drawer */}
      {isDrawerOpen && (
        <div className="absolute top-0 right-0 h-full bg-white shadow-2xl w-1/3 z-50 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">
              {isUpdateMode ? "Update Portfolio" : "Add New Portfolio"}
            </h2>
            <button
              onClick={closeDrawer}
              className="text-red-600 hover:text-red-800"
            >
              <img src={closeicon} alt="" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col font-[500] gap-1">
              <label>
                {" "}
                Title <span className="text-[red]">*</span>
              </label>
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleInputChange}
                className="border p-2 rounded-lg font-[400]"
              />
              {errors.title && (
                <div className="text-red-500 text-sm font-[400]">
                  {errors.title}
                </div>
              )}
            </div>
            <div className="flex flex-col font-[500] gap-1">
              <label>
                {" "}
                Description <span className="text-[red]">*</span>
              </label>

              <textarea
                type="text"
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleInputChange}
                className="border p-2 rounded-lg font-[400]"
              />
              {errors.description && (
                <div className="text-red-500 text-sm font-[400]">
                  {errors.description}
                </div>
              )}
            </div>
            <div className="flex flex-col font-[500] gap-1">
              <label>
                {" "}
                Image <span className="text-[red]">*</span>
              </label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.files[0] })
                }
                className="border p-2 rounded-lg font-[400]"
              />
              {errors.image && (
                <div className="text-red-500 text-sm font-[400]">
                  {errors.image}
                </div>
              )}
            </div>

            <div className="flex flex-col font-[500] gap-1">
              <label>
                {" "}
                Rating <span className="text-[red]">*</span>
              </label>
              <input
                type="number"
                name="rating"
                placeholder="Rating (1-5)"
                value={formData.rating}
                onChange={handleInputChange}
                className="border p-2 rounded-lg font-[400]"
              />
              {errors.rating && (
                <div className="text-red-500 text-sm font-[400]">
                  {errors.rating}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              {isUpdateMode ? "Update" : "Submit"}
            </button>
          </form>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default PastPortfolioManagement;
