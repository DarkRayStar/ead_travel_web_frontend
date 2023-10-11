import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Swal from "sweetalert2";

//VIEW Trains
const TrView = () => {
  const [tr, setTr] = useState([]);
  const navigate = useNavigate();

  const getData = () => {
    axios
      .get("http://localhost:44334/api/Train")
      .then((response) => {
        const fetchedData = response.data;
        setTr(fetchedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  useEffect(() => {
    localStorage.removeItem("train");
    getData();
  }, []);

  const handleDelete = (itemId) => {
    console.log(itemId);
    axios
      .delete(`http://localhost:44334/api/TravelerProfile/${itemId}`)
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Train Deleted.",
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
      localStorage.setItem("train", arrayString);
    } catch (e) {
    } finally {
      navigate("/trupp");
    }
  };

  return (
    <div
      style={{ marginTop: "150px" }}
      className="d-flex flex-column justify-content-center align-items-center"
    >
      <h3>All Active Trains</h3>
      <br />
      {tr &&
        tr.map((item) => (
          <Card
            className="shadow"
            style={{ height: "480px", width: "500px", marginBottom: "100px" }}
            key={item.id}
          >
            <Card.Body>
              <div
                className="d-flex flex-column justify-content-center align-items-center"
                style={{ marginTop: "5px" }}
              >
                <h5>Train Name: {item.trainName}</h5>
                <br />
                <h5>Compartment: {item.numberOfComponents}</h5>
                <br />
                <h5>Start: {item.scheduleList[0].startStationName}</h5>
                <br />
                <h5>End: {item.scheduleList[0].endStationName}</h5>
                <br />
                <h5>Time: {item.scheduleList[0].starttime}</h5>
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

export default TrView;
