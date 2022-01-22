import React, { useRef, useImperativeHandle } from "react";

const SignUpInfo = React.forwardRef((props, ref) => {
  const {
    className,
    errorClass,
    password,
    passwordChange,
    email,
    emailChange,
    phone,
    phoneChange,
    birth,
    birthChange,
    onCheck,
    invalid,
  } = props;
  const passwordRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const birthRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => {
      emailRef.current.focus();
    },
    get password() {
      return passwordRef.current;
    },
    get email() {
      return emailRef.current;
    },
    get phone() {
      return phoneRef.current;
    },
    get birth() {
      return birthRef.current;
    },
  }));

  return (
    <>
      <div
        className={`${className} ${
          invalid.confirmPassword && onCheck && errorClass
        }`}
      >
        <label htmlFor="confirm-password">Confirm Password</label>
        <input
          id="confirm-password"
          type="password"
          ref={passwordRef}
          onChange={(e) => passwordChange(e)}
          value={password}
        />
        {invalid.confirmPassword && onCheck && (
          <p>Please check your confirm password again.</p>
        )}
      </div>
      <div
        className={`${className} ${
          invalid.email && onCheck && errorClass
        }`}
      >
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          ref={emailRef}
          onChange={(e) => emailChange(e)}
          value={email}
        />
        {invalid.email && onCheck && (
          <p>Please enter valid E-mail.</p>
        )}
      </div>
      <div
        className={`${className} ${
          invalid.phone && onCheck && errorClass
        }`}
      >
        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          type="tel"
          ref={phoneRef}
          onChange={(e) => phoneChange(e)}
          value={phone}
        />
        {invalid.phone && onCheck && (
          <p>Please enter valid phone number.</p>
        )}
      </div>
      <div
        className={`${className} ${
          invalid.birth && onCheck && errorClass
        }`}
      >
        <label htmlFor="birth">Birth</label>
        <input
          id="birth"
          type="date"
          ref={birthRef}
          onChange={(e) => birthChange(e)}
          value={birth}
        />
        {invalid.birth && onCheck && (
          <p>Please enter your birth date.</p>
        )}
      </div>
    </>
  );
});

export default SignUpInfo;
