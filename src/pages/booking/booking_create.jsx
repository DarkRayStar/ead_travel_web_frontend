import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";

//Create Booking  page
const Badd = () => {
  const { id, nic } = useParams();
  const [tr, setTr] = useState([]);
  const navigate = useNavigate();
  const initialValues = {
    referenceId: nic,
    travallerName: "",
    travallerProfile: id,
    phoneNumber: "",
    train: "",
    noOfPassenger: 0,
    emailAddress: "",
    reservationDate: "",
    isCancelled: false,
  };

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
    getData();
  }, []);
  const validationSchema = Yup.object().shape({
    travallerName: Yup.string().required("Name is required"),
    phoneNumber: Yup.string().required("Number is required"),
    noOfPassenger: Yup.number().required("Number of passengers is required"),
    reservationDate: Yup.string().required("Date is required"),
    emailAddress: Yup.string().required("Email is required"),
    train: Yup.string().required("Train is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(
        "http://localhost:44334/api/Reservation",
        values
      );
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Booking created.",
        }).then(() => {
          navigate("/bhome");
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed.",
      });
    }
    setSubmitting(false);
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Card
        className="shadow"
        style={{ height: "880px", width: "800px", marginTop: "40px" }}
      >
        <Card.Body>
          <Row>
            <Col className="fixed ">
              <div className="d-flex justify-content-center align-items-center">
                <h3 className="topic">Booking</h3>
              </div>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, isValid, dirty }) => (
                  <div className="d-flex justify-content-center align-items-center">
                    <Form>
                      <div className="form-group">
                        <label htmlFor="travallerName">Name</label>
                        <Field
                          type="text"
                          name="travallerName"
                          id="travallerName"
                          style={{ width: "600px" }}
                          className={`form-control ${
                            dirty && isValid ? "is-valid" : ""
                          }`}
                        />
                        <ErrorMessage
                          name="travallerName"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <Field
                          type="text"
                          name="phoneNumber"
                          id="phoneNumber"
                          style={{ width: "600px" }}
                          className={`form-control ${
                            dirty && isValid ? "is-valid" : ""
                          }`}
                        />
                        <ErrorMessage
                          name="phoneNumber"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="noOfPassenger">Passenger</label>
                        <Field
                          type="number"
                          name="noOfPassenger"
                          id="cnoOfPassenger"
                          style={{ width: "600px" }}
                          className={`form-control ${
                            dirty && isValid ? "is-valid" : ""
                          }`}
                        />
                        <ErrorMessage
                          name="noOfPassenger"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="train">Select a Train</label>
                        <Field
                          as="select"
                          name="train"
                          id="train"
                          style={{ width: "600px" }}
                          className="form-control"
                        >
                          {tr &&
                            tr.map((item) => (
                              <option key={item.id }  value={item.id}>{item.trainName}</option>
                            ))}
                        </Field>
                        <ErrorMessage
                          name="train"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="reservationDate">Date</label>
                        <Field
                          type="datetime-local"
                          name="reservationDate"
                          id="reservationDate"
                          style={{ width: "600px" }}
                          className={`form-control ${
                            dirty && isValid ? "is-valid" : ""
                          }`}
                        />
                        <ErrorMessage
                          name="reservationDate"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="emailAddress">Email</label>
                        <Field
                          type="email"
                          name="emailAddress"
                          id="emailAddress"
                          style={{ width: "600px" }}
                          className={`form-control ${
                            dirty && isValid ? "is-valid" : ""
                          }`}
                        />
                        <ErrorMessage
                          name="emailAddress"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      <div className="d-flex justify-content-center align-items-center">
                        <Button
                          type="submit"
                          className="btn btn-gold"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Submitting..." : "Submit"}
                        </Button>
                      </div>
                      <br />
                    </Form>
                  </div>
                )}
              </Formik>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Badd;
