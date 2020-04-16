import { useEffect, useContext, useState } from "react";
import { FirebaseContext } from "./context";

export const useAuth = () => {
  const { auth } = useContext(FirebaseContext);

  const [state, setState] = useState(() => {
    const user = auth.currentUser;
    return { isLoading: !user, user };
  });

  function onChange(user) {
    setState({ isLoading: false, user });
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(onChange);

    return () => unsubscribe();
  }, [auth]);

  return {
    user: state.user,
    isLoading: state.isLoading,
  };
};

export const useDebounce = (value) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return debouncedValue;
};
