import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

//Traveler accounts activate
const TravelerAccountStatusDeactive = () => {
  const [acc, setAcc] = useState([]);
  const navigate = useNavigate();
  const getData = () => {
    axios
      .get("http://localhost:44334/api/TravelerProfile?isActive=false")
      .then((response) => {
        console.log(response.data);
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
      AccStatus: true,
    };
    axios
      .put(`http://localhost:44334/api/TravelerProfile/${itemId}`, data)
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Activated.",
        }).then(() => {
          navigate(`dashboard/traveller/stats-acc`);
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

  if (acc === undefined || acc.length == 0) {
  }

  return (
    <div
      style={{ marginTop: "150px" }}
      className="d-flex flex-column justify-content-center align-items-center"
    >
      <h3>All Deactivated Accounts</h3>
      <br />
      <Button
        className="btn btn-green"
        onClick={() => navigate(`/dashboard/traveller/stats-acc`)}
      >
        View Activated
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
                  className="btn btn-blue"
                  onClick={() => handleDelete(item.nic)}
                >
                  Actiavte Account
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      <div style={{ marginBottom: "600px" }}></div>
    </div>
  );
};

export default TravelerAccountStatusDeactive;
