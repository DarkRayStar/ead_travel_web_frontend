import React from "react";
import bgImage from "../../assets/bg1.jpg";
import Section from "./section";
const Home = () => {
  return (
    <Section id="home">
      <div>
        <div
          className="home-content p-5"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          <div className="intro container text-center text-light">
            <h1 className="title">WELCOME</h1>
            <h2 className="sub-title mb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
              laborum minus molestiae.
            </h2>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Home;
