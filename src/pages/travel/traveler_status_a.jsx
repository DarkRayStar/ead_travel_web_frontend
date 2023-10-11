import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

//Traveler accounts deactivate
const TViewA = () => {
  const [acc, setAcc] = useState([]);
  const navigate = useNavigate();
  const getData = () => {
    axios
      .get("http://localhost:44334/api/TravelerProfile?isActive=true")
      .then((response) => {
        const fetchedData = response.data;
        setAcc(fetchedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  const handleDelete = (itemId) => {
    let data = {
      AccStatus: false,
    };
    axios
      .put(`http://localhost:44334/api/TravelerProfile/${itemId}`, data)
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Deactivated.",
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

  return (
    <div
      style={{ marginTop: "150px" }}
      className="d-flex flex-column justify-content-center align-items-center"
    >
      <h3>All Activated Accounts</h3>
      <br />
      <Button className="btn btn-green" onClick={() => navigate(`/tviewd`)}>
        View Deactivated
      </Button>
      <br />
      {acc &&
        acc.map((item) => (
          <Card
            className="shadow"
            style={{ height: "380px", width: "500px", marginBottom: "100px" }}
            key={item.id}
          >
            <Card.Body>
              <div
                className="d-flex flex-column justify-content-center align-items-center"
                style={{ marginTop: "5px" }}
              >
                <h5>First Name: {item.firstName}</h5>
                <br />
                <h5>Last Name: {item.lastName}</h5>
                <br />
                <h5>NIC: {item.nic}</h5>
                <br />
                <br />
                <Button
                  className="btn btn-red"
                  onClick={() => handleDelete(item.nic)}
                >
                  Deactivate Account
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
           <div style={{marginBottom:"600px"}}></div>
    </div>
  );
};

export default TViewA;
