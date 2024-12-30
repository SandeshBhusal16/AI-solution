import React, { useEffect, useState } from "react";
import event from "../../../assets/event.png";
import portfolio from "../../../assets/portfolio.png";
import contact from "../../../assets/contact.png";
import traffic from "../../../assets/traffic.png";
import gallery from "../../../assets/gallery.png";

import { BarChart } from "@mui/x-charts";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Legend, Tooltip } from "chart.js";
import Card from "../../../Component/card";
import moment from "moment";

ChartJS.register(ArcElement, Tooltip, Legend);
function Dashboard() {
  const [AllData, setAllData] = useState();
  const [events, setEvents] = useState();
  useEffect(() => {
    fetchAllData();
  }, []);
  const allEvents = AllData?.allEvents;
  console.log(allEvents);

  let data = [
    {
      label: "No of Events",
      value: AllData?.allEvents?.length,
      color: "rgba(0, 43, 73, 1)",
      cutout: "50%",
    },
    {
      label: "No of portfolio",
      value: AllData?.allPortfolio?.length,
      color: "rgba(0, 103, 160, 1)",
      cutout: "50%",
    },
    {
      label: "No of Inquiry",
      value: AllData?.contactusData?.length,
      color: "rgba(83, 217, 217, 1)",
      cutout: "50%",
    },
  ];

  const options = {
    plugins: {
      responsive: true,
    },
    cutout: data.map((item) => item.cutout),
  };

  const finalData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        data: data.map((item) => Math.round(item.value)),
        backgroundColor: data.map((item) => item.color),
        borderColor: data.map((item) => item.color),
        borderWidth: 1,
        dataVisibility: new Array(data.length).fill(true),
      },
    ],
  };

  const fetchAllData = async () => {
    try {
      let response = await axios.get("http://localhost:3005/dashboard/getall");
      setAllData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(AllData?.allEvents.length);
  console.log("hello", events);

  return (
    <>
      <div className="text-3xl mb-8 font-bold">Dashboard</div>
      <section className="flex flex-wrap gap-4">
        <div className="border flex gap-4  max-w-[263px] rounded-[12px] p-4  shadow-lg ">
          <div>
            <div className="font-semibold text-md">
              Total number of &nbsp; Event
            </div>
            <div className="font-bold pl-2 text-4xl">
              {AllData?.allEvents?.length}
            </div>
          </div>
          <div>
            <img src={event} alt="" />
          </div>
        </div>

        <div className="border flex gap-4  max-w-[263px] rounded-[12px] p-4  shadow-lg ">
          <div>
            <div className="font-semibold text-md">
              Total number of Portfolio
            </div>
            <div className="font-bold pl-2 text-4xl">
              {AllData?.allPortfolio?.length}
            </div>
          </div>
          <div>
            <img src={portfolio} alt="" />
          </div>
        </div>

        <div className="border flex gap-4  max-w-[263px] rounded-[12px] p-4  shadow-lg ">
          <div>
            <div className="font-semibold text-md">Total number of Images</div>
            <div className="font-bold pl-2 text-4xl">
              {AllData?.allImage?.length}
            </div>
          </div>
          <div>
            <img className="w-[40px] h-[40px]" src={gallery} alt="" />
          </div>
        </div>

        <div className="border flex gap-4  max-w-[263px] rounded-[12px] p-4  shadow-lg ">
          <div>
            <div className="font-semibold text-md">Total number of Inquiry</div>
            <div className="font-bold pl-2 text-4xl">
              {AllData?.contactusData?.length}
            </div>
          </div>
          <div>
            <img src={contact} alt="" />
          </div>
        </div>

        <div className="border flex justify-between w-[263px] rounded-[12px] p-4 mb-8 shadow-lg ">
          <div>
            <div className="font-semibold text-md">Today's Traffic</div>
            <div className="font-bold pl-2 mt-3 text-4xl">60</div>
          </div>
          <div>
            <img className="w-[37.25px] h-[37.25px]" src={traffic} alt="" />
          </div>
        </div>
      </section>

      <section className=" grid grid-cols-2 gap-5">
        <BarChart
          xAxis={[
            {
              id: "barCategories",
              data: [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednes",
                "Thrusday",
                "Friday",
                "Saturday",
              ],
              scaleType: "band",
            },
          ]}
          series={[
            {
              data: [20, 50, 30, 51, 15, 48, 60],
            },
          ]}
          width={500}
          height={300}
        />
        <div className="h-[300px]">
          <Doughnut
            className="doughnut-chart"
            data={finalData}
            options={options}
          />
        </div>
      </section>

      <div className="font-bold text-xl">Upcoming Events</div>
      <div className="gap-10 px-[50px] bg-blue-50 py-5 my-5  grid grid-cols-3 ">
        {allEvents
          ?.filter((events) => events.status === "UpcomingEvent")
          .map((events) => (
            <Card
              event
              classname={"bg-[white] w-[340px]"}
              imageCss={"rounded-t-lg rounded-b-none w-[340px] h-[172px]"}
              src={events.image}
              title={events?.name}
              startDate={moment(events.startdate).format("MMMM Do YYYY")}
              endDate={moment(events.enddate).format("MMMM Do YYYY")}
              location={events.location}
            />
          ))}
      </div>
    </>
  );
}

export default Dashboard;
