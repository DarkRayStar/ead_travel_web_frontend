import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';

//Navigation for Train schedules
const ScheduleHome = () => {
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
          backdropFilter: 'blur(10px)',
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
                {/* <Button
                  className="btn btn-blue"
                  onClick={() => navigate("/tradd")}
                >
                  Create Schedules
                </Button>
                <br />
                <Button
                  className="btn btn-green"
                  onClick={() => navigate("/trview")}
                >
                  View All
                </Button> */}
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
