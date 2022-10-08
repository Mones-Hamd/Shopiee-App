import { useEffect, useState } from 'react';
export const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
      } catch (error) {
        setErr(error.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [data]);

  return { data, isLoading, err };
};
