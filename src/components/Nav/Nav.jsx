import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';

const Nav = () => {
  const navigate = useNavigate();
  const [toggeledNav, settoggeledNav] = useState(false);
  const [role, setRole] = useState('');

  const handleLogout = () => {
    try {
      localStorage.clear();
    } catch (e) {
      console.error(e);
    } finally {
      navigate('/');
    }
  };

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role === null || role === undefined || role === '') {
      navigate('/');
    } else {
      setRole(role);
    }
  }, []);

  return (
    <nav className={`navbar navbar-expand-md background: '#09a162' `} style={{}}>
      <div className='container'>
        <a className='navbar-brand' href='/home'>
          <img src={logo} alt='Bootstrap Logo' width='70' height='70' />
        </a>
        <Button
          variant='primary'
          className='logout-button'
          style={{ background: '#182734', border: 'none' }}
          onClick={handleLogout}
        >
          Log Out
        </Button>
      </div>
    </nav>
  );
};

export default Nav;
