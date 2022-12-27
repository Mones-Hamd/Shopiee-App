import { useContext, useState } from "react";
import { NotificationsContext } from "../context/NotificationsCtx";

const useFetch = (route, onReceived, onError) => {
  const { setOpen, setSuccess, setMessage, setIsError, setLoading } =
    useContext(NotificationsContext);
  const controller = new AbortController();
  const signal = controller.signal;
  const cancelFetch = () => {
    controller.abort();
  };

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const performFetch = async (options) => {
    setError(null);
    setIsLoading(true);
    setLoading(true);
    setIsSuccess(false);

    const baseOptions = {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    };

    const fetchData = async () => {
      const url = `http://localhost:5000/api${route}`;

      const res = await fetch(url, { ...baseOptions, ...options, signal });

      if (!res.ok) {
        setError(
          `Fetch for ${url} returned an invalid status (${
            res.status
          }). Received: ${JSON.stringify(res)}`
        );
      }

      const jsonResult = await res.json();

      if (jsonResult.success === true) {
        setIsSuccess(true);
        if (options.method !== "GET") {
          setSuccess(true);
          setMessage(jsonResult.message);
          setOpen(true);
        }
        if (!jsonResult.message) {
          setLoading(false);
          setOpen(false);
        }
        onReceived(jsonResult);
      } else {
        setError(
          jsonResult.msg ||
            `The result from our API did not have an error message. Received: ${JSON.stringify(
              jsonResult
            )}`
        );
        setMessage(
          jsonResult.msg ||
            `The result from our API did not have an error message. Received: ${JSON.stringify(
              jsonResult
            )}`
        );
        if (options.method !== "GET") {
          setIsError(true);
          setOpen(true);
        }
        onError(jsonResult);
      }

      setIsLoading(false);
      setLoading(false);
    };

    fetchData().catch((error) => {
      setError(error);
      setIsLoading(false);
      setLoading(false);
    });
  };

  return {
    isLoading,
    isSuccess,
    error,
    performFetch,
    cancelFetch,
  };
};

export default useFetch;
