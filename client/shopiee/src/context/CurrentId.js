import React from 'react';
import { useState, createContext } from 'react';
export const CurrentIdContext = createContext();
export const CurrentIdProvider = ({ children }) => {
  const [currentId, setCurrentId] = useState(null);
  const value = { currentId, setCurrentId };
  return (
    <CurrentIdContext.Provider value={value}>
      {children}
    </CurrentIdContext.Provider>
  );
};
