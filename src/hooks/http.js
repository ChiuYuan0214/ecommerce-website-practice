import { useState, useCallback } from "react";

const DB_URL = "https://yxoo4302jh.execute-api.us-east-2.amazonaws.com/dev";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const sendRequest = useCallback(async (method, token, body) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(DB_URL, {
        method: method ? method : "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token ? token : null,
        },
        body: body ? body : null,
      });

      if (!response.ok) {
        throw new Error("Request failed.");
      }
      const data = await response.json();
      console.log(data);
    } catch (err) {
      setError(err.message || "Something went wrong.");
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
