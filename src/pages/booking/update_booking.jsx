import axios from 'axios';
import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import * as Yup from 'yup';

// Update Booking page
const BookingUpdate = () => {
  // Define state variables using useState
  const [tr, setTr] = useState([]); // tr is used to store train data
  const navigate = useNavigate(); // useNavigate is a hook from 'react-router-dom' used for navigation
  const [initialValues, setInitialValues] = useState(); // Used to store initial form values

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

  // Use useEffect to fetch data and set initial values when the component mounts
  useEffect(() => {
    getData();
    const dt = JSON.parse(localStorage.getItem('trav')); // Retrieve data from localStorage
    setInitialValues(dt); // Set initial form values
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
          text: 'Booking Updated.',
        }).then(() => {
          navigate('/bhome');
        });
      }
    } catch (error) {
      // Show error message using Swal (SweetAlert)
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Booking Already Completed.',
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
                <h3 className='topic'>Update Booking</h3>
              </div>
              <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, isValid, dirty }) => (
                  <div className='d-flex justify-content-center align-items-center'>
                    <Form>
                      {/* Form Fields */}
                      {/* ... */}
                      {/* Submit Button */}
                      <div className='d-flex justify-content-center align-items-center'>
                        <Button type='submit' className='btn btn-gold mt-4' disabled={isSubmitting}>
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

export default BookingUpdate;
