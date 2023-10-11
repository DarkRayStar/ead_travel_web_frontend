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
import "./login.css";

//Login page
const Login = () => {
  const navigate = useNavigate();
  const initialValues = {
    nic: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    nic: Yup.string().required("NIC is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    let data = {
      Nic: values.nic,
      Password: values.password,
    };

    axios
      .post("http://localhost:44334/Login", data)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("nic", res.data.nic);
        localStorage.setItem("role", res.data.role);
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Login successful.",
        });
      })
      .then(() => {
        navigate("/home");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Login failed.",
        });
      });
    setSubmitting(false);
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Card className="shadow" style={{ height: "480px", width: "1200px" }}>
        <Card.Body>
          <Row>
            <Col className="first-column2"></Col>
            <Col className="fixed ">
              <div className="d-flex justify-content-center align-items-center">
                <h3 className="topic">Sign In</h3>
              </div>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, isValid, dirty }) => (
                  <Form className="fm1">
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
                      Not Registered Yet?{" "}
                      <Link to="/reg" style={{ color: "#e3b04b" }}>
                        Sign Up
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

export default Login;
