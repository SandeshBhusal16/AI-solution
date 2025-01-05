import React from "react";
import logo from "../assets/Laptop.jpg";
import first from "../assets/homepage1.png";
import second from "../assets/homepage2.png";
import Aiservice from "../assets/Aiservice.gif";
import customAi from "../assets/customAi.gif";
import AffordableSolution from "../assets/AffordableSolution.gif";
import service4 from "../assets/service4.gif";
import service5 from "../assets/service5.gif";
import client1 from "../assets/client1.png";
import client2 from "../assets/client3.jpg";
import client3 from "../assets/client2.png";
import client4 from "../assets/client4.jpg";

import ServicesCard from "./servicesCard";

const Analytics = () => {
  const servicesData = [
    {
      imgsrc: Aiservice,
      title: "AI-Powered Virtual Assistant",
      description:
        "Enhance employee productivity with our intelligent assistant that provides quick, accurate responses to inquiries and streamlines workflows.",
    },
    {
      imgsrc: customAi,
      title: "Affordable Prototyping Solutions",
      description:
        "Transform ideas into actionable designs with cost-effective prototyping services that speed up your innovation cycle.",
    },
    {
      imgsrc: AffordableSolution,
      title: "Custom AI Development",
      description:
        "Tailored AI solutions built to meet the unique needs of your industry, ensuring seamless integration and measurable outcomes.",
    },
    {
      imgsrc: service4,
      title: "Predictive Analytics",
      description:
        "Harness the power of AI to predict trends, optimize operations, and make data-driven decisions. Our predictive analytics tools enable businesses to stay ahead of the curve by providing actionable insights from data.",
    },
    {
      imgsrc: service5,
      title: "Natural Language Processing (NLP) Solutions",
      description:
        "Enable machines to understand, interpret, and respond to human language with our NLP solutions. From chatbots to sentiment analysis, our tools are built to bridge the gap between humans and technology seamlessly.",
    },
  ];

  const clientResponse = [
    {
      imgsrc: client1,
      title: "David Wisseman",
      position: " Owner at Warner Farm",
      description:
        "Turbo Farm has completely transformed the way we approachagriculture. With its AI-driven insights and automation, we’ve seen a significant boost in crop yields while reducing resource usage.",
    },
    {
      imgsrc: client2,
      title: "Michael Reed",
      position: "Supply Chain Manager at Vaux Brewery",
      description:
        "Log AI has revolutionized our inventory management system. The AI-driven optimization has helped us maintain perfect stock levels, reducing both overstock and stockouts.",
    },
    {
      imgsrc: client3,
      title: "Sarah Lampard",
      position: "Independent Investor",
      description:
        "Asaninvestor, Stockk has completely changed the way I approach trading. The AI-powered insights and real-time market analysis have given me a huge advantage in making informed decisions. The automated trading feature has helped me execute trades at the right moments, even when I’m not able to monitor the market. ",
    },
    {
      imgsrc: client4,
      title: "James Lee",
      position: "Regional Manager at Samsung Electronics",
      description:
        "LaundriQ is a groundbreaking innovation that perfectly complements Samsung’s commitment to smart home solutions. As a regional manager, I’ve seen firsthand how this AI-powered tool enhances the laundry experience for our customers. By intelligently detecting fabric quality and optimizing detergent usage, LaundriQ not only ensures superior cleaning results but also supports eco-friendly practices. ",
    },
  ];
  return (
    <>
      <div>
        <div className="flex justify-center mb-5 text-2xl text-blue-600 font-bold">
          Our AI Solutions Services
        </div>
        <div className="flex gap-4 flex-wrap justify-center m-auto w-full">
          {servicesData.map((item, index) => (
            <ServicesCard
              Containercss={"bg-[#fff] shadow-md"}
              key={index}
              header={item.header}
              imgsrc={item.imgsrc}
              title={item.title}
              titleCss={"font-semibold text-[16px]"}
              descriptionCss={"text-[14px]"}
              description={item.description}
              service
            />
          ))}
        </div>
      </div>

      <div
        className="w-full pb-16 px-4 text-white border-y "
        style={{
          background: "#4f46e5",
          boxShadow:
            "0px 0px 4px rgba(226, 232, 240, 0.75), 0px 4px 12px #E2E8F0;",
        }}
      >
        <div className="flex py-10 justify-center text-2xl font-bold">
          How We Drive Success
        </div>
        <div className="max-w-[1240px] justify-center mx-auto md:grid-cols-2 flex gap-8 mb-12 mr-10">
          <div className="flex flex-col w-1/2">
            <div className="md:text-3xl text-start flex sm:text-3xl font-bold py-2">
              Enhanced Digital Employee Experience
            </div>
            <p className="">
              Our AI solutions proactively identify and resolve digital
              bottlenecks, creating a smoother work experience for your team.
            </p>
          </div>

          <img
            className="bg-transparent rounded-lg w-[300px]"
            src={first}
            alt=""
          />
        </div>

        <div className="max-w-[1240px] mx-auto md:grid-cols-2 flex gap-8">
          {/* <img className="w-[500px] max-auto my-4" src={Laptop} alt="laptop" /> */}
          <img
            className="bg-transparent rounded-lg w-[300px]"
            src={second}
            alt=""
          />
          <div className="flex flex-col w-1/2">
            <div className="md:text-3xl text-start sm:text-3xl font-bold py-2">
              Faster Product Design Cycles
            </div>
            <p className="">
              With our AI prototyping tools, you can visualize concepts faster,
              allowing quicker decision-making and innovation.
            </p>
          </div>
        </div>

        <div className="max-w-[1240px] justify-center mx-auto md:grid-cols-2 flex gap-8 my-12 mr-10">
          <div className="flex flex-col w-1/2">
            <div className="md:text-3xl text-start flex sm:text-3xl font-bold py-2">
              Enhanced Digital Employee Experience
            </div>
            <p className="">
              Our AI solutions proactively identify and resolve digital
              bottlenecks, creating a smoother work experience for your team.
            </p>
          </div>

          <img
            className="bg-transparent rounded-lg w-[300px]"
            src={first}
            alt=""
          />
        </div>
      </div>
      <div className="flex justify-center mb-7 text-2xl font-bold">
        What Our Clients Say
      </div>
      <div className="flex flex-wrap gap-4  justify-center">
        {clientResponse.map((item, i) => (
          <ServicesCard
            Containercss={"w-[450px] mt-10"}
            key={i}
            imgsrc={item.imgsrc}
            title={item.title}
            titleCss={"font-semibold"}
            description={item.description}
            testimonial
            position={item.position}
          />
        ))}
      </div>
    </>
  );
};

export default Analytics;
