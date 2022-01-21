import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { useState } from "react";

const dynamodb = new DynamoDB({ region: "us-east-2", apiVersion: '2012-08-10', accessKeyId: '123', secretAccessKey: '123' });
const TABLE_NAME = "e-commerce";

const useDynamoDB = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const sendRequest = (type, prodId) => {
    setIsLoading(true);
    if (type === "all") {
      const params = {
        TableName: TABLE_NAME,
      };
      dynamodb.scan(params, (err, data) => {
        if (err) {
          console.log(err.message);
          setError("Failed to get product list");
          setIsLoading(false);
        } else {
          console.log(data);
          setIsLoading(false);
        }
      });
    } else if (type === "single") {
      const params = {
        Key: {
          id: {
            S: prodId,
          },
        },
        TableName: TABLE_NAME,
      };

      dynamodb.getItem(params, (err, data) => {
        if (err) {
          console.log(err.message);
          setError("Failed to get product info");
          setIsLoading(false);
        } else {
          console.log(data);
          setIsLoading(false);
        }
      });
    } else {
      setError("Something went wrong.");
      setIsLoading(false);
    }
  };

  return { isLoading, error, sendRequest };
};

export default useDynamoDB;
