import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
//VIEW All  booking for 1 traveler
const UserBookings = () => {
  const { id } = useParams();
  const [tr, setTr] = useState([]);
  const navigate = useNavigate();

  const getData = () => {
    axios
      .get("http://localhost:44334/api/Reservation/" + id)
      .then((response) => {
        const fetchedData = response.data;
        const filteredData = fetchedData.filter((item) => !item.isCancelled);
        setTr(filteredData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  useEffect(() => {
    localStorage.removeItem("trav");
    getData();
  }, []);

  const handleDelete = (itemId) => {
    let data = {
      isCancelled: true,
    };
    axios
      .put(`http://localhost:44334/api/Reservation/${itemId}`, data)
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Booking Deleted.",
        }).then(() => {
          getData();
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Failed.",
        });
      });
  };

  const handleUpdate = (item) => {
    try {
      const arrayString = JSON.stringify(item);
      localStorage.setItem("trav", arrayString);
    } catch (e) {
    } finally {
      navigate("/dashboard/booking/update");
    }
  };
  return (
    <div
      style={{ marginTop: "150px" }}
      className="d-flex flex-column justify-content-center align-items-center"
    >
      <h3>All Active Bookings of User</h3>
      <br />
      {tr &&
        tr.map((item) => (
          <Card
            className="shadow"
            style={{ height: "430px", width: "500px", marginBottom: "100px" }}
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
                <Button
                  className="btn btn-blue"
                  onClick={() => handleUpdate(item)}
                >
                  Update
                </Button>
                <br />
                <Button
                  className="btn btn-red"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      <div style={{ marginBottom: "600px" }}></div>
    </div>
  );
};

export default UserBookings;
