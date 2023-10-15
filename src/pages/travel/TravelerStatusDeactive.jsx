import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import MainLoader from '../../components/loader/Loader';

// Component for managing deactivated traveler accounts
const TravelerAccountStatusDeactive = () => {
  // State variables for storing deactivated traveler accounts and loading state
  const [acc, setAcc] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Function to fetch deactivated traveler account data
  const getData = () => {
    axios
      .get(
        'https://ead-train-booking-web-service.azurewebsites.net/api/TravelerManagement?isActive=false'
      )
      .then((response) => {
        console.log(response.data);
        const fetchedData = response.data;
        setAcc(fetchedData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  // Fetch data on component mount
  useEffect(() => {
    getData();
  }, []);

  // Function to handle activating a traveler account
  const handleDelete = (itemId) => {
    let data = {
      AccStatus: true,
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
          text: 'Activated.',
        }).then(() => {
          navigate(`/dashboard/traveller/stats-acc`);
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
    <div className='d-flex flex-column justify-content-center align-items-center my-5'>
      <MainLoader show={loading} />
      <h2 style={{ color: 'white' }}>All Deactivated Accounts</h2>

      <Button className='btn btn-green' onClick={() => navigate(`/dashboard/traveller/stats-acc`)}>
        View Activated
      </Button>

      <Container>
        <Row className={`mt-5 mb-0 mb-md-2 mb-lg-5 px-5`}>
          {acc &&
            acc.map((item) => (
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
                              className='text-nowrap btn-danger w-100'
                              onClick={() => handleDelete(item.nic)}
                            >
                              Activate Account
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

export default TravelerAccountStatusDeactive;
