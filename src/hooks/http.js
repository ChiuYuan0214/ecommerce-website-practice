import { useState, useCallback } from "react";
import { getAccessToken } from "./cognito";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const fetchData = useCallback(async (resourceUrl, method, data) => {
    const response = await fetch(resourceUrl, {
      method: method || "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: data ? JSON.stringify(data) : null,
    });

    if (!response.ok) {
      return new Error("Request failed.");
    }
    const result = await response.json();
    return result;
  }, []);

  const multiRequest = useCallback(async (url, method, dataList) => {
    return await Promise.all(
      dataList.map((data) => fetchData(url, method, data))
    );
  }, []);

  const sendRequest = useCallback(
    async (type, post, data) => {
      setIsLoading(true);
      setError(null);

      const accessToken = await getAccessToken();
      // console.log("accessToken:", accessToken);
      let url = "https://yxoo4302jh.execute-api.us-east-2.amazonaws.com/dev";
      const query = `?accessToken=${accessToken}`;

      if (type === "buying") {
        url += "/buying-history";
        if (post === true) {
          const date = new Date().getTime().toString();
          const uploadData = data.map((item, index) => ({
            date,
            index: index + "",
            amount: item.amount + "",
            discount: item.discount + "",
            prodId: item.id,
          }));

          try {
            const result = await multiRequest(url + query, "POST", uploadData);
            return result;
          } catch (err) {
            setIsLoading(false);
            setError(err.message);
            console.log(err.message);
          }
          setIsLoading(false);
          setError(null);
        } else {
          const result = await fetchData(url + query);
          const dataList = result.Items;
          const output = [];
          if (!dataList) {
            return;
          }
          dataList.map((data) => {
            const index = output.findIndex((his) => his.date === +data.date.S);
            const prodData = {
              id: data.prodId.S,
              amount: +data.amount.S,
              discount: +data.discount.S,
            };
            if (index >= 0) {
              output[index].items.push(prodData);
            } else {
              output.push({
                date: +data.date.S,
                items: [prodData],
              });
            }
          });

          setData(output);
        }
      }
      if (type === "browsing") {
        if (post === true) {
        }
      }
    },
    [getAccessToken, multiRequest, fetchData]
  );

  return {
    isLoading,
    error,
    data,
    sendRequest,
  };
};

export default useHttp;
