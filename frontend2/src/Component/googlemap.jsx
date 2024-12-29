import React, { useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const libraries = ["places"];
const mapContainerStyle = {
  width: "500px",
  height: "500px",
};
const defaultCenter = {
  lat: 54.906101, // default latitude
  lng: -1.38113, // default longitude
};

const Map = () => {
  return (
    <div className="mt-12 rounded-lg overflow-hidden">
      <iframe
        title="Map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2249.2335733365404!2d-1.384359684031359!3d54.90605398040454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487e6a4e1b4f9c3d%3A0x4d9b6f7c4c4b9c5!2sSunderland%20Software%20City!5e0!3m2!1sen!2suk!4v1632651985737!5m2!1sen!2suk"
        width="450px"
        height="450"
        className="iframe-style"
        allowFullScreen={true}
      ></iframe>
            
    </div>
  );
};

export default Map;
