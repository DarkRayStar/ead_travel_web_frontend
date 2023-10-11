import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';

const Bookinghome = () => {
  const navigate = useNavigate();

  return (
    <div
      className='d-flex justify-content-center align-items-center'
      style={{ minHeight: '100vh' }}
    >
      <Card
        className='shadow'
        style={{
          height: '480px',
          width: '800px',
          background: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.125)',
          borderRadius: '10px',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          WebkitBackdropFilter: 'blur(4px)',
        }}
      >
        <Card.Body>
          <Row>
            <Col className='fixed '>
              <div className='d-flex justify-content-center align-items-center'>
                <h3 className='topic fw-bold mt-5 mb-1'>Booking Management</h3>
              </div>

              <div
                className='d-flex justify-content-center align-items-center'
                style={{ marginTop: '40px' }}
              >
                {/* <Button
                  className="btn btn-blue"
                  onClick={() => navigate("/buse")}
                >
                  Add Booking
                </Button>
                <br />
                <Button
                  className="btn btn-green"
                  onClick={() => navigate("/bview")}
                >
                  View All Bookings
                </Button> */}
                <div
                  className='squareBtn d-flex justify-content-center align-items-center'
                  onClick={() => navigate('/dashboard/booking/add')}
                >
                  <p> Add Booking</p>
                </div>
                <div
                  className='squareBtn d-flex justify-content-center align-items-center'
                  onClick={() => navigate('/dashboard/booking/view')}
                >
                  <p>View All Bookings </p>
                </div>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Bookinghome;
