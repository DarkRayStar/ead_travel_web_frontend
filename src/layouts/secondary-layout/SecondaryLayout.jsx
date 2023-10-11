import React from "react";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import PrimaryNavBar from "../../components/Nav/primary-nav-bar/PrimaryNavBar";
import "./SecondaryLayout.scss";

const SecondaryLayout = () => {
  return (
    <Container fluid className={`main-layout px-0 overflow-hidden`}>
      <nav className="main-layout__nav d-none d-md-flex">
        <PrimaryNavBar />
      </nav>
      <section className="main-layout__body">
        <Outlet />
      </section>
    </Container>
  );
};

export default SecondaryLayout;
