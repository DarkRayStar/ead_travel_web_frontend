import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import MainLoader from '../../components/loader/Loader';

// Component for managing traveler account status
const TravelerAccountStatus = () => {
  // State variables for storing traveler accounts and loading state
  const [acc, setAcc] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Function to fetch traveler account data
  const getData = async () => {
    setLoading(true);
    await axios
      .get(
        'https://ead-train-booking-web-service.azurewebsites.net/api/TravelerManagement?isActive=true'
      )
      .then((response) => {
        const fetchedData = response.data;
        setAcc(fetchedData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
    setLoading(false);
  };

  // Fetch data on component mount
  useEffect(() => {
    getData();
  }, []);

  // Function to handle deactivating a traveler account
  const handleDelete = (itemId) => {
    let data = {
      AccStatus: false,
    };
    axios
      .put(
        `https://ead-train-booking-web-service.azurewebsites.net/api/TravelerManagement/${itemId}`,
        data
      )
      .then((response) => {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Deactivated.',
        }).then(() => {
          getData();
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed.',
        });
      });
  };

  return (
    <div className='d-flex flex-column justify-content-center align-items-center my-5 mx-5'>
      <MainLoader show={loading} />
      <h2 style={{ color: 'white' }}>All Activated Accounts</h2>

      <Button
        className='btn btn-green mt-3'
        onClick={() => navigate(`/dashboard/traveller/stats-acc-deactive`)}
      >
        View Deactivated
      </Button>

      <Container>
        <Row className={`mt-5 mb-0 mb-md-2 mb-lg-5`}>
          {acc &&
            acc
              .filter((item) => item.userInfo && item.userInfo.role === 'traveler')
              .map((item) => (
                <Col xl={3} lg={4} md={6} sm={12} className='mb-4'>
                  <Card className='shadow p-2' key={item.id}>
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
                                className='btn btn-danger w-100'
                                onClick={() => handleDelete(item.nic)}
                              >
                                Deactivate
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

export default TravelerAccountStatus;
