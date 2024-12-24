import React from "react";
import Sidebar from "../../../Component/sidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full p-8 pt-[74px] h-screen overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
