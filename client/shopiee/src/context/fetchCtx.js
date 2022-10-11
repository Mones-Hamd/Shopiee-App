import React from 'react';
import { useState, createContext } from 'react';
export const FetchContext = createContext();
export const FetchProvider = ({ children }) => {
  const [err, setErr] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const FetchPosts = async (url, data, method) => {
    const token = await JSON.parse(localStorage.getItem('profile')).token;
    let requestOpt = {};

    if (data) {
      requestOpt = {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${token}`,
        },
        body: JSON.stringify(data),
      };
    } else {
      requestOpt = {
        method,

        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${token}`,
        },
      };
    }
    console.log(requestOpt);
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
