import React from "react";
import { useState, createContext } from "react";
export const NotificationsContext = createContext();
export const NotificationsProvider = ({ children }) => {
  const [open, setOpen] = useState();
  const [Success, setSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const value = {
    open,
    setOpen,
    Success,
    setSuccess,
    isError,
    setIsError,
    message,
    setMessage,
    loading,
    setLoading,
  };
  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  );
};
