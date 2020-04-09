import React, {createRef, useContext} from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FirebaseContext } from "../../context";
import { ROUTES } from "../../constants";
import Form from "react-bootstrap/Form";

const Registration = ({ history }) => {
  const { createUserWithEmailAndPassword } = useContext(FirebaseContext);
  const emailInput = createRef();
  const passwordInput = createRef();

  const onSubmit = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(emailInput.current.value, passwordInput.current.value)
      .then(() => {
        history.push(ROUTES.HOME);
      })
  };

  return (
    <Row className="justify-content-md-center">
      <Col xs md={6}>
        <Card className="mb-4 shadow-sm">
          <Card.Body>
            <Card.Title className="text-center mb-3">
              Zarejestruj się
            </Card.Title>
            <Form onSubmit={onSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control ref={emailInput} type="email" />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Hasło</Form.Label>
                <Form.Control ref={passwordInput} type="password" />
              </Form.Group>

              <div className="text-right">
                <Button variant="primary" type="submit">
                  Zarejestruj się
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Registration;
