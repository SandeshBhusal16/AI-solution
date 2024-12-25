import React from "react";
import Home from "./Pages/Home";
import AppRoutes from "./Routes/AppRoutes";
import Navbar from "./Component/Navbar";
import Footer from "./Component/Footer";
import { useLocation } from "react-router-dom";
const App = () => {
  const Location = useLocation();
  const excludeNavFooterRoutes = ["/login", "/admin"];
  return (
    <div>
      {/* {!excludeNavFooterRoutes.includes(Location.pathname) && <Navbar />} */}
      <AppRoutes />
      {/* {!excludeNavFooterRoutes.includes(Location.pathname) && <Footer />} */}
      <div className="h-screen flex justify-center items-center text-4xl font-[600] text-[#4f46e5]">
        {"<Sorry>"} <br />
        &nbsp; &nbsp;&nbsp;&nbsp; Website is Under Construction <br />
        {"</Sorry>"}
      </div>

      {/* <Home/>  */}
    </div>
  );
};

export default App;
