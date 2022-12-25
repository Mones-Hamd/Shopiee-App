import React from 'react';
import { useState, createContext } from 'react';
export const ConfirmationMessageContext = createContext();
export const ConfirmationMessageProvider = ({ children }) => {
  const [id, setId] = useState();
  const [isMessage, setIsMessage] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [postMemo, setPostMemo] = useState();
  const value = {
    isMessage,
    setIsMessage,
    setId,
    id,
    isDelete,
    setIsDelete,
    isUpdate,
    setIsUpdate,
    postMemo,
    setPostMemo,
  };
  return (
    <ConfirmationMessageContext.Provider value={value}>
      {children}
    </ConfirmationMessageContext.Provider>
  );
};
