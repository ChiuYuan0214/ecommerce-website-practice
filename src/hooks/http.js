import { useState, useCallback } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const sendRequest = useCallback(async (url, method, body) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(url, {
        method: method ? method : "GET",
        headers: { "Content-Type": "application/json" },
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
