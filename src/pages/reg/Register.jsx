import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./Register.scss";

//Registration page
const Reg = () => {
  const navigate = useNavigate();
  const initialValues = {
    firstName: "",
    lastName: "",
    nic: "",
    phone: "",
    password: "",
    role: "",
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    nic: Yup.string().required("NIC is required"),
    phone: Yup.string().required("Phone number is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    role: Yup.string().required("Please select an option"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    let data = {
      Nic: values.nic,
      FirstName: values.firstName,
      LastName: values.lastName,
      PhoneNumber: values.phone,
      AccStatus: true,
      UserInfo: {
        Password: values.password,
        Role: values.role,
      },
    };

    try {
      const response = await axios.post(
        "http://localhost:44334/api/TravelerProfile",
        data
      );
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Registration successful.",
        }).then(() => {
          navigate("/");
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Registration failed.",
      });
    }
    setSubmitting(false);
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Card className="shadow" style={{ height: "860px", width: "1200px" }}>
        <Card.Body>
          <Row>
            <Col className="first-column"></Col>
            <Col className="fixed ">
              <div className="d-flex justify-content-center align-items-center">
                <h3 className="topic">Sign Up</h3>
              </div>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, isValid, dirty }) => (
                  <Form>
                    <div className="form-group">
                      <label htmlFor="firstName">First Name</label>
                      <Field
                        type="text"
                        name="firstName"
                        id="firstName"
                        style={{ width: "90%" }}
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
                        style={{ width: "90%" }}
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
                      <label htmlFor="nic">NIC</label>
                      <Field
                        type="text"
                        name="nic"
                        id="nic"
                        style={{ width: "90%" }}
                        className={`form-control ${
                          dirty && isValid ? "is-valid" : ""
                        }`}
                      />
                      <ErrorMessage
                        name="nic"
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
                        style={{ width: "90%" }}
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

                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <Field
                        type="password"
                        name="password"
                        id="password"
                        style={{ width: "90%" }}
                        className={`form-control ${
                          dirty && isValid ? "is-valid" : ""
                        }`}
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="role">Select an Option</label>
                      <Field
                        as="select"
                        name="role"
                        id="role"
                        style={{ width: "90%" }}
                        className="form-control"
                      >
                        <option value="" label="Select an option" />
                        <option value="officer" label="Office" />
                        <option value="guide" label="Guide" />
                      </Field>
                      <ErrorMessage
                        name="role"
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
                    <p className="mt-3">
                      Already Registered?{" "}
                      <Link to="/" style={{ color: "#e3b04b" }}>
                        Sign In
                      </Link>
                    </p>
                  </Form>
                )}
              </Formik>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Reg;
