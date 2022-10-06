import React from 'react';
import { useState, createContext } from 'react';
export const PostsContext = createContext();
export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState('');
  const getPosts = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    setPosts(data);
  };

  const value = { posts, getPosts };
  return (
    <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
  );
};
