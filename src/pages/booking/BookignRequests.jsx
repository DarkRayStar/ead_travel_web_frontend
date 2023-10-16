import axios from 'axios';
import { default as React, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import MainLoader from '../../components/loader/Loader';

// VIEW Travelers
const BookingRequests = () => {
  // Define state variables using useState
  const [acc, setAcc] = useState([]); // acc is used to store traveler data
  const navigate = useNavigate(); // useNavigate is a hook from 'react-router-dom' used for navigation
  const [loading, setLoading] = useState(false); // loading is used to manage loading state

  // Define a function to fetch data from the API
  const getData = async () => {
    setLoading(true);
    await axios
      .get(
        'https://ead-train-booking-web-service.azurewebsites.net/api/TravelerManagement?isActive=true'
      )
      .then((response) => {
        const fetchedData = response.data; // Store fetched data in a variable
        setAcc(fetchedData); // Update acc state with fetched data
      })
      .catch((error) => {
        console.error('Error fetching data:', error); // Log an error if data fetching fails
      });
    setLoading(false);
  };

  // useEffect hook is used to perform side effects in functional components
  // In this case, it fetches data when the component mounts
  useEffect(() => {
    getData(); // Call getData function
  }, []); // Empty array means it only runs once when the component mounts

  // Return JSX for the component
  return (
    <div className='d-flex flex-column justify-content-center align-items-center my-5'>
      <MainLoader show={loading} /> {/* Display a loader based on loading state */}
      <h2 style={{ color: 'white' }}>Travelers</h2>
      <Container>
        <Row className={`mt-5 mb-0 mb-md-2 mb-lg-5 px-5`}>
          {acc &&
            acc
              .filter((item) => item.userInfo && item.userInfo.role === 'traveler')
              .map((item) => (
                <Col xl={3} lg={4} md={6} sm={12} className='mb-4' key={item.id}>
                  <Card className='shadow'>
                    <Card.Body>
                      <Row>
                        <Col>
                          <Row>
                            <Col>First Name</Col>
                            <Col className='col-1'>:</Col>
                            <Col>{item.firstName}</Col>
                          </Row>
                          <Row>
                            <Col>Last Name</Col>
                            <Col className='col-1'>:</Col>
                            <Col>{item.lastName}</Col>
                          </Row>
                          <Row>
                            <Col>NIC:</Col>
                            <Col className='col-1'>:</Col>
                            <Col>{item.nic}</Col>
                          </Row>
                          <Row className='pt-2'>
                            <Col>
                              <Button
                                className='text-nowrap w-100 mb-2'
                                onClick={() =>
                                  navigate(`/dashboard/booking/${item.id}/${item.nic}`)
                                }
                              >
                                Create Booking
                              </Button>
                            </Col>
                            <Col>
                              <Button
                                className='text-nowrap btn-danger w-100'
                                onClick={() => navigate(`/dashboard/booking/user/${item.nic}`)}
                              >
                                View Bookings
                              </Button>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
        </Row>
      </Container>
    </div>
  );
};

export default BookingRequests;
