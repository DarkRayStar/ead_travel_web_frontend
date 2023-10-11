import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const MainLayout = ({ component }) => {
  return (
    <div>
      <Header />
      {component}
      {/* <Footer /> */}
    </div>
  );
};

export default MainLayout;
