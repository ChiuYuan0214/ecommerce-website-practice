import { useState, useEffect } from "react";

import ToggleBar from "../../UI/ToggleBar/ToggleBar";
import ProfileContent from "./ProfileContent";

const Profile = ({ target, setToggle }) => {
  const [isToggleOn, setIsToggleOn] = useState(false);

  const setToggleHandler = () => {
    setIsToggleOn((prev) => !prev);
    setToggle("profile");
  };

  // set the local toggle state to false if 'target' has changed. (changed by other block)
  useEffect(() => {
    if (target !== "profile") {
      setIsToggleOn(false);
    } else if (target === "profile" && isToggleOn === false) {
      setIsToggleOn(true);
    }
  }, [target, isToggleOn]);

  return (
    <section>
      <ToggleBar
        title="Profile"
        isResponsive={true}
        isToggle={isToggleOn}
        onClick={setToggleHandler}
      />
      <ProfileContent isToggle={isToggleOn} />
    </section>
  );
};

export default Profile;
