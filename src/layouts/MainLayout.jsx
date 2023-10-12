import React from 'react';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';

const MainLayout = ({ component }) => {
  return (
    <div>
      <Header />
      {component}
      <Footer />
    </div>
  );
};

export default MainLayout;
