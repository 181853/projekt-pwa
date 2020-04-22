import React, { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import { Formik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";
import { FirebaseContext } from "../../context";
import { ERRORS, ROUTES } from "../../constants";
import { useHistory, Link } from "react-router-dom";
import { useAuth } from "../../hooks";

const AuthForm = ({ isLoginForm }) => {
  const {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithGoogle,
    signInWithGithub,
    createUser,
  } = useContext(FirebaseContext);
  const history = useHistory();
  const { user } = useAuth();
  const [submitError, setSubmitError] = useState("");

  const authForm = async (cb, setIsLoading) => {
    setIsLoading(true);

    try {
      const data = await cb;
      const { uid, displayName, email, photoURL } = data.user;

      if (data.additionalUserInfo.isNewUser) {
        await createUser(uid, {
          displayName,
          email,
          photoURL,
        });
      }
      setIsLoading(false);
      history.push(ROUTES.HOME);
    } catch (err) {
      setIsLoading(false);

      if (ERRORS[err.code]) {
        setSubmitError(ERRORS[err.code]);
      } else {
        setSubmitError(err.code);
      }
    }
  };

  if (user) {
    return (
      <Alert variant="info">
        {`Już jesteś ${
          isLoginForm ? "zalogowany" : "zarejestrowany"
        }. Przejdź do `}
        <Link to={ROUTES.HOME}>strony głównej.</Link>
      </Alert>
    );
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col xs md={6}>
          <Formik
            onSubmit={async (values, { setSubmitting }) => {
              await authForm(
                (isLoginForm
                  ? signInWithEmailAndPassword
                  : createUserWithEmailAndPassword)(
                  values.email,
                  values.password
                ),
                setSubmitting
              );
            }}
            initialValues={{
              email: "",
              password: "",
            }}
            validate={(values) => {
              const errors = {};

              if (!values.email) {
                errors.email = "Email wymagany";
              }
              if (
                values.email &&
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Nieprawidłowy adres email";
              }
              if (!values.password) {
                errors.password = "Hasło wymagane";
              }

              return errors;
            }}
          >
            {({
              handleSubmit,
              handleBlur,
              handleChange,
              values,
              touched,
              errors,
              isSubmitting,
              setSubmitting,
            }) => (
              <Card className="shadow">
                <Card.Body>
                  <Card.Title className="text-center mb-3">
                    {isLoginForm ? "Zaloguj się" : "Zarejestruj się"}
                  </Card.Title>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        autoComplete="username"
                        value={values.email}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        isInvalid={
                          (touched.email && !!errors.email) || submitError
                        }
                        isValid={touched.email && !errors.email}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                      <Form.Control.Feedback type="valid" />
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                      <Form.Label>Hasło</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        autoComplete={`${
                          isLoginForm ? "current" : "new"
                        }-password`}
                        onBlur={handleBlur}
                        value={values.password}
                        onChange={handleChange}
                        isInvalid={
                          (touched.password && !!errors.password) || submitError
                        }
                        isValid={touched.password && !errors.password}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    </Form.Group>

                    {submitError && (
                      <Alert variant="danger">{submitError}</Alert>
                    )}

                    <div className="text-right">
                      <Button
                        disabled={isSubmitting}
                        type="submit"
                        variant="info"
                      >
                        {isLoginForm ? "Zaloguj się" : "Zarejestruj się"}
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
                {isLoginForm && (
                  <Card.Footer className="bg-white">
                    <Row>
                      <Col>
                        <Button
                          disabled={isSubmitting}
                          variant="outline-danger"
                          block
                          onClick={async () =>
                            await authForm(signInWithGoogle(), setSubmitting)
                          }
                        >
                          <FontAwesomeIcon icon={faGoogle} className="mr-2" />
                          Google
                        </Button>
                      </Col>
                      <Col>
                        <Button
                          disabled={isSubmitting}
                          variant="outline-dark"
                          block
                          onClick={async () =>
                            await authForm(signInWithGithub(), setSubmitting)
                          }
                        >
                          <FontAwesomeIcon icon={faGithub} className="mr-2" />
                          Github
                        </Button>
                      </Col>
                    </Row>
                  </Card.Footer>
                )}
              </Card>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default AuthForm;
