import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import MainLoader from "../../components/loader/Loader";

//VIEW Traveler accounts
const TravelerAccountView = () => {
  const [acc, setAcc] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getData = async () => {
    setLoading(true);
    await axios
      .get(
        "https://ssd-train-booking-web-service.azurewebsites.net/api/TravelerManagement?isActive=true"
      )
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
    axios
      .delete(
        `https://ssd-train-booking-web-service.azurewebsites.net/api/TravelerManagement/${itemId}`
      )
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Account Deleted.",
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
      <h2 style={{ color: "white" }}>All Accounts</h2>

      <Container>
        <Row className={`mt-5 mb-0 mb-md-2 mb-lg-5 px-5`}>
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
                              className="text-nowrap w-100"
                              onClick={() =>
                                navigate(
                                  `/dashboard/traveller/view-acc/${item.nic}`
                                )
                              }
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

export default TravelerAccountView;
