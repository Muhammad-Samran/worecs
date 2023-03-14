import React from "react";
import Content_footer from "./content-footer/Content_footer";
import Reasons from "./reasons/Reasons";
import Navbar from "./navbar/Navbar";
import MainPage from "./mainpage/MainPage";
import OnlineRefrencing from "./onlinerefrencing/OnlineRefrencing";
import CheckReference from "./checkreference/CheckReference";
import SaveTime from "./savetime/SaveTime";
import ResourceLearn from "./resourcelearn/ResourceLearn";
// const linksArray = ["Jobs", "Blogs", "Our Solutions", "Contact Us"];
const Home_Page = () => {
  return (
    <>
      {/* <Container> */}

      <Navbar />
      <MainPage />
      <Reasons />
      <OnlineRefrencing />
      <CheckReference />
      <SaveTime />
      <ResourceLearn />
      <Content_footer />
    </>
  );
};

export default Home_Page;
