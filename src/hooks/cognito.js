import { useCallback, useReducer } from "react";

import {
  CognitoUserPool,
  CognitoUserAttribute,
  AuthenticationDetails,
  CognitoUser,
} from "amazon-cognito-identity-js";

const POOL_DATA = {
  UserPoolId: "us-east-2_kLShjK8Xu",
  ClientId: "5fu6hpjq3gf9bg5eq7eq45pkr8",
};

const userPool = new CognitoUserPool(POOL_DATA);

const getAuthentiactedUser = () => {
  return userPool.getCurrentUser();
};

const initialState = {
  isAuth: false,
  isLoading: false,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SENDING":
      return { ...state, isLoading: true };
    case "SUCCESS":
      if (action.isAuth) {
        return { isAuth: true, isLoading: false, error: null };
      }
      return { isAuth: false, isLoading: false, error: null };
    case "ERROR":
      return { ...state, isLoading: false, error: action.error };
    default:
      return initialState;
  }
};

export const useCognito = () => {
  const [authState, dispatch] = useReducer(reducer, initialState);

  // for handling sign-up, verify and log-in.
  const sendRequest = (type, data) => {
    if (type === "signup") {
      dispatch({ type: "SENDING" });
      const { name, password, email, birth, phone } = data;
      const emailAttr = {
        Name: "email",
        Value: email,
      };
      const birthAttr = {
        Name: "birthdate",
        Value: birth,
      };
      const phoneAttr = {
        Name: "phone_number",
        Value: "+" + phone,
      };

      const attrList = [
        new CognitoUserAttribute(emailAttr),
        new CognitoUserAttribute(birthAttr),
        new CognitoUserAttribute(phoneAttr),
      ];

      userPool.signUp(name, password, attrList, null, (err, result) => {
        // null here could be some validation data.
        if (err) {
          console.log("Error message: ", err.message);
          dispatch({ type: "ERROR", error: "Sign up failed." });
          return;
        }
        dispatch({ type: "SUCCESS" });
      });
    } else if (type === "confirm") {
      dispatch({ type: "SENDING" });
      const { username, code } = data;
      const userData = {
        Username: username,
        Pool: userPool,
      };

      const cognitoUser = new CognitoUser(userData);
      cognitoUser.confirmRegistration(code, true, (err, result) => {
        if (err) {
          console.log("Error message: ", err.message);
          dispatch({ type: "ERROR", error: "Failed to confirm." });
        } else {
          dispatch({ type: "SUCCESS" });
        }
      });
    } else if (type === "signin") {
      dispatch({ type: "SENDING" });
      const { name, password } = data;
      const authData = {
        Username: name,
        Password: password,
      };
      const authDetails = new AuthenticationDetails(authData);
      const userData = {
        Username: name,
        Pool: userPool,
      };
      const cognitoUser = new CognitoUser(userData);
      cognitoUser.authenticateUser(authDetails, {
        onSuccess(result) {
          console.log("login succeed in useCognito!");
          dispatch({ type: "SUCCESS", isAuth: true });
        },
        onFailure(err) {
          console.log("Error message: ", err.message);
          dispatch({ type: "ERROR", error: "Failed to sign in." });
        },
      });
    }
  };

  // sign out the current user.
  const signOut = () => {
    userPool.getCurrentUser().signOut();
    dispatch({ type: "SUCCESS" });
  };

  // set auth state to true if there's a valid user.
  const isAuthenticated = useCallback(() => {
    dispatch({ type: "SENDING" });
    const user = getAuthentiactedUser();
    if (!user) {
      dispatch({ type: "SUCCESS" });
    } else {
      user.getSession((err, session) => {
        if (err) {
          console.log("User is not valid!");
          dispatch({ type: "SUCCESS" });
        } else {
          if (session.isValid()) {
            dispatch({ type: "SUCCESS", isAuth: true });
            console.log("User is valid.");
          } else {
            dispatch({ type: "SUCCESS" });
          }
        }
      });
    }
  }, [dispatch]);

  return {
    ...authState,
    sendRequest,
    signOut,
    isAuthenticated,
  };
};

// to get the id token of current user from browser storage.
export const getIdToken = async () => {
  const idToken = getAuthentiactedUser().getSession((err, session) => {
    if (err) {
      return null;
    }
    return session.getIdToken().getJwtToken();
  });
  return idToken;
};

// to get the access token of current user from browser storage.
export const getAccessToken = async () => {
  const user = getAuthentiactedUser();
  if (!user) {
    return null;
  }
  const accessToken = user.getSession((err, session) => {
    if (err) {
      return null;
    }
    return session.getAccessToken().getJwtToken();
  });
  return accessToken;
};
