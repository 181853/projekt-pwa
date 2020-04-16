import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { useDebounce } from "../../hooks";
import { searchAddress } from "../../utils";

const NewPost = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState({});
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsSearching(true);
      searchAddress(debouncedSearchTerm).then((result) => {
        setIsSearching(false);

        const r = result.length
          ? result.reduce((prev, next) => {
              if (!(next.id in prev)) {
                prev[next.id] = {
                  place_name_pl: next.place_name_pl,
                  center: next.center,
                };
              }

              return prev;
            }, {})
          : {};
        setResults(r);
      });
    } else {
      setResults({});
    }
  }, [debouncedSearchTerm]);

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

              <Form.Group controlId="validationFormik03">
                <Form.Label>Adres</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  autoComplete="off"
                  onChange={(e) => {
                    setSearchTerm(e.currentTarget.value);
                  }}
                />
              </Form.Group>

              <ListGroup>
                {!isSearching &&
                  Boolean(Object.keys(results).length) &&
                  Object.keys(results).map((id) => {
                    const location = results[id];

                    return (
                      <ListGroup.Item
                        key={id}
                        action
                        onClick={(e) => {
                          e.preventDefault();
                          setResults({});
                          setSearchTerm("");
                        }}
                      >
                        {location.place_name_pl}
                      </ListGroup.Item>
                    );
                  })}
              </ListGroup>

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
