import { useContext } from 'react';
import { AuthContext } from '../context/AuthCtx';
import useFetch from './useFetch';

export const useCreate = () => {
  const { profile } = useContext(AuthContext);
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
