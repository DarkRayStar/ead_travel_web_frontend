import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import MainLoader from "../../components/loader/Loader";

//Traveler accounts deactivate
const TViewA = () => {
  const [acc, setAcc] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    await axios
      .get("http://localhost:44334/api/TravelerProfile?isActive=true")
      .then((response) => {
        const fetchedData = response.data;
        setAcc(fetchedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    setLoading(false);
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
    <div className="d-flex flex-column justify-content-center align-items-center my-5">
      <MainLoader show={loading} />
      <h2 style={{ color: "white" }}>All Activated Accounts</h2>

      <Button
        className="btn btn-green mt-3"
        onClick={() => navigate(`/tviewd`)}
      >
        View Deactivated
      </Button>

      <Container>
        <Row className={`mt-5 mb-0 mb-md-2 mb-lg-5`}>
          {acc &&
            acc.map((item) => (
              <Col xl={3} lg={4} md={6} sm={12} className="mb-4">
                <Card className="shadow p-2" key={item.id}>
                  <Card.Body>
                    <Row>
                      <Col>
                        <Row>
                          <Col>First Name</Col>
                          <Col className="col-1">:</Col>
                          <Col>{item.firstName}</Col>
                        </Row>
                        <Row>
                          <Col>Last Name</Col>
                          <Col className="col-1">:</Col>
                          <Col>{item.lastName}</Col>
                        </Row>
                        <Row>
                          <Col>NIC:</Col>
                          <Col className="col-1">:</Col>
                          <Col>{item.nic}</Col>
                        </Row>
                        <Row className="pt-2">
                          <Col>
                            <Button
                              className="btn btn-danger w-100"
                              onClick={() => handleDelete(item.nic)}
                            >
                              Deactivate
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

export default TViewA;
