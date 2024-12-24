import React from "react";

import Hero from "../Component/Hero";
import Analytics from "../Component/Analytics";
import Footer from "../Component/Footer";
import Chatbotify from "../Component/simpleChatbot";

const Home = () => {
  return (
    <div className=" flex flex-col gap-8 bg-[white]">
      {/* <Chatbotify /> */}

      <Hero />
      <Analytics />
    </div>
  );
};

export default Home;
