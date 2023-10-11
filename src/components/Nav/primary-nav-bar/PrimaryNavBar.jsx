import React, { useState, useEffect } from "react";
import "./PrimaryNavBar.scss";
import logo from "../../../assets/logo.png";
import { useLocation, useNavigate } from "react-router-dom";

const PrimaryNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [role, setRole] = useState("");
  const [active, setActive] = useState("");

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === null || role === undefined || role === "") {
      navigate("/");
    } else {
      setRole(role);
    }
  }, []);

  useEffect(() => {
    if (location.pathname === "/dashboard/traveller") {
      setActive("travellers");
    } else if (location.pathname === "/dashboard/booking") {
      setActive("bookings");
    } else if (location.pathname === "/dashboard/scheduling") {
      setActive("schedules");
    }
  }, [location.pathname]);

  const handleLogout = () => {
    try {
      localStorage.clear();
    } catch (e) {
      console.error(e);
    } finally {
      navigate("/");
    }
  };

  return (
    <div
      className={`vh-100 d-flex flex-column justify-content-between py-4 primaryNavBar`}
    >
      <div>
        <div>
          <img
            src={logo}
            alt="Logo"
            className={`d-block mx-auto mb-3 mt-2 logoImg`}
          />
        </div>
        <div className="pt-5 ps-4">
          <h2
            className={`pb-1 subNavLink ${
              active == "travellers" ? "activeLink" : "deactiveLink"
            }`}
            onClick={() => {
              navigate("/dashboard/traveller");
            }}
          >
            Travellers
          </h2>
          <hr className="linkDivider" />
          <h2
            className={`pb-1 subNavLink ${
              active == "bookings" ? "activeLink" : "deactiveLink"
            }`}
            onClick={() => {
              navigate("/dashboard/booking");
            }}
          >
            Bookings
          </h2>

          {role == "officer" ? (
            <>
              <hr className="linkDivider" />
              <h2
                className={`pb-1 subNavLink ${
                  active == "schedules" ? "activeLink" : "deactiveLink"
                }`}
                onClick={() => {
                  navigate("/dashboard/scheduling");
                }}
              >
                Schedules
              </h2>
            </>
          ) : (
            ""
          )}
        </div>
        <div className=" ps-4 logoutSection d-flex flex-column justify-content-end">
          <p className="logoutBtn" onClick={handleLogout}>
            Logout
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrimaryNavBar;
