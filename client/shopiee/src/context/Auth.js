import React from 'react';
import { useState, createContext } from 'react';
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState('');

  const sign = async (url, formData) => {
    const requestOpt = {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    };
    try {
      setIsLoading(true);
      const response = await fetch(url, requestOpt);
      const data = await response.json();
      localStorage.setItem('profile', JSON.stringify(data));
    } catch (error) {
      setErr(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  const value = { sign, err, isLoading };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
