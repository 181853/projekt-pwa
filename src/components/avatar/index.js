import React from "react";

const Avatar = ({ user, className }) => {
  const src =
    user.photoURL ||
    `https://avatars.dicebear.com/v2/jdenticon/${user.uid}.svg`;

  return (
    <img
      alt="avatar"
      className={className}
      loading="lazy"
      src={src}
      height={38}
      width={38}
    />
  );
};

export default Avatar;
