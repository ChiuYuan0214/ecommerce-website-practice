import React, { useState, useEffect, useRef } from "react";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../../store/auth";
import { useCognito } from "../../../hooks/cognito";
import SignUpInfo from "./SignUpInfo";
import LoadingAnimation from '../../UI/LoadingAnimation/LoadingAnimation';

import styles from "./AuthForm.module.css";

const AuthForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // to check if user is trying to log in or sign up.
  const [isLogin, setIsLogin] = useState(true);

  // to check if user is trying to verify account.
  const [isVerify, setIsVerify] = useState(false);

  const { isAuth, isLoading, error, sendRequest } = useCognito();

  // form request type, for interacting with loading state and auth state defined above.
  const [stage, setStage] = useState(null);

  // form input ref and state.
  const nameRef = useRef();
  const [name, setName] = useState("");
  const passwordRef = useRef();
  const [password, setPassword] = useState("");
  const verCodeRef = useRef();
  const [verCode, setVerCode] = useState("");
  const signUpRef = useRef();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birth, setBirth] = useState("");

  // Toggling the form checking status, to avoid error message at the first time.
  const [onCheck, setOnCheck] = useState(false);

  // verify input validaty based on current input state.
  const nameInvalid = name.trim().length === 0;
  const passwordInvalid =
    password.trim().length < 6 ||
    password.match(/[0-9]/g) === null ||
    password.match(/[a-z]/g) === null;
  const confirmPasswordInvalid = confirmPassword !== password;
  const emailInvalid = !email.includes("@");
  const phoneInvalid = phone.match(/[a-z]/gi) !== null;
  const birthInvalid = birth.trim().length === 0;

  // check if the form is submittable.
  const signInValid = !nameInvalid && !passwordInvalid;
  const signUpValid =
    signInValid &&
    !confirmPasswordInvalid &&
    !emailInvalid &&
    !phoneInvalid &&
    !birthInvalid;

  // change the redux isAuth state based on "isAuth" received from cognito hook.
  useEffect(() => {
    if (isAuth) {
      dispatch(authActions.login());
    }
  }, [isAuth, dispatch]);

  // only for alerting user some information after loading.
  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (error && stage) {
      alert(error);
      setStage(null);
      return;
    }

    // only process the code below when 'is not loading' and 'have no error'.
    if (stage === "signup") {
      alert("The verification code already sent to your E-mail, please check.");
      setStage(null);
    } else if (stage === "confirm") {
      alert("Verification succeed! You can sign in now.");
      setStage(null);
    } else if (stage === "signin") {
      navigate("/center");
      setStage(null);
    }
  }, [isLoading, error, stage, navigate]);

  // toggle between login mode and signup mode.
  const toggleLoginHandler = () => {
    setIsLogin((prev) => !prev);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setOnCheck(true);
    if (isLogin && !isVerify) {
      if (!signInValid) {
        return;
      }
      sendRequest("signin", { name, password });
      setStage("signin");
    }
    if (isLogin && isVerify) {
      sendRequest("confirm", { username: name, code: verCode });
      // set isVerify to false to redirect user after verified successfully.
      setIsVerify(false);
      setStage("confirm");
    }

    // condition: is signing up
    if (!isLogin) {
      if (!signUpValid) {
        return;
      }
      const userProfile = {
        name,
        email: signUpRef.current.email.value,
        phone: signUpRef.current.phone.value,
        birth: signUpRef.current.birth.value,
      };
      sendRequest("signup", { ...userProfile, password });
      setIsLogin(true);
      setIsVerify(true);
      setStage("signup");
    }

    setName("");
    setPassword("");
    setConfirmPassword("");
    setEmail("");
    setPhone("");
    setBirth("");
    setOnCheck(false);
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      {isLoading && <LoadingAnimation />}
      <div
        className={`${styles.controls} ${
          nameInvalid && onCheck && styles.error
        }`}
      >
        <label htmlFor="name">Your Name</label>
        <input
          id="name"
          type="text"
          ref={nameRef}
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        {nameInvalid && onCheck && <p>Please enter your name.</p>}
      </div>
      {!isVerify && (
        <div
          className={`${styles.controls} ${
            passwordInvalid && onCheck && styles.error
          }`}
        >
          <label htmlFor="password">Your Password</label>
          <input
            id="password"
            type="password"
            minLength="6"
            maxLength="12"
            ref={passwordRef}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {passwordInvalid && onCheck && (
            <p>
              Password should be equal or more than 6 char, includes lowercase
              and number.
            </p>
          )}
        </div>
      )}
      {isVerify && isLogin && (
        <div className={styles.controls}>
          <label htmlFor="ver-code">Verification Code</label>
          <input
            id="ver-code"
            type="text"
            ref={verCodeRef}
            onChange={(e) => setVerCode(e.target.value)}
            value={verCode}
          />
        </div>
      )}
      {!isLogin && (
        <SignUpInfo
          className={styles.controls}
          errorClass={styles.error}
          ref={signUpRef}
          passwordChange={(e) => setConfirmPassword(e.target.value)}
          emailChange={(e) => setEmail(e.target.value)}
          phoneChange={(e) => setPhone(e.target.value)}
          birthChange={(e) => setBirth(e.target.value)}
          password={confirmPassword}
          email={email}
          phone={phone}
          birth={birth}
          onCheck={onCheck}
          invalid={{
            confirmPassword: confirmPasswordInvalid,
            email: emailInvalid,
            phone: phoneInvalid,
            birth: birthInvalid,
          }}
        />
      )}
      <div className={styles.actions}>
        <button>{isLogin ? (isVerify ? "Verify" : "Login") : "Sign up"}</button>
      </div>
      {!isVerify && isLogin && (
        <p
          onClick={() => {
            setIsVerify(true);
            setOnCheck(false);
          }}
        >
          I want to verify my account.
        </p>
      )}
      {isVerify && isLogin && (
        <p
          onClick={() => {
            setIsVerify(false);
            setOnCheck(false);
          }}
        >
          I want to sign in existing account.
        </p>
      )}
      <p
        onClick={() => {
          toggleLoginHandler();
          setIsVerify(false);
          setOnCheck(false);
        }}
      >
        {isLogin
          ? "I want to create a new account."
          : "I already have an account."}
      </p>
    </form>
  );
};

export default AuthForm;