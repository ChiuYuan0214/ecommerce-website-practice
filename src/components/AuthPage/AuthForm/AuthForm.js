import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../../store/auth";

import SignUpInfo from "./SignUpInfo";

import styles from "./AuthForm.module.css";

const AuthForm = ({ isLogin, toggleLogin }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birth, setBirth] = useState("");
  const nameRef = useRef();
  const passwordRef = useRef();
  const signUpRef = useRef();

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log("Login succeed!", { name, password });
      dispatch(authActions.login());
      return;
    }
    if (signUpRef.current.password.value !== passwordRef.current.value) {
      console.log("Please confirm your password.");
      return;
    }

    const userProfile = {
      name,
      password,
      email: signUpRef.current.email.value,
      phone: signUpRef.current.phone.value,
      birth: signUpRef.current.birth.value,
    };

    console.log("Sign up succeed!", userProfile);
    dispatch(
      authActions.setProfile({
        target: "all",
        data: { ...userProfile, password: null },
      })
    );
    dispatch(authActions.login());
    setName("");
    setPassword("");
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
      <p onClick={() => toggleLogin()}>
        {isLogin
          ? "I want to create a new account."
          : "I already have an account."}
      </p>
    </form>
  );
};

export default AuthForm;
