import { useContext } from 'react';
import { AuthContext } from '../context/AuthCtx';
import { ConfirmationMessageContext } from '../context/ConMessageCtx';
import useFetch from './useFetch';

export const useUpdate = () => {
  const { profile } = useContext(AuthContext);

  const { postMemo, id } = useContext(ConfirmationMessageContext);
  const ROUT = `/posts/${id}`;

  const usePostUpdate = useFetch(ROUT);
  const update = () => {
    const requestOpt = {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        Authorization: `bearer ${profile.token}`,
      },
      body: JSON.stringify(postMemo),
    };
    usePostUpdate.performFetch(requestOpt);
  };
  return {
    update: {
      isLoading: usePostUpdate.isLoading,
      isSuccess: usePostUpdate.isSuccess,
      perform: update,
      isError: usePostUpdate.error,
      cancel: usePostUpdate.cancelFetch,
    },
  };
};
