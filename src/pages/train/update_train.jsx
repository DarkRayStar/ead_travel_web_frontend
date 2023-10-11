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

//Update Train   schedules  page
const Trupp = () => {
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState();

  useEffect(() => {
    const dt = JSON.parse(localStorage.getItem("train"));
    let data = {
      trainId: dt.trainId,
      trainName: dt.trainName,
      comp: dt.numberOfComponents,
      starttime: dt.scheduleList[0].starttime,
      day: dt.scheduleList[0].day,
      start: dt.scheduleList[0].startStationName,
      end: dt.scheduleList[0].endStationName,
      id: dt.id,
      ids: dt.scheduleList[0].id,
    };
    setInitialValues(data);
  }, []);

  const validationSchema = Yup.object().shape({
    trainId: Yup.string().required("Train Id is required"),
    trainName: Yup.string().required("Train Name  is required"),
    comp: Yup.number().required("Number of components is required"),
    starttime: Yup.string().required("Time is required"),
    day: Yup.string().required("Day is required"),
    start: Yup.string().required("Start Station is required"),
    end: Yup.string().required("End Station is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    let data = {
      id: values.id,
      trainId: values.trainId,
      trainName: values.trainName,
      numberOfComponents: values.comp,
      isCancelled: false,
      isActive: true,
      scheduleList: [
        {
          id: values.ids,
          starttime: values.starttime,
          day: values.day,
          startStationName: values.start,
          endStationName: values.end,
        },
      ],
    };

    try {
      const response = await axios.post(
        "http://localhost:44334/api/Train",
        data
      );
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Schedule Updated.",
        }).then(() => {
          navigate("/trhome");
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
                <h3 className="topic">Schedule Update</h3>
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
                        <label htmlFor="trainId">Train ID</label>
                        <Field
                          type="text"
                          name="trainId"
                          id="trainId"
                          style={{ width: "600px" }}
                          className={`form-control ${
                            dirty && isValid ? "is-valid" : ""
                          }`}
                        />
                        <ErrorMessage
                          name="trainId"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="trainName">Train Name</label>
                        <Field
                          type="text"
                          name="trainName"
                          id="trainName"
                          style={{ width: "600px" }}
                          className={`form-control ${
                            dirty && isValid ? "is-valid" : ""
                          }`}
                        />
                        <ErrorMessage
                          name="trainName"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="comp">Components</label>
                        <Field
                          type="number"
                          name="comp"
                          id="comp"
                          style={{ width: "600px" }}
                          className={`form-control ${
                            dirty && isValid ? "is-valid" : ""
                          }`}
                        />
                        <ErrorMessage
                          name="comp"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="day">Select a Day</label>
                        <Field
                          as="select"
                          name="day"
                          id="day"
                          style={{ width: "600px" }}
                          className="form-control"
                        >
                          <option value="">Select a day</option>
                          <option value="Sunday">Sunday</option>
                          <option value="Monday">Monday</option>
                          <option value="Tuesday">Tuesday</option>
                          <option value="Wednesday">Wednesday</option>
                          <option value="Thursday">Thursday</option>
                          <option value="Friday">Friday</option>
                          <option value="Saturday">Saturday</option>
                        </Field>
                        <ErrorMessage
                          name="day"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="starttime">Start Time</label>
                        <Field
                          type="datetime-local"
                          name="starttime"
                          id="starttime"
                          style={{ width: "600px" }}
                          className={`form-control ${
                            dirty && isValid ? "is-valid" : ""
                          }`}
                        />
                        <ErrorMessage
                          name="starttime"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="start">Start Station</label>
                        <Field
                          type="text"
                          name="start"
                          id="start"
                          style={{ width: "600px" }}
                          className={`form-control ${
                            dirty && isValid ? "is-valid" : ""
                          }`}
                        />
                        <ErrorMessage
                          name="start"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="end">End Station</label>
                        <Field
                          type="text"
                          name="end"
                          id="end"
                          style={{ width: "600px" }}
                          className={`form-control ${
                            dirty && isValid ? "is-valid" : ""
                          }`}
                        />
                        <ErrorMessage
                          name="end"
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

export default Trupp;
