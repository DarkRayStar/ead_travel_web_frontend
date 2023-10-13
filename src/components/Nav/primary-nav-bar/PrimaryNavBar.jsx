import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../../../assets/logo.png';
import './PrimaryNavBar.scss';

const PrimaryNavBar = () => {
  // Initializing hooks
  const navigate = useNavigate();
  const location = useLocation();

  // State variables for user role and active link
  const [role, setRole] = useState('');
  const [active, setActive] = useState('');

  // Check if user is logged in, otherwise redirect to home
  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role === null || role === undefined || role === '') {
      navigate('/');
    } else {
      setRole(role);
    }
  }, []);

  // Set active link based on current URL path
  useEffect(() => {
    if (location.pathname === '/dashboard/traveller') {
      setActive('travellers');
    } else if (location.pathname === '/dashboard/booking') {
      setActive('bookings');
    } else if (location.pathname === '/dashboard/scheduling') {
      setActive('schedules');
    }
  }, [location.pathname]);

  // Handle logout action
  const handleLogout = () => {
    try {
      localStorage.clear();
    } catch (e) {
      console.error(e);
    } finally {
      navigate('/');
    }
  };

  // JSX structure for the component
  return (
    <div className={`vh-100 d-flex flex-column justify-content-between py-4 primaryNavBar`}>
      <div>
        <div>
          <a href='/home'>
            <img
              src={logo}
              alt='Logo'
              className={`d-block mx-auto mb-3 mt-2 logoImg cursor-pointer`}
            />
          </a>
        </div>
        <div className='pt-5 ps-4'>
          <h2
            className={`pb-1 subNavLink ${active == 'travellers' ? 'activeLink' : 'deactiveLink'}`}
            onClick={() => {
              navigate('/dashboard/traveller');
            }}
          >
            Travelers
          </h2>
          <hr className='linkDivider' />
          <h2
            className={`pb-1 subNavLink ${active == 'bookings' ? 'activeLink' : 'deactiveLink'}`}
            onClick={() => {
              navigate('/dashboard/booking');
            }}
          >
            Bookings
          </h2>

          {role == 'officer' ? (
            <>
              <hr className='linkDivider' />
              <h2
                className={`pb-1 subNavLink ${
                  active == 'schedules' ? 'activeLink' : 'deactiveLink'
                }`}
                onClick={() => {
                  navigate('/dashboard/scheduling');
                }}
              >
                Schedules
              </h2>
            </>
          ) : (
            ''
          )}
        </div>
        <div className=' ps-4 logoutSection d-flex flex-column justify-content-end'>
          <p className='logoutBtn' onClick={handleLogout}>
            Logout
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrimaryNavBar;
