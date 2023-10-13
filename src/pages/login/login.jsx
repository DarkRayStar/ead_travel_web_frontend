// Importing necessary modules and components
import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import logo from '../../assets/logo.png';
import MainLoader from '../../components/loader/Loader';
import './login.scss'; // Assuming this is the style file for the login component

// Login page component
const Login = () => {
  // Initializing the navigate function
  const navigate = useNavigate();
  // Initializing loading state and setLoading function
  const [loading, setLoading] = useState(false);
  // Initializing initial form values
  const initialValues = {
    nic: '',
    password: '',
  };

  // Defining the validation schema using Yup
  const validationSchema = Yup.object().shape({
    nic: Yup.string().required('NIC is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  // Function to handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    // Setting loading state to true
    setLoading(true);
    let data = {
      Nic: values.nic,
      Password: values.password,
    };

    try {
      // Making a POST request
      const res = await axios.post(
        'https://ssd-train-booking-web-service.azurewebsites.net/UserManagement',
        data
      );
      // Storing data in local storage
      localStorage.setItem('nic', res.data.nic);
      localStorage.setItem('role', res.data.role);

      // Displaying success alert
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Login successful.',
      });

      // Navigating to the home page
      navigate('/home');
    } catch (error) {
      // Displaying error alert
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Login failed.',
      });
    }

    // Resetting submitting state and setting loading state to false
    setSubmitting(false);
    setLoading(false);
  };

  // Rendering the login form
  return (
    <Row className='loginScreen'>
      <MainLoader show={loading} />
      <Col className='d-flex justify-content-center align-items-center'>
        <Card className='loginCard'>
          <Card.Body className='p-0'>
            <Row>
              <Col className='col-5 firstColumn d-flex justify-content-center align-items-center'>
                <img
                  src={logo}
                  alt='Logo'
                  className={`d-block mx-auto mb-3 mt-2 logoImgLogin cursor-pointer`}
                />
              </Col>
              <Col className='col-7 d-flex justify-content-center flex-column ps-5'>
                <div className='pb-3 pt-1'>
                  <h3 className='fw-bold'>Sign In</h3>
                </div>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting, isValid, dirty }) => (
                    <Form>
                      <div>
                        <label htmlFor='nic'>NIC</label>
                        <Field
                          type='text'
                          name='nic'
                          id='nic'
                          style={{ width: '90%' }}
                          className={`form-control ${dirty && isValid ? 'is-valid' : ''}`}
                        />
                        <ErrorMessage name='nic' component='div' className='text-danger' />
                      </div>

                      <div className='pt-3'>
                        <label htmlFor='password'>Password</label>
                        <Field
                          type='password'
                          name='password'
                          id='password'
                          style={{ width: '90%' }}
                          className={`form-control ${dirty && isValid ? 'is-valid' : ''}`}
                        />
                        <ErrorMessage name='password' component='div' className='text-danger' />
                      </div>
                      <div className='d-flex justify-content-center align-items-center pt-4'>
                        <Button type='submit' className='btnSubmit' disabled={isSubmitting}>
                          {isSubmitting ? 'Submitting...' : 'Submit'}
                        </Button>
                      </div>
                      <p className='mt-4'>
                        Not Registered Yet?{' '}
                        <Link to='/reg' style={{ color: '#09a162' }}>
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
