import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';
import './traveler_home.scss';

const Travellerhome = () => {
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('role');
    setRole(role);
  }, []);

  return (
    <div
      className='d-flex justify-content-center align-items-center'
      style={{ minHeight: '100vh' }}
    >
      <Card
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
                <h3 className='topic fw-bold mt-5 mb-1'> Account Management</h3>
              </div>

              <div
                className='d-flex justify-content-center align-items-center'
                style={{ marginTop: '50px' }}
              >
                {/* <Button
                  className="btn btn-blue"
                  onClick={() => navigate("/tacc")}
                >
                  Create Account
                </Button>
                <Button
                  className="btn btn-green"
                  onClick={() => navigate("/tview")}
                >
                  View All
                </Button> */}
                <div
                  className='squareBtn d-flex justify-content-center align-items-center'
                  onClick={() => navigate('/dashboard/traveller/create-acc')}
                >
                  <p>Create Account</p>
                </div>
                <div
                  className='squareBtn d-flex justify-content-center align-items-center'
                  onClick={() => navigate('/dashboard/traveller/view-acc')}
                >
                  <p>View All </p>
                </div>
                {role == 'officer' ? (
                  <div
                    className='squareBtn d-flex justify-content-center align-items-center'
                    onClick={() => navigate('/dashboard/traveller/stats-acc')}
                  >
                    <p>Account Status </p>
                  </div>
                ) : (
                  ''
                )}
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Travellerhome;
