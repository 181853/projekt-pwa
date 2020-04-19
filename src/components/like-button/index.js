import React from "react";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { useAuth } from "../../hooks";

const LikeButton = ({ likes = [] }) => {
  const { user } = useAuth();
  const userId = user ? user.uid : null;

  const isLiked = likes.includes(userId);

  return (
    <Button
      disabled={!user}
      className="float-right"
      variant={isLiked ? "danger" : "outline-danger"}
    >
      <span className="mr-2">{likes.length}</span>
      <FontAwesomeIcon icon={isLiked ? fasHeart : farHeart} />
    </Button>
  );
};

export default LikeButton;
