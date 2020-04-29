import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/esm/Spinner";
import ListGroup from "react-bootstrap/ListGroup";
import { useDebounce } from "../../hooks";
import NewPostForm from "../../components/new-post-form";
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
                  place_name: next.place_name,
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
    <NewPostForm>
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        errors,
        setFieldValue,
        setFieldError,
        isSubmitting,
      }) => {
        return (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group controlId="formTitle">
              <Form.Label>Tytuł</Form.Label>
              <Form.Control
                type="text"
                name="title"
                autoComplete="off"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.title && !!errors.title}
                isValid={touched.title && !errors.title}
              />
              <Form.Control.Feedback type="invalid">
                {errors.title}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formDescription">
              <Form.Label>Opis</Form.Label>
              <Form.Control
                type="text"
                as="textarea"
                rows="3"
                name="description"
                autoComplete="off"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.description && !!errors.description}
                isValid={touched.description && !errors.description}
              />
              <Form.Control.Feedback type="invalid">
                {errors.description}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formAddress">
              <Form.Label>Adres</Form.Label>
              <Form.Control
                type="text"
                name="address"
                autoComplete="off"
                value={values.address.place_name}
                onChange={(e) => {
                  setFieldValue("address", {
                    ...values.address,
                    place_name: e.target.value,
                  });
                  setSearchTerm(e.currentTarget.value);
                }}
                onBlur={handleBlur}
                isInvalid={touched.address && !!errors.address}
                isValid={touched.address && !errors.address}
              />
              <Form.Control.Feedback type="invalid">
                {errors.address}
              </Form.Control.Feedback>
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
                        setFieldValue("address", {
                          place_name: location.place_name,
                          center: location.center,
                        });
                        setResults({});
                        setSearchTerm("");
                      }}
                    >
                      {location.place_name}
                    </ListGroup.Item>
                  );
                })}
              {isSearching && (
                <ListGroup.Item className="d-flex mb-2 align-items-center">
                  <Spinner animation="border" variant="info" className="mr-2" />
                  Szukam...
                </ListGroup.Item>
              )}
            </ListGroup>

            <Form.Group controlId="formImage">
              <Form.Label>Zdjęcie</Form.Label>
              <Form.File id="form-image-custom" custom>
                <Form.File.Input
                  name="image"
                  accept="image/*"
                  isInvalid={touched.image && !!errors.image}
                  isValid={touched.image && !errors.image}
                  onBlur={handleBlur}
                  onChange={({ target: { files } }) => {
                    const file = files[0];
                    if (file.type && file.type.split("/")[0] !== "image") {
                      setFieldError("image", "Niewłaściwy format obrazu");
                      setFieldValue("image", "");
                      return;
                    }
                    setFieldValue("image", file);
                  }}
                />
                <Form.File.Label data-browse="Wybierz zdjęcie">
                  {values.image.name || "Nie wybrano zdjęcia"}
                </Form.File.Label>
                <Form.Control.Feedback type="invalid">
                  {errors.image}
                </Form.Control.Feedback>
              </Form.File>
            </Form.Group>

            <Button
              disabled={isSubmitting}
              type="submit"
              variant="info"
              className="mt-2 mx-auto float-right"
            >
              Stwórz nowe ogłoszenie
            </Button>
          </Form>
        );
      }}
    </NewPostForm>
  );
};

export default NewPost;
