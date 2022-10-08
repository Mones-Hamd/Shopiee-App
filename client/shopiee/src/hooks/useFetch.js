import { useEffect, useState } from 'react';
export const useFetch = (url) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        setErr(error.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [url]);

  return { posts, isLoading, err };
};
