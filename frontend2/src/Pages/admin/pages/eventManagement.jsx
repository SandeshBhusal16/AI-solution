import { useEffect, useState } from "react";
import event from "../../../assets/event.png";
import closeicon from "../../../assets/close.svg";
import axios from "axios";
import * as yup from "yup";
import moment from "moment";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const EventManagement = () => {
  const [isdrawerOpen, setIsDrawerOpen] = useState(false);
  const [IsupdateModel, setIsUpdateMode] = useState(false);
  const [alleventdata, setAlleventData] = useState([]);
  const [isSelected, setIsSelected] = useState(null);
  const [eventData, setEventData] = useState({
    name: "",
    startdate: "",
    enddate: "",
    location: "",
    image: "",
  });
  const [errors, setErrors] = useState({});
  const [Isopen, setIsOpen] = useState(false);
  const handleModel = (idforDelete) => {
    setIsOpen(!Isopen);
    setIsSelected(idforDelete);
  };
  const handledrawer = () => {
    setIsDrawerOpen(!isdrawerOpen);
    setIsUpdateMode(false);
    if (!isdrawerOpen) {
      setIsUpdateMode(false);
      setIsSelected(null);
      setEventData({
        name: "",
        startdate: "",
        enddate: "",
        location: "",
        image: "",
      });
    }
  };

  const handleUpdateModel = () => {
    setIsDrawerOpen(true);
    setIsUpdateMode(true);
  };

  const ValidationSchema = yup.object({
    name: yup.string().required("Title is required"),
    startdate: yup.string().required("Start Date is Required"),
    enddate: yup.string().required("End Date is Required"),
    location: yup.string().required("Location is required"),
    image: yup.string().required("Image is Required"),
  });
  useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent = async () => {
    try {
      const response = await axios.get("http://localhost:3005/event/allevents");
      const Eventdata = response.data.data;
      setAlleventData(Array.isArray(Eventdata) ? Eventdata : [Eventdata]);
      // setAlleventData(Eventdata);
    } catch (error) {
      console.error("Error fetching event:", error);
    }
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setIsUpdateMode(false);
    setErrors({});
    setEventData({
      name: "",
      startdate: "",
      enddate: "",
      location: "",
      image: "",
    });
    // setSelectedId(null);
    // setErrors({});
  };

  const validateField = async (name, value) => {
    try {
      await ValidationSchema.validateAt(name, { [name]: value });
      setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));
    } catch (error) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: error.message }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...eventData, [name]: value });
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formPayload = new FormData();
      formPayload.append("name", eventData.name);
      formPayload.append("startdate", eventData.startdate);
      formPayload.append("enddate", eventData.enddate);
      formPayload.append("location", eventData.location);
      formPayload.append("image", eventData.image);

      await ValidationSchema.validate(
        { ...eventData, image: "file-placeholder" },
        {
          abortEarly: false,
        }
      );

      if (!IsupdateModel) {
        await axios.post("http://localhost:3005/event/", formPayload, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Event Created Successfully", {
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
        await axios.patch(
          `http://localhost:3005/event/update/${isSelected}`,
          formPayload,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("Event Updated Successfully", {
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

      fetchEvent();
      closeDrawer(true);
    } catch (ValidationError) {
      console.log("error on events", ValidationError);
      const newErrors = {};
      if (ValidationError.inner) {
        ValidationError.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });
      }
      setErrors(newErrors);
      if (ValidationError.response.data.msg === "Image not uploded") {
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
  const handledelete = async () => {
    try {
      await axios.delete(`http://localhost:3005/event/delete/${isSelected}`);
      fetchEvent();
      setIsOpen(false);
      toast.success("Event Deleted Successfully", {
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
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (item) => {
    setEventData({
      name: item.name,
      startdate: item.startdate,
      enddate: item.enddate,
      location: item.location,
      image: item.image,
    });
    setIsSelected(item._id);
    handleUpdateModel();
  };
  // console.log("id", isSelected);

  const Enddate = moment(alleventdata.enddate).format("MMMM Do YYYY");

  return (
    <>
      <div className="text-3xl mb-4  font-bold">Events Management</div>

      <div className="border flex gap-4  max-w-[263px] rounded-[12px] p-4 mb-8 shadow-lg ">
        <div>
          <div className="font-semibold text-md">
            Total number of &nbsp; Event
          </div>
          <div className="font-bold pl-2 text-4xl">{alleventdata.length}</div>
        </div>
        <div>
          <img src={event} alt="" />
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md relative">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Events</h2>
            <button
              onClick={handledrawer}
              className="bg-blue-600 text-white px-4 py-2 flex items-center gap-1 rounded-lg hover:bg-blue-700"
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
              Add Event
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  StartDate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  EndDate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {alleventdata.map((event) => (
                <tr key={event.id}>
                  <td className="px-6 py-4">{event.name}</td>
                  <td className="px-6 py-4">
                    {moment(event.startdate).format("MMMM Do YYYY")}
                  </td>
                  <td className="px-6 py-4">
                    {moment(event.Enddate).format("MMMM Do YYYY")}
                  </td>
                  <td className="px-6 py-4">
                    <img
                      src={event.image}
                      alt="Portfolio"
                      className="w-16 h-16 object-cover"
                    />
                  </td>

                  <td className="px-6 py-4">{event.location}</td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleEdit(event)}
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
                      <button onClick={() => handleModel(event._id)}>
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

      {Isopen && (
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
                  onClick={() => setIsOpen(false)}
                  className="border px-8 py-1 rounded-md"
                >
                  No
                </button>
                <button
                  onClick={() => handledelete(event._id)}
                  className="border px-8 py-1 rounded-md bg-[blue] text-white"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {isdrawerOpen && (
        <div className="fixed top-0 right-0 h-full bg-white shadow-2xl w-1/3 z-50 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">
              {IsupdateModel ? "Update Events" : "Add New Events"}
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
                value={eventData.name}
                onChange={(e) => {
                  setEventData({ ...eventData, name: e.target.value });
                  validateField("name", e.target.value);
                }}
                className="border w-full p-2 rounded-lg font-[400]"
              />
              {errors.name && (
                <div className="text-red-500 text-xs font-[400] ">
                  {errors.name}
                </div>
              )}
            </div>
            <div className="flex flex-col font-[500] gap-2">
              <label>
                {" "}
                Start Date <span className="text-[red]">*</span>
              </label>
              <input
                className="border p-2 rounded-lg font-[400]"
                type="date"
                value={eventData.startdate}
                onChange={(e) => {
                  setEventData({ ...eventData, startdate: e.target.value });
                  validateField("startdate", e.target.value);
                }}
              />
              {errors.startdate && (
                <div className="text-red-500 text-xs font-[400] ">
                  {errors.startdate}
                </div>
              )}
            </div>
            <div className="flex flex-col font-[500] gap-2">
              <label>
                {" "}
                End Date <span className="text-[red]">*</span>
              </label>
              <input
                className="border p-2 rounded-lg font-[400]"
                type="date"
                value={eventData.enddate}
                onChange={(e) => {
                  setEventData({ ...eventData, enddate: e.target.value });
                  validateField("enddate", e.target.value);
                }}
              />
              {errors.enddate && (
                <div className="text-red-500 text-xs font-[400] ">
                  {errors.enddate}
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
                className="border p-2 rounded-lg font-[400]"
                // value={eventData.image}
                onChange={(e) => {
                  setEventData({ ...eventData, image: e.target.files[0] });
                  validateField("image", e.target.files[0]);
                }}
              />
              {errors.image && (
                <div className="text-red-500 text-xs font-[400] ">
                  {errors.image}
                </div>
              )}
            </div>
            <div className="flex flex-col font-[500] gap-1">
              <label>
                {" "}
                Location <span className="text-[red]">*</span>
              </label>
              <input
                type="text"
                className="border p-2 rounded-lg font-[400]"
                placeholder="Location"
                value={eventData.location}
                onChange={(e) => {
                  setEventData({ ...eventData, location: e.target.value });
                  validateField("location", e.target.value);
                }}
              />
              {errors.location && (
                <div className="text-red-500 text-xs font-[400] ">
                  {errors.location}
                </div>
              )}
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              {IsupdateModel ? "Update" : "Submit"}
            </button>
          </form>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default EventManagement;
