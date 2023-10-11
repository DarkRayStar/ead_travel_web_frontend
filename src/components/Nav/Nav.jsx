import React, { useState, useEffect } from "react";
import Link from "../Link/Link";
import image from "../../assets/vite.svg";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();
  const [toggeledNav, settoggeledNav] = useState(false);
  const [role, setRole] = useState("");
  const toggleNav = () => {
    settoggeledNav(!toggeledNav);
  };

  const handleLogout = () => {
    try {
      localStorage.clear();
    } catch (e) {
      console.error(e);
    } finally {
      navigate("/");
    }
  };

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === null || role === undefined || role === "") {
      navigate("/");
    } else {
      setRole(role);
    }
  }, []);

  let scheduleLink = (
    <li className="nav-item">
      <Link target="/trhome" classes="nav-link">
        Schedule
      </Link>
    </li>
  );
  return (
    <nav className={`navbar navbar-expand-md`}>
      <div className="container">
        <a className="navbar-brand" href="/home">
          <img
            src={image}
            alt="Bootstrap Logo"
            width="70"
            height="70"
            style={{ backgroundColor: "#e3e3e3c4" }}
          />
        </a>
        <div
          className={`navbar-toggler nav-icon ${(() => {
            if (toggeledNav) return "open";
            return "";
          })()}`}
          onClick={toggleNav}
        >
          <span />
          <span />
          <span />
        </div>

        <div
          className={`collapse navbar-collapse ${(() => {
            if (toggeledNav) return "show";
            return "";
          })()}`}
        >
          <ul className="navbar-nav " style={{ marginLeft: "33%" }}>
            <li className="nav-item">
              <Link target="/thome" offset={-120} classes="nav-link">
                Traveler
              </Link>
            </li>

            <li className="nav-item">
              <Link target="/bhome" classes="nav-link">
                Booking
              </Link>
            </li>
            {role == "officer" ? scheduleLink : ""}
            <Button
              variant="primary"
              className="logout-button"
              onClick={handleLogout}
            >
              Log Out
            </Button>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
