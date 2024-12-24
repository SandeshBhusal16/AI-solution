import React, { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";

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
        className=" flex items-center gap-2 text-3xl font-bold text-[#4f46e5]"
      >
        <svg
          className="w-8 h-8 text-gray-800 "
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
            d="M12 18.5A2.493 2.493 0 0 1 7.51 20H7.5a2.468 2.468 0 0 1-2.4-3.154 2.98 2.98 0 0 1-.85-5.274 2.468 2.468 0 0 1 .92-3.182 2.477 2.477 0 0 1 1.876-3.344 2.5 2.5 0 0 1 3.41-1.856A2.5 2.5 0 0 1 12 5.5m0 13v-13m0 13a2.493 2.493 0 0 0 4.49 1.5h.01a2.468 2.468 0 0 0 2.403-3.154 2.98 2.98 0 0 0 .847-5.274 2.468 2.468 0 0 0-.921-3.182 2.477 2.477 0 0 0-1.875-3.344A2.5 2.5 0 0 0 14.5 3 2.5 2.5 0 0 0 12 5.5m-8 5a2.5 2.5 0 0 1 3.48-2.3m-.28 8.551a3 3 0 0 1-2.953-5.185M20 10.5a2.5 2.5 0 0 0-3.481-2.3m.28 8.551a3 3 0 0 0 2.954-5.185"
          />
        </svg>
        AI SOLUTION
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
