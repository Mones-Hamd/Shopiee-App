import React from 'react';
import { useState, createContext } from 'react';
export const FetchContext = createContext();
export const FetchProvider = ({ children }) => {
  const [err, setErr] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const token = JSON.parse(localStorage.getItem('profile')).token;
  const FetchPosts = async (url, data, method) => {
    let requestOpt = {};
    data
      ? (requestOpt = {
          method,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `bearer ${token}`,
          },
          body: JSON.stringify(data),
        })
      : (requestOpt = {
          method,

          headers: {
            'Content-Type': 'application/json',
            Authorization: `bearer ${token}`,
          },
        });
    try {
      setIsLoading(true);
      const response = await fetch(url, requestOpt);
      await response.json();
    } catch (error) {
      setErr(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const value = { err, isLoading, FetchPosts };
  return (
    <FetchContext.Provider value={value}>{children}</FetchContext.Provider>
  );
};
