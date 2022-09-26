import { useEffect, useState } from "react";
import axios from "axios";
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
console.log(process.env.REACT_APP_API_URL);
export enum METHODS {
  GET = "GET",
  POST = "POST",
  PATCH = "PATCH",
  PUT = "PUT",
  DELETE = "DELETE",
  UPDATE = "UPDATE",
}
type useAxiosParams = {
  url: string;
  method: METHODS;
  headers?: {};
  body?: any;
  initialData?: any;
  isLazy: boolean;
};

const defaultHeaders = {
  "Content-Type": "application/json",
  Authorization: "",
};
export default function useAxios({
  url,
  method = METHODS["GET"],
  initialData = null,
  body = undefined,
  headers = defaultHeaders,
  isLazy = false,
}: useAxiosParams) {
  const [trigger, setTrigger] = useState(!isLazy);
  const [responseData, setResponseData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bodyState, setBodyState] = useState(body);
  const dispatchTrigger = () => {
    setTrigger(!trigger);
  };
  const dispatchBody = (newBody: any) => {
    setBodyState(newBody);
  };

  useEffect(() => {
    if (!trigger) return;
    getData();
    dispatchTrigger();
  }, [trigger]);
  const getData = async () => {
    try {
      console.log(url, body);
      const { data } = await axios({
        method: method,
        url: url,
        data: bodyState,
        headers: headers,
      });

      setResponseData(data);
      setIsLoading(false);
    } catch (err: any) {
      setError(err);
      setIsLoading(false);
    }
  };
  return {
    responseData,
    isLoading,
    error,
    shootRequest: dispatchTrigger,
    dispatchBody,
  };
}
