import React, { useState, useEffect } from "react";
import background from "../assets/heroAi.png";
const Hero = () => {
  const strings = ["Design", "Engineering", "Innovation"];
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    let typingInterval;

    if (typing) {
      typingInterval = setInterval(() => {
        setCurrentText((prev) => {
          const nextChar = strings[currentIndex].slice(0, prev.length + 1);
          if (nextChar === strings[currentIndex]) {
            setTyping(false);
          }
          return nextChar;
        });
      }, 120); // Typing speed
    } else {
      setTimeout(() => {
        setTyping(true);
        setCurrentIndex((prev) => (prev + 1) % strings.length); // Move to the next term
        setCurrentText("");
      }, 1000); // Pause before the next term
    }

    return () => clearInterval(typingInterval);
  }, [typing, currentIndex]);

  return (
    <div
      className="text-white flex justify-between items-center rounded-lg "
      style={{
        // boxShadow: "0 0 14px #bfd2f6",
        backgroundImage: `url(${background})`,
      }}
    >
      <div className="max-w-[1200px] mx-5 h-screen flex flex-col justify-center  px-4">
        <p className=" font-bold text-xl md:text-2xl mb-4">
          Empowering Workplaces with AI-Driven Solutions
        </p>

        <h1 className="lg:text-[2.5rem]  sm:text-[2rem] md:text-[1.5rem] font-bold leading-tight mb-4">
          Transform your business with cutting-edge <br /> AI technology
        </h1>

        <div className="flex mb-6">
          <p className="text-xl  sm:text-2xl font-medium">tailored for</p>
          <span className="text-xl sm:text-2xl font-bold text-[#4f46e5] md:pl-4 pl-2">
            {currentText}
          </span>
        </div>

        <p className="text-lg sm:text-xl text-gray-500 mb-6 max-w-[800px]">
          Experience seamless productivity and innovation with our virtual
          assistant and prototyping solutions.
        </p>
        {/* 
        <button className="bg-[#00df9a] text-black font-medium py-3 px-6 rounded-md text-lg">
          Get Started
        </button> */}
      </div>

      <div></div>
    </div>
  );
};

export default Hero;
