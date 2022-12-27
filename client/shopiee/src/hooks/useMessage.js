import { useContext } from "react";
import { ConfirmationMessageContext } from "../context/ConMessageCtx";
export const useMessage = () => {
  const {
    isMessage,
    setIsMessage,
    isUpdate,
    setIsUpdate,
    isDelete,
    setIsDelete,
    postMemo,
    setPostMemo,
  } = useContext(ConfirmationMessageContext);
  return {
    isMessage,
    setIsMessage,
    isDelete,
    isUpdate,
    setIsDelete,
    setIsUpdate,
    postMemo,
    setPostMemo,
  };
};
