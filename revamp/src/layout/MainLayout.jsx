import React, { useEffect } from "react";
import NavBar from "../components/navs/NavBar";
import Footer from "../components/Footer";
import NewsLetter from "../components/sections/NewsLetter";

const MainLayout = ({ children }) => {

  return (
    <div className="overflow-x-hidden styled-scrollbar min-h-screen bg-lighter">
      <NavBar />
      {children}
      <NewsLetter />
      <Footer />
    </div>
  );
};

export default MainLayout;
