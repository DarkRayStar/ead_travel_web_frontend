// Importing necessary modules
import axios from 'axios';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import MainLoader from '../../components/loader/Loader';

// VIEW Trains component
const AllSchedules = () => {
  // Initialize state variables
  const [tr, setTr] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Fetch data from API
  const getData = () => {
    // Make a GET request to fetch train data
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

  // Component Lifecycle Hook: Runs on component mount
  useEffect(() => {
    // Clear any previous selected train from local storage
    localStorage.removeItem('train');

    // Fetch data from the API
    getData();
  }, []);

  // Handle train deletion
  const handleDelete = (itemId) => {
    console.log(itemId);
    axios
      .delete(
        `https://ead-train-booking-web-service.azurewebsites.net/api/TravelerManagement/${itemId}`
      )
      .then((response) => {
        // Show success message using Swal
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Train Deleted.',
        }).then(() => {
          // Refresh data after deletion
          getData();
        });
      })
      .catch((error) => {
        // Show error message using Swal in case of deletion failure
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed.',
        });
      });
  };

  // Handle train update
  const handleUpdate = (item) => {
    try {
      const arrayString = JSON.stringify(item);

      // Store selected train data in local storage
      localStorage.setItem('train', arrayString);
    } catch (e) {
    } finally {
      // Redirect to update scheduling page
      navigate('/dashboard/scheduling/update');
    }
  };

  // JSX code for rendering the component
  return (
    <div className='d-flex flex-column justify-content-center align-items-center my-5'>
      <MainLoader show={loading} />
      <h2 style={{ color: 'white' }}>All Active Trains</h2>

      <Container>
        <Row className={`mt-5 mb-0 mb-md-2 mb-lg-5 px-5`}>
          {tr &&
            tr.map((item) => (
              <Col xl={4} lg={4} md={4} sm={12} className='mb-4'>
                <Card className='shadow p-2' key={item.id}>
                  <Card.Body>
                    <Row>
                      <Col>
                        <Row>
                          <Col className='col-4'>Train Name</Col>
                          <Col className='col-1'>:</Col>
                          <Col>{item.trainName}</Col>
                        </Row>
                        <Row>
                          <Col className='col-4 text-nowrap'>Compartment</Col>
                          <Col className='col-1'>:</Col>
                          <Col>{item.numberOfComponents}</Col>
                        </Row>
                        <Row>
                          <Col className='col-4'>Start</Col>
                          <Col className='col-1'>:</Col>
                          <Col>{item.scheduleList[0].startStationName}</Col>
                        </Row>
                        <Row>
                          <Col className='col-4'>End</Col>
                          <Col className='col-1'>:</Col>
                          <Col>{item.scheduleList[0].endStationName}</Col>
                        </Row>
                        <Row>
                          <Col className='col-4'>Time</Col>
                          <Col className='col-1'>:</Col>
                          <Col>{moment(item.scheduleList[0].starttime).format('LT')}</Col>
                        </Row>
                        <Row className='pt-2'>
                          <Col>
                            <Button
                              className='text-nowrap w-100'
                              onClick={() => handleUpdate(item)}
                            >
                              Update
                            </Button>
                          </Col>
                          <Col>
                            <Button
                              className='text-nowrap btn-danger w-100'
                              onClick={() => handleDelete(item.id)}
                            >
                              Delete
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

export default AllSchedules;
