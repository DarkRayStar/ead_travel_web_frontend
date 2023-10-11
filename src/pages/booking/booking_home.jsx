import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";

const Bhome = () => {
  const navigate = useNavigate();

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
                <h3 className="topic">Booking Management</h3>
              </div>

              <div
                className="d-flex justify-content-center align-items-center"
                style={{ marginTop: "40px" }}
              >
                {/* <Button
                  className="btn btn-blue"
                  onClick={() => navigate("/buse")}
                >
                  Add Booking
                </Button>
                <br />
                <Button
                  className="btn btn-green"
                  onClick={() => navigate("/bview")}
                >
                  View All Bookings
                </Button> */}
                <div
                  className="squareBtn d-flex justify-content-center align-items-center"
                  onClick={() => navigate("/dashboard/booking/add")}
                >
                  <p> Add Booking</p>
                </div>
                <div
                  className="squareBtn d-flex justify-content-center align-items-center"
                  onClick={() => navigate("/dashboard/booking/view")}
                >
                  <p>View All Bookings </p>
                </div>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Bhome;
