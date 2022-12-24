import React from 'react';
import { useState, createContext } from 'react';
export const PostsContext = createContext();
export const PostsProvider = ({ children }) => {
  const [post, setPost] = useState({});
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(10);

  const value = {
    posts,
    post,
    setPosts,
    setPost,
    numberOfPages,
    currentPage,
    setCurrentPage,
    setNumberOfPages,
  };

  return (
    <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
  );
};
