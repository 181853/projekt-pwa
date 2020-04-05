import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Header from "../header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />

      <Container as="main">{children}</Container>

      <footer className="footer py-4 mt-5 bg-white">
        <Container>
          <Row className="align-items-center justify-content-center">
            <div className="col-md-4 text-center">
              <span className="copyright">
                Copyright © {new Date().getFullYear()}
              </span>
            </div>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Layout;
