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
              Gallery Managed By AI Solution
            </p>
          </div>
        </motion.div>
        <div className="px-[100px] m-3 bg-blue-50 p-5">
          <div className="columns-3 md:columns-3 lg:columns-4 gap-5">
            {gallerydata?.map((item, index) => (
              <div
                key={index}
                className="relative group mb-5 break-inside-avoid"
              >
                <img
                  className="w-full rounded-xl"
                  src={item.image}
                  alt={item.title}
                />
                {/* <span className="absolute p-5 text-[#fff] bottom-0 z-10 w-full h-full hidden group-hover:block text-center items-center rounded-b-xl">
                  {item.title}
                </span>
                <div className="absolute rounded-xl bg-[#0000006b] p-5 bottom-0 w-full h-full hidden group-hover:block text-center items-center rounded-b-xl"></div> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Gallery;
