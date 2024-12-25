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
      title: "John Carter",
      position: "CTO, TechCorp",
      description:
        "AI-Solutions transformed how we handle employee inquiries, saving us countless hours and boosting satisfaction rates across the board.",
    },
    {
      imgsrc: client2,
      title: "Sophia Lee ",
      position: "Product Manager, Innovatech",
      description:
        "Their prototyping solutions are a game-changer. We reduced our design cycle by 40% with their affordable and intuitive tools.",
    },
    {
      imgsrc: client3,
      title: "Rajesh Mehta",
      position: "CEO, VisionAI",
      description:
        "Partnering with AI-Solutions was the best decision we made. Their custom AI tools helped us achieve goals we thought impossible.",
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
        className="w-full bg-white pb-16 px-4 rounded-lg "
        style={{
          boxShadow: "0 0 14px #bfd2f6",
        }}
      >
        <div className="flex py-10 justify-center text-2xl font-bold">
          How We Drive Success
        </div>
        <div className="max-w-[1240px] justify-center mx-auto md:grid-cols-2 flex gap-8 mb-10 mr-10">
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
      </div>
      <div className="flex justify-center mb-7 text-2xl font-bold">
        What Our Clients Say
      </div>
      <div className="flex gap-4 justify-center">
        {clientResponse.map((item, i) => (
          <ServicesCard
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
