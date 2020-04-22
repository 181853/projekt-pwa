import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import LikeButton from "../../components/like-button";
import { ROUTES } from "../../constants";
import { formatDate } from "../../utils";
import { FirebaseContext } from "../../context";
import { useAuth } from "../../hooks";

const HomePage = () => {
  const { getPosts } = useContext(FirebaseContext);
  const { user } = useAuth();
  const [isLoading, setLoading] = React.useState(false);
  const [postData, setData] = React.useState(null);

  useEffect(() => {
    setLoading(true);

    const unsubscribe = getPosts().onSnapshot((querySnapshot) => {
      const data = querySnapshot.docs.reduce((acc, documentSnapshot) => {
        acc[documentSnapshot.id] = documentSnapshot.data();

        return acc;
      }, {});

      setData(data);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        {isLoading && <Spinner animation="border" variant="info" />}
        {postData &&
          Object.keys(postData).map((postId) => {
            const homePagePost = postData[postId];
            const {
              title,
              description,
              createdAt,
              imageURL,
              likes,
            } = homePagePost;

            return (
              <Col md="6" lg="4" className="mb-4" key={postId}>
                <Card className="shadow-sm">
                  <Card.Img variant="top" src={imageURL} />
                  <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text className="truncated-text">
                      {description}
                    </Card.Text>
                    <Row>
                      <Col>
                        <Button
                          as={Link}
                          to={ROUTES.POST + "/" + postId}
                          variant="outline-secondary"
                          block
                        >
                          Więcej
                        </Button>
                      </Col>
                      <Col className="text-right">
                        {user ? (
                          <LikeButton likes={likes} postId={postId} />
                        ) : (
                          <OverlayTrigger
                            key="top"
                            placement="top"
                            overlay={
                              <Tooltip id="tooltip-disabled">
                                Musisz być zalogowany by móc głosować
                              </Tooltip>
                            }
                          >
                            <span className="d-inline-block">
                              <LikeButton likes={likes} postId={postId} />
                            </span>
                          </OverlayTrigger>
                        )}
                      </Col>
                    </Row>
                  </Card.Body>
                  <Card.Footer className="text-muted text-center">
                    <FontAwesomeIcon icon={faClock} className="mr-1" />
                    {formatDate(createdAt)}
                  </Card.Footer>
                </Card>
              </Col>
            );
          })}
      </Row>
    </Container>
  );
};

export default HomePage;
