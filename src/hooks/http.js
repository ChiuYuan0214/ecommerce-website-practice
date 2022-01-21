import { useState, useCallback } from "react";
import { getIdToken, getAccessToken } from "./cognito";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (type, post, data) => {
    setIsLoading(true);
    setError(null);
    const idToken = await getIdToken();
    let url =
      "https://yxoo4302jh.execute-api.us-east-2.amazonaws.com/dev";
    let body = null;
    if (type === "buying") {
      url += "/buying-history";
      if (post === true) {
        const date = new Date().getTime().toString();
        const uploadData = data.map((item) => ({
          date,
          prodId: item.id,
          amount: item.amount + "",
          discount: item.discount + "",
        }));
        body = { items: uploadData };
        console.log('body:', body);
      }
    }
    if (type === "browsing") {
      url = "";
      if (post === true) {
        body = {};
      }
    }
    try {
      console.log('idToken:', idToken)
      const response = await fetch(url, {
        method: post ? "POST" : "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "allow",
        },
        body: body ? JSON.stringify(body) : null,
      });
      if (!response.ok) {
        throw new Error("Request failed.");
      }
      const data = await response.json();
      console.log(data);
    } catch (err) {
      setError(err.message || "Something went wrong.");
      console.log(err.message);
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
