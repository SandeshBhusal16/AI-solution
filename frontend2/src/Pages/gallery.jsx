import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Gallery = () => {
  const [gallerydata, setgallerydata] = useState();
  useEffect(() => {
    fetchall();
  }, []);
  const fetchall = async () => {
    try {
      let response = await axios.get("http://localhost:3005/gallery2/getall");
      setgallerydata(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(gallerydata);

  return (
    <>
      <div className="py-10">
        <motion.div
          className=" mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="mb-4 flex flex-col gap-4 items-center py-4 bg-blue-50">
            <div>
              <h1 className="text-4xl text-[#4f46e5] font-bold mb-1">
                Gallery
              </h1>
              <div className="h-1 bg-[#4f46e5] w-[50px]"></div>
            </div>
            <p className="text-lg text-gray-400 max-w-[700px] ">
              Events Managed By AI Solution
            </p>
          </div>
        </motion.div>
        <div className="min-h-screen grid grid-cols-3 px-[200px]  gap-5   justify-center bg-blue-50 m-3">
          {gallerydata?.map((item) => (
            <div className="relative h-[300px] group ">
              <img
                className="w-[300px] h-[300px] rounded-xl"
                src={item.image}
                alt={item.title}
              />
              <span className="absolute  p-5 text-[#fff] bottom-0 z-10 w-[300px] h-[75px] hidden group-hover:block justify-center items-center  rounded-b-xl">
                {item.title}
              </span>
              <div className="absolute bg-[#0000006b] p-5 bottom-0 w-[300px] h-[75px] hidden group-hover:block justify-center items-center  rounded-b-xl"></div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Gallery;
