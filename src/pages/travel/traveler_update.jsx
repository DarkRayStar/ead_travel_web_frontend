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

//Traveler account update  page
const Tupp = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:44334/api/TravelerProfile/" + id)
      .then((response) => {
        const dt = response.data;
        const data = {
          firstName: dt.firstName,
          lastName: dt.lastName,
          phone: dt.phoneNumber,
          id: dt.id,
          nic: dt.nic,
          accStatus: dt.accStatus,
          createdDate: dt.createdDate,
        };
        setInitialValues(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    phone: Yup.string().required("Phone number is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    let data = {
      id: values.id,
      nic: values.nic,
      firstName: values.firstName,
      lastName: values.lastName,
      PhoneNumber: values.phone,
      accStatus: values.accStatus,
      createdDate: values.createdDate,
    };

    try {
      const response = await axios.post(
        "http://localhost:44334/api/TravelerProfile/",
        data
      );
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Account Updated.",
        }).then(() => {
          navigate("/thome");
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
        style={{ height: "480px", width: "800px", marginTop: "40px" }}
      >
        <Card.Body>
          <Row>
            <Col className="fixed ">
              <div className="d-flex justify-content-center align-items-center">
                <h3 className="topic">Traveler Account Update</h3>
              </div>
              <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, isValid, dirty }) => (
                  <div className="d-flex justify-content-center align-items-center">
                    <Form>
                      <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <Field
                          type="text"
                          name="firstName"
                          id="firstName"
                          style={{ width: "600px" }}
                          className={`form-control ${
                            dirty && isValid ? "is-valid" : ""
                          }`}
                        />
                        <ErrorMessage
                          name="firstName"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <Field
                          type="text"
                          name="lastName"
                          id="lastName"
                          style={{ width: "600px" }}
                          className={`form-control ${
                            dirty && isValid ? "is-valid" : ""
                          }`}
                        />
                        <ErrorMessage
                          name="lastName"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <Field
                          type="phone"
                          name="phone"
                          id="phone"
                          style={{ width: "600px" }}
                          className={`form-control ${
                            dirty && isValid ? "is-valid" : ""
                          }`}
                        />
                        <ErrorMessage
                          name="phone"
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

export default Tupp;
