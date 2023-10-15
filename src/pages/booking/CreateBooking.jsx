import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import * as Yup from 'yup';

// Create Booking page
const CreateBooking = () => {
  // Retrieve 'id' and 'nic' from the URL parameters
  const { id, nic } = useParams();

  // Define state variables using useState
  const [tr, setTr] = useState([]); // tr is used to store train data
  const navigate = useNavigate(); // useNavigate is a hook from 'react-router-dom' used for navigation

  // Define initial form values
  const initialValues = {
    referenceId: nic,
    travallerName: '',
    travallerProfile: id,
    phoneNumber: '',
    train: '',
    noOfPassenger: 0,
    emailAddress: '',
    reservationDate: '',
    isCancelled: false,
  };

  // Define a function to fetch data about trains
  const getData = () => {
    axios
      .get('https://ead-train-booking-web-service.azurewebsites.net/api/TrainManagement')
      .then((response) => {
        const fetchedData = response.data;
        setTr(fetchedData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  // Use useEffect to fetch data when the component mounts
  useEffect(() => {
    getData();
  }, []);

  // Define form validation schema using Yup
  const validationSchema = Yup.object().shape({
    travallerName: Yup.string().required('Name is required'),
    phoneNumber: Yup.string().required('Number is required'),
    noOfPassenger: Yup.number().required('Number of passengers is required'),
    reservationDate: Yup.string().required('Date is required'),
    emailAddress: Yup.string().required('Email is required'),
    train: Yup.string().required('Train is required'),
  });

  // Define form submission function
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(
        'https://ead-train-booking-web-service.azurewebsites.net/api/ReservationManagement',
        values
      );
      if (response.status === 200) {
        // Show success message using Swal (SweetAlert)
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Booking created.',
        }).then(() => {
          navigate('/dashboard/booking/add');
        });
      }
    } catch (error) {
      // Show error message using Swal (SweetAlert)
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed.',
      });
    }
    setSubmitting(false);
  };

  // Return JSX for the component
  return (
    <div
      className='d-flex justify-content-center align-items-center'
      style={{ minHeight: '100vh' }}
    >
      <Card className='shadow' style={{ width: '800px', marginTop: '40px' }}>
        <Card.Body>
          <Row>
            <Col className='fixed '>
              <div className='d-flex justify-content-center align-items-center'>
                <h3 className='topic'>Booking</h3>
              </div>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, isValid, dirty }) => (
                  <div className='d-flex justify-content-center align-items-center'>
                    <Form>
                      <div className='form-group'>
                        <Row>
                          <Col className='d-flex align-items-center'>
                            <label htmlFor='travallerName'>Name</label>
                          </Col>
                          <Col>
                            <Field
                              type='text'
                              name='travallerName'
                              id='travallerName'
                              style={{ width: '600px' }}
                              className={`form-control ${dirty && isValid ? 'is-valid' : ''}`}
                            />
                            <ErrorMessage
                              name='travallerName'
                              component='div'
                              className='text-danger'
                            />
                          </Col>
                        </Row>
                      </div>

                      <div className='form-group'>
                        <Row>
                          <Col className='d-flex align-items-center'>
                            <label htmlFor='phoneNumber'>Phone Number</label>
                          </Col>
                          <Col>
                            <Field
                              type='text'
                              name='phoneNumber'
                              id='phoneNumber'
                              style={{ width: '600px' }}
                              className={`form-control ${dirty && isValid ? 'is-valid' : ''}`}
                            />
                            <ErrorMessage
                              name='phoneNumber'
                              component='div'
                              className='text-danger'
                            />
                          </Col>
                        </Row>
                      </div>

                      <div className='form-group'>
                        <Row>
                          <Col className='d-flex align-items-center'>
                            <label htmlFor='noOfPassenger'>Passenger</label>
                          </Col>
                          <Col>
                            <Field
                              type='number'
                              name='noOfPassenger'
                              id='cnoOfPassenger'
                              style={{ width: '600px' }}
                              className={`form-control ${dirty && isValid ? 'is-valid' : ''}`}
                            />
                            <ErrorMessage
                              name='noOfPassenger'
                              component='div'
                              className='text-danger'
                            />
                          </Col>
                        </Row>
                      </div>
                      <div className='form-group'>
                        <Row>
                          <Col className='d-flex align-items-center'>
                            <label htmlFor='train'>Select a Train</label>
                          </Col>
                          <Col>
                            <Field
                              as='select'
                              name='train'
                              id='train'
                              style={{ width: '600px' }}
                              className='form-control'
                            >
                              {tr &&
                                tr.map((item) => (
                                  <option key={item.id} value={item.id}>
                                    {item.trainName}
                                  </option>
                                ))}
                            </Field>
                            <ErrorMessage name='train' component='div' className='text-danger' />
                          </Col>
                        </Row>
                      </div>
                      <div className='form-group'>
                        <Row>
                          <Col className='d-flex align-items-center'>
                            <label htmlFor='reservationDate'>Date</label>
                          </Col>
                          <Col>
                            <Field
                              type='datetime-local'
                              name='reservationDate'
                              id='reservationDate'
                              style={{ width: '600px' }}
                              className={`form-control ${dirty && isValid ? 'is-valid' : ''}`}
                            />
                            <ErrorMessage
                              name='reservationDate'
                              component='div'
                              className='text-danger'
                            />
                          </Col>
                        </Row>
                      </div>

                      <div className='form-group'>
                        <Row>
                          <Col className='d-flex align-items-center'>
                            <label htmlFor='emailAddress'>Email</label>
                          </Col>
                          <Col>
                            <Field
                              type='email'
                              name='emailAddress'
                              id='emailAddress'
                              style={{ width: '600px' }}
                              className={`form-control ${dirty && isValid ? 'is-valid' : ''}`}
                            />
                            <ErrorMessage
                              name='emailAddress'
                              component='div'
                              className='text-danger'
                            />
                          </Col>
                        </Row>
                      </div>

                      <div className='d-flex justify-content-center align-items-center mt-5'>
                        <Button type='submit' className='btn btn-gold' disabled={isSubmitting}>
                          {isSubmitting ? 'Submitting...' : 'Submit'}
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

export default CreateBooking;
