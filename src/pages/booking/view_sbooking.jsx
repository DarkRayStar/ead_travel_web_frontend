import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import MainLoader from '../../components/loader/Loader';

const BViews = () => {
  const { id } = useParams();
  const [tr, setTr] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const getData = () => {
    axios
      .get('http://localhost:44334/api/Reservation/' + id)
      .then((response) => {
        const fetchedData = response.data;
        const filteredData = fetchedData.filter((item) => !item.isCancelled);
        setTr(filteredData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };
  useEffect(() => {
    localStorage.removeItem('trav');
    getData();
  }, []);

  const handleDelete = (itemId) => {
    let data = {
      isCancelled: true,
    };
    axios
      .put(`http://localhost:44334/api/Reservation/${itemId}`, data)
      .then((response) => {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Booking Deleted.',
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

  const handleUpdate = (item) => {
    try {
      const arrayString = JSON.stringify(item);
      localStorage.setItem('trav', arrayString);
    } catch (e) {
    } finally {
      navigate('/bup');
    }
  };
  return (
    <div className='d-flex flex-column justify-content-center align-items-center my-5'>
      <MainLoader show={loading} />
      <h2 style={{ color: 'white' }}>All Active Bookings of User</h2>

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
                          <Col>Date</Col>
                          <Col className='col-1'>:</Col>
                          <Col>{moment(item.reservationDate).format('MMM Do YY')}</Col>
                        </Row>
                        <Row>
                          <Col>Passengers</Col>
                          <Col className='col-1'>:</Col>
                          <Col>{item.noOfPassenger}</Col>
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

    // <div
    //   style={{ marginTop: "150px" }}
    //   className="d-flex flex-column justify-content-center align-items-center"
    // >
    //   <h3>All Active Bookings of User</h3>
    //   <br />
    //   {tr &&
    //     tr.map((item) => (
    //       <Card
    //         className="shadow"
    //         style={{ height: "430px", width: "500px", marginBottom: "100px" }}
    //         key={item.id}
    //       >
    //         <Card.Body>
    //           <div
    //             className="d-flex flex-column justify-content-center align-items-center"
    //             style={{ marginTop: "5px" }}
    //           >
    //             <h5>Ref ID: {item.referenceId}</h5>
    //             <br />
    //             <h5>Name: {item.travallerName}</h5>
    //             <br />
    //             <h5>Date: {item.reservationDate}</h5>
    //             <br />
    //             <h5>Passengers: {item.noOfPassenger}</h5>
    //             <br />
    //             <Button
    //               className="btn btn-blue"
    //               onClick={() => handleUpdate(item)}
    //             >
    //               Update
    //             </Button>
    //             <br />
    //             <Button
    //               className="btn btn-red"
    //               onClick={() => handleDelete(item.id)}
    //             >
    //               Delete
    //             </Button>
    //           </div>
    //         </Card.Body>
    //       </Card>
    //     ))}
    //   <div style={{ marginBottom: "600px" }}></div>
    // </div>
  );
};

export default BViews;
