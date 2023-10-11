import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./traveler_home.scss";

const Travelerhome = () => {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    setRole(role);
  }, []);

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Card className="shadow" style={{ height: "480px", width: "800px" }}>
        <Card.Body>
          <Row>
            <Col className="fixed ">
              <div className="d-flex justify-content-center align-items-center">
                <h3 className="topic"> Account Management</h3>
              </div>

              <div
                className="d-flex justify-content-center align-items-center"
                style={{ marginTop: "50px" }}
              >
                <div
                  className="squareBtn d-flex justify-content-center align-items-center"
                  onClick={() => navigate("/dashboard/traveller/create-acc")}
                >
                  <p>Create Account</p>
                </div>
                <div
                  className="squareBtn d-flex justify-content-center align-items-center"
                  onClick={() => navigate("/dashboard/traveller/view-acc")}
                >
                  <p>View All </p>
                </div>
                {role == "officer" ? (
                  <div
                    className="squareBtn d-flex justify-content-center align-items-center"
                    onClick={() => navigate("/dashboard/traveller/stats-acc")}
                  >
                    <p>Account Status </p>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Travelerhome;
