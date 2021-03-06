import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Header from "../header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />

      <main>{children}</main>

      <footer className="footer py-4 mt-2 bg-white">
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
