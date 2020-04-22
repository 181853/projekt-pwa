import React, { useContext, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import ReactMapboxGl, { Marker } from "react-mapbox-gl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapPin } from "@fortawesome/free-solid-svg-icons";
import { FirebaseContext } from "../../context";
import { formatDate } from "../../utils";
import PostComments from "../../components/post-comments";
import Spinner from "react-bootstrap/Spinner";
import Avatar from "../../components/avatar";

const SinglePost = ({
  match: {
    params: { postId },
  },
}) => {
  const { getPost, getUser } = useContext(FirebaseContext);
  const [data, setData] = React.useState({});
  const [isLoading, setLoading] = React.useState(true);

  useEffect(() => {
    const loadPost = async () => {
      setLoading(true);

      try {
        const postDoc = await getPost(postId).get();

        if (postDoc.exists) {
          const data = postDoc.data();
          const userDoc = await getUser(data.authorId);

          setData({
            ...data,
            author: userDoc,
          });
        }
      } catch (e) {
        console.error("loadPost", e);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Map = ReactMapboxGl({
    accessToken: process.env.REACT_APP_MAPBOX_API_KEY,
  });

  return (
    <>
      <section className="placeholder-map shadow">
        {!isLoading && data.coordinates && (
          <Map
            center={data.coordinates}
            zoom={[15]}
            pitch={[60]}
            // eslint-disable-next-line react/style-prop-object
            style="mapbox://styles/mapbox/light-v10"
          >
            <Marker coordinates={data.coordinates} anchor="bottom">
              <FontAwesomeIcon icon={faMapPin} className="fa-4x text-info" />
            </Marker>
          </Map>
        )}
      </section>
      <Container as="section" className="post-container">
        <Row className="justify-content-center">
          <Col md="10">
            <Card className="shadow mb-4">
              {isLoading ? (
                <div className="d-flex justify-content-center align-items-center p-5">
                  <Spinner animation="border" variant="info" />
                </div>
              ) : (
                <Card.Body>
                  <h1>{data.title}</h1>
                  <hr />
                  <div className="d-flex align-items-center">
                    <Avatar className="rounded mr-2" user={data.author} />
                    <span className="flex-grow-1">
                      {data.author.displayName || data.author.email}
                    </span>
                    <span>{formatDate(data.createdAt)}</span>
                  </div>
                  <hr />
                  <Image
                    fluid
                    rounded
                    src={data.imageURL}
                    alt="zdjecie"
                    className="mb-2"
                  />
                  <p>{data.address}</p>
                  <hr />
                  <p>{data.description}</p>
                </Card.Body>
              )}
            </Card>
          </Col>
          <Col md="10" className="">
            <PostComments postId={postId} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SinglePost;
