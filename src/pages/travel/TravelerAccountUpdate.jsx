// Importing necessary modules
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

// Component for updating Traveler account
const TravelerAccountUpdate = () => {
  // Getting parameters from the URL
  const { id } = useParams();

  // Initializing the navigation hook
  const navigate = useNavigate();

  // Initializing state for form values
  const [initialValues, setInitialValues] = useState();

  // Fetching initial data for the form
  useEffect(() => {
    axios
      .get('https://ssd-train-booking-web-service.azurewebsites.net/api/TravelerManagement/' + id)
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
        console.error('Error fetching data:', error);
      });
  }, []);

  // Defining form validation schema
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    phone: Yup.string().required('Phone number is required'),
  });

  // Handle form submission
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
        'https://ssd-train-booking-web-service.azurewebsites.net/api/TravelerManagement/',
        data
      );
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Account Updated.',
        }).then(() => {
          navigate('/dashboard/traveller/view-acc');
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed.',
      });
    }
    setSubmitting(false);
  };

  // JSX code for rendering the component
  return (
    <div
      className='d-flex justify-content-center align-items-center'
      style={{ minHeight: '100vh' }}
    >
      <Card className='shadow' style={{ height: '480px', width: '800px', marginTop: '40px' }}>
        <Card.Body>
          <Row>
            <Col className='fixed '>
              <div className='d-flex justify-content-center align-items-center'>
                <h3 className='topic'>Traveler Account Update</h3>
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
                      <div className='form-group'>
                        <Row>
                          <Col className='d-flex align-items-center'>
                            <label htmlFor='firstName'>First Name</label>
                          </Col>
                          <Col>
                            <Field
                              type='text'
                              name='firstName'
                              id='firstName'
                              style={{ width: '400px' }}
                              className={`form-control ${dirty && isValid ? 'is-valid' : ''}`}
                            />
                            <ErrorMessage
                              name='firstName'
                              component='div'
                              className='text-danger'
                            />
                          </Col>
                        </Row>
                      </div>
                      <div className='form-group'>
                        <Row>
                          <Col className='d-flex align-items-center'>
                            <label htmlFor='lastName'>Last Name</label>
                          </Col>
                          <Col>
                            <Field
                              type='text'
                              name='lastName'
                              id='lastName'
                              style={{ width: '400px' }}
                              className={`form-control ${dirty && isValid ? 'is-valid' : ''}`}
                            />
                            <ErrorMessage name='lastName' component='div' className='text-danger' />
                          </Col>
                        </Row>
                      </div>

                      <div className='form-group'>
                        <Row>
                          <Col className='d-flex align-items-center'>
                            <label htmlFor='phone'>Phone Number</label>
                          </Col>
                          <Col>
                            <Field
                              type='phone'
                              name='phone'
                              id='phone'
                              style={{ width: '400px' }}
                              className={`form-control ${dirty && isValid ? 'is-valid' : ''}`}
                            />
                            <ErrorMessage name='phone' component='div' className='text-danger' />
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

export default TravelerAccountUpdate;
