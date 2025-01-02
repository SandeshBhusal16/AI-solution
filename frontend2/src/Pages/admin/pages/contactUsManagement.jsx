import axios from "axios";
import { useEffect, useState } from "react";
import contact from "../../../assets/contact.png";
import { IoClose, IoEyeOutline } from "react-icons/io5";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactUsManagement = () => {
  const [allContact, setAllContact] = useState();
  const [isSelected, setIsSelected] = useState();
  const [isOpen, setIsOpen] = useState();
  const [Ismodal, setIsModal] = useState();

  const handleModel2 = () => {};

  const [contDet, setContdet] = useState();
  useEffect(() => {
    fetchInquiry();
  }, []);
  const fetchInquiry = async () => {
    try {
      let response = await axios.get(
        "http://localhost:3005/contact/getallcontact"
      );
      let Inquiry = response.data.data;

      setAllContact(Array.isArray(Inquiry) ? Inquiry : [Inquiry]);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(allContact);
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3005/contact/delete/${isSelected}`);
      setIsOpen(false);
      setIsSelected(null);
      fetchInquiry();
      toast.success("Inquiry Delete Successfully", {
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
  const handleModel = (id) => {
    setIsOpen(!isOpen);
    setIsSelected(id);
  };

  const contactDetails = async (id) => {
    try {
      let response = await axios.get(
        `http://localhost:3005/contact/getoneContact/${id}`
      );
      setIsModal(!Ismodal);
      setContdet(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  //   const handlecontDetails = (id) => {
  //     setIsSelected(id);
  //   };
  return (
    <>
      <div className="text-3xl mb-4  font-bold">Inquiry Management</div>

      <div className="border flex gap-4  max-w-[263px] rounded-[12px] p-4 mb-8 shadow-lg ">
        <div>
          <div className="font-semibold text-md">Total number of Inquries</div>
          <div className="font-bold pl-2 text-4xl">{allContact?.length}</div>
        </div>
        <div>
          <img src={contact} alt="" />
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md relative">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Phone number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Country
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Job Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Job Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {allContact?.map((list) => (
                <tr>
                  <td className="px-6 py-4">{list.name}</td>
                  <td className="px-6 py-4">{list.email}</td>
                  <td className="px-6 py-4">{list.phone}</td>
                  <td className="px-6 py-4">{list.companyName}</td>
                  <td className="px-6 py-4">{list.country}</td>
                  <td className="px-6 py-4">{list.jobTitle}</td>
                  <td className="px-6 py-4">{list.jobDetails}</td>

                  <td className="px-6 py-4">
                    <div className="flex space-x-3">
                      <button onClick={() => contactDetails(list._id)}>
                        <IoEyeOutline className="h-6 w-6" />
                      </button>
                      <button onClick={() => handleModel(list._id)}>
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

      {isOpen && (
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
                  onClick={() => handleDelete()}
                  className="border px-8 py-1 rounded-md bg-[blue] text-white"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {Ismodal && (
        <div
          className="fixed top-[30%] max-w-[300px] bg-[white] shadow-md rounded-md right-[15%] p-5"
          style={{
            boxShadow: "0 0 14px #bfd2f6",
          }}
        >
          <div className="flex justify-between font-bold border-b mb-3 pb-3">
            <div>Details</div>
            <button onClick={() => setIsModal(false)}>
              <IoClose />
            </button>
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <span className="font-bold">Name :</span> {contDet.name}
            </div>
            <div>
              <span className="font-bold">Email :</span> {contDet.email}
            </div>
            <div>
              <span className="font-bold">Phone Number :</span> {contDet.phone}
            </div>
            <div>
              <span className="font-bold">Company Name :</span>{" "}
              {contDet.companyName}
            </div>
            <div>
              <span className="font-bold">Country :</span> {contDet.country}
            </div>
            <div>
              <span className="font-bold">Job Title :</span> {contDet.jobTitle}
            </div>
            <div>
              <span className="font-bold">Job Details :</span>{" "}
              {contDet.jobDetails}
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default ContactUsManagement;
