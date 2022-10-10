import React from 'react';
import { useState, createContext } from 'react';
export const PostsContext = createContext();
export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(10);
  const [err, setErr] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const getPosts = async (url) => {
    try {
      const response = await fetch(url);
      const result = await response.json();
      setPosts(result.data);
      setCurrentPage(result.currentPage);
      setNumberOfPages(result.numberOfPages);
      console.log(result);
    } catch (error) {
      setErr(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const value = { posts, err, isLoading, getPosts, numberOfPages, currentPage };
  return (
    <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
  );
};
