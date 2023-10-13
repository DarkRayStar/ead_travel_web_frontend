// Importing necessary modules
import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';

// Navigation component for Train schedules
const ScheduleHome = () => {
  // Initialize navigation hook
  const navigate = useNavigate();

  // JSX code for rendering the component
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
                <h3 className='topic fw-bold mt-5 mb-1'>Train Schedules Management</h3>
              </div>

              <div
                className='d-flex justify-content-center align-items-center'
                style={{ marginTop: '40px' }}
              >
                <div
                  className='squareBtn d-flex justify-content-center align-items-center'
                  onClick={() => navigate('/dashboard/scheduling/add')}
                >
                  <p>Create Schedules</p>
                </div>
                <div
                  className='squareBtn d-flex justify-content-center align-items-center'
                  onClick={() => navigate('/dashboard/scheduling/view')}
                >
                  <p>View All </p>
                </div>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ScheduleHome;
