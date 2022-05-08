import { getIdToken, getAccessToken } from "./cognito";
import { useState } from "react";

export const useProfile = () => {
  const [profile, setProfile] = useState(null);
  
  // get the profile of current user.
  const getProfile = async () => {
    const accessToken = await getAccessToken();
    const idToken = await getIdToken();
    // pass the access token to user pool through query string.
    const url =
      "https://yxoo4302jh.execute-api.us-east-2.amazonaws.com/dev/user-profile" +
      `?accessToken=${accessToken}`;
    const response = await fetch(url, {
      method: "GET",
      headers: { Authorization: idToken },
    });
    if (!response.ok) {
      throw new Error('Failed to get profile');
    }
    const data = await response.json();
    const { Username: name, UserAttributes: attrs } = data;
    let phone = attrs[4].Value.split("");
    phone.splice(0, 1);
    phone = phone.join("");

    const profile = {
      name,
      birth: attrs[2].Value,
      phone,
      email: attrs[5].Value,
    };

    setProfile(profile);
  };

  return { profile, getProfile };
};
