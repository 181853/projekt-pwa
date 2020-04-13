import React, { useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { Link, useHistory } from "react-router-dom";
import { ROUTES } from "../../constants";
import { useAuth } from "../../hooks";
import { FirebaseContext } from "../../context";

const Header = () => {
  const history = useHistory();
  const { user } = useAuth();
  const { signOut } = useContext(FirebaseContext);

  return (
    <header>
      <Navbar className="bg-white mb-5" expand="sm">
        <Navbar.Brand as={Link} to={ROUTES.HOME}>
          Projekt PWA
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          {user ? (
            <>
              <Button
                as={Link}
                to={ROUTES.POST_NEW}
                variant="outline-info"
                className="mt-2 mt-sm-0 mr-2"
              >
                Dodaj ogłoszenie
              </Button>

              <Button
                as={Button}
                onClick={() => {
                  history.push(ROUTES.HOME);
                  signOut();
                }}
              >
                Wyloguj
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline-secondary mr-2"
                as={Link}
                to={ROUTES.LOGIN}
              >
                Logowanie
              </Button>
              <Button variant="outline-info" as={Link} to={ROUTES.REGISTRATION}>
                Rejestracja
              </Button>
            </>
          )}
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
