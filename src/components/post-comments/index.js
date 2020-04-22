import React, { useContext, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import { useAuth } from "../../hooks";
import { FirebaseContext } from "../../context";
import Avatar from "../avatar";
import { formatDate } from "../../utils";

const PostComments = ({ postId }) => {
  const { getPostComments, getUser } = useContext(FirebaseContext);
  const [comment, setComment] = React.useState("");
  const [isLoading, setLoading] = React.useState(false);
  const [commentsData, setCommentsData] = React.useState([]);
  const { user } = useAuth();

  useEffect(() => {
    setLoading(true);

    const unsubscribe = getPostComments(postId).onSnapshot(
      async (querySnapshot) => {
        const data = await Promise.all(
          querySnapshot.docs.map(async (documentSnapshot) => {
            const docData = documentSnapshot.data();
            const userDoc = await getUser(docData.authorId);

            return {
              id: documentSnapshot.id,
              ...docData,
              author: {
                uid: docData.authorId,
                ...userDoc,
              },
            };
          })
        );

        setLoading(false);
        setCommentsData(await data);
      }
    );

    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setComment("");

    getPostComments(postId)
      .add({
        authorId: user.uid,
        createdAt: Date.now(),
        value: comment,
      })
      .catch((err) => {
        console.log("addComment", err);
      });
  };

  return (
    <>
      <h4>Komentarze</h4>
      <Card className="shadow mb-4">
        <Card.Body>
          {isLoading && (
            <div className="d-flex justify-content-center align-items-center p-5">
              <Spinner animation="border" variant="info" />
            </div>
          )}
          {!isLoading && (
            <>
              {commentsData.length > 0 ? (
                <ul className="list-unstyled">
                  {commentsData.map((comment, index) => {
                    return (
                      <li key={comment.id}>
                        {index > 0 && <hr />}

                        <div className="d-flex align-items-center mb-2">
                          <Avatar
                            className="rounded mr-2"
                            user={comment.author}
                          />
                          <h5 className="mb-0 flex-grow-1">
                            {comment.author.displayName || comment.author.email}
                          </h5>
                          <span>{formatDate(comment.createdAt)}</span>
                        </div>
                        <p>{comment.value}</p>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="m-0">Brak komentarzy.</p>
              )}
            </>
          )}
        </Card.Body>
      </Card>

      <h4>Dodaj komentarz</h4>
      <Card className="shadow mb-4">
        <Card.Body>
          {user ? (
            <>
              <div className="d-flex align-items-center mb-2">
                <Avatar className="rounded mr-2" user={user} />
                <h5 className="mb-0">{user.displayName || user.email}</h5>
              </div>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Control
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    as="textarea"
                    rows="3"
                  />
                </Form.Group>
                <Button
                  disabled={!comment}
                  variant="info"
                  type="submit"
                  className="float-right"
                >
                  Dodaj
                </Button>
              </Form>
            </>
          ) : (
            <p className="m-0">Musisz być zalogowany by dodać komentarz.</p>
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default PostComments;
