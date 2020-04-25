import React, { useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import { Link, useHistory } from "react-router-dom";
import { ROUTES } from "../../constants";
import { useAuth } from "../../hooks";
import { FirebaseContext } from "../../context";
import Avatar from "../../components/avatar";

const Header = () => {
  const history = useHistory();
  const { user } = useAuth();
  const { signOut } = useContext(FirebaseContext);

  return (
    <header>
      <Navbar className="bg-white shadow" expand="sm">
        <Navbar.Brand as={Link} to={ROUTES.HOME}>
          <img
            src={process.env.PUBLIC_URL + "/logo.png"}
            alt="//FIXME logo"
            width={30}
            height={30}
            className="d-inline-block align-top"
          />
          {"// FIXME"}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          {user ? (
            <Nav>
              <Button
                as={Link}
                to={ROUTES.POST_NEW}
                variant="outline-info"
                className="mt-2 mt-sm-0 mr-sm-2"
              >
                Dodaj ogłoszenie
              </Button>

              <NavDropdown
                alignRight
                title={<Avatar user={user} />}
                id="basic-nav-dropdown"
                className="text-muted mt-2 mt-sm-0"
              >
                <NavDropdown.Item disabled>
                  {user.displayName || user.email}
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  as={Button}
                  onClick={() => {
                    signOut().then(() => history.push(ROUTES.HOME));
                  }}
                >
                  Wyloguj
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : (
            <Nav>
              <Button
                className="mt-2 mt-sm-0 mr-sm-2"
                variant="outline-secondary"
                as={Link}
                to={ROUTES.LOGIN}
              >
                Logowanie
              </Button>
              <Button
                className="mt-2 mt-sm-0 mr-sm-2"
                variant="outline-info"
                as={Link}
                to={ROUTES.REGISTRATION}
              >
                Rejestracja
              </Button>
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
