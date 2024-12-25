import React, { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/LOGO.png";

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);

  // Update active state when the route changes
  useEffect(() => {
    setActive(location.pathname);
  }, [location.pathname]);
  return (
    <div className=" flex justify-between items-center h-24  px-20 text-black sticky top-0 bg-[white] shadow-sm z-10">
      <Link
        to={"/"}
        className=" flex items-center text-3xl font-bold text-[#4f46e5]"
      >
        <img className="w-10" src={logo} alt="" srcset="" />
        SOLUTION
      </Link>

      <ul className="flex">
        {[
          { path: "/", label: "Home" },
          { path: "/blog", label: "Blog" },
          { path: "/event", label: "Event" },
          { path: "/past-portfolio", label: "Past Portfolio" },
          { path: "/about", label: "About Us" },
          { path: "/contactUs", label: "Contact Us" },
        ].map(({ path, label }) => (
          <li key={path}>
            <Link
              to={path}
              className={`p-4 pb-2 flex justify-start relative ${
                active === path
                  ? "text-[#4f46e5] after:content-[''] after:absolute after:w-1/3 after:h-[3px] after:bg-[#4f46e5] after:bottom-0 after:left-1/7"
                  : ""
              }`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
      <div onClick={handleNav} className="block md:hidden">
        {!nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      <div
        className={
          nav
            ? "fixed left-0 top-0 w-[60%] h-full border-r border-gray-900 bg-[#000300] ease-in-out duration-500"
            : "fixed left-[-100%] top-0 w-[60%] h-full ease-in-out duration-500"
        }
      >
        <h1 className="w-full text-3xl font-bold text- [#4f46e5] m-4">
          {" "}
          BusinessPulse
        </h1>

        <ul className="pt-24 uppercase px-4">
          <li className="p-4 border-b border-gray-600">Home</li>
          <li className="p-4 border-b border-gray-600">Company</li>
          <li className="p-4 border-b border-gray-600">Resources</li>
          <li className="p-4 border-b border-gray-600">About</li>
          <li className="p-4">Contact</li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
