// Importing necessary modules
import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import logo from '../../assets/logo.png';
import './Register.scss';

// Registration page component
const Register = () => {
  // Initializing the navigation hook
  const navigate = useNavigate();

  // Initializing form initial values
  const initialValues = {
    firstName: '',
    lastName: '',
    nic: '',
    phone: '',
    password: '',
    role: '',
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
    role: Yup.string().required('Please select an option'),
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
        Role: values.role,
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
          text: 'Registration successful.',
        }).then(() => {
          navigate('/');
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Registration failed.',
      });
    }
    setSubmitting(false);
  };

  // JSX code for rendering the component

  return (
    <Row className='registerScreen py-5'>
      <Col className='d-flex justify-content-center align-items-center'>
        <Card className='registerCard'>
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
                <div className='py-3'>
                  <h3 className='fw-bold'>Sign Up</h3>
                </div>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting, isValid, dirty }) => (
                    <Form>
                      <div>
                        <label htmlFor='firstName'>First Name</label>
                        <Field
                          type='text'
                          name='firstName'
                          id='firstName'
                          style={{ width: '90%' }}
                          className={`form-control ${dirty && isValid ? 'is-valid' : ''}`}
                        />
                        <ErrorMessage name='firstName' component='div' className='text-danger' />
                      </div>

                      <div className='pt-2'>
                        <label htmlFor='lastName'>Last Name</label>
                        <Field
                          type='text'
                          name='lastName'
                          id='lastName'
                          style={{ width: '90%' }}
                          className={`form-control ${dirty && isValid ? 'is-valid' : ''}`}
                        />
                        <ErrorMessage name='lastName' component='div' className='text-danger' />
                      </div>

                      <div className='pt-2'>
                        <label htmlFor='nic'>NIC</label>
                        <Field
                          type='text'
                          name='nic'
                          id='nic'
                          style={{ width: '90%' }}
                          className={`form-control ${dirty && isValid ? 'is-valid' : ''}`}
                          pattern='^\d{9}[Vv]|\d{12}$'
                          title='123456789V/v or 123456789012'
                        />
                        <ErrorMessage name='nic' component='div' className='text-danger' />
                      </div>

                      <div className='pt-2'>
                        <label htmlFor='phone'>Phone Number</label>
                        <Field
                          type='phone'
                          name='phone'
                          id='phone'
                          style={{ width: '90%' }}
                          className={`form-control ${dirty && isValid ? 'is-valid' : ''}`}
                          pattern='^\d{10}$'
                          title='0123456789'
                        />
                        <ErrorMessage name='phone' component='div' className='text-danger' />
                      </div>

                      <div className='pt-2'>
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
                      <div className='pt-2'>
                        <label htmlFor='role'>Select an Option</label>
                        <Field
                          as='select'
                          name='role'
                          id='role'
                          style={{ width: '90%' }}
                          className='form-control'
                        >
                          <option value='' label='Select an option' disabled selected />
                          <option value='officer' label='Back Office User' />
                          <option value='guide' label='Travel Agent' />
                        </Field>
                        <ErrorMessage name='role' component='div' className='text-danger' />
                      </div>
                      <div className='d-flex justify-content-center align-items-center pt-4'>
                        <Button type='submit' className='btnSubmit' disabled={isSubmitting}>
                          {isSubmitting ? 'Submitting...' : 'Submit'}
                        </Button>
                      </div>
                      <p className='pt-2'>
                        Already Registered?{' '}
                        <Link to='/' style={{ color: '#09a162' }}>
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
      </Col>
    </Row>
  );
};

export default Register;
