import React, { useState } from "react";
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
import "./login.scss";
import logo from "../../assets/logo.png";
import MainLoader from "../../components/loader/Loader";

//Login page
const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    let data = {
      Nic: values.nic,
      Password: values.password,
    };

    await axios
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
    setLoading(false);
  };

  return (
    <Row className="loginScreen">
      <MainLoader show={loading} />
      <Col className="d-flex justify-content-center align-items-center">
        <Card className="loginCard">
          <Card.Body className="p-0">
            <Row>
              <Col className="col-5 firstColumn d-flex justify-content-center align-items-center">
                <img
                  src={logo}
                  alt="Logo"
                  className={`d-block mx-auto mb-3 mt-2 logoImgLogin cursor-pointer`}
                />
              </Col>
              <Col className="col-7 d-flex justify-content-center flex-column ps-5">
                <div className="pb-3 pt-1">
                  <h3 className="fw-bold">Sign In</h3>
                </div>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting, isValid, dirty }) => (
                    <Form>
                      <div>
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

                      <div className="pt-3">
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
                      <div className="d-flex justify-content-center align-items-center pt-4">
                        <Button
                          type="submit"
                          className="btnSubmit"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Submitting..." : "Submit"}
                        </Button>
                      </div>
                      <p className="mt-4">
                        Not Registered Yet?{" "}
                        <Link to="/reg" style={{ color: "#09a162" }}>
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
      </Col>
    </Row>
  );
};

export default Login;
