import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthCtx";
import { ConfirmationMessageContext } from "../context/ConMessageCtx";
import useFetch from "./useFetch";

export const useDelete = () => {
  const [message, setMessage] = useState("");
  const { profile } = useContext(AuthContext);
  const { id } = useContext(ConfirmationMessageContext);
  const onReceived = (data) => {
    setMessage(data.message);
  };
  const ROUT = `/posts/${id}`;
  const usePostDelete = useFetch(ROUT, onReceived);
  const preformDelete = () => {
    const requestOpt = {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: `bearer ${profile.token}`,
      },
    };
    usePostDelete.performFetch(requestOpt);
  };
  return {
    onDelete: {
      isLoading: usePostDelete.isLoading,
      isSuccess: usePostDelete.isSuccess,
      perform: preformDelete,
      isError: usePostDelete.error,
      cancel: usePostDelete.cancelFetch,
    },
    message,
  };
};
