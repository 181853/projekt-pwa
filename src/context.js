import React, { createContext } from "react";
import app from "firebase/app";
import "firebase/auth";

export const FirebaseContext = createContext(null);

export const FirebaseProvider = ({ children }) => {
  if (!app.apps.length) {
    app.initializeApp({
      apiKey: process.env.REACT_APP_API_KEY,
      authDomain: process.env.REACT_APP_AUTH_DOMAIN,
      databaseURL: process.env.REACT_APP_DATABASE_URL,
      projectId: process.env.REACT_APP_PROJECT_ID,
      storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
      appId: process.env.REACT_APP_APP_ID,
    });
  }

  const auth = app.auth();

  const googleProvider = new app.auth.GoogleAuthProvider();
  const githubProvider = new app.auth.GithubAuthProvider();

  const createUserWithEmailAndPassword = (email, password) =>
    auth.createUserWithEmailAndPassword(email, password);

  const signInWithEmailAndPassword = (email, password) =>
    auth.signInWithEmailAndPassword(email, password);

  const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

  const signInWithGithub = () => auth.signInWithPopup(githubProvider);

  const signOut = () => auth.signOut();

  return (
    <FirebaseContext.Provider
      value={{
        app,
        auth,
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        signInWithGoogle,
        signInWithGithub,
        signOut,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
