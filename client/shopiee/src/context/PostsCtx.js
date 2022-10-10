import React from 'react';
import { useState, createContext } from 'react';
export const PostsContext = createContext();
export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [err, setErr] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const getPosts = async (url) => {
    try {
      const response = await fetch(url);
      const result = await response.json();
      setPosts(result);
    } catch (error) {
      setErr(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const value = { posts, err, isLoading, getPosts };
  return (
    <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
  );
};
