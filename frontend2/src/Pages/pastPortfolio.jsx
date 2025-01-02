import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Card from "../Component/card";
import mercedes from "../assets/mercedes.jpg";
import axios from "axios";

const PastPortfolio = () => {
  const [allPortfolio, setAllportfolio] = useState();

  useEffect(() => {
    fetchPortfolio();
  }, []);
  const fetchPortfolio = async () => {
    try {
      let response = await axios.get("http://localhost:3005/gallery/allpost");
      setAllportfolio(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(allPortfolio);

  return (
    <div>
      <div className=" min-h-screen flex flex-col  px-4 py-10">
        <motion.div
          className=" mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="mb-4 flex flex-col gap-4 items-center bg-blue-50 py-4">
            <div>
              <h1 className="text-4xl text-[#4f46e5] font-bold mb-1">
                Past-Portfolio
              </h1>
              <div className="h-1 bg-[#4f46e5] w-[90px]"></div>
            </div>
            <p className="text-lg text-gray-400 max-w-[700px] ">
              Past-Portfolio Managed By AI Solution
            </p>
          </div>
        </motion.div>

        <div className="gap-10 px-[200px] py-5 flex flex-wrap min-h-[50vh]  bg-blue-50 ">
          {allPortfolio?.map((portfolio) => (
            // <motion.div
            //   className={""}
            //   initial={{ y: -50 }}
            //   animate={{ y: 0 }}
            //   transition={{ type: "spring", stiffness: 100 }}
            // >
            <Card
              classname={"bg-[white] w-[340px]"}
              portfolio
              rating={portfolio.rating}
              imageCss={"rounded-t-lg rounded-b-none w-[340px] h-[172px]"}
              src={portfolio.image}
              title={portfolio.title}
              description={portfolio.description}
            />
            // </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PastPortfolio;
