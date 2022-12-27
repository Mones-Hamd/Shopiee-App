import { useContext } from 'react';
import { PostsContext } from '../context/PostsCtx';
import useFetch from './useFetch';

export const usePosts = (page, id) => {
  const { setPosts, setPost, setCurrentPage, setNumberOfPages } =
    useContext(PostsContext);

  const ROUT = `/posts?page=${page}`;
  const POSTROUT = `/posts/${id}`;
  const onReceived = async (data) => {
    await setPosts(data.data);
    await setNumberOfPages(data.numberOfPages);
    await setCurrentPage(data.currentPage);
  };
  const usePosts = useFetch(ROUT, onReceived);
  const usePost = useFetch(POSTROUT, async (data) => {
    await setPost(data.data);
  });

  const getPosts = () => {
    const requestOpt = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    };
    usePosts.performFetch(requestOpt);
  };
  const getPost = () => {
    const requestOpt = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    };
    usePost.performFetch(requestOpt);
  };
  return {
    getPosts: {
      isLoading: usePosts.isLoading,
      isSuccess: usePosts.isSuccess,
      perform: getPosts,
      isError: usePosts.error,
      cancel: usePosts.cancelFetch,
    },
    getPost: {
      isLoading: usePost.isLoading,
      isSuccess: usePost.isSuccess,
      perform: getPost,
      isError: usePost.error,
      cancel: usePost.cancelFetch,
    },
  };
};
