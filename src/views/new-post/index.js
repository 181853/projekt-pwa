import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

const NewPost = () => {
  return (
    <Row className="justify-content-md-center">
      <Col xs md={8}>
        <Card className="mb-4 shadow-sm">
          <Card.Body>
            <Card.Title className="text-center mb-2">
              Nowe ogłoszenie
            </Card.Title>

            <Form>
              <Form.Group controlId="firmTitle">
                <Form.Label>Tytuł</Form.Label>
                <Form.Control type="text" name="title" />
              </Form.Group>

              <Form.Group controlId="formDescription">
                <Form.Label>Opis</Form.Label>
                <Form.Control
                  type="text"
                  as="textarea"
                  rows="3"
                  name="description"
                />
              </Form.Group>

              <Form.Group controlId="formImage">
                <Form.Label>Zdjęcie</Form.Label>
                <Form.File id="form-image-custom" custom>
                  <Form.File.Input
                    name="image"
                    accept="image/*"
                  />
                  <Form.File.Label data-browse="Wybierz zdjęcie">
                   Nie wybrano zdjęcia
                  </Form.File.Label>
                </Form.File>
              </Form.Group>

              <Button
                type="submit"
                variant="info"
                className="mt-4 mx-auto float-right"
              >
                Stwórz nowe ogłoszenie
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default NewPost;
