import { useState, useCallback } from "react";
import { getAccessToken } from "./cognito";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (resourceUrl, method, data) => {
    const response = await fetch(resourceUrl, {
      method: method || "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: data ? JSON.stringify(data) : null,
    });

    if (!response.ok) {
      throw new Error("Request failed.");
    }
    const result = await response.json();
    return result;
  };

  const sendRequest = useCallback(async (type, post, data) => {
    setIsLoading(true);
    setError(null);

    const accessToken = await getAccessToken();
    let url = "https://yxoo4302jh.execute-api.us-east-2.amazonaws.com/dev";
    const query = `?accessToken=${accessToken}`;

    if (type === "buying") {
      url += "/buying-history";
      if (post === true) {
        const date = new Date().getTime().toString();
        const uploadData = {date, items: data};
        console.log('uploadData:', uploadData);
        try {
          const result = await fetchData(url + query, "POST", uploadData);
          setIsLoading(false);
          setError(null);
          console.log(result);
          return result;
        } catch(err) {
          setIsLoading(false);
          setError(err.message);
          console.log(err.message);
          return err.message;
        }
      }
    }
    if (type === "browsing") {
      url = "";
      if (post === true) {
      }
    }
  }, []);

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
