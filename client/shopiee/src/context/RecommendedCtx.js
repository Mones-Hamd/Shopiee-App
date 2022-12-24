import React from 'react';
import { useState, createContext } from 'react';
export const RecommendedPostsContext = createContext();
export const RecomendedPostProvider = ({ children }) => {
  const [recommendedPosts, setRecommendedPosts] = useState([]);

  const value = { recommendedPosts, setRecommendedPosts };
  return (
    <RecommendedPostsContext.Provider value={value}>
      {children}
    </RecommendedPostsContext.Provider>
  );
};
