import React, { useContext, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import { v4 as uuidv4 } from "uuid";
import { ROUTES } from "../../constants";
import { FirebaseContext } from "../../context";
import {useAuth} from "../../hooks";

const NewPostForm = ({ children }) => {
  const { createPost, getImage } = useContext(FirebaseContext);
  const [postURL, setPostURL] = useState("");
  const { user } = useAuth();

  const handleSubmit = (values, { setSubmitting }) => {
    const { title, description, address, image } = values;
    const postId = uuidv4();

    setSubmitting(true);

    getImage(postId)
      .put(image)
      .on(
        "state_changed",
        () => {},
        (err) => {
          console.error(err);
        },
        async () => {
          const imageURL = await getImage(postId).getDownloadURL();

          await createPost(postId, {
            title,
            description,
            address: address.place_name,
            coordinates: address.center,
            imageURL,
            authorId: user.uid,
            createdAt: Date.now(),
          });

          setPostURL(postId);
          setSubmitting(false);
        }
      );
  };

  if (!user) {
    return <Alert variant="danger">Zaloguj się by dodać post</Alert>;
  }

  return (
    <Row className="justify-content-center">
      {postURL && (
        <Alert variant="success" className="col-xs-10" onClose={() => setPostURL("")} dismissible>
          <Alert.Heading>Dodałeś nowe ogłoszenie</Alert.Heading>
          Przejdź
          <Alert.Link
            as={Link}
            to={ROUTES.POST + "/" + postURL}
            className="ml-1 mr-1"
          >
            do ogłoszenia
          </Alert.Link>
          lub
          <Alert.Link as={Link} to={ROUTES.HOME} className="ml-1">
            do strony głównej
          </Alert.Link>
          .
        </Alert>
      )}
      <Col xs={12} md={8}>
        <Card className="mb-4 shadow-sm">
          <Card.Body>
            <Card.Title className="text-center mb-2">
              Nowe ogłoszenie
            </Card.Title>
            <Formik
              onSubmit={handleSubmit}
              initialValues={{
                title: "",
                description: "",
                address: {
                  place_name: "",
                  center: [],
                },
                image: "",
              }}
              validate={(values) => {
                const errors = {};
                if (!values.title) {
                  errors.title = "Tytuł wymagany";
                }
                if (!values.description) {
                  errors.description = "Opis wymagany";
                }
                if (!values.address.place_name) {
                  errors.address = "Adres wymagany";
                }
                if (!values.image) {
                  errors.image = "Zdjęcie wymagane";
                }
                if (values.address.place_name && !values.address.center) {
                  errors.address =
                    "Niepoprawny lub niepełny adres, skorzystaj z wyszukiwarki";
                }

                return errors;
              }}
            >
              {(state) => children(state)}
            </Formik>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default NewPostForm;
