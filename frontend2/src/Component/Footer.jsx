import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Resources from "../Pages/pastPortfolio";

const Footer = () => {
  return (
    <div className=" py-8 ">
      {/* <div className="w-100% flex mx-10 px-4 justify-between gap-8">
        <div>
          <h1 className="text-3xl font-bold text-[#4f46e5]">AI Solution</h1>
          <p className="py-4 text-gray-400">
            Transform your business with cutting-edge AI technology
          </p>
        </div>
      </div> */}

      {/* Footer Bottom */}
      <div className="text-center flex flex-col justify-center items-center text-gray-400 pt-5 mx-5 border-t ">
        <div className="flex space-x-4 mt-4 justify-center mb-2 ">
          <FaFacebookF
            className="cursor-pointer hover:text-[#4f46e5] transition"
            size={20}
          />
          <FaTwitter
            className="cursor-pointer hover:text-[#4f46e5] transition"
            size={20}
          />
          <FaInstagram
            className="cursor-pointer hover:text-[#4f46e5] transition"
            size={20}
          />
          <FaLinkedinIn
            className="cursor-pointer hover:text-[#4f46e5] transition"
            size={20}
          />
        </div>
        <div className="h-[2px] bg-gray-100 w-[200px] mb-1"></div>

        <p>© 2024 AI Solution. All rights reserved. @Sandesh Bhusal</p>
      </div>
    </div>
  );
};

export default Footer;
{
  /* Quick Links */
}
{
  /* <div>
          <h2 className="text-xl font-semibold pb-4">Quick Links</h2>
          <ul>
            <Link to="/">
              <li className="py-2 text-gray-400 hover:text-[#00df9a] transition"></li>
              Home
            </Link>
            <li className="py-2 text-gray-400 hover:text-[#00df9a] transition">
              Company
            </li>
            <Link to="/resources" element={<Resources />}>
              <li className="py-2 text-gray-400 hover:text-[#00df9a] transition"></li>
              Resources
            </Link>

            <li className="py-2 text-gray-400 hover:text-[#00df9a] transition">
              About
            </li>
            <li className="py-2 text-gray-400 hover:text-[#00df9a] transition">
              Contact
            </li>

            <Link to="/login" element={<Resources />}>
              <li className="py-2 text-gray-400 hover:text-[#00df9a] transition"></li>
              Login as Admin
            </Link>
          </ul>
        </div> */
}
