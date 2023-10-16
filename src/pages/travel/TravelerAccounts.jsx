// Importing necessary modules
import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import * as Yup from 'yup';

// Component for creating Traveler account
const TravelerAccountCreate = () => {
  // Initializing the navigation hook
  const navigate = useNavigate();

  // Setting initial form values
  const initialValues = {
    firstName: '',
    lastName: '',
    nic: '',
    phone: '',
    password: '',
  };

  // Defining form validation schema
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    nic: Yup.string().required('NIC is required'),
    phone: Yup.string().required('Phone number is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    let data = {
      Nic: values.nic,
      FirstName: values.firstName,
      LastName: values.lastName,
      PhoneNumber: values.phone,
      AccStatus: true,
      UserInfo: {
        Password: values.password,
        Role: 'traveler',
      },
    };

    try {
      const response = await axios.post(
        'https://ead-train-booking-web-service.azurewebsites.net/api/TravelerManagement',
        data
      );
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Account created.',
        }).then(() => {
          navigate('/dashboard/traveller');
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Something went wrong, Please try again.',
      });
    }
    setSubmitting(false);
  };

  // JSX code for rendering the component
  return (
    <div className='d-flex justify-content-center align-items-center'>
      <Card className='shadow px-5 my-5'>
        <Card.Body>
          <Row>
            <Col>
              <div className='d-flex justify-content-center align-items-center'>
                <h3 className='topic'>Traveler Account</h3>
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
                          <Col className='pe-5'>
                            <label htmlFor='firstName'>First Name</label>
                          </Col>
                          <Col className='ps-5'>
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
                          <Col>
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
                          <Col>
                            <label htmlFor='nic'>NIC</label>
                          </Col>
                          <Col>
                            <Field
                              type='text'
                              name='nic'
                              id='nic'
                              style={{ width: '400px' }}
                              className={`form-control ${dirty && isValid ? 'is-valid' : ''}`}
                              pattern='^\d{9}[Vv]|\d{12}$'
                              title='123456789V/v or 123456789012'
                            />
                            <ErrorMessage name='nic' component='div' className='text-danger' />
                          </Col>
                        </Row>
                      </div>

                      <div className='form-group'>
                        <Row>
                          <Col>
                            <label htmlFor='phone'>Phone Number</label>
                          </Col>
                          <Col>
                            <Field
                              type='phone'
                              name='phone'
                              id='phone'
                              style={{ width: '400px' }}
                              className={`form-control ${dirty && isValid ? 'is-valid' : ''}`}
                              pattern='^\d{10}$'
                              title='0123456789'
                            />
                            <ErrorMessage name='phone' component='div' className='text-danger' />
                          </Col>
                        </Row>
                      </div>

                      <div className='form-group'>
                        <Row>
                          <Col>
                            <label htmlFor='password'>Password</label>
                          </Col>
                          <Col>
                            <Field
                              type='password'
                              name='password'
                              id='password'
                              style={{ width: '400px' }}
                              className={`form-control ${dirty && isValid ? 'is-valid' : ''}`}
                            />
                            <ErrorMessage name='password' component='div' className='text-danger' />
                          </Col>
                        </Row>
                      </div>

                      <div className='d-flex justify-content-center align-items-center pt-4'>
                        <Button
                          type='submit'
                          className='btn btn-gold mb-4'
                          disabled={isSubmitting}
                          style={{ width: '600px' }}
                        >
                          {isSubmitting ? 'Submitting...' : 'Submit'}
                        </Button>
                      </div>
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

export default TravelerAccountCreate;
