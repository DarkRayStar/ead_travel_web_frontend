import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import MainLoader from '../../components/loader/Loader';

// VIEW All booking
const AllBookings = () => {
  // Define state variables using useState
  const [tr, setTr] = useState([]); // tr is used to store booking data
  const navigate = useNavigate(); // useNavigate is a hook from 'react-router-dom' used for navigation
  const [loading, setLoading] = useState(false); // loading is used to manage loading state

  // Define a function to fetch data from the API
  const getData = () => {
    axios
      .get('https://ssd-train-booking-web-service.azurewebsites.net/api/ReservationManagement')
      .then((response) => {
        const fetchedData = response.data; // Store fetched data in a variable
        setTr(fetchedData); // Update tr state with fetched data
      })
      .catch((error) => {
        console.error('Error fetching data:', error); // Log an error if data fetching fails
      });
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
      <h2 style={{ color: 'white' }}>All Active Bookings</h2>
      <Container>
        <Row className={`mt-5 mb-0 mb-md-2 mb-lg-5 px-5`}>
          {tr &&
            tr.map((item) => (
              <Col xl={4} lg={4} md={4} sm={12} className='mb-4' key={item.id}>
                <Card className='shadow p-2'>
                  <Card.Body>
                    <Row>
                      <Col>
                        <Row>
                          <Col>NIC</Col>
                          <Col className='col-1'>:</Col>
                          <Col>{item.referenceId}</Col>
                        </Row>
                        <Row>
                          <Col>Name</Col>
                          <Col className='col-1'>:</Col>
                          <Col>{item.travallerName}</Col>
                        </Row>
                        <Row>
                          <Col>Reservation Date</Col>
                          <Col className='col-1'>:</Col>
                          <Col>{moment(item.reservationDate).format('MMM Do YY')}</Col>
                        </Row>
                        <Row>
                          <Col>Passengers</Col>
                          <Col className='col-1'>:</Col>
                          <Col>{item.noOfPassenger}</Col>
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

export default AllBookings;
