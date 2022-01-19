import React, { useRef, useImperativeHandle } from "react";

const SignUpInfo = React.forwardRef((props, ref) => {
  const {
    className,
    password,
    passwordChange,
    email,
    emailChange,
    phone,
    phoneChange,
    birth,
    birthChange,
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
      <div className={className}>
        <label htmlFor="confirm-password">Confirm Password</label>
        <input
          id="confirm-password"
          type="password"
          ref={passwordRef}
          onChange={(e) => passwordChange(e)}
          value={password}
        />
      </div>
      <div className={className}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          ref={emailRef}
          onChange={(e) => emailChange(e)}
          value={email}
        />
      </div>
      <div className={className}>
        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          type="tel"
          ref={phoneRef}
          onChange={(e) => phoneChange(e)}
          value={phone}
        />
      </div>
      <div className={className}>
        <label htmlFor="birth">Birth</label>
        <input
          id="birth"
          type="date"
          ref={birthRef}
          onChange={(e) => birthChange(e)}
          value={birth}
        />
      </div>
    </>
  );
});

export default SignUpInfo;
