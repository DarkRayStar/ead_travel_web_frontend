import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import axios from "axios";

//VIEW All  booking
const AllBookings = () => {
  const [tr, setTr] = useState([]);
  const navigate = useNavigate();

  const getData = () => {
    axios
      .get("http://localhost:44334/api/Reservation")
      .then((response) => {
        const fetchedData = response.data;
        setTr(fetchedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div
      style={{ marginTop: "150px" }}
      className="d-flex flex-column justify-content-center align-items-center"
    >
      <h3>All Active Bookings</h3>
      <br />
      {tr &&
        tr.map((item) => (
          <Card
            className="shadow"
            style={{ height: "280px", width: "500px", marginBottom: "100px" }}
            key={item.id}
          >
            <Card.Body>
              <div
                className="d-flex flex-column justify-content-center align-items-center"
                style={{ marginTop: "5px" }}
              >
                <h5>Ref ID: {item.referenceId}</h5>
                <br />
                <h5>Name: {item.travallerName}</h5>
                <br />
                <h5>Date: {item.reservationDate}</h5>
                <br />
                <h5>Passengers: {item.noOfPassenger}</h5>
                <br />
              </div>
            </Card.Body>
          </Card>
        ))}
      <div style={{ marginBottom: "500px" }}></div>
    </div>
  );
};

export default AllBookings;
