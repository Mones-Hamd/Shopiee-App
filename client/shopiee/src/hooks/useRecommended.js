import { useContext } from 'react';
import { RecommendedPostsContext } from '../context/RecommendedCtx';
import useFetch from './useFetch';

export const useRecommended = (post) => {
  const { setRecommendedPosts } = useContext(RecommendedPostsContext);
  const ROUT = `/search?searchQuery='none'&tags=${post?.tags?.join(',')}`;
  const onReceived = async (data) => {
    await setRecommendedPosts(data.data);
  };
  const usePost = useFetch(ROUT, onReceived);
  const getRecommended = () => {
    const requestOpt = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    };
    usePost.performFetch(requestOpt);
  };
  return {
    getRecommendedPosts: {
      isLoading: useRecommended.isLoading,
      isSuccess: useRecommended.isSuccess,
      perform: getRecommended,
      isError: useRecommended.error,
      cancel: useRecommended.cancelFetch,
    },
  };
};
