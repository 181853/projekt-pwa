import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { useAuth } from "../../hooks";
import { FirebaseContext } from "../../context";

const LikeButton = ({ postId, likes = [] }) => {
  const { getPost } = useContext(FirebaseContext);
  const { user } = useAuth();
  const userId = user ? user.uid : null;

  const isLiked = likes.includes(userId);

  const addLike = () => {
    getPost(postId).update({
      likes: [...likes, userId],
    });
  };

  const removeLike = () => {
    getPost(postId).update({
      likes: likes.filter((uid) => uid !== userId),
    });
  };

  return (
    <Button
      disabled={!user}
      variant={isLiked ? "danger" : "outline-danger"}
      {...(!user && { style: { pointerEvents: "none" } })}
      className="float-right"
      onClick={() => (user ? (isLiked ? removeLike() : addLike()) : {})}
    >
      <span className="mr-2">{likes.length}</span>
      <FontAwesomeIcon icon={isLiked ? fasHeart : farHeart} />
    </Button>
  );
};

export default LikeButton;
