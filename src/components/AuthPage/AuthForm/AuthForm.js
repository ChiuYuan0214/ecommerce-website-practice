import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../../store/auth";
import { useCognito } from "../../../hooks/cognito";

import SignUpInfo from "./SignUpInfo";

import styles from "./AuthForm.module.css";

const AuthForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [isVerify, setIsVerify] = useState(false);
  const [stage, setStage] = useState(null);
  const { isAuth, isLoading, error, sendRequest } = useCognito();

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

  useEffect(() => {
    if (isAuth) {
      dispatch(authActions.login());
    } else {
      dispatch(authActions.logout());
    }
  }, [isAuth]);

  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (error) {
      alert(error);
      setStage(null);
      return;
    }
    if (stage === "signup") {
      alert("The verification code already sent to your E-mail, please check.");
      setStage(null);
    } else if (stage === "confirm") {
      alert("Verification succeed! You can sign in now.");
      setStage(null);
    } else if (stage === "signin") {
      navigate("/center");
    }
  }, [isLoading, error, stage]);

  const toggleLoginHandler = () => {
    setIsLogin((prev) => !prev);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (isLogin && !isVerify) {
      sendRequest("signin", { name, password });
      setStage("signin");
    }
    if (isLogin && isVerify) {
      sendRequest("confirm", { username: name, code: verCode });
      setIsVerify(false);
      setStage("confirm");
    }
    if (!isLogin && signUpRef.current.password.value !== passwordRef.current.value) {
      alert("Please confirm your password.");
      return;
    }
    if (!isLogin) {
      const userProfile = {
        name,
        password,
        email: signUpRef.current.email.value,
        phone: signUpRef.current.phone.value,
        birth: signUpRef.current.birth.value,
      };
      sendRequest("signup", userProfile);
      setStage("signup");
    }

    setName("");
    setPassword("");
    setConfirmPassword("");
    setEmail("");
    setPhone("");
    setBirth("");
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div className={styles.controls}>
        <label htmlFor="name">Your Name</label>
        <input
          id="name"
          type="text"
          ref={nameRef}
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </div>
      {!isVerify && (
        <div className={styles.controls}>
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
          ref={signUpRef}
          passwordChange={(e) => setConfirmPassword(e.target.value)}
          emailChange={(e) => setEmail(e.target.value)}
          phoneChange={(e) => setPhone(e.target.value)}
          birthChange={(e) => setBirth(e.target.value)}
          password={confirmPassword}
          email={email}
          phone={phone}
          birth={birth}
        />
      )}
      <div className={styles.actions}>
        <button>{isLogin ? "Login" : "Sign up"}</button>
      </div>
      {!isVerify && isLogin && (
        <p onClick={() => setIsVerify(true)}>I want to verify my account.</p>
      )}
      {isVerify && isLogin && (
        <p onClick={() => setIsVerify(false)}>
          I want to sign in existing account.
        </p>
      )}
      <p
        onClick={() => {
          toggleLoginHandler();
          setIsVerify(false);
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
