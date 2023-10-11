import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import MainLoader from '../../components/loader/Loader';

//VIEW Travelers
const Busers = () => {
  const [acc, setAcc] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const getData = () => {
    axios
      .get('http://localhost:44334/api/TravelerProfile?isActive=true')
      .then((response) => {
        const fetchedData = response.data;
        setAcc(fetchedData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className='d-flex flex-column justify-content-center align-items-center my-5'>
      <MainLoader show={loading} />
      <h2 style={{ color: 'white' }}>Travelers</h2>

      <Container>
        <Row className={`mt-5 mb-0 mb-md-2 mb-lg-5 px-5`}>
          {acc &&
            acc.map((item) => (
              <Col xl={3} lg={4} md={6} sm={12} className='mb-4'>
                <Card className='shadow' key={item.id}>
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
                              onClick={() => navigate(`/badd/${item.id}/${item.nic}`)}
                            >
                              Create Booking
                            </Button>
                          </Col>
                          <Col>
                            <Button
                              className='text-nowrap btn-danger w-100'
                              onClick={() => navigate(`/bviews/${item.nic}`)}
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

export default Busers;
