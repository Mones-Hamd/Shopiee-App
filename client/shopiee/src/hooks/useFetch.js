import { useState } from 'react';

const useFetch = (route, onReceived, onError) => {
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
    setIsSuccess(false);

    const baseOptions = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    };

    const fetchData = async () => {
      const url = `http://localhost:5000/api${route}`;

      const res = await fetch(url, { ...baseOptions, ...options, signal });

      if (!res.ok) {
        setError(
          `Fetch for ${url} returned an invalid status (${
            res.status
          }). Received: ${JSON.stringify(res)}`,
        );
      }

      const jsonResult = await res.json();

      if (jsonResult.success === true) {
        setIsSuccess(true);
        onReceived(jsonResult);
      } else {
        setError(
          jsonResult.msg ||
            `The result from our API did not have an error message. Received: ${JSON.stringify(
              jsonResult,
            )}`,
        );
        onError(jsonResult);
      }

      setIsLoading(false);
    };

    fetchData().catch((error) => {
      setError(error);
      setIsLoading(false);
    });
  };

  return { isLoading, isSuccess, error, performFetch, cancelFetch };
};

export default useFetch;
