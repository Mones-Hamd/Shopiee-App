import { useContext, useState } from 'react';
import { PostsContext } from '../context/PostsCtx';
import useFetch from './useFetch';
export const useSearch = () => {
  const [tags, setTags] = useState([]);
  const [searchTitle, setSearchTitle] = useState('');
  const ROUT = `/search?searchQuery=${searchTitle || 'none'}&tags=${tags.join(
    ',',
  )}`;
  const { setPosts } = useContext(PostsContext);
  const onRecived = (data) => {
    setPosts(data.data);
  };
  const useSearchPosts = useFetch(ROUT, onRecived);
  const search = () => {
    const requestOpt = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    };
    useSearchPosts.performFetch(requestOpt);
  };
  return {
    search: {
      isLoading: useSearchPosts.isLoading,
      isSuccess: useSearchPosts.isSuccess,
      perform: search,
      isError: useSearchPosts.error,
      cancel: useSearchPosts.cancelFetch,
    },
    setTags,
    setSearchTitle,
    tags,
    searchTitle,
  };
};
