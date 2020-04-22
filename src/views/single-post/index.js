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

const SinglePost = ({
  match: {
    params: { postId },
  },
}) => {
  const { getPost } = useContext(FirebaseContext);
  const [data, setData] = React.useState({});

  useEffect(() => {
    const loadPost = async () => {
      try {
        const postDoc = await getPost(postId).get();

        if (postDoc.exists) {
          const data = postDoc.data();

          setData(data);
        }
      } catch (e) {
        console.error("loadPost", e);
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
        <Map
          center={data.coordinates}
          zoom={[15]}
          pitch={[60]}
          style="mapbox://styles/mapbox/light-v10"
        >
          <Marker coordinates={data.coordinates} anchor="bottom">
            <FontAwesomeIcon icon={faMapPin} className="fa-4x text-info" />
          </Marker>
        </Map>
      </section>
      <Container as="section" className="post-container">
        <Row className="justify-content-center">
          <Col md="10">
            <Card className="shadow mb-4">
              <Card.Body>
                <h1>{data.title}</h1>
                <hr />
                <div className="d-flex align-items-center">
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
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SinglePost;
