import { useContext } from 'react';
import { NotificationsContext } from '../context/NotificationsCtx';
export const useNotifications = () => {
  const { setOpen, setIsSuccess, setIsError, open } =
    useContext(NotificationsContext);
  return {
    setOpen,
    setIsSuccess,
    setIsError,
    open,
  };
};
