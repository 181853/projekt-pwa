import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants";

const Header = () => {
  return (
    <header>
      <Navbar className="bg-white mb-5" expand="sm">
        <Navbar.Brand as={Link} to={ROUTES.HOME}>
          Projekt PWA
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Button variant="outline-secondary mr-2" as={Link} to={ROUTES.LOGIN}>
            Logowanie
          </Button>
          <Button variant="outline-info" as={Link} to={ROUTES.REGISTRATION}>
            Rejestracja
          </Button>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
