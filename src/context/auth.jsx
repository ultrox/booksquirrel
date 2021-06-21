import React, { createContext, useContext } from "react";
import PropTypes from "prop-types";

const FAILURE = "FAILURE";
const SUCCESS = "SUCCESS";
const ERROR = "ERROR";
const LOGIN = "LOGIN";

async function getCurrentUser(endpoint) {
  try {
    const response = await fetch(endpoint, { credentials: "include" });
    if (!response.ok) throw await response.json();

    const data = await response.json();

    return { type: SUCCESS, data };
  } catch (error) {
    return { type: FAILURE, error };
  }
}

const AuthContext = createContext();
AuthContext.displayName = "AuthContext";

function AuthProvider({ children }) {
  const init = {
    authenticated: null,
    user: null,
    error: null,
  };

  function mainReducer(state, action) {
    switch (action.type) {
      case LOGIN: {
        return { authenticated: true, error: null, user: action.user };
      }

      case ERROR: {
        return { authenticated: false, error: action.error, user: null };
      }

      default: {
        console.warn(
          `%cmainReducer(): action ${JSON.stringify(action)} is not supported!`,
          "background: yellow;font-size: 1rem",
        );
        return state;
      }
    }
  }

  const [state, dispatch] = React.useReducer(mainReducer, init);

  React.useEffect(() => {
    getCurrentUser("http://localhost:5050/api/me").then(({ type, data }) => {
      if (type === SUCCESS) dispatch({ type: LOGIN, user: data });
      if (type === FAILURE) dispatch({ type: ERROR, error: data });
    });
  }, []);

  const context = { ...state };
  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export { AuthProvider, useAuth };
