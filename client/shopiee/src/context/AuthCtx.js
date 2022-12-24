import React from 'react';
import { useState, createContext, useEffect } from 'react';
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [profile, setProfile] = useState();

  useEffect(() => {
    const profileItem = JSON.parse(localStorage.getItem('profile'));
    if (profileItem) {
      setProfile(profileItem);
    }
  }, []);

  const value = { profile, setProfile };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
