import React, { useContext } from "react";
import { FirebaseContext } from "../../context";

const HomePage = () => {
  const { app } = useContext(FirebaseContext);

  // TODO: remove
  console.log(app);

  return <h1>strona domowa</h1>;
};

export default HomePage;
