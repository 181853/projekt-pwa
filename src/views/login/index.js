import React, { createRef, useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FirebaseContext } from "../../context";
import { ERRORS, ROUTES } from "../../constants";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

const LogIn = ({ history }) => {
  const { signInWithEmailAndPassword } = useContext(FirebaseContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const emailInput = createRef();
  const passwordInput = createRef();

  const onSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    signInWithEmailAndPassword(
      emailInput.current.value,
      passwordInput.current.value
    )
      .then(() => {
        setIsLoading(false);
        history.push(ROUTES.HOME);
      })
      .catch((error) => {
        setIsLoading(false);

        if (ERRORS[error.code]) {
          setError(ERRORS[error.code]);
        } else {
          setError(error.code);
        }
      });
  };

  return (
    <Row className="justify-content-md-center">
      <Col xs md={6}>
        <Card className="mb-4 shadow-sm card-signin">
          <Card.Body>
            <Card.Title className="text-center mb-3">Zaloguj się</Card.Title>

            <Form onSubmit={onSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  ref={emailInput}
                  type="email"
                  autoComplete="username"
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Hasło</Form.Label>
                <Form.Control ref={passwordInput} type="password" />
              </Form.Group>

              {error && <Alert variant="danger">{error}</Alert>}

              <div className="text-right">
                <Button disabled={isLoading} type="submit">
                  Zaloguj się
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default LogIn;
