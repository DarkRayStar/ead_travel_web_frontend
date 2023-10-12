import React from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import bgImage from "../../assets/welcome.gif";
import Section from "./section";
import { FaArrowRightLong } from "react-icons/fa6";
const Home = () => {
  const navigate = useNavigate();
  return (
    <Section id="home">
      <div>
        <div
          className="home-content p-5"
          style={{ backgroundImage: `url(${bgImage})`, height: "100%" }}
        >
          <div className="intro container text-center text-light">
            <h1 className="title">Efficient Ticket Management</h1>
            <h2 className="sub-title mb-4">
              Our powerful tools and intuitive interface empower you to
              efficiently handle ticketing operations. From monitoring sales
              trends to managing bookings, our system simplifies every aspect of
              the ticketing process. Stay in control, stay ahead.
            </h2>
            <Button
              style={{
                background: "#09a162",
                width: "300px",
                height: "45px",
                border: "none",
              }}
              onClick={() => navigate(`/dashboard/`)}
            >
              Explore Features
              <span className="ps-3">
                <FaArrowRightLong />
              </span>
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Home;
