// Importing necessary modules and components
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import MainLoader from "../../components/loader/Loader";

// VIEW All booking for 1 traveler
const UserBookings = () => {
  // Retrieve 'id' parameter from the URL
  const { id } = useParams();

  // Define state variables using useState
  const [tr, setTr] = useState([]); // tr is used to store booking data
  const navigate = useNavigate(); // useNavigate is a hook from 'react-router-dom' used for navigation
  const [loading, setLoading] = useState(false); // Loading state for showing loading indicator

  // Define a function to fetch data about bookings
  const getData = () => {
    axios
      .get(
        "https://ead-train-booking-web-service.azurewebsites.net/api/ReservationManagement/" +
          id
      )
      .then((response) => {
        const fetchedData = response.data;
        // Filter out cancelled bookings
        const filteredData = fetchedData.filter((item) => !item.isCancelled);
        setTr(filteredData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  // Use useEffect to fetch data when the component mounts
  useEffect(() => {
    // Remove 'trav' from localStorage
    localStorage.removeItem("trav");
    getData();
  }, []);

  // Define a function to handle booking deletion
  const handleDelete = (itemId) => {
    let data = {
      isCancelled: true,
    };
    axios
      .delete(
        `https://ead-train-booking-web-service.azurewebsites.net/api/ReservationManagement/${itemId}`,
        data
      )
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Booking Deleted.",
        }).then(() => {
          getData(); // Refresh data after deletion
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: error.response.data,
        });
      });
  };

  // Define a function to handle booking update
  const handleUpdate = (item) => {
    try {
      const arrayString = JSON.stringify(item);
      localStorage.setItem("trav", arrayString); // Store 'item' in localStorage
    } catch (e) {
      // Handle potential errors
    } finally {
      navigate("/dashboard/booking/update"); // Navigate to the update page
    }
  };

  // Return JSX for the component
  return (
    <div className="d-flex flex-column justify-content-center align-items-center my-5">
      <MainLoader show={loading} />
      <h2 style={{ color: "white" }}>All Active Bookings of User</h2>

      <Container>
        <Row className={`mt-5 mb-0 mb-md-2 mb-lg-5 px-5`}>
          {tr &&
            tr.map((item) => (
              <Col xl={4} lg={4} md={4} sm={12} className="mb-4" key={item.id}>
                <Card className="shadow p-2">
                  <Card.Body>
                    <Row>
                      <Col>
                        <Row>
                          <Col>NIC</Col>
                          <Col className="col-1">:</Col>
                          <Col>{item.referenceId}</Col>
                        </Row>
                        <Row>
                          <Col>Name</Col>
                          <Col className="col-1">:</Col>
                          <Col>{item.travallerName}</Col>
                        </Row>
                        <Row>
                          <Col>Date</Col>
                          <Col className="col-1">:</Col>
                          <Col>
                            {moment(item.reservationDate).format("MMM Do YY")}
                          </Col>
                        </Row>
                        <Row>
                          <Col>Passengers</Col>
                          <Col className="col-1">:</Col>
                          <Col>{item.noOfPassenger}</Col>
                        </Row>
                        <Row className="pt-2">
                          <Col>
                            <Button
                              className="text-nowrap w-100"
                              onClick={() => handleUpdate(item)}
                            >
                              Update
                            </Button>
                          </Col>
                          <Col>
                            <Button
                              className="text-nowrap btn-danger w-100"
                              onClick={() => handleDelete(item.id)}
                            >
                              Delete
                            </Button>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </Container>
    </div>
  );
};

export default UserBookings;
