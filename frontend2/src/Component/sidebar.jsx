import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaUsers, FaCog, FaChartBar } from "react-icons/fa";
import { TfiGallery } from "react-icons/tfi";
import logo from "../../public/vite.svg";
import { LuLogOut } from "react-icons/lu";
import { BsChatLeftFill } from "react-icons/bs";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [logout, setIsLogout] = useState();
  const [model, setModel] = useState();

  const handleModel = () => {
    setModel(!model);
  };
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const menuItems = [
    {
      path: "/admin/dashboard",
      name: "Dashboard",
      icon: <FaHome />,
    },
    {
      path: "/admin/eventManagement",
      name: "Event Management",
      icon: <FaUsers />,
    },
    {
      path: "/admin/pastPortfolioManagenemt",
      name: "Past Portfolio Management",
      icon: <FaChartBar />,
    },
    {
      path: "/admin/galleryManagement",
      name: "GalleryManagement",
      icon: <TfiGallery />,
    },
    {
      path: "/admin/inquiryManagement",
      name: "inquiry",
      icon: <BsChatLeftFill />,
    },
    { path: "/admin/settings", name: "Settings", icon: <FaCog /> },
  ];

  const navigate = useNavigate();

  const handlelogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <div className="flex ">
        <div
          className={` bg-gray-800 w-[275px] h-screen p-4 flex flex-col text-white transition-width duration-300`}
        >
          {/* Sidebar Header */}
          <div className="flex justify-center items-center">
            <img className="w-10" src={logo} alt="" />{" "}
            <h1 className="text-3xl font-bold text-[#004aad]">Solution</h1>
            {/* <button
          className="text-lg p-2 hover:bg-gray-700 rounded-md"
          onClick={toggleSidebar}
        >
          {isCollapsed ? "▶" : "◀"}
        </button> */}
          </div>

          {/* Sidebar Menu */}
          <nav className="mt-6 flex flex-col gap-4">
            {menuItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-2 rounded-md ${
                    isActive
                      ? "bg-green-500 text-white"
                      : "hover:bg-gray-700 hover:text-gray-300"
                  }`
                }
              >
                <span className="text-xl">{item.icon}</span>
                {!isCollapsed && <span>{item.name}</span>}
              </NavLink>
            ))}
            <div
              className="flex gap-2 items-center cursor-pointer"
              onClick={handleModel}
            >
              <div>
                <LuLogOut className="" />
              </div>
              <div>Logout</div>
            </div>
          </nav>
        </div>
        <div
          className="flex bg-[white] shadow-lg h-[50px] justify-between px-5 items-center right-0 top-0 fixed z-10"
          style={{ width: "calc(100% - 275px)" }}
        >
          <div></div>
          <div className="text-xl flex font-[600] text-[#22c55e]">
            {/* <img className="w-10" src={logo} alt="" /> */}
            Welcome Admin
          </div>
          <div>
            <div className="font-semibold flex items-center justify-center text-xl bg-[#bcd8bc] w-[41px]  h-[41px] rounded-full">
              S
            </div>
          </div>
        </div>
      </div>

      {model && (
        <>
          <div className="w-[100%] absolute h-screen bg-black z-10 opacity-50">
            {" "}
          </div>
          <div className="fixed top-[50%] bg-[white] shadow-md rounded-md right-[40%] z-10 ">
            <div className="flex flex-col  justify-center gap-2 px-5 py-7">
              <div className="flex justify-center">
                Are you sure Do you want to Logout ?
              </div>
              <div className="flex justify-center gap-2 items-center">
                <button
                  onClick={() => setModel(false)}
                  className="border px-8 py-1 rounded-md"
                >
                  No
                </button>
                <button
                  onClick={handlelogout}
                  className="border px-8 py-1 rounded-md bg-[blue] text-white"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Sidebar;
