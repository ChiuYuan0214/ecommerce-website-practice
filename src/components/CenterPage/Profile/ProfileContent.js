import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { authActions } from "../../../store/auth";

import DataRow from "./DataRow";

import styles from "./ProfileContent.module.css";

const ProfileContent = ({ isToggle }) => {
  const userProfile = useSelector((state) => state.auth.authData.profile);
  const [profile, setProfile] = useState(userProfile);
  const { name, email, phone, birth } = profile;

  const initialEditState = {
    name: false,
    email: false,
    phone: false,
    birth: false,
  };
  const [isEdit, setIsEdit] = useState(initialEditState);

  const dispatch = useDispatch();

  const toggleIsEditHandler = (target) => {
    setIsEdit((prev) => ({ ...initialEditState, [target]: !prev[target] }));
  };

  const profileChangeHandler = (e, target) => {
    setProfile((prev) => ({ ...prev, [target]: e.target.value }));
  };

  const resetProfileHandler = (target) => {
    dispatch(authActions.setProfile({ target, data: profile[target] }));
    toggleIsEditHandler(target);
  };

  const cancelChangeHandler = (target) => {
    setProfile(userProfile);
    toggleIsEditHandler(target);
  };

  return (
    <ul className={`${styles.profileBoard} ${isToggle && styles.isToggle}`}>
      <DataRow
        type="text"
        isEdit={isEdit.name}
        title="Name"
        target="name"
        inputValue={profile.name}
        globalValue={name}
        toggleEdit={toggleIsEditHandler}
        handleChange={profileChangeHandler}
        cancelChange={cancelChangeHandler}
        reset={resetProfileHandler}
      />
      <DataRow
        type="email"
        isEdit={isEdit.email}
        title="E-mail"
        target="email"
        inputValue={profile.email}
        globalValue={email}
        toggleEdit={toggleIsEditHandler}
        handleChange={profileChangeHandler}
        cancelChange={cancelChangeHandler}
        reset={resetProfileHandler}
      />
      <DataRow
        type="phone"
        isEdit={isEdit.phone}
        title="Phone"
        target="phone"
        inputValue={profile.phone}
        globalValue={phone}
        toggleEdit={toggleIsEditHandler}
        handleChange={profileChangeHandler}
        cancelChange={cancelChangeHandler}
        reset={resetProfileHandler}
      />
      <DataRow
        type="date"
        isEdit={isEdit.birth}
        title="Birth"
        target="birth"
        inputValue={profile.birth}
        globalValue={birth}
        toggleEdit={toggleIsEditHandler}
        handleChange={profileChangeHandler}
        cancelChange={cancelChangeHandler}
        reset={resetProfileHandler}
      />
    </ul>
  );
};

export default ProfileContent;
