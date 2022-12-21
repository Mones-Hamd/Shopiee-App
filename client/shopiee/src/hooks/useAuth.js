import { useContext } from 'react';

import { AuthContext } from '../context/AuthCtx';
import useFetch from './useFetch';

export const useAuth = () => {
  const { profile, setProfile } = useContext(AuthContext);
  const SIGNINROUT = '/user/signin';
  const SIGNUPROUT = '/user/signup';
  const onReceived = async (data) => {
    await setProfile(data);

    localStorage.setItem('profile', JSON.stringify(data));
  };
  const useSignIn = useFetch(SIGNINROUT, onReceived);
  const useSignUp = useFetch(SIGNUPROUT, onReceived);

  const signIn = async (formData) => {
    const requestOpt = {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    };
    useSignIn.performFetch(requestOpt);
  };
  const signUp = (formData) => {
    const requestOpt = {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    };
    useSignUp.performFetch(requestOpt);
  };
  return {
    signIn: {
      isLoading: useSignIn.isLoading,
      error: useSignIn.error,
      perform: signIn,
      isSuccess: useSignIn.isSuccess,
      cancelFetch: useSignIn.cancelFetch,
    },
    signUp: {
      isLoading: useSignUp.isLoading,
      error: useSignUp.error,
      perform: signUp,
      isSuccess: useSignUp.isSuccess,
    },
    profile,
  };
};
