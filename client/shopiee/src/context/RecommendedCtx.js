import React from 'react';
import { useState, createContext } from 'react';
export const RecommendedPostsContext = createContext();
export const RecomendedPostProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [recommendedPosts, setRecommendedPosts] = useState([]);

  const [err, setErr] = useState('');

  const getRecommendedPosts = async (url) => {
    try {
      const response = await fetch(url);
      const result = await response.json();
      setRecommendedPosts(result.data);
    } catch (error) {
      setErr(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const value = { recommendedPosts, err, isLoading, getRecommendedPosts };
  return (
    <RecommendedPostsContext.Provider value={value}>
      {children}
    </RecommendedPostsContext.Provider>
  );
};
