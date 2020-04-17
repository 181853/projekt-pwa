import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import React, { useContext } from "react";
import { Formik } from "formik";
import { v4 as uuidv4 } from "uuid";
import { FirebaseContext } from "../../context";

const NewPostForm = ({ children }) => {
  const { createPost, getImage, auth } = useContext(FirebaseContext);

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
            authorId: auth.currentUser.uid,
            createdAt: Date.now(),
          });

          setSubmitting(false);
        }
      );
  };

  return (
    <Row className="justify-content-md-center">
      <Col xs md={8}>
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
