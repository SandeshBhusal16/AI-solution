import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Card from "../Component/card";
import axios from "axios";
import moment from "moment";

const Event = () => {
  const [active, setActive] = useState("all");
  const [allevent, setAllEvent] = useState();

  useEffect(() => {
    fetchEvent();
  }, []);
  const fetchEvent = async () => {
    try {
      let response = await axios.get("http://localhost:3005/event/allevents");
      setAllEvent(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("hello", allevent);

  return (
    <div>
      <div className="min-h-screen flex flex-col px-4 py-10">
        <motion.div
          className=" mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="mb-4">
            <h1 className="text-4xl text-[#4f46e5] font-bold mb-1">Events</h1>
            <div className="h-1 bg-[#4f46e5] w-[50px]"></div>
          </div>
          <p className="text-lg text-gray-400 max-w-[700px] ">
            Events Managed By AI Solution
          </p>
        </motion.div>

        <div className="flex gap-24 justify-center mb-5">
          <button
            onClick={() => setActive("all")}
            className={`${
              active === "all" ? "text-[#4f46e5] font-[600]" : ""
            } hover:text-[#4f46e5] font-[600]`}
          >
            All Events
            {active === "all" && (
              <div className="h-1 bg-[#4f46e5] w-[50px]"></div>
            )}
          </button>
          <button
            onClick={() => setActive("today")}
            className={`${
              active === "today" ? "text-[#4f46e5] font-[600]" : ""
            } hover:text-[#4f46e5] font-[600]`}
          >
            Today's Events
            {active === "today" && (
              <div className="h-1 bg-[#4f46e5] w-[50px]"></div>
            )}
          </button>
          <button
            onClick={() => setActive("Upcoming")}
            className={`${
              active === "Upcoming" ? "text-[#4f46e5] font-[600]" : ""
            } hover:text-[#4f46e5] font-[600]`}
          >
            Upcoming Events
            {active === "Upcoming" && (
              <div className="h-1 bg-[#4f46e5] w-[50px]"></div>
            )}
          </button>

          <button
            onClick={() => setActive("past")}
            className={`${
              active === "past" ? "text-[#4f46e5] font-[600]" : ""
            } hover:text-[#4f46e5] font-[600]`}
          >
            Past Events
            {active === "past" && (
              <div className="h-1 bg-[#4f46e5] w-[50px]"></div>
            )}
          </button>
        </div>

        {active === "today" && (
          <div className="gap-10 px-[200px] bg-blue-50 py-5 my-5 grid grid-cols-3 justify-center">
            {allevent
              ?.filter((events) => events.status === "todayEvent")
              .map((allevent) => (
                <Card
                  event
                  classname={"bg-[white] w-[340px]"}
                  imageCss={"rounded-t-lg rounded-b-none w-[340px] h-[172px]"}
                  src={allevent.image}
                  title={"hello"}
                  startDate={moment(allevent.startdate).format("MMMM Do YYYY")}
                  endDate={moment(allevent.enddate).format("MMMM Do YYYY")}
                  location={allevent.location}
                />
                // </motion.div>
              ))}
          </div>
        )}

        {active === "past" && (
          <div className="gap-10 px-[200px] bg-blue-50 py-5 my-5  grid grid-cols-3 justify-center">
            {allevent
              ?.filter((events) => events.status === "pastEvent")
              .map((allevent) => (
                // <motion.div
                //   className={""}
                //   initial={{ y: -50 }}
                //   animate={{ y: 0 }}
                //   transition={{ type: "spring", stiffness: 100 }}
                // >
                <Card
                  event
                  classname={"bg-[white] w-[340px]"}
                  imageCss={"rounded-t-lg rounded-b-none w-[340px] h-[172px]"}
                  src={allevent.image}
                  title={"hello"}
                  startDate={moment(allevent.startdate).format("MMMM Do YYYY")}
                  endDate={moment(allevent.enddate).format("MMMM Do YYYY")}
                  location={allevent.location}
                />
                // </motion.div>
              ))}
          </div>
        )}

        {active === "all" && (
          <div className="gap-10 px-[200px] bg-blue-50 py-5 my-5  grid grid-cols-3 justify-center">
            {allevent?.map((allevent) => (
              // <motion.div
              //   className={""}
              //   initial={{ y: -50 }}
              //   animate={{ y: 0 }}
              //   transition={{ type: "spring", stiffness: 100 }}
              // >
              <Card
                event
                classname={"bg-[white] w-[340px]"}
                imageCss={"rounded-t-lg rounded-b-none w-[340px] h-[172px]"}
                src={allevent.image}
                title={"hello"}
                startDate={moment(allevent.startdate).format("MMMM Do YYYY")}
                endDate={moment(allevent.enddate).format("MMMM Do YYYY")}
                location={allevent.location}
              />
              // </motion.div>
            ))}
          </div>
        )}

        {active === "Upcoming" && (
          <div className="gap-10 px-[200px] bg-blue-50 py-5 my-5  grid grid-cols-3 justify-center">
            {allevent
              ?.filter((events) => events.status === "UpcomingEvent")
              .map((allevent) => (
                <Card
                  event
                  classname={"bg-[white] w-[340px]"}
                  imageCss={"rounded-t-lg rounded-b-none w-[340px] h-[172px]"}
                  src={allevent.image}
                  title={"hello"}
                  startDate={moment(allevent.startdate).format("MMMM Do YYYY")}
                  endDate={moment(allevent.enddate).format("MMMM Do YYYY")}
                  location={allevent.location}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Event;
