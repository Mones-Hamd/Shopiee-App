import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthCtx';
import { NotificationsContext } from '../context/NotificationsCtx';
import useFetch from './useFetch';
import { useNotifications } from './useNontifications';

export const useCreate = () => {
  const { profile } = useContext(AuthContext);
  const [message, setMessage] = useState('');
  const ROUT = `/posts`;

  const usePostCreate = useFetch(ROUT);
  const create = (post) => {
    const requestOpt = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `bearer ${profile.token}`,
      },
      body: JSON.stringify(post),
    };
    usePostCreate.performFetch(requestOpt);
  };
  return {
    create: {
      isLoading: usePostCreate.isLoading,
      isSuccess: usePostCreate.isSuccess,
      perform: create,
      isError: usePostCreate.error,
      cancel: usePostCreate.cancelFetch,
      onSuccess: usePostCreate.setSuccessMessage,
      message: usePostCreate.message,
    },
  };
};
